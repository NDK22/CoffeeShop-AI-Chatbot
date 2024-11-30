// import { Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
// import PageHeader from '@/components/PageHeader';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { useRef, useState } from 'react';
// import { MessageInterface } from '@/types/types';
// import { Feather } from '@expo/vector-icons';
// import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import MessageList from '@/components/MessageList';
// import { callChatBotAPI } from '@/services/ChatBot';

// const ChatRoom = () => {
//   const [messages, setMessages] = useState<MessageInterface[]>([]);
//   const textRef = useRef('');
//   const inputRef = useRef<TextInput>(null);
//   const [isTyping, setIsTyping] = useState(false);

//   const handleSendMessage = async () => {
//     let message = textRef.current.trim();
//     if (!message) return;
//     try {
//       let InputMessages = [...messages, { role: 'user', content: message }];
//       setMessages(InputMessages);
//       textRef.current = '';
//       if (inputRef) inputRef.current?.clear();
//       setIsTyping(true);
//       // Simulate API response
//       let response_message = await callChatBotAPI(InputMessages)
//       setMessages([...InputMessages, response_message]);
//       setIsTyping(false);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <PageHeader title="Chatbot" showHeaderRight={false} bgcolor="#F9F9F9" />
//       <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//         <KeyboardAvoidingView
//           style={{ flex: 1 }}
//           behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//           keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} // Offset for iOS to avoid overlapping
//         >
//           <View className="flex-1 justify-between bg-neutral-100">
//             {/* Messages */}
//             <View className="flex-1">
//               <MessageList messages={messages} isTyping={isTyping} />
//             </View>

//             {/* Input Box */}
//             <View
//               className="flex-row items-center justify-between bg-white mx-3 mb-3 border border-neutral-200 rounded-full p-2"
//             >
//               <TextInput
//                 ref={inputRef}
//                 onChangeText={(value) => (textRef.current = value)}
//                 className="flex-1 mr-2"
//                 placeholder="Type a message...."
//                 placeholderTextColor="#A2A2A2"
//                 style={{ fontSize: hp(2) }}
//               />
//               <TouchableOpacity
//                 onPress={handleSendMessage}
//                 className="bg-neutral-200 p-2 mr-[1px] rounded-full"
//                 hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//               >
//                 <Feather name="send" size={hp(2.7)} color="#737373" />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </KeyboardAvoidingView>
//       </TouchableWithoutFeedback>
//     </GestureHandlerRootView>
//   );
// };

// export default ChatRoom;


// import { Alert, TouchableOpacity, View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'
// import React, { useEffect, useRef, useState } from 'react'
// import { StatusBar } from 'expo-status-bar'
// import MessageList from '@/components/MessageList'
// import { MessageInterface } from '@/types/types';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
// import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler'
// import { Feather } from '@expo/vector-icons'
// import { callChatBotAPI } from '@/services/ChatBot'
// import PageHeader from '@/components/PageHeader'
// import { useCart } from '@/components/CartContext'

// const ChatRoom = () => {
//   const { addToCart, emptyCart } = useCart();

//   const [messages, setMessages] = useState<MessageInterface[]>([]);
//   const [isTyping, setIsTyping] = useState<boolean>(false);
//   const textRef = useRef('')
//   const inputRef = useRef<TextInput>(null)

//   useEffect(() => {
//   }, [messages]);

//   const handleSendMessage = async () => {
//     let message = textRef.current.trim();
//     if (!message) return;
//     try {

//       // Add the user message to the list of messages
//       let InputMessages = [...messages, { content: message, role: 'user' }];

//       setMessages(InputMessages);
//       textRef.current = ''
//       if (inputRef) inputRef?.current?.clear();
//       setIsTyping(true)
//       console.log('Input :', InputMessages);
//       let resposnseMessage = await callChatBotAPI(InputMessages);
//       setIsTyping(false)
//       setMessages(prevMessages => [...prevMessages, resposnseMessage]);

//       if (resposnseMessage) {
//         if (resposnseMessage.memory) {
//           if (resposnseMessage.memory.order) {
//             emptyCart()
//             resposnseMessage.memory.order.forEach((item: any) => {
//               addToCart(item.item, item.quantity)
//             });
//           }
//         }
//       }


//     } catch (err: any) {
//       Alert.alert('Message', err.message)
//     }

//   }

//   return (
//     <GestureHandlerRootView>
//       <StatusBar style='dark' />

//       <View
//         className='flex-1 bg-white'
//       >
//         <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//           <KeyboardAvoidingView
//             style={{ flex: 1 }}
//             behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//             keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} // Offset for iOS to avoid overlapping
//           >
//             <PageHeader title="Chat Bot" showHeaderRight={false} bgcolor='white' />

//             <View className='h-3 border-b border-neutral-300' />

//             <View
//               className='flex-1 justify-between bg-neutral-100 overflow-visibile'
//             >
//               <View
//                 className='flex-1'
//               >
//                 <MessageList
//                   messages={messages}
//                   isTyping={isTyping}

//                 />
//               </View>

//               <View
//                 style={{ marginBottom: hp(2.7) }}
//                 className='pt-2'
//               >
//                 <View
//                   className="flex-row mx-3 justify-between border p-2 bg-white border-neutral-300  rounded-full pl-5"
//                 >
//                   <TextInput
//                     ref={inputRef}
//                     onChangeText={value => textRef.current = value}
//                     placeholder='Type message...'
//                     placeholderTextColor="#A2A2A2"
//                     style={{ fontSize: hp(2) }}
//                     className='flex-1 mr2'
//                   />
//                   <TouchableOpacity
//                     onPress={handleSendMessage}
//                     className='bg-neutral-200 p-2 mr-[1px] rounded-full'
//                   >
//                     <Feather name="send" size={hp(2.7)} color="#737373" />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </KeyboardAvoidingView>
//         </TouchableWithoutFeedback>
//       </View>
//     </GestureHandlerRootView>
//   )
// }

// export default ChatRoom



import { Alert, TouchableOpacity, View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import MessageList from '@/components/MessageList';
import { MessageInterface } from '@/types/types';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { callChatBotAPI } from '@/services/ChatBot';
import PageHeader from '@/components/PageHeader';
import { useCart } from '@/components/CartContext';

const ChatRoom = () => {
  const { addToCart, emptyCart } = useCart();
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const textRef = useRef('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {}, [messages]);

  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;
    try {
      let InputMessages = [...messages, { content: message, role: 'user' }];
      setMessages(InputMessages);
      textRef.current = '';
      if (inputRef) inputRef?.current?.clear();
      setIsTyping(true);
      let resposnseMessage = await callChatBotAPI(InputMessages);
      setIsTyping(false);
      setMessages((prevMessages) => [...prevMessages, resposnseMessage]);

      if (resposnseMessage) {
        if (resposnseMessage.memory) {
          if (resposnseMessage.memory.order) {
            emptyCart();
            resposnseMessage.memory.order.forEach((item: any) => {
              addToCart(item.item, item.quantity);
            });
          }
        }
      }
    } catch (err: any) {
      Alert.alert('Message', err.message);
    }
  };

  return (
    <GestureHandlerRootView>
      <StatusBar style="dark" />
      <View className="flex-1 bg-white">
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} // Offset for iOS to avoid overlapping
          >
            <PageHeader title="Chat Bot" showHeaderRight={false} bgcolor="white" />
            <View className="h-3 border-b border-neutral-300" />
            <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
                <View className="flex-1">
                  <MessageList messages={messages} isTyping={isTyping} />
                </View>

              <View style={{ marginBottom: hp(2.7) }} className="pt-2">
                <View className="flex-row mx-3 justify-between border p-2 bg-white border-neutral-300 rounded-full pl-5">
                  <TextInput
                    ref={inputRef}
                    onChangeText={(value) => (textRef.current = value)}
                    placeholder="Type message..."
                    placeholderTextColor="#A2A2A2"
                    style={{ fontSize: hp(2) }}
                    className="flex-1 mr2"
                  />
                  <TouchableOpacity onPress={handleSendMessage} className="bg-neutral-200 p-2 mr-[1px] rounded-full">
                    <Feather name="send" size={hp(2.7)} color="#737373" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
      </View>
    </GestureHandlerRootView>
  );
};

export default ChatRoom;
