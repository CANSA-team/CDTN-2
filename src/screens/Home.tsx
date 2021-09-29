import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Image,SafeAreaView,ScrollView } from 'react-native';
import Category from '../components/Category';
import HeaderBar from '../components/HeaderBar';
import Carousel from './../components/Carousel';
import Product from './../components/Product';
import { useNavigation } from './../utils/useNavigation';
import COLORS from './../consts/Colors';

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
          name: 'Dragon Plant',
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
const categories = [
    {name:'POPULAR',img:'https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg'},
    {name:'ORGANIC',img:'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg'},
    {name:'INDOORS',img:'https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg'},
    {name:'SYNTHETIC',img:'https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg'}];     
const WIDTH = Dimensions.get('window').width;
export default function Home() {
    const [catergoryIndex, setCategoryIndex] = useState(0);
    const { navigate } = useNavigation();

    const onTapDetail = () => {    
        navigate('ProductDetail')
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView  showsVerticalScrollIndicator={false} >
                {/* Header */}
                <View style={{marginTop:40}}>
                     <HeaderBar />
                </View>
                {/* Slider */}
                <View style={{marginTop:20}}>
                    <Carousel images ={dummyData} auto={true}/>
                </View>
                {/* Category */}
                <View style={{flexDirection:'row',marginBottom:20}}>      
                    {
                        categories.map((item,index)=>
                            <View key={index} style={{marginLeft:20}}>
                                <Category item={item} index ={index} catergoryIndex={catergoryIndex} onTap={()=>setCategoryIndex(index)}/>
                            </View>
                        )
                    }
                    
                </View>
                <View style={styles.productList}>
                    {
                        plants.map((item,index)=> <Product onTap={onTapDetail} key={index} item={item} type="NONE" />)
                    }
                </View>
                {/* San pham moi nhat */}
                <View style={styles.productContainer}>
                     <Image style={{height:70,width:WIDTH}} source={require('../images/productnew.png')} />
                </View>
                <View style={styles.productList}>
                    {
                        plants.map((item,index)=> <Product onTap={onTapDetail} key={index} item={item} type="HOT" />)
                    }
                </View>
                
                {/* San pham moi nhat */}
                <View style={styles.productContainer}>
                    <Image style={{height:70,width:WIDTH}} source={require('../images/producthot.png')} />
                </View>
                <View style={styles.productList}>
                    {
                        plants.map((item,index)=> <Product onTap={onTapDetail} key={index} item={item} type="NEW"/>)
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
  