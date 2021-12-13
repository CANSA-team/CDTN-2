import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import SearchBarTop from '../components/SearchBarTop'
import RNPickerSelect from 'react-native-picker-select';
import COLORS from '../consts/Colors';
import Product from '../components/Product';
import { useNavigation } from '../utils/useNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsCategory, getProductsSearch, ProductModel, ProductState, State } from '../redux';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Search(props: any) {
    const productState: ProductState = useSelector((state: State) => state.productReducer);
    const dispatch = useDispatch();
    const { productSearch, productCategory }: { productSearch: ProductModel[], productCategory: ProductModel[] } = productState;
    const { navigation } = props;
    const { getParam } = navigation;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadFill, setisLoadFill] = useState(false)
    const [page, setPage] = useState<number>(1);
    const [products, setProducts] = useState<ProductModel[]>([] as ProductModel[]);
    const [productCheck, setproductCheck] = useState<any>()
    const [title, setTitle] = useState(getParam('title'));
    const [data, setData] = useState(getParam('data'));
    const [sort, setSort] = useState<string>('');
    const [begin, setBegin] = useState<string>('');
    const [end, setEnd] = useState<string>('');
    const [isLoadMore, setisLoadMore] = useState(false)
    const { navigate } = useNavigation();

    const onTapDetail = (id: number) => {
        navigate('ProductDetail', { id })
    }

    const filterPrice = (key: number) => {
        setisLoadFill(true);
        console.log(data, sort, '0', '1000000', page, title)
        switch (key) {
            case 1:
                if (title === 'Tìm kiếm') {
                    dispatch(getProductsSearch(data, sort, '0', '1000000', page))
                    setBegin('0');
                    setEnd('1000000')
                }
                else {
                    dispatch(getProductsCategory(data, sort, '0', '1000000', page))
                    setBegin('0');
                    setEnd('1000000')
                }
                break;
            case 2:
                if (title === 'Tìm kiếm') {
                    dispatch(getProductsSearch(data, sort, '1000000', '10000000', page))
                    setBegin('1000000');
                    setEnd('10000000')
                }
                else {
                    dispatch(getProductsCategory(data, sort, '1000000', '10000000', page))
                    setBegin('1000000');
                    setEnd('10000000')
                }
                break;
            case 3:
                if (title === 'Tìm kiếm') {
                    dispatch(getProductsSearch(data, sort, '10000000', '100000000', page))
                    setBegin('10000000');
                    setEnd('100000000')
                }
                else {
                    dispatch(getProductsCategory(data, sort, '10000000', '100000000', page))
                    setBegin('10000000');
                    setEnd('100000000')
                }
                break;
            default:
                if (title === 'Tìm kiếm') {
                    dispatch(getProductsSearch(data, sort, '', '', page))
                    setBegin('');
                    setEnd('')
                }
                else {
                    dispatch(getProductsCategory(data, sort, '', '', page))
                    setBegin('');
                    setEnd('')
                }
                break;
        }

    }

    const sortName = (key: number) => {
        setisLoadFill(true);
        switch (key) {
            case 1:
                if (title === 'Tìm kiếm') {
                    dispatch(getProductsSearch(data, 'asc', begin, end, page))
                    setSort('asc');
                }
                else {
                    dispatch(getProductsCategory(data, 'asc', begin, end, page))
                    setSort('asc');
                }
                break;
            case 2:
                if (title === 'Tìm kiếm') {
                    dispatch(getProductsSearch(data, 'desc', begin, end, page))
                    setSort('desc');
                }
                else {
                    dispatch(getProductsCategory(data, 'desc', begin, end, page))
                    setSort('desc');
                }
                break;
            default:
                if (title === 'Tìm kiếm') {
                    dispatch(getProductsSearch(data, '', begin, end, page))
                    setSort('');
                }
                else {
                    dispatch(getProductsCategory(data, '', begin, end, page))
                    setSort('');
                }
                break;

        }
    }

    function CheckSearchOrCat(title: string) {
        switch (title) {
            case 'Tìm kiếm':
                dispatch(getProductsSearch(data, sort, begin, end, page));
                break;
            default:
                dispatch(getProductsCategory(data, sort, begin, end, page));
                break;
        }

    }

    useEffect(() => {
        setisLoadFill(false);
    }, [products])

    useEffect(() => {
        CheckSearchOrCat(title)
    }, [])

    useEffect(() => {
        CheckSearchOrCat(title)
    }, [title])

    useEffect(() => {
        setisLoadMore(false)
        switch (title) {
            case 'Tìm kiếm':
                if (productSearch) {
                    setProducts(productSearch!);
                    setproductCheck(productSearch)
                }
                else {
                    setProducts([]);
                    setproductCheck([])
                }
                break;
            default:
                if (productCategory) {
                    setProducts(productCategory!);
                    setproductCheck(productSearch)
                }
                else {
                    setProducts([]);
                    setproductCheck([])
                }
                break;
        }
        if (productCheck) {
            setIsLoading(true);
        }
    }, [productState])



    useEffect(() => {
        CheckSearchOrCat(title);
    }, [page])

    const searchProduct = (str: any) => {
        setData(str);
        setTitle('Tìm kiếm');
        setIsLoading(false);
        dispatch(getProductsSearch(str));
    }


    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    return (
        !isLoading ?
            (<SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Image source={require('../images/loader.gif')} />
            </SafeAreaView>) : (
                <SafeAreaView style={styles.container}>
                    <View style={{ backgroundColor: COLORS.primary }}>
                        <View style={[styles.searchContainer, { paddingBottom: 30 }]}>
                            <SearchBarTop onSearch={searchProduct} />
                        </View>
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
                        <View style={{ paddingVertical: 10, backgroundColor: '#ffffff', marginBottom: 15 }}>
                            <Text style={{ textAlign: 'center', fontSize: 18, color: '#222' }}>{title}</Text>
                            <View style={styles.header}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <MaterialIcons style={styles.headerIcon} name="arrow-back" size={25} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
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
                                    setisLoadMore(true);
                                }
                            }}
                            scrollEventThrottle={400}
                        >
                            <View style={styles.productList}>


                                {
                                    isLoadFill ?
                                        <Image source={require('../images/loader.gif')} />
                                        :
                                        products?.length ? products.map((product: ProductModel, index: number) => <Product onTap={onTapDetail} key={index} product={product} />)
                                            :
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 20, color: '#222' }}>Không có sản phẩm</Text>
                                            </View>
                                }
                            </View>
                            {
                                isLoadMore &&
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator size="large" color="#00ff00" />
                                </View>
                            }
                        </ScrollView>
                    </View>
                </SafeAreaView>
            )
    )
}

const styles = StyleSheet.create({
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
    container: {
        flex: 1,
    },
    searchContainer: {
        marginTop: 30,

    },
    productList: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
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