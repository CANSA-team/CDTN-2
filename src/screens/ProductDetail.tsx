import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-navigation'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert, Image, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Carousel from './../components/Carousel';
import COLORS from '../consts/Colors';
import Comment from '../components/Comment';
import { useNavigation } from './../utils/useNavigation';
import { Rating } from 'react-native-elements';
import { CartState,  CommentModel, CommentState, getProduct, ProductModel, ProductState, State } from '../redux';
import { useDispatch, useSelector } from 'react-redux';
import {  getComments } from '../redux/actions/commentActions';
import { addCart, getCart } from '../redux/actions/cartActions';
import { getUserInfo } from '../redux/actions/userActions';
import { vnd } from '../consts/Selector';
export default function ProductDetail(props: any) {
    const { navigate } = useNavigation();
    const { navigation } = props;
    const { getParam } = navigation;
    const id = getParam('id');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingAddCart, setIsLoadingAddCart] = useState(false);
    const productState: ProductState = useSelector((state: State) => state.productReducer);
    const commentState: CommentState = useSelector((state: State) => state.commentReducer);
    const [productCheck, setproductCheck] = useState<any>();
    const cartState: CartState = useSelector((state: State) => state.cartReducer);
    const { product }: { product: ProductModel } = productState;
    const { comment }: { comment: CommentModel[] } = commentState;
    const { status }: { status: string | undefined } = cartState;
    const dispatch = useDispatch();
    const [page, setPage] = useState<number>(1);
    const [isLoadMore, setisLoadMore] = useState(false);

    useEffect(() => {
        dispatch(getProduct(id));
        dispatch(getComments(id));
        dispatch(getUserInfo());
    }, []);

    useEffect(() => {
        setisLoadMore(false)
    }, [commentState])

    useEffect(() => {
        setproductCheck(product)
        if (productCheck) {
            setIsLoading(true);
        }
    }, [product])

    useEffect(() => {
        if (status && isLoadingAddCart) {
            const message = status ? 'Đã thêm vào giỏ hàng' : 'Thêm vào giỏ hàng thất bại';
            Alert.alert(
                "Thông báo",
                message,
                [
                    { text: "OK" },
                ]
            );
            setIsLoadingAddCart(false);
            dispatch(getCart());
        }
    }, [cartState])

   
    useEffect(() => {
        setisLoadMore(true)
        dispatch(getComments(id, page));
    }, [page])

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    return (
        <SafeAreaView style={styles.container}>
            {!isLoading ?
                (<View style={[styles.container,{justifyContent:'center',alignItems:'center'}]}>
                    <Image source={require('../images/loader.gif')} />
                </View>) :
                (<ScrollView
                    showsVerticalScrollIndicator={false}
                    onScroll={({ nativeEvent }) => {
                        if (isCloseToBottom(nativeEvent)) {
                            setPage(page + 1);
                        }
                    }}
                    scrollEventThrottle={400}
                >
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialIcons style={styles.headerIcon} name="arrow-back" size={30} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate('cart')}>
                            <MaterialIcons style={styles.headerIcon} name="shopping-cart" color="white" size={30} />
                        </TouchableOpacity>
                    </View>
                    <View >
                        {product && <Carousel type="product" images={product.product_image} auto={false} />}
                    </View>
                    <View style={styles.detailContainer}>
                        {(product && product.product_rating) ?
                            <View style={{ alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
                                <Rating readonly imageSize={28} fractions="{1}" startingValue={product.product_rating.toFixed(1)} />
                                <Text style={{ marginLeft: 20, color: '#444', fontSize: 22 }}>{product.product_rating.toFixed(1)}</Text>
                            </View>
                            :
                            <Text style={{ color: '#222', fontSize: 16 }}>
                                Chưa đánh giá
                            </Text>
                        }
                        {product && <Text style={styles.title}>{product.product_title}</Text>}
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                                {product && product.product_sale! != 0 && <Text style={{ textDecorationLine: 'line-through', color: 'gray', fontSize: 25 }}>{product.product_price && vnd(product.product_price)}đ</Text>}
                                {product && <Text style={{ marginBottom: 10, color: 'red', fontSize: 29 }}>{(product.product_price) && vnd(product.product_price * (100 - product.product_sale) / 100)}đ</Text>}
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                {
                                    !isLoadingAddCart ?
                                        <TouchableOpacity onPress={() => {
                                            dispatch(addCart(id));
                                            setIsLoadingAddCart(true);
                                        }}>
                                            <Text style={styles.btnBuy}>Thêm</Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity>
                                            <Text style={styles.btnBuy}>Thêm</Text>
                                        </TouchableOpacity>
                                }
                                <TouchableOpacity onPress={() => {
                                    navigate('Shop', { shop_id: product.shop_id });
                                }}>
                                    <Text style={styles.btnBuy}>Shop</Text>
                                </TouchableOpacity>

                            </View>
                        </View>

                        <Text style={styles.headerTitle}>Mô tả sản phẩm :</Text>
                        <Text style={styles.desc}>
                            {
                                product && product.product_description
                            }
                        </Text>

                        <Text style={styles.headerTitle}>Các nhận xét :</Text>

                        <View>
                            {
                                comment && comment.map((comment: any, index: number) =>
                                    <View key={index}>
                                        <Comment starNumber={comment.comment_rating} user={comment.user} comment_content={comment.comment_content} />
                                    </View>
                                )
                            }
                        </View>
                        {
                            isLoadMore &&
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size="large" color="#00ff00" />
                            </View>
                        }
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
        color: '#111'
    }
});