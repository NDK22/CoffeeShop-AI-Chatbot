import { Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

interface DescriptionInterface {
    description: string;
}

const DescriptionSection = ({description}:DescriptionInterface) => {
    const[expanded, setExpanded] = useState(false)
    return (
    <View>
        <Text
            className='text-[#242424] text-2xl font-[Sora-SemiBold] ml-1'
        >
            Description
        </Text>
        <View>
            <Text
                className='text-[#A2A2A2] text-lg font-[Sora-Regular] ml-1'
                numberOfLines={expanded ? undefined : 3}
            >
                {expanded? description:  `${description.slice(0, 100)}...`}
            </Text>
            <TouchableOpacity
                onPress={() => setExpanded(!expanded)}
                className='flex-row items-center'
            >
                <Text
                    className='text-app_orange_color text-sm font-[Sora-Regular] ml-1'
                    
                >
                    {expanded ? 'Read less' : 'Read More'}
                </Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default DescriptionSection
