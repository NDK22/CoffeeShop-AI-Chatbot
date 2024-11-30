from openai import OpenAI
import pandas as pd
import os
from .utils import get_chatbot_response,double_check_json_output
import json
from copy import deepcopy
import dotenv
dotenv.load_dotenv()

class RecommendationAgent():
    def __init__(self,apriori_recommendation_path,popular_recommendation_path):
        self.client = OpenAI(
            api_key= os.getenv("RUNPOD_TOKEN"),
            base_url= os.getenv("RUNPOD_CHATBOT_URL")
        )
        self.model_name = os.getenv("MODEL_NAME") 

        with open(apriori_recommendation_path,'r')  as file:
            self.apriori_recommendations = json.load(file)

        self.popular_recommendations = pd.read_csv(popular_recommendation_path)
        self.products = self.popular_recommendations['product'].tolist()
        self.product_categories = list(set(self.popular_recommendations['product_category'].tolist()))

    def get_apriori_recommendation(self,products,top_k=5):
        recommendation_list=[]

        for product in products:
            if product in self.apriori_recommendations:
                recommendation_list+=self.apriori_recommendations[product]
            
        # sort recommendation list by "confidence value"
        recommendation_list = sorted(recommendation_list,key=lambda x:x['confidence'],reverse=True)

        recommendations = []
        recommendations_per_category ={}

        for recommendation in recommendation_list:
            if recommendation in recommendations:
                continue

            #limit 2 recommendations per category
            product_category = recommendation['product_category']
            if product_category not in recommendations_per_category:
                recommendations_per_category[product_category] = 0
            
            if recommendations_per_category[product_category] >=2:
                continue

            recommendations_per_category[product_category] +=1

            recommendations.append(recommendation['product'])

            if len(recommendations)>=top_k:
                break
        return recommendations

    
    def get_popular_recommendations(self,product_categories=None,top_k=5):
        recommendation_df = self.popular_recommendations

        if type(product_categories)==str:
            product_categories = [product_categories]
        
        if product_categories is not None:
            recommendation_df = self.popular_recommendations[self.popular_recommendations['product_category'].isin(product_categories)]
        recommendation_df = recommendation_df.sort_values('number_of_transactions',ascending=False)

        if recommendation_df.shape[0]==0:
            return []
        
        recommendations = recommendation_df['product'].tolist()[:top_k]
        return recommendations
    

    def recommendation_classification(self, message):
        message = deepcopy(message)
        system_prompt = """ You are a helpful AI assistant for a coffee shop application which serves drinks and bakery items. We have 3 types of recommendations:

        1. Apriori Recommendations: These are recommendations based on the user's order history or want a recommendation along with items or category which the user mentioned in the input message. We recommend items that are frequently bought together with the items in the user's order, or items or category mentioned in the user's input message.
        2. Popular Recommendations: Here the user asks to recommend them product in any category. These are recommendations based on the popularity of items in the coffee shop. We recommend items that are popular among customers.
        3. Popular Recommendations by Category: Here the user asks to recommend them product in a category such as what coffee do you recommend me to get? so the answer to this: We recommend items that are popular in the category of the user's requested category in this case coffee.
        
        Here is the list of items in the coffee shop:
        """+ ",".join(self.products) + """
        Here is the list of Categories we have in the coffee shop:
        """ + ",".join(self.product_categories) + """

        Your task is to determine which type of recommendation to provide based on the user's message.

        Your output should be in a structured json format like so. Each key is a string and each value is a string. Make sure to follow the format exactly:
        {
        "chain of thought": Write down your critical thinking about what type of recommendation is this input relevant to such as "apriori" or "popular" or "popular by category".
        "recommendation_type": "apriori" or "popular" or "popular by category". Pick one of those and only write the word.
        "parameters": This is a  python list. It's either a list of of items for apriori recommendations or a list of categories for popular by category recommendations. Leave it empty for popular recommendations. Make sure to use the exact strings from the list of items or categories above.
        }
        """

        input_messages = [{"role":"system","content":system_prompt}]+message[-3:]

        chatbot_output = get_chatbot_response(self.client,self.model_name,input_messages)
        chatbot_output = double_check_json_output(self.client,self.model_name,chatbot_output)
        output=self.postprocess_classification(chatbot_output)
        return output
    
    def postprocess_classification(self, output):
        output = json.loads(output)
        dict_output = {
            "recommendation_type": output["recommendation_type"],
            "parameters":output["parameters"]
        }
        return dict_output
    
    def get_recommendations_from_order(self,messages,order):
        messages = deepcopy(messages)
        products = []
        for product in order:
            products.append(product['item'])

        recommendations = self.get_apriori_recommendation(products)
        recommendations_str = ", ".join(recommendations)

        system_prompt = f"""
        You are a helpful AI assistant for a coffee shop application which serves drinks and bakery items.
        your task is to recommend items to the user based on their order.

        I will provide what items you should recommend to the user based on their order in the user message. 
        """

        prompt = f"""
        {messages[-1]['content']}

        Please recommend me these items exactly: {recommendations_str}
        """

        messages[-1]['content'] = prompt
        input_messages = [{"role": "system", "content": system_prompt}] + messages[-3:]

        chatbot_output =get_chatbot_response(self.client,self.model_name,input_messages)
        output = self.postprocess(chatbot_output)

        return output
    
    def get_response(self,messages):
        messages = deepcopy(messages)
        
        recommendation_classification = self.recommendation_classification(messages)
        recommendation_type = recommendation_classification['recommendation_type']

        recommendations = []
        if recommendation_type == 'apriori':
            recommendations = self.get_apriori_recommendation(recommendation_classification['parameters'])
        elif recommendation_type == 'popular':
            recommendations = self.get_popular_recommendations()
        elif recommendation_type == 'popular by category':
            recommendations = self.get_popular_recommendations(recommendation_classification['parameters'])
        
        if recommendations ==[]:
            return {"role":"assistant","content":"Sorry!, I cant help with the recommendation. Can I help you with something else?"}
        
        #respond to user
        recommendations_str = ', '.join(recommendations)
        system_prompt = f"""
        You are a helpful AI assistant for a coffee shop application which serves drinks and bakery items.
        your task is to recommend items to the user based on their input message. And respond in a friendly but concise way. And put it an unordered list with a very small description.

        I will provide which items you should recommend to the user based on input in the user message. 
        """

        prompt = f"""
        {messages[-1]['content']}

        Please recommend me these items exactly: {recommendations_str}
        """

        messages[-1]['content'] = prompt
        input_messages = [{"role": "system", "content": system_prompt}] + messages[-3:]

        chatbot_output = get_chatbot_response(self.client,self.model_name,input_messages)
        output = self.postprocess(chatbot_output)

        return output

    def postprocess(self,output):
        output={
            "role":"assistant",
            "content": output,
            "memory":{
                "agent": "recommendation_agent"
            }
        }
        return output

