import { Image, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';

interface DetailsHeaderInterface {
    image_url: string;
    name: string;
    type: string;
    rating: number;
}

const DetailsHeader = ({image_url,name,type,rating}:DetailsHeaderInterface) => {
    return (
      <>
          <Image 
              source = {{ uri: image_url}}
              className='w-full  h-48 rounded-2xl mt-2'
              />
  
          <View>
              <Text
                  className="text-[#242424] text-3xl font-[Sora-SemiBold] ml-1 mt-5"
                  >{name}
              </Text>
  
              <View
                  className='flex-row w-full justify-between'
              >
                  <Text
                  className="text-[#A2A2A2] text-base font-[Sora-Regular] ml-1 mt-1 mb-5"
                  >{type}
                  </Text>
  
                  <View className='flex-row mt-2'>
                      <View
                          className='bg-[#F5F5F5] p-2 rounded-xl mr-2'
                      >
                          <MaterialIcons 
                          name="delivery-dining" size={24} color="#C67C4E"/>
                      </View>
  
                      <View
                          className='bg-[#F5F5F5] p-2 rounded-xl mr-2'
                      >
                          <FontAwesome 
                          name="coffee" size={24} color="#C67C4E"/>
                      </View>
  
                      <View
                          className='bg-[#F5F5F5] p-2 rounded-xl mr-2'
                      >
                          <MaterialCommunityIcons 
                          name="food-croissant"  size={24} color="#C67C4E"/>
                      </View>
                  </View>
  
              </View>
          
              <View
                  className='flex-row pl-2'
                  >
                  <Octicons name="star-fill" size={24} color="#FBBE21" />
                  <Text 
                  className='pl-2 text-xl font-[Sora-SemiBold] text-[#2A2A2A]'
                  >
                  {rating}
                  </Text>
              </View>
  
              <View className='w-full items-center mt-2'>
                  <View className="w-[90%] border-b border-[#E3E3E3] my-4 " />
              </View>
          </View>
      </>
    )
  }
  
  export default DetailsHeader
