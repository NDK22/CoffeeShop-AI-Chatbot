// import { Image, Text, View } from 'react-native'
// import React from 'react'
// import { Product } from '@/types/types';
// import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
// import OrdersHeader from './OrdersHeader';
// import OrdersFooter from './OrdersFooter';

// interface ProductListProps {
//     products: Product[];
//     quantities: {[key: string]: number};
//     setQuantities: (itemKey:string, delta: number) => void;
//     totalPrice: number;
// }

// const ProductList = ({products,quantities,setQuantities,totalPrice}:ProductListProps) => {
//     const filteredProducts = products.filter((product) => (quantities[product.name] || 0) > 0);
//     const renderedItem = ({item}: {item: Product}) => (
//         <View
//         className='flex-row justify-between items-center mx-7 pb-3'
//         >
//             <Image
//                 source={{uri: item.image_url}}
//                 className='w-16 h-16 rounded-2xl'/>
//             <View
//                 className='flex-1 ml-4'
//             >
//                 <Text
//                     className='text-[#242424] text-lg font-[Sora-SemiBold]'
//                 >
//                     {item.name}
//                 </Text>
//                 <Text
//                     className='text-[#A2A2A2] text-base font-[Sora-Regular]'
//                 >
//                     {item.category}
//                 </Text>
//             </View>
//             <View
//                 className='flex-row items-center mb-6'
//             >
//                 <TouchableOpacity
//                     hitSlop={{ top: 20, bottom: 20, left: 20, right: 10 }}
//                     onPress={() => setQuantities(item.name, -1)}
//                 >
//                     <Text className='text-[#050505] text-xl font-[Sora-SemiBold] '>-</Text>
//                 </TouchableOpacity>
//                 <Text
//                     className='text-[#050505] text-xl font-[Sora-SemiBold] mx-2 '
//                 >
//                     {quantities[item.name] || 0}</Text> 
//                 <TouchableOpacity
//                     hitSlop={{ top: 20, bottom: 20, left: 10, right: 20 }}
//                     onPress={() => setQuantities(item.name, 1)} 
//                 >
//                     <Text className='text-[#050505] text-xl font-[Sora-SemiBold] '>+</Text>
//                 </TouchableOpacity>

//             </View>
//         </View>
//     )
//     return (
//         <View>
//             {filteredProducts.length > 0 ? (
//                 <FlatList 
//                     data={filteredProducts}
//                     renderItem={renderedItem}
//                     keyExtractor={(item) => item.name}
//                     ListHeaderComponent={<OrdersHeader />}
//                     ListFooterComponent={<OrdersFooter totalPrice={parseFloat(totalPrice.toFixed(2)) || 0} />}
//                     />) : 
//                 (<View                >
//                     <Text
//                         className='text-center text-3xl font-[Sora-SemiBold] text-gray-500  mv-4'
//                     >
//                         No items in the cart
//                     </Text>  
//                     <Text
//                         className='text-center text-2xl font-[Sora-SemiBold] text-gray-500  mv-4'
//                     >
//                         Let's get a Delicious Coffee!
//                     </Text>
//                 </View>)}
//         </View>
//     )
// }

// export default ProductList

import { Image, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Product } from '@/types/types';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import OrdersHeader from './OrdersHeader';
import OrdersFooter from './OrdersFooter';

interface ProductListProps {
    products: Product[];
    quantities: { [key: string]: number };
    setQuantities: (itemKey: string, delta: number) => void;
    totalPrice: number;
}

const ProductList = ({ products, quantities, setQuantities, totalPrice }: ProductListProps) => {
    const filteredProducts = products.filter((product) => (quantities[product.name] || 0) > 0);
    const [buttonState, setButtonState] = useState<{ [key: string]: string }>({});

    const handleQuantityChange = (itemName: string, delta: number) => {
        setQuantities(itemName, delta);
        setButtonState((prevState) => ({
            ...prevState,
            [itemName]: delta > 0 ? 'green' : 'red', // Update button color state
        }));

        // Reset the color back to the default after a brief moment
        setTimeout(() => {
            setButtonState((prevState) => ({
                ...prevState,
                [itemName]: '', // Reset color
            }));
        }, 400);
    };

    const renderedItem = ({ item }: { item: Product }) => (
        <View className="flex-row justify-between items-center mx-7 pb-3">
            <Image
                source={{ uri: item.image_url }}
                className="w-16 h-16 rounded-2xl"
            />
            <View className="flex-1 ml-4">
                <Text className="text-[#242424] text-lg font-[Sora-SemiBold]">
                    {item.name}
                </Text>
                <Text className="text-[#A2A2A2] text-base font-[Sora-Regular]">
                    {item.category}
                </Text>
            </View>
            <View className="flex-row items-center mb-6">
                <TouchableOpacity
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 10 }}
                    onPress={() => handleQuantityChange(item.name, -1)}
                >
                    <View
                        style={{
                            backgroundColor: buttonState[item.name] === 'red' ? 'red' : '#C67C4E',
                            borderRadius: 10,
                            padding: 3,
                        }}
                    >
                        <Text className="text-white text-xl font-[Sora-SemiBold]">-</Text>
                    </View>
                </TouchableOpacity>

                <Text className="text-[#050505] text-xl font-[Sora-SemiBold] mx-2">
                    {quantities[item.name] || 0}
                </Text>

                <TouchableOpacity
                    hitSlop={{ top: 20, bottom: 20, left: 10, right: 20 }}
                    onPress={() => handleQuantityChange(item.name, 1)}
                >
                    <View
                        style={{
                            backgroundColor: buttonState[item.name] === 'green' ? 'green' : '#C67C4E',
                            borderRadius: 10,
                            padding: 3,
                        }}
                    >
                        <Text className="text-white text-xl font-[Sora-SemiBold]">+</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View>
            {filteredProducts.length > 0 ? (
                <FlatList
                    data={filteredProducts}
                    renderItem={renderedItem}
                    keyExtractor={(item) => item.name}
                    ListHeaderComponent={<OrdersHeader />}
                    ListFooterComponent={<OrdersFooter totalPrice={parseFloat(totalPrice.toFixed(2)) || 0} />}
                />
            ) : (
                <View>
                    <Text className="text-center text-3xl font-[Sora-SemiBold] text-gray-500 mv-4">
                        No items in the cart
                    </Text>
                    <Text className="text-center text-2xl font-[Sora-SemiBold] text-gray-500 mv-4">
                        Let's get a Delicious Coffee!
                    </Text>
                </View>
            )}
        </View>
    );
};

export default ProductList;
