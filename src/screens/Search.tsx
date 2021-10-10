import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native'
import SearchBarTop from '../components/SearchBarTop'
import RNPickerSelect from 'react-native-picker-select';
import COLORS from '../consts/Colors';
import Product from '../components/Product';
import { useNavigation } from '../utils/useNavigation';
import HeaderTitle from '../components/HeaderTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsCategory, getProductsSearch, ProductModel, State } from '../redux';
import { ScrollView } from 'react-native-gesture-handler';
const plants = [
    {
        id: 1,
        name: 'Ravenea Plant Raven Plant Ravenea Plant',
        price: '200.000',
        like: true,
        img: 'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg',
        about:
            'Succulent Plantis one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },

    {
        id: 2,
        name: 'Dragon Plant',
        price: '200.000',
        like: false,
        img: 'https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg',
        about:
            'Dragon Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
        id: 3,
        name: 'Ravenea Plant',
        price: '200.000',
        like: false,
        img: 'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg',
        about:
            'Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },

    {
        id: 4,
        name: 'Potted Plant',
        price: '200.000',
        like: true,
        img: 'https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg',
        about:
            'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
];

export default function Search(props: any) {
    const [selectedSort, setSelectedSort] = useState();
    const [selectedPrice, setSelectedPrice] = useState();
    const productState = useSelector((state: State) => state.productReducer);
    const dispatch = useDispatch();
    const { productSearch, productCategory } = productState;
    const { navigation, route } = props;
    const { getParam, goBack } = navigation;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadmore, setIsLoadmore] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [products, setProducts] = useState<[ProductModel]>([new ProductModel()]);
    const [title, setTitle] = useState<string>(getParam('title'));
    const [data, setData] = useState<any>(getParam('data'));
    const { navigate } = useNavigation();
    const onTapDetail = (id: number) => {
        navigate('ProductDetail', { id })
    }

    useEffect(() => {
        switch (title) {
            case 'Tìm kiếm':
                dispatch(getProductsSearch(data));
                break;
            default:
                dispatch(getProductsCategory(data));
                break;
        }
    }, [])



    useEffect(() => {
        switch (title) {
            case 'Tìm kiếm':
                if (productSearch && productSearch!.length > 0) {
                    setProducts(productSearch!);
                    setIsLoading(true);
                }
                break;
            default:
                if (productCategory && productCategory!.length > 0) {
                    setProducts(productCategory!);
                    setIsLoading(true);
                }
                break;
        }
    }, [productState])

    useEffect(() => {
        switch (title) {
            case 'Tìm kiếm':
                dispatch(getProductsSearch(data, page));
                break;
            default:
                dispatch(getProductsCategory(data, page));
                break;
        }
    }, [page])

    const searchProduct = (data: any) => {
        navigate('Search', { data })
    }

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    return (
        !isLoading ?
            (<SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#00ff00" />
            </SafeAreaView>) : (
                <SafeAreaView style={styles.container}>

                    <View style={styles.searchContainer}>
                        <SearchBarTop onSearch={searchProduct} />
                        <HeaderTitle title={title} />
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
                                products && products.map((product, index) => <Product onTap={onTapDetail} key={index} product={product} />)

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
        backgroundColor: COLORS.primary,
    },
    searchContainer: {
        marginTop: 30,

    },
    productList: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
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