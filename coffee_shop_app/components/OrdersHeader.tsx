import { Text, View } from 'react-native'
import React from 'react'
import DeliveryToggle from './DeliveryToggle'

const OrdersHeader = () => {
    return (
        <View>
            <DeliveryToggle />
            <Text
                className='mx-7 mt-7 text-[#242424] text-lg font-[Sora-SemiBold]'
            >
                Delivery Address
            </Text>
            <Text
                className='mx-7 mt-2 text-[#242424] text-base font-[Sora-Regular] '
            >   
                1234 Collin St., Suite 200
            </Text>
            <Text
                className='mx-7 text-[#A2A2A2] text-base font-[Sora-Regular] mb-2'
            >
                Dallas, Texas, USA
            </Text>
            <View
                className='mx-12 border-b border-gray-300 my-4'
            />
        </View>
    )
}

export default OrdersHeader
