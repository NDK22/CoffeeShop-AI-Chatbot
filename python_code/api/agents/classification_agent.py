from openai import OpenAI
import os
from .utils import get_chatbot_response,double_check_json_output
import json
from copy import deepcopy
import dotenv
dotenv.load_dotenv()

class ClassificationAgent():
    def __init__(self):
        self.client = OpenAI(
            api_key= os.getenv("RUNPOD_TOKEN"),
            base_url= os.getenv("RUNPOD_CHATBOT_URL")
        )
        self.model_name = os.getenv("MODEL_NAME")

    def get_response(self,messages):
        messages = deepcopy(messages)

        system_prompt = """
            You are a helpful AI assistant for a coffee shop application.
            Your task is to determine which agent should handle the user input. You have 3 agents to choose from which is given below:
            1. details_agent: This agent is responsible for answering questions about the coffee shop, such as location, delivery places, or working hours , details about menu items. Or listing items in the menu items. Or by asking what we have
            2. order_taking_agent: This agent is responsible for taking orders from the user or buying an item for the user in the coffee shop. It's responsible to have a conversation with the user about the order untill it's complete.
            3. recommendation_agent: This agent is responsible for giving recommendations to the user about what to buy. If the user asks for a recommendation or needs suggestions on what he would like to have, this agent should be used.

            Your output should be in a structured json format like below. each key is a string and each value is a string. Make sure to follow the format exactly:
            {
            "chain of thought": "Go over each of the agents above and write some your thoughts about what agent is this input relevant to.",
            "decision": "details_agent" or "order_taking_agent" or "recommendation_agent". Pick one of these which is relevant to chain of thought above and only write that word.,
            "message": leave the message empty
            }
        """

        input_messages =[{"role":'system','content':system_prompt}]
        input_messages+= messages[-3:]

        chatbot_output= get_chatbot_response(self.client,self.model_name,input_messages)
        chatbot_output = double_check_json_output(self.client,self.model_name,chatbot_output)
        output = self.postprocess(chatbot_output)
       
        return output
    
    def postprocess(self,output):
        output = json.loads(output)
        dict_output = {
            "role":"assistant",
            "content": output["message"],
            "memory":{
                "agent":"classification_agent",
                "classification_decision": output['decision']
            }
        }
        return dict_output