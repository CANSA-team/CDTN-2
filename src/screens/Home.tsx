import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderBar from '../components/HeaderBar';
import Carousel from './../components/Carousel';
import Product from './../components/Product';

const dummyData =
        [{
                title: 'ƯU ĐÃI MỚI -  GIẢM TỚI 30%', url: 'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg',
                description: "Khi mua hàng theo mùa",
                id: 1

        },
        {
                title: 'Food inside a Bowl', url: 'https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg',
                description: "Khi mua hàng theo mùa",
                id: 2
        },
        {
                title: 'Vegatable Salad', url: 'https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg',
                description: "Khi mua hàng theo mùa",
                id: 3
        },
        {
            title: 'Anise a Aroma Art Bazar', url: 'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg',
            description: "Khi mua hàng theo mùa",
            id: 4

    }]
    const plants = [
        {
          id: 1,
          name: 'Succulent Plant bbj',
          price: '39.99',
          like: true,
          img: 'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg',
          about:
            'Succulent Plantis one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
        },
      
        {
          id: 2,
          name: 'Dragon Plant',
          price: '29.99',
          like: false,
          img: 'https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg',
          about:
            'Dragon Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
        },
        {
          id: 3,
          name: 'Ravenea Plant',
          price: '25.99',
          like: false,
          img: 'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg',
          about:
            'Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
        },
      
        {
          id: 4,
          name: 'Potted Plant',
          price: '25.99',
          like: true,
          img: 'https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg',
          about:
            'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
        },
      ];
      
const HEIGHT = Dimensions.get('window').height*0.3;
const WIDTH = Dimensions.get('window').width ;

export default function Home() {
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView  showsVerticalScrollIndicator={false} >
                {/* Header */}
                <HeaderBar />

                {/* Slider */}
                <Carousel images ={dummyData} />

                {/* San pham moi nhat */}
                <View style={styles.productContainer}>
                     <Text style={styles.productsTitle}>SẢN PHẨM MỚI </Text>
                </View>
                <View style={styles.productList}>
                    {
                        plants.map((item,index)=> <Product key={index} item={item} type="HOT" />)
                    }
                </View>
                
                {/* San pham moi nhat */}
                <View style={styles.productContainer}>
                    <Text style={styles.productsTitle}>SẢN PHẨM ĐƯỢC QUAN TÂM</Text>
                </View>
                <View style={styles.productList}>
                    {
                        plants.map((item,index)=> <Product key={index} item={item} type="NEW"/>)
                    }
                </View>
               
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
       backgroundColor: '#E5E5E5',
       marginTop:10
    },
    productContainer:{
        flex:1,
        marginBottom:20,
        marginTop:10
    },
    productsTitle:{
        textAlign:'center',
        padding:10,
        color:'#fff7f7',
        fontWeight:'bold',
        fontSize:20,
        backgroundColor: '#FF00FF'
    },
    productList:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-around'
    }
});
  