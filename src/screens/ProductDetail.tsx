import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-navigation'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Carousel from './../components/Carousel';
import COLORS from '../consts/Colors';
import RatingComment from '../components/RatingComment';
import Comment from '../components/Comment';
import { useNavigation } from './../utils/useNavigation';
import { Rating } from 'react-native-elements';
import axios from 'axios';
import { cansa } from '../consts/Selector';
import { CommentModel, ProductModel } from '../redux';

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
 class _ProductDetail{
    comments:CommentModel[] = [];
    comment?:CommentModel;
    product?:ProductModel;
    constructor(){}
 }

export default function ProductDetail(props: any) {
    const { navigate } = useNavigation();
    const { navigation, route } = props;
    const { getParam, goBack } = navigation;
    // const [product, setProduct] = useState<ProductModel>();
    let [_productDetail, setProductDetail] = useState<_ProductDetail>(new _ProductDetail());
    const [isLoading, setIsLoading] = useState(false);
    const id = getParam('id');
    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        await axios.get(`${cansa[1]}/api/product/view/${id}/0/e4611a028c71342a5b083d2cbf59c494`).then((response) => {
            const { data } = response.data;
            _productDetail.product = data;
            getComments();
            setIsLoading(true);
        })
    }

    const getComments = async () => {
        await axios.get(`${cansa[1]}/api/comment/all/${id}/e4611a028c71342a5b083d2cbf59c494`).then((response) => {
            const { data } = response.data;
            _productDetail.comments = data;
            setProductDetail(_productDetail);
            setIsLoading(true);
            console.log(_productDetail);
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            {!isLoading ?
                (<View style={styles.container}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>) :
                (<ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <TouchableOpacity>
                            <MaterialIcons style={styles.headerIcon} name="arrow-back" size={30} color="white" onPress={() => navigation.goBack()} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <MaterialIcons onPress={() => navigate('cart')} style={styles.headerIcon} name="shopping-cart" color="white" size={30} />
                        </TouchableOpacity>
                    </View>
                    <View >
                        <Carousel images={_productDetail.product && _productDetail.product.product_image} auto={false} />
                    </View>
                    <View style={styles.detailContainer}>
                        <View style={{ alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
                            <Rating readonly imageSize={28} fractions="{1}" startingValue={_productDetail.product && _productDetail.product.product_rating} />
                            <Text style={{ marginLeft: 20, color: '#444', fontSize: 22 }}>{_productDetail.product && _productDetail.product.product_rating}</Text>
                        </View>
                        <Text style={styles.title}>{_productDetail.product && _productDetail.product.product_title}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                                <Text style={{ marginBottom: 10, color: 'red', fontSize: 26 }}>{_productDetail.product && _productDetail.product.product_price * (100 - _productDetail.product.product_sale) / 100}</Text>
                                <Text style={{ textDecorationLine: 'line-through', color: 'gray', fontSize: 23 }}>{_productDetail.product && _productDetail.product.product_price}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity>
                                    <Text style={styles.btnBuy}>Add Cart</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={styles.btnBuy}>Buy</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={styles.headerTitle}>Mô tả sản phẩm :</Text>
                        <Text style={styles.desc}>
                            {
                                _productDetail.product && _productDetail.product.product_description
                            }
                        </Text>

                        <Text style={styles.headerTitle}>Đánh giá & nhận xét :</Text>

                        <RatingComment />
                        <View>
                            {
                                _productDetail.comments && _productDetail.comments.map((comment:CommentModel) => 
                                <Comment starNumber={comment.comment_rating} user={comment.user} comment_content={comment.comment_content}/>
                                )
                            }
                        </View>
                        
                    </View>
                </ScrollView>
                )}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 35
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2
    },
    headerIcon: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 50,
        padding: 5
    },
    detailContainer: {
        flex: 0.55,
        marginHorizontal: 7,
        borderRadius: 20,
        padding: 5,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 10
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111'
    },
    desc: {
        fontSize: 18,
        lineHeight: 25,
        color: '#111',
        padding: 2
    },
    btnBuy: {
        backgroundColor: '#00FF7F',
        padding: 7,
        width: 150,
        borderRadius: 20,
        marginBottom: 10,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '700',
        color: '#222'
    }
});