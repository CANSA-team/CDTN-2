import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-navigation'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Carousel from './../components/Carousel';
import COLORS from '../consts/Colors';
import RatingComment from '../components/RatingComment';
import Comment from '../components/Comment';
import { useNavigation } from './../utils/useNavigation';
import { Rating } from 'react-native-elements';
import { CommentModel, getProductsShop, ProductModel, State } from '../redux';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '../redux/actions/commentActions';
import { addCart } from '../redux/actions/cartActions';
import { getShopInfo } from '../redux/actions/shopActions';
import RNPickerSelect from 'react-native-picker-select';
import Product from '../components/Product';

export default function ProductDetail(props: any) {
    const [page, setPage] = useState<number>(1);
    const { navigate } = useNavigation();
    const { navigation, route } = props;
    const { getParam, goBack } = navigation;
    const shop_id = getParam('shop_id');
    const productState = useSelector((state: State) => state.productReducer);
    const shopState = useSelector((state: State) => state.shopReducer);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { info } = shopState;
    const { productShop } = productState;
    const [selectedSort, setSelectedSort] = useState();
    const [selectedPrice, setSelectedPrice] = useState();
    const onTapDetail = (id: number) => {
        navigate('ProductDetail', { id })
    }


    useEffect(() => {
        dispatch(getShopInfo(shop_id));
        dispatch(getProductsShop(shop_id));
    }, [])

    useEffect(() => {
        console.log(productShop!.length);
        if (info && productShop!.length > 0) {
            console.log("set is loading");
            setIsLoading(true);
        }
    }, [shopState, productState])

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };
    return (

        !isLoading ?
            (<View style={styles.container}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>) : (
                <SafeAreaView style={styles.container}>
                    <View style={styles.accountContainer}>
                        <View>
                            {info && <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={{ uri: info.shop_avatar }} />}
                        </View>
                        <View style={styles.actionAccount}>
                            {info && <Text style={styles.nameUser}>{info.shop_name}</Text>}
                            {info && <Text style={{ fontSize: 18, color: 'gray' }}>{info.shop_description}</Text>}
                        </View>
                    </View>
                    <View style={{ flex: 1, marginTop: 30, backgroundColor: '#E5E5E5' }}>
                        <View style={{ flexDirection: 'row', padding: 10, marginBottom: 10 }}>
                            <View style={{ flex: 1, borderRadius: 50, paddingRight: 10 }}>
                                <View style={{ borderWidth: 1, borderColor: '#888' }}>
                                    <RNPickerSelect
                                        placeholder={{ label: "Filter", value: null }}
                                        style={{ ...pickerSelectStyles, placeholder: { color: '#555' } }}
                                        onValueChange={(data) => setSelectedPrice(data)}
                                        items={[
                                            { label: '< 1.000.000đ', value: '1' },
                                            { label: '1.000.000 - 10.000.000đ', value: '2' },
                                            { label: '> 10.000.000đ', value: '3' },
                                        ]}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, paddingLeft: 10 }}>

                                <View style={{ borderWidth: 1, borderColor: '#888' }}>
                                    <RNPickerSelect
                                        placeholder={{ label: "Sort", value: null }}
                                        style={{ ...pickerSelectStyles, placeholder: { color: '#555' } }}
                                        onValueChange={(data) => setSelectedSort(data)}
                                        items={[
                                            { label: 'A - Z', value: '1' },
                                            { label: 'Z - A', value: '2' },
                                        ]}
                                    />
                                </View>
                            </View>
                        </View>
                        <ScrollView
                            style={styles.productList}
                            onScroll={({ nativeEvent }) => {
                                if (isCloseToBottom(nativeEvent)) {
                                    setPage(page + 1);
                                }
                            }}
                            scrollEventThrottle={400}
                        >
                            {
                                productShop && productShop.map((product, index) => <Product onTap={onTapDetail} key={index} product={product} />)

                            }
                        </ScrollView>

                    </View>
                </SafeAreaView>
            )

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 35
    },
    productList: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
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
    },
    accountContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 20,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    actionAccount: {
        marginLeft: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'flex-start'
    },
    nameUser: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    viewAction: {
        padding: 15,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    actionTouch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    actionTitle: {
        fontSize: 20,
        color: '#333'
    },
    viewNav: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 20,
        borderRadius: 30,
        color: 'black',
        padding: 20,

    },
    inputAndroid: {
        fontSize: 20,
        borderRadius: 30,
        color: 'black',
        padding: 20
    },

});