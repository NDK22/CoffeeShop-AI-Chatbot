from openai import OpenAI
import os
from .utils import get_chatbot_response,double_check_json_output
import json
from copy import deepcopy
import dotenv
dotenv.load_dotenv()

class GuardAgent():
    def __init__(self):
        self.client = OpenAI(
            api_key= os.getenv("RUNPOD_TOKEN"),
            base_url= os.getenv("RUNPOD_CHATBOT_URL")
        )
        self.model_name = os.getenv("MODEL_NAME")

    def get_response(self,messages):
        messages = deepcopy(messages)

        system_prompts="""
            You are a helpful AI assistant for a coffee shop application which serves drinks and pastries.
            Your task is to determine whether the user is asking something relevant to the coffee shop.
            
            The user is allowed to:
            1. Ask questions about the coffee shop such as location, working hours, menu items and coffee shop related questions.
            2. Ask questions about menu items. They can ask for ingrediends in an item and more details about that item.
            3. Make an order.
            4. Ask about recommendations for what to buy.
            5. 

            The user is not allowed to:
            1. Ask questions about anything other than our coffee shop.
            2. Ask questions about the staff in the coffee shop.
            3. Ask about how to make a certain menu item.

            Your output should be in a structured JSON format such as each key is a string and each value is a string. Make sure to follow the format exaclty as below:
            {
            "chain of thought": "Go over each of the points mentioned above and see if the messages lies under these points or not. Then your write some thoughts about which point is this input relevant to.",
            "decision": "Allowed" or "Not Allowed". Pick only one of these options and only write that option.
            "message": Leave the message empty "" if its allowed, otherwise write "Sorry!, I can't help with that. Can I help you with the order?" 
            }
        """
        input_messages= [{"role":"system","content":system_prompts}]+ messages[-3:]

        chatbot_output = get_chatbot_response(self.client,self.model_name,input_messages)
        chatbot_output = double_check_json_output(self.client,self.model_name,chatbot_output)
        output = self.postprocess(chatbot_output)
       
        return output
    
    def postprocess(self,output):
        output = json.loads(output)
        dict_output = {
            "role":"assistant",
            "content": output["message"],
            "memory":{
                "agent":"guard_agent",
                "guard_decision": output['decision']
            }
        }
        return dict_output