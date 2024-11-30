import { Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const DeliveryToggle = () => {
    const [isDelivery, setIsDelivery] = useState<boolean>(true);
    return (
        <View
            className='flex-row items-center justify-between bg-[3EDEDED] mx-7 p-1 rounded-xl mt-1'
        >
            <TouchableOpacity
                onPress={() => setIsDelivery(true)}
                className={`flex-1 items-center py-2 rounded-xl
                    ${isDelivery ? 'bg-app_orange_color' : 'bg-[#F5F5F5]'}
                `}
            >
                <Text
                    className={`text-[#242424] text-lg font-[Sora-SemiBold]
                        ${isDelivery ? 'text-white' : 'text-black'}
                    `}
                >
                    Delivery
                </Text>

            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setIsDelivery(false)}
                className={`flex-1 items-center py-2 rounded-xl
                    ${!isDelivery ? 'bg-app_orange_color' : 'bg-[#F5F5F5]'}
                `}
            >
                <Text
                    className={`text-[#242424] text-lg font-[Sora-SemiBold]
                        ${!isDelivery ? 'text-white' : 'text-black'}
                    `}
                >
                    Pickup
                </Text>
            </TouchableOpacity>
        </View>
    )
    }

export default DeliveryToggle

