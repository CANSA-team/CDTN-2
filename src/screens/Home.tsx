import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Image, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import Category from '../components/Category';
import HeaderBar from '../components/HeaderBar';
import { cansa } from '../consts/Selector';
import { ProductModel,CategoryModel } from '../redux';
import Carousel from './../components/Carousel';
import Product from './../components/Product';
import { useNavigation } from './../utils/useNavigation';

const WIDTH = Dimensions.get('window').width;

class _Home {
    public id: number = 0;
    public productsNew: ProductModel[] = [];
    public productsHot: ProductModel[] = [];
    public productsCategory: ProductModel[] = [];
    public categories: CategoryModel[] = [];
    public slide: any[] = [];
    constructor() { }
}

interface CategoryIndex {
    index: number;
    id: number;
}

export default function Home() {
    const [catergoryIndex, setCategoryIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingCategory, setIsLoadingCategory] = useState<boolean>(true);
    const { navigate } = useNavigation();
    let [_home, setHome] = useState<_Home>(new _Home());

    useEffect(() => {
        getProductsNew();
    }, []);

    const getProductCategory = async (index: number = 0) => {
        let link = `${cansa[1]}/api/category/page/1/${_home.id}/0/e4611a028c71342a5b083d2cbf59c494`;
        await axios.get(link).then((response) => {
            const { data } = response.data;
            _home.productsCategory = data;
            setHome(_home);
            setCategoryIndex(index);
            setIsLoading(true);
            setIsLoadingCategory(true);
        });
    };

    const getProductsNew = async () => {
        let link = `${cansa[1]}/api/product/page/1/new/0/e4611a028c71342a5b083d2cbf59c494`;
        await axios.get(link).then((response) => {
            const { data } = response.data;
            // setProductsNew(data);
            _home.productsNew = data;
            getProductsHot();
        });
    };

    const getProductsHot = async () => {
        let link = `${cansa[1]}/api/product/page/1/hot/0/e4611a028c71342a5b083d2cbf59c494`;
        await axios.get(link).then((response) => {
            const { data } = response.data;
            _home.productsHot = data;
            getCategory();
        });
    };

    const getCategory = async () => {
        await axios.get(`${cansa[1]}/api/category/all/0/e4611a028c71342a5b083d2cbf59c494`).then((response) => {
            const { data } = response.data;
            _home.categories = data;
            _home.id = Number(data[0].category_id);
            getSliders();
        });
    };

    const getSliders = async () => {
        await axios.get(`${cansa[0]}/api/slider/all/e4611a028c71342a5b083d2cbf59c494`).then((response) => {
            const { data } = response.data;
            let tempArr: any[] = [];
            for (const iterator of data) {
                tempArr.push(iterator.slider_image)
            }
            _home.slide = tempArr;
            getProductCategory();
        });
    };

    //Chuyen man hinh
    const onTapDetail = (id: number) => {
        navigate('ProductDetail', { id })
    }

    const searchProduct = (data: any) => {
        navigate('Search', { data })
    }

    const onTapCategory = (item: any,index: number) => {
            _home.id = item.category_id;
            setHome(_home);
            setIsLoadingCategory(false);
            getProductCategory(index);
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
                                <Carousel images={_home.slide} auto={true} />
                            </View>
                            {/* Category */}
                            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                {

                                    _home.categories.map((item, index) =>
                                        <View key={index} style={{ marginLeft: 20 }}>
                                            <Category item={item} index={index} catergoryIndex={catergoryIndex} onTap={() => {
                                                _home.id = item.category_id;
                                                setHome(_home);
                                                setIsLoadingCategory(false);
                                                getProductCategory(index);
                                            }} />
                                        </View>
                                    )
                                }

                            </View>
                            <View style={styles.productList}>
                                {
                                    isLoadingCategory ?
                                        _home.productsCategory && _home.productsCategory.map((product, index) => <Product onTap={onTapDetail} key={index} product={product} type="HOT" />)
                                        :
                                        (<View style={styles.container}>
                                            <ActivityIndicator size="large" color="#00ff00" />
                                        </View>)
                                }
                            </View>
                            {/* San pham moi nhat */}
                            <View style={styles.productContainer}>
                                <Image style={{ height: 70, width: WIDTH }} source={require('../images/sanpnew.png')} />
                            </View>
                            <View style={styles.productList}>
                                {
                                    _home.productsHot.map((product, index) => <Product onTap={onTapDetail} key={index} product={product} type="HOT" />)
                                }
                            </View>

                            {/* San pham moi nhat */}
                            <View style={styles.productContainer}>
                                <Image style={{ height: 70, width: WIDTH }} source={require('../images/sanpnoibat.png')} />
                            </View>
                            <View style={styles.productList}>
                                {
                                    _home.productsNew.map((product, index) => <Product onTap={onTapDetail} key={index} product={product} type="NEW" />)
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