import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import Category from '../components/Category';
import CategorySub from '../components/CategorySub';
import SearchBarTop from '../components/SearchBarTop';
import { CategoryModel, CategoryState, getCategory, State } from '../redux';
import { useNavigation } from '../utils/useNavigation';
import COLORS from './../consts/Colors';

export default function Categories() {
    const [catergoryIndex, setCategoryIndex] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const categoryState: CategoryState = useSelector((state: State) => state.categoryReducer);
    const { categories }: { categories: CategoryModel[] } = categoryState;
    const dispatch = useDispatch();
    const { navigate } = useNavigation();
    const searchProduct = (data: any) => {
        navigate('Search', { data: data, title: 'Tìm kiếm' })
    }

    useEffect(() => {
        dispatch(getCategory());
    }, [])

    useEffect(() => {
        if (categories) {
            setIsLoading(true);
        }
    }, [categoryState])

    const onTap = (id: number, title: string) => {
        navigate('Search', { data: id, title: title })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{backgroundColor:COLORS.primary,paddingBottom:20}}>
                <View style={styles.searchContainer}>
                    <SearchBarTop onSearch={searchProduct} />
                </View>
            </View>
           
            {
                !isLoading ?
                    (<View style={styles.container}>
                        <Image source={require('../images/loader.gif')} />
                    </View>) :
                    (
                        <View style={styles.categories}>
                            <View style={{flex:1}}>
                                <ScrollView showsVerticalScrollIndicator={false} style={styles.categoriesRight}>
                                    {
                                        categories && categories!.map((category, index) => (
                                            <View key={index}>
                                                <Category style={{ marginBottom: 10, padding: 2, flex: 1 }} type="cat" item={category} index={index} catergoryIndex={catergoryIndex} onTap={() => setCategoryIndex(index)} />
                                            </View>
                                        ))
                                    }
                                </ScrollView>
                            </View>
                            
                            <View style={{flex:3}}>
                                <ScrollView style={{flex:1,backgroundColor:'#fff'}} showsVerticalScrollIndicator={false}>
                                       <View style={styles.categoriesLeft}>
                                        {
                                            categories && categories[catergoryIndex].categories.map((category, index) => (
                                                <View key={index} style={{width: '48%', marginBottom: 20 }}>
                                                    <CategorySub style={{ marginBottom: 30, flex: 1, marginLeft: 5, padding: 2 }} item={category} onTap={onTap} />
                                                </View>
                                            ))
                                        }
                                        </View>
                                </ScrollView>
                            </View>
                        </View>
                    )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer: {
        marginTop: 30
    },
    categories: {
        flexDirection: 'row',
        flex: 1,
        borderTopColor: '#ccc',
        borderTopWidth: 1
    },
    categoriesRight: {
       
        flexDirection: 'column',
        padding: 5,
        backgroundColor: '#e7f0ee',
        borderRightColor: '#ccc',
        borderRightWidth: 1
    },
    categoriesLeft: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        flexWrap: 'wrap',
        justifyContent:'space-between'
    }
});
