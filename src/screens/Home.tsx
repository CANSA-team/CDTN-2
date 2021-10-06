import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Image, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import Category from '../components/Category';
import HeaderBar from '../components/HeaderBar';
import { cansa } from '../consts/Selector';
import { ProductModel } from '../redux';
import Carousel from './../components/Carousel';
import Product from './../components/Product';
import { useNavigation } from './../utils/useNavigation';

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
const categories = [
    { name: 'POPULAR', img: 'https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg' },
    { name: 'ORGANIC', img: 'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg' },
    { name: 'INDOORS', img: 'https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg' },
    { name: 'SYNTHETIC', img: 'https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg' }];
const WIDTH = Dimensions.get('window').width;


export default function Home() {
    const [catergoryIndex, setCategoryIndex] = useState(0);
    const [productList, setProductList] = useState([])
    const [categories, setCategories] = useState([])
    const [slide, setSlide] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { navigate } = useNavigation();

    useEffect(() => {
       getProducts();
    }, []);

    const getProducts =  async () => {
        let link = `${cansa[1]}/api/product/page/1/0/e4611a028c71342a5b083d2cbf59c494`;
        await axios.get(link).then((response) => {
            const { data } = response.data;
            setProductList(data);
            getCategory();
        });
    };

    const getCategory = async () => {
        await axios.get(`${cansa[1]}/api/category/all/0/e4611a028c71342a5b083d2cbf59c494`).then((response) => {
            const { data } = response.data;
            setCategories(data);
            getSliders();
        });
    };

    const getSliders = async () => {
        await axios.get(`${cansa[0]}/api/slider/all/e4611a028c71342a5b083d2cbf59c494`).then((response) => {
            const { data } = response.data;
            setSlide(data);
            setIsLoading(true);
        });
    };

    //Chuyen man hinh
    const onTapDetail = () => {
        navigate('ProductDetail')
    }
    
    const searchProduct = (data: any) => {
        navigate('Search', { data })
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={{ marginTop: 40 }}>
                <HeaderBar onSearch={searchProduct} />
            </View>
            {
                !isLoading ?
                    (<View style={styles.container}>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>) : (
                        <ScrollView showsVerticalScrollIndicator={false} >
                            {/* Slider */}
                            <View style={{ marginTop: 20 }}>
                                <Carousel images={slide} auto={true} />
                            </View>
                            {/* Category */}
                            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                {
                                    categories.map((item, index) =>
                                        <View key={index} style={{ marginLeft: 20 }}>
                                            <Category item={item} index={index} catergoryIndex={catergoryIndex} onTap={() => setCategoryIndex(index)} />
                                        </View>
                                    )
                                }

                            </View>
                            <View style={styles.productList}>
                                {
                                    productList.map((product: ProductModel, index) => <Product onTap={onTapDetail} key={index} product={product} type="NONE" />)
                                }
                            </View>
                            {/* San pham moi nhat */}
                            <View style={styles.productContainer}>
                                <Image style={{ height: 70, width: WIDTH }} source={require('../images/sanpnew.png')} />
                            </View>
                            <View style={styles.productList}>
                                {
                                    productList.map((product, index) => <Product onTap={onTapDetail} key={index} product={product} type="HOT" />)
                                }
                            </View>

                            {/* San pham moi nhat */}
                            <View style={styles.productContainer}>
                                <Image style={{ height: 70, width: WIDTH }} source={require('../images/sanpnoibat.png')} />
                            </View>
                            <View style={styles.productList}>
                                {
                                    productList.map((product, index) => <Product onTap={onTapDetail} key={index} product={product} type="NEW" />)
                                }
                            </View>

                        </ScrollView>)
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
    },
    productContainer: {
        flex: 1,
        marginBottom: 20,
        marginTop: 10
    },
    productsTitle: {
        textAlign: 'center',
        padding: 10,
        color: '#fff7f7',
        fontWeight: 'bold',
        fontSize: 20,
        backgroundColor: '#FF00FF'
    },
    productList: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    }
});