// import { Image, Text, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { Product, ProductCategory } from '@/types/types'
// import { fetchProducts } from '@/services/productService';
// import { FlatList, GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Entypo from '@expo/vector-icons/Entypo';
// import SearchArea from '@/components/SearchArea';
// import Banner from '@/components/Banner';
// import { router } from 'expo-router';
// import { useCart } from '@/components/CartContext';
// import Toast from 'react-native-root-toast';


// const Home = () => {
//   const {addToCart, cartItems} = useCart();
//   const [products,setProducts] = useState<Product[]>([]);
//   const [shownProducts,setShownProducts] = useState<Product[]>([]);
//   const [productCategories,setProductCategories] = useState<ProductCategory[]>([]);
//   const [loading,setLoading] = useState<boolean>(true);
//   const [selectedCategory, setSelectedCategory] = useState<string>('All');

//   useEffect(() => {
//     const uniqueCategories = Array.from(productCategories).map((category) =>({
//       id: category.id,
//       selected: selectedCategory === category.id
//     }));
//     setProductCategories(uniqueCategories);

//     if (selectedCategory === 'All'){
//       setShownProducts(products);
//     } else {
//       const filteredProducts = products.filter((product) => product.category === selectedCategory);
//       setShownProducts(filteredProducts);
//     }

//   },[selectedCategory]);

//   useEffect(() => {
//   },[selectedCategory]);

  
//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const productsData = await fetchProducts();
//         const categories = productsData.map((product) => product.category);
//         categories.unshift('All');
//         const uniqueCategories = Array.from(new Set(categories)).map((category) => ({
//           id: category,
//           selected: selectedCategory === category
//         }));
//         setProducts(productsData);
//         setProductCategories(uniqueCategories);
//         setShownProducts(productsData);
//       } catch (err){
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadProducts ();
//   },[])

//   if (loading) return <Text>Loading...</Text>

//   const addButton = (name: string) => {
//     addToCart(name,1);
//     Toast.show(`${name} added to cart`, {
//       duration: Toast.durations.SHORT,
//       position: Toast.positions.BOTTOM,
//       shadow: true,
//       animation: true,
//       hideOnPress: true,
//       delay:0
//       }
//     )
//   };

//   return (
//     <GestureHandlerRootView>
//       <SafeAreaView
//         className='w-full h-full'
//       > 
//         <FlatList 
//           horizontal={false}
//           numColumns={2}
//           columnWrapperStyle={{justifyContent:'space-between',marginLeft:15,marginRight:15}}
//           keyExtractor={(item,index) => index.toString()}
//           data={shownProducts}
//           renderItem={({item}) => (
//             <View
//               className='w-[48%] mt-2 bg-white rounded-2xl p-2 flex justify-between'
//             >
//               <TouchableOpacity
//                 onPress={() => { 
//                   router.push({pathname: '/details', params: {
//                     name: item.name, 
//                     image_url: item.image_url,
//                     type: item.category, 
//                     price: item.price.toFixed(2),
//                     rating: item.rating,
//                     description: item.description
//                     }}) 
//                   }
//                 }
//               >
//                 <Image 
//                   className='w-full h-32 rounded-2xl'
//                   source={{uri: item.image_url}}
//                 />
//                 <Text
//                   className='text-[#242424] text-lg font-[Sora-SemiBold] ml-1 mt-2'
//                 >
//                   {item.name}
//                 </Text>
//                 <Text
//                   className='text-[#A2A2A2] text-sm font-[Sora-Regular] ml-1 '
//                 >
//                   {item.category}
//                 </Text>
//               </TouchableOpacity>
//               <View
//                 className='flex-row justify-between ml-1 mt-1 mb-2'
//               >
//                 <Text
//                   className='text-[]#050505 text-xl font-[Sora-SemiBold]'
//                 >
//                   ${item.price.toFixed(2)}
//                 </Text>
//                 <TouchableOpacity
                                    
//                   onPress={() => addButton(item.name)}
//                 >
//                   <View
//                     className='mr-2 p-2 -mt-2 bg-app_orange_color rounded-xl'
//                   >
//                   <Entypo name="plus" size={18} color="white" />
//                   </View>

//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}

//           ListHeaderComponent={() => (
//             <View
//               className='flex'
//             >
//               <SearchArea />
//               <Banner />
//               <View
//                 className='flex items-center'
//               >
//                 <FlatList 
//                   className='mt-6 w-[90%] mb-2'
//                   data={productCategories}
//                   horizontal={true}
//                   renderItem={({item}) => (
//                     <TouchableOpacity
//                       onPress={() => setSelectedCategory(item.id)}
//                     >
//                       <Text
//                         className={`text-sm mr-4 font-[Sora-Regular] p-3 rounded-lg
//                           ${item.selected ? 'text-white' : 'text-[#313131]'}
//                           ${item.selected ? 'bg-app_orange_color' : 'bg-[#EDEDED]'}`
//                         }
//                       >
//                         {item.id}
//                       </Text>
//                     </TouchableOpacity>
//                   )
                
//                 }
//                 />
//               </View>
//             </View>

//           )}
//         />
//       </SafeAreaView>
      
//     </GestureHandlerRootView>
//   )
// }

// export default Home


import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Entypo from '@expo/vector-icons/Entypo';
import Toast from 'react-native-root-toast';
import { useCart } from '@/components/CartContext';
import SearchArea from '@/components/SearchArea';
import Banner from '@/components/Banner';
import { router } from 'expo-router';
import { fetchProducts } from '@/services/productService';
import { Product, ProductCategory } from '@/types/types';

const Home = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [shownProducts, setShownProducts] = useState<Product[]>([]);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [pressedItems, setPressedItems] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const uniqueCategories = Array.from(productCategories).map((category) =>({
      id: category.id,
      selected: selectedCategory === category.id
    }));
    setProductCategories(uniqueCategories);

    if (selectedCategory === 'All'){
      setShownProducts(products);
    } else {
      const filteredProducts = products.filter((product) => product.category === selectedCategory);
      setShownProducts(filteredProducts);
    }

  },[selectedCategory]);

  useEffect(() => {
  },[selectedCategory]);
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
        const categories = productsData.map((product) => product.category);
        categories.unshift('All');
        const uniqueCategories = Array.from(new Set(categories)).map((category) => ({
          id: category,
          selected: selectedCategory === category,
        }));
        setProducts(productsData);
        setProductCategories(uniqueCategories);
        setShownProducts(productsData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setShownProducts(products);
    } else {
      const filteredProducts = products.filter(
        (product) => product.category === selectedCategory
      );
      setShownProducts(filteredProducts);
    }
  }, [selectedCategory]);

  if (loading) return <Text>Loading...</Text>;

  const addButton = (name: string) => {
    addToCart(name, 1);
    Toast.show(`${name} added to cart`, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });

    // Temporary visual feedback
    setPressedItems((prev) => ({ ...prev, [name]: true }));
    setTimeout(() => setPressedItems((prev) => ({ ...prev, [name]: false })), 500);
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="w-full h-full">
        <FlatList
          horizontal={false}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginLeft: 15,
            marginRight: 15,
          }}
          keyExtractor={(item, index) => index.toString()}
          data={shownProducts}
          renderItem={({ item }) => (
            <View className="w-[48%] mt-2 bg-white rounded-2xl p-2 flex justify-between">
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: '/details',
                    params: {
                      name: item.name,
                      image_url: item.image_url,
                      type: item.category,
                      price: item.price.toFixed(2),
                      rating: item.rating,
                      description: item.description,
                    },
                  })
                }
              >
                <Image
                  className="w-full h-32 rounded-2xl"
                  source={{ uri: item.image_url }}
                />
                <Text className="text-[#242424] text-lg font-[Sora-SemiBold] ml-1 mt-2">
                  {item.name}
                </Text>
                <Text className="text-[#A2A2A2] text-sm font-[Sora-Regular] ml-1">
                  {item.category}
                </Text>
              </TouchableOpacity>
              <View className="flex-row justify-between ml-1 mt-1 mb-2">
                <Text className="text-[#050505] text-xl font-[Sora-SemiBold]">
                  ${item.price.toFixed(2)}
                </Text>
                <TouchableOpacity onPress={() => addButton(item.name)}>
                  <View
                    className={`mr-2 p-2 -mt-2 rounded-xl ${
                      pressedItems[item.name]
                        ? 'bg-green-500'
                        : 'bg-app_orange_color'
                    }`}
                  >
                    {pressedItems[item.name] ? (
                      <Entypo name="plus" size={18} color="white" />
                    ) : (
                      <Entypo name="plus" size={18} color="white" />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListHeaderComponent={() => (
            <View className="flex">
              <SearchArea />
              <Banner />
              <View className="flex items-center">
                <FlatList
                  className="mt-6 w-[90%] mb-2"
                  data={productCategories}
                  horizontal={true}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setSelectedCategory(item.id)}>
                      <Text
                        className={`text-sm mr-4 font-[Sora-Regular] p-3 rounded-lg
                        ${item.selected ? 'text-white' : 'text-[#313131]'}
                        ${item.selected ? 'bg-app_orange_color' : 'bg-[#EDEDED]'}`
                        }
                      >
                        {item.id}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;
