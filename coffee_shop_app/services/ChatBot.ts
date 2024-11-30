// // import axios from 'axios';
// // import { MessageInterface } from '@/types/types';
// // import { API_KEY, API_URL } from '@/config/runpodConfig';

// // async function callChatBotAPI(messages: MessageInterface[]): Promise<MessageInterface> {
// //     try {
// //         const response = await axios.post(API_URL, {
// //             input: { messages }
// //         }, {
// //             headers: {
// //                 'Content-Type': 'application/json',
// //                 'Authorization': `Bearer ${API_KEY}`
// //             }
// //         });
        
// //         let output = response.data;
// //         let outputMessage: MessageInterface = output['output'];

// //         return outputMessage;
// //     } catch (error) {
// //         console.error('Error calling the API:', error);
// //         throw error;
// //     }
// // }

// // export { callChatBotAPI };

// import axios from 'axios';
// import { MessageInterface } from '@/types/types';
// import { API_KEY, API_URL } from '@/config/runpodConfig';

// async function callChatBotAPI(messages: MessageInterface[]): Promise<MessageInterface> {
//     try {
//         // Log the input messages before sending the request
//         console.log('Input Messages:', messages);

//         const response = await axios.post(
//             API_URL,
//             {
//                 input: { messages }
//             },
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${API_KEY}`
//                 }
//             }
//         );

//         // Log the raw API response
//         console.log('API Response:', response.data);

//         let output = response.data;
//         let outputMessage: MessageInterface = output['output'];

//         // Log the final output message
//         console.log('Output Message:', outputMessage);

//         return outputMessage;
//     } catch (error) {
//         console.error('Error calling the API:', error);
//         throw error;
//     }
// }

// export { callChatBotAPI };

import axios from 'axios';
import { MessageInterface } from '@/types/types';
import { API_KEY, API_URL } from '@/config/runpodConfig';

async function callChatBotAPI(messages: MessageInterface[]): Promise<MessageInterface> {
    try {
        const greetingKeywords = ['hi', 'hey', 'hello', 'hola']; // List of greeting words
        const userMessage = messages[messages.length - 1].content.toLowerCase(); // Get the latest user message and convert to lowercase
        
        // Create a regular expression to match the greetings at the start, followed by only whitespace or punctuation
        const greetingPattern = new RegExp(`^(${greetingKeywords.join('|')})(\\s*|[!\\?]+)$`, 'i');
        
        // If the message matches any of the greeting patterns, return a fixed response
        if (greetingPattern.test(userMessage)) {
            const fixedResponse: MessageInterface = {
                role: 'assistant',
                content: 'Hello! How can I assist you today? ☕️'
            };
            return fixedResponse;
        }
        

    

        const response = await axios.post(
            API_URL,
            {
                input: { messages }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                }
            }
        );



        let output = response.data;
        let outputMessage: MessageInterface = output['output'];

        // If the output message is null or empty, set a fallback response
        if (!outputMessage || outputMessage.content.trim() === '') {
            outputMessage = {
                role: 'assistant',
                content: 'I’m sorry, I didn’t quite understand that. Could you please rephrase your request?'
            };
        }


        return outputMessage;
    } catch (error) {
        console.error('Error calling the API:', error);

        // Return a fallback message if there is an error
        const errorMessage: MessageInterface = {
            role: 'assistant',
            content: 'Oops! Something went wrong. Please try again later.'
        };

        return errorMessage;
    }
}

export { callChatBotAPI };

