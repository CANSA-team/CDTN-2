import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Image, SafeAreaView, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Category from '../components/Category';
import HeaderBar from '../components/HeaderBar';
import { State, getProductsHot, getProductsNew, getProductsCategory, getSlider, ProductState, SliderState, CategoryState, CategoryModel, ProductModel, SliderModel } from '../redux';
import { getCategory } from '../redux/actions/categoryActions';
import Carousel from './../components/Carousel';
import Product from './../components/Product';
import { useNavigation } from './../utils/useNavigation';

const WIDTH = Dimensions.get('window').width;
//Màn hình chính
export default function Home() {
    const [catergoryIndex, setCategoryIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingCategory, setIsLoadingCategory] = useState<boolean>(true);
    const productState: ProductState = useSelector((state: State) => state.productReducer);
    const sliderState: SliderState = useSelector((state: State) => state.sliderReducer);
    const categoryState: CategoryState = useSelector((state: State) => state.categoryReducer);
    const { categories }: { categories: CategoryModel[] } = categoryState;
    const { productHot, productNew, productCategory }: { productHot: ProductModel[], productNew: ProductModel[], productCategory: ProductModel[] } = productState;
    const { slider }: { slider: SliderModel[] } = sliderState;
    const [_slider, _setSlider] = useState<string[]>([]);
    const dispatch = useDispatch();
    const { navigate } = useNavigation();

    useEffect(() => {
        dispatch(getProductsNew());
        dispatch(getProductsHot());
        dispatch(getCategory());
        dispatch(getSlider());
    }, []);

    useEffect(() => {
        if (productHot?.length && productNew?.length && productCategory?.length && slider?.length && isLoadingCategory) {
            let tempArr: any[] = [];
            for (const iterator of slider!) {
                tempArr.push(iterator.slider_image)
            }
            _setSlider(tempArr);
            setIsLoading(true);
            setIsLoadingCategory(true);
        }
        if (!isLoadingCategory) {
            setIsLoadingCategory(true);
        }
    }, [productState, sliderState])

    useEffect(() => {
        if (categories.length && !productCategory?.length) {
            dispatch(getProductsCategory(categories[0].category_id));
        }
    }, [categoryState])

    //Chuyen man hinh
    const onTapDetail = (id: number) => {
        navigate('ProductDetail', { id })
    }

    const searchProduct = (data: any) => {
        navigate('Search', { data: data, title: 'Tìm kiếm' })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginTop: 40 }}>
                <HeaderBar onSearch={searchProduct} />
            </View>
            {
                !isLoading ?
                    (
                        <View style={styles.container}>
                            <Image source={require('../images/loader.gif')} />
                        </View>
                    )
                    :
                    (
                        <ScrollView showsVerticalScrollIndicator={false} >
                            <View style={{ marginBottom: 5, marginTop: 15, borderWidth: 1, borderColor: '#ccc' }}>
                                {_slider?.length && <Carousel images={_slider} auto={true} />}
                            </View>
                            <ScrollView style={{ marginBottom: 10 }} horizontal showsHorizontalScrollIndicator={false}>
                                <View style={{ backgroundColor: '#eee', flexDirection: 'row', alignItems: 'center' }}>
                                    {
                                        categories?.length && categories.map((item, index) =>
                                            <View key={index} style={{ marginLeft: 20, marginTop: 20 }}>
                                                <Category type="home" item={item} index={index} catergoryIndex={catergoryIndex} onTap={() => {
                                                    setIsLoadingCategory(false);
                                                    const id: number = Number(item.category_id);
                                                    dispatch(getProductsCategory(id));
                                                    setCategoryIndex(index);
                                                }} />
                                            </View>
                                        )
                                    }

                                </View>
                            </ScrollView>
                            <View style={styles.productList}>
                                {
                                    !isLoadingCategory ?
                                        (<View style={styles.container}>
                                            <Image source={require('../images/loader.gif')} />
                                        </View>) :
                                        productCategory?.length && productCategory.map((product, index) => <Product onTap={onTapDetail} key={index} product={product} type="NEW" />)

                                }
                            </View>
                            {
                                productNew?.length &&
                                <>
                                    <View style={styles.productContainer}>
                                        <Image style={{ height: 70, width: WIDTH }} source={require('../images/sanpnew.png')} />
                                    </View>
                                    <View style={styles.productList}>
                                        {
                                            productNew.map((product, index) => <Product onTap={onTapDetail} key={index} product={product} type="HOT" />)
                                        }
                                    </View>
                                </>
                            }
                            {
                                productHot?.length &&
                                <>
                                    <View style={styles.productContainer}>
                                        <Image style={{ height: 70, width: WIDTH }} source={require('../images/sanpnoibat.png')} />
                                    </View>
                                    <View style={styles.productList}>
                                        {
                                            productHot.map((product, index) => <Product onTap={onTapDetail} key={index} product={product} type="NEW" />)
                                        }
                                    </View>
                                </>
                            }
                        </ScrollView>
                    )
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