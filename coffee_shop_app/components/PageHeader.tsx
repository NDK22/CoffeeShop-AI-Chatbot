import { Text, View } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';

interface HeaderProps {
    title: string;
    showHeaderRight: boolean;
    bgcolor: string    
}

const PageHeader: React.FC<HeaderProps> = ({ title, showHeaderRight, bgcolor }) => {
    return (
        <Stack.Screen
            options={{
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: bgcolor,
                    },
                    headerTitleAlign: 'center',
                    headerTitle: () => (
                        <View>
                            <Text 
                                className='text-xl font-[Sora-SemiBold] text-[#242424]'
                            >
                                {title}</Text>
                        </View>
                    ),
                    headerRight: showHeaderRight ? () => (
                        <FontAwesome5 
                        name="heart"
                        size={24}
                        style={{marginRight: 10}}
                        color='black'
                        />
                    ) : undefined,
                    headerBackVisible: false,

                    headerLeft: () => (
                        <GestureHandlerRootView
                            className='flex-row items-center gap-4'
                        >
                            <TouchableOpacity
                                className='pl-2'
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                onPress={() => router.back()}
                            >
                                <Feather
                                    name="arrow-left"
                                    size={24}
                                    color='black'
                                />  
                            </TouchableOpacity>
                        </GestureHandlerRootView>
                    )
                }}
            />
        )
}

export default PageHeader
