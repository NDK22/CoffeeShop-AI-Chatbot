import { Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const SizesSection = () => {
    const [selectedSize, setSelectedSize] = useState<string>('M')
    const sizes = ['S', 'M', 'L']
    return (
        <View>
            <Text
                className='text-[#242424] text-xl font-[Sora-SemiBold] ml-1 mt-4'
            >
                Size
            </Text>
            <View
                className='flex-row justify-center items-center space-x-4 mt-3 mb-3'
            >
            {sizes.map((size, index) => (
                <TouchableOpacity
                    key={`${size}-${index}`} // Combining `size` and `index` to ensure uniqueness
                    onPress={() => setSelectedSize(size)}
                    className={`px-4 py-2 mr-2 rounded-2xl w-[30%]
                        ${selectedSize === size ? 'bg-app_orange_color' : 'bg-[#F5F5F5]'}
                    `}
                >
                    <Text
                        className={`text-[#242424] text-lg font-[Sora-Regular] text-center
                            ${selectedSize === size ? 'text-white' : 'text-black'}
                        `}
                    >
                        {size}
                    </Text>
                </TouchableOpacity>
            ))}
            </View>
        </View>
    )
}

export default SizesSection
