import { Text, View, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import PageHeader from '@/components/PageHeader';
import DetailsHeader from '@/components/DetailsHeader';
import DescriptionSection from '@/components/Description';
import SizesSection from '@/components/SizesSection';
import { useCart } from '@/components/CartContext';
import Toast from 'react-native-root-toast';

const DetailsPage = () => {
    const { name, image_url, type, description, price, rating } = useLocalSearchParams() as {
        name: string,
        image_url: string,
        type: string,
        description: string,
        price: string,
        rating: string
    };
    const { addToCart } = useCart();

    const buyNow = () => {
        addToCart(name,1),
        Toast.show('Added to Cart', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        })
        router.back();
    }

    return (
        <GestureHandlerRootView
            className='h-full w-full bg-[#F9F9F9]'
        >
            <SafeAreaView
                className="w-full h-full "
            >
                <PageHeader title={"Detail"} showHeaderRight={true} bgcolor="#F9F9F9" />
                <View className='h-full flex-col justify-between pt-5'>
                    <ScrollView>
                        <View className='mx-5'>
                            <DetailsHeader image_url={image_url} name={name} type={type} rating={Number(rating)} />
                            <DescriptionSection description={description} />
                            <SizesSection />
                        </View>
                    </ScrollView>
                    <View
                        className='flex-row items-center bg-white rounded-t-3xl px-6 pt-3 pb-6'
                    >
                        {/* Price Section */}
                        <View
                            className='w-[30%] ml-4'
                        >
                            <Text
                                className='text-[#A2A2A2] text-base font-[Sora-Regular] pb-1'
                            >
                                Price
                            </Text>
                            <Text
                                className='text-app_orange_color text-2xl font-[Sora-SemiBold]'
                            >
                                ${price}
                            </Text>
                        </View>
                        
                        {/* Add to Cart Button */}
                        <TouchableOpacity
                            className='bg-app_orange_color w-[70%] ml-20 rounded-3xl justify-center items-center px-4 py-2'
                            onPress={buyNow}
                        >
                            <Text
                                className='text-white text-2xl font-[Sora-SemiBold]'
                            >
                                Add to Cart
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

export default DetailsPage;
