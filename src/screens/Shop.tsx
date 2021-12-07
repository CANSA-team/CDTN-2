import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-navigation'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import COLORS from '../consts/Colors';
import { useNavigation } from './../utils/useNavigation';
import { getProductsShop, ProductModel, ProductState, ShopModel, ShopState, State } from '../redux';
import { useDispatch, useSelector } from 'react-redux';
import { getShopInfo } from '../redux/actions/shopActions';
import RNPickerSelect from 'react-native-picker-select';
import Product from '../components/Product';
import { SlugStr } from '../consts/Selector';

export default function ProductDetail(props: any) {
    const [page, setPage] = useState<number>(1);
    const { navigate } = useNavigation();
    const { navigation } = props;
    const { getParam } = navigation;
    const shop_id = getParam('shop_id');
    const productState: ProductState = useSelector((state: State) => state.productReducer);
    const shopState: ShopState = useSelector((state: State) => state.shopReducer);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { info }: { info: ShopModel } = shopState;
    const { productShop }: { productShop: ProductModel[] } = productState;
    const [_productShop, setProductShop] = useState<any>();

    const onTapDetail = (id: number) => {
        navigate('ProductDetail', { id })
    }
    useEffect(() => {
        dispatch(getShopInfo(shop_id));
        dispatch(getProductsShop(shop_id));
    }, [])

    useEffect(() => {
        if (productShop) {
            setProductShop(productShop);
        }
        if (_productShop) {
            setIsLoading(true);
        }
    }, [productState])

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    useEffect(() => {
        dispatch(getProductsShop(shop_id, page));
    }, [page])


    const filterPrice = (data: number) => {
        if (_productShop) {
            let arr: any = [];
            switch (data) {
                case 1:
                    arr = productShop && productShop.filter((product: ProductModel) => product.product_price! * (100 - product.product_sale!) / 100 <= 999999)
                    setProductShop(arr);
                    break;
                case 2:
                    arr = productShop && productShop.filter((product: ProductModel) => product.product_price! * (100 - product.product_sale!) / 100 >= 1000000 && product.product_price! * (100 - product.product_sale!) / 100 <= 9999999)
                    setProductShop(arr);
                    break;
                case 3:
                    arr = productShop && productShop.filter((product: ProductModel) => product.product_price! * (100 - product.product_sale!) / 100 >= 10000000)
                    setProductShop(arr);
                    break;
                default:
                    arr = []
                    setProductShop(productShop);
                    break;
            }
        }
    }

    const sortName = (data: number) => {
        if (_productShop) {
            let arr: any = [];
            switch (data) {
                case 1:
                    arr = [..._productShop];
                    arr.sort((a: ProductModel, b: ProductModel) => a.product_title!.toUpperCase() !== b.product_title!.toUpperCase() ? a.product_title!.toUpperCase() > b.product_title!.toUpperCase() ? -1 : 1 : 0);
                    setProductShop(arr);
                    break;
                case 2:
                    arr = [..._productShop];
                    arr.sort((a: ProductModel, b: ProductModel) => a.product_title!.toUpperCase() !== b.product_title!.toUpperCase() ? a.product_title!.toUpperCase() < b.product_title!.toUpperCase() ? -1 : 1 : 0);
                    setProductShop(arr);
                    break;
                default:
                    productShop ? arr = [...productShop] : arr = [];
                    setProductShop(arr);
                    break;
            }
        }
    }

    return (

        !isLoading ?
            (<View style={styles.container}>
                <Image source={require('../images/loader.gif')} />
            </View>) : (
                <SafeAreaView style={styles.container}>
                    <View style={styles.accountContainer}>
                        <View>
                            {info && <Image style={{
                                width: 100, height: 100, borderRadius: 50, borderWidth: 2,
                                borderColor: "#444",
                            }} source={{ uri: info.shop_avatar }} />}
                        </View>
                        <View style={styles.actionAccount}>
                            {info && <Text style={styles.nameUser}>{info.shop_name}</Text>}
                            {info?.shop_description && <Text style={{ fontSize: 18, color: '#333' }}>{SlugStr(info.shop_description,24)}</Text>}
                            <TouchableOpacity style={{ marginTop: 10, marginBottom: 10 }} onPress={() => { navigate('Chat', { id_user: 'shop_' + shop_id }) }}>
                                <Text style={{ fontSize: 18, color: '#FFF' }}>Nhắn Tin</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1, marginTop: 30, backgroundColor: '#E5E5E5' }}>
                        <View style={{ flexDirection: 'row', padding: 10, marginBottom: 10 }}>
                            <View style={{ flex: 1, borderRadius: 50, paddingRight: 10 }}>
                                <View style={{ borderWidth: 1, borderColor: '#888' }}>
                                    <RNPickerSelect
                                        placeholder={{ label: "Filter", value: 0 }}
                                        style={{ ...pickerSelectStyles, placeholder: { color: '#555' } }}
                                        onValueChange={(data) => filterPrice(data)}
                                        items={[
                                            { label: '< 1.000.000đ', value: 1 },
                                            { label: '1.000.000 - 10.000.000đ', value: 2 },
                                            { label: '> 10.000.000đ', value: 3 },
                                        ]}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, paddingLeft: 10 }}>

                                <View style={{ borderWidth: 1, borderColor: '#888' }}>
                                    <RNPickerSelect
                                        placeholder={{ label: "Sort", value: 0 }}
                                        style={{ ...pickerSelectStyles, placeholder: { color: '#555' } }}
                                        onValueChange={(data) => sortName(data)}
                                        items={[
                                            { label: 'A - Z', value: 1 },
                                            { label: 'Z - A', value: 2 },
                                        ]}
                                    />
                                </View>
                            </View>
                        </View>
                        <ScrollView

                            onScroll={({ nativeEvent }) => {
                                if (isCloseToBottom(nativeEvent)) {
                                    setPage(page + 1);
                                }
                            }}
                            scrollEventThrottle={400}
                        >
                            <View style={styles.productList}>
                                {
                                    _productShop && _productShop.map((product: any, index: number) => <Product onTap={onTapDetail} key={index} product={product} />)

                                }
                            </View>
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
        justifyContent: 'space-around',
        flexWrap: 'wrap'
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
        backgroundColor: '#E63538',
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
        fontWeight: 'bold',
        color: '#fff'
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