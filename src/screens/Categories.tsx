import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Category from '../components/Category';
import CategorySub from '../components/CategorySub';
import SearchBarTop from '../components/SearchBarTop';
import { cansa } from '../consts/Selector';
import { CategoryModel } from '../redux';
import { useNavigation } from '../utils/useNavigation';
import COLORS from './../consts/Colors';

const categories1 = [
    { id: 1, name: 'POPULAR', img: 'https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg' },
    { id: 2, name: 'ORGAN', img: 'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg' },
    { id: 3, name: 'INDOORS', img: 'https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg' },
    { id: 4, name: 'SYNTHETIC', img: 'https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg' },
    { id: 5, name: 'POPULAR', img: 'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg' }];

export default function Categories() {
    const [catergoryIndex, setCategoryIndex] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [catergories, setCategories] = useState<CategoryModel[]>([]);
    const { navigate } = useNavigation();
    const searchProduct = (data: any) => {
        navigate('Search', { data })
    }

    useEffect(() => {
        getCategory();
    }, [])

    const getCategory = async () => {
        let link = `${cansa[1]}/api/category/all/0/e4611a028c71342a5b083d2cbf59c494`;
        await axios.get(link).then((response) => {
            const { data } = response.data;
            setCategories(data);
            setIsLoading(true);
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <SearchBarTop onSearch={searchProduct} />
            </View>
            {
                !isLoading ?
                    (<View style={styles.container}>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>) :
                    (
                        <View style={styles.categories}>
                            <View style={styles.categoriesRight}>
                                {
                                    catergories.map((category, index) => (
                                        <View key={index}>
                                            <Category style={{ marginBottom: 10, padding: 2, flex: 1 }} item={category} index={index} catergoryIndex={catergoryIndex} onTap={() => setCategoryIndex(index)} />
                                        </View>
                                    ))
                                }
                            </View>
                            <View style={styles.categoriesLeft}>
                                {
                                    catergories[catergoryIndex].categories.map((category, index) => (
                                        <View key={index} style={{ flex: 1, minWidth: '30%' }}>
                                            <CategorySub style={{ marginBottom: 30, flex: 1, marginLeft: 5, padding: 2 }} item={category} />
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                    )}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    searchContainer: {
        marginTop: 30
    },
    categories: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 20,
        borderTopColor: '#ccc',
        borderTopWidth: 1
    },
    categoriesRight: {
        flex: 1,
        flexDirection: 'column',
        padding: 5,
        justifyContent: 'flex-start',
        backgroundColor: '#e7f0ee',
        borderRightColor: '#ccc',
        borderRightWidth: 1
    },
    categoriesLeft: {
        flex: 3,
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10
    }
});
