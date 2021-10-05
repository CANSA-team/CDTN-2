import React, { useState } from 'react'
import { View, Text, StyleSheet,FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Category from '../components/Category';
import CategorySub from '../components/CategorySub';
import SearchBarTop from '../components/SearchBarTop';
import { useNavigation } from '../utils/useNavigation';
import COLORS from './../consts/Colors';

const categories1 = [
    {id:1,name:'POPULAR',img:'https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg'},
    {id:2,name:'ORGAN',img:'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg'},
    {id:3,name:'INDOORS',img:'https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg'},
    {id:4,name:'SYNTHETIC',img:'https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg'},
    {id:5,name:'POPULAR',img:'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg'}];  
     
export default function Categories() {
    const [catergoryIndex, setCategoryIndex] = useState(0);
    const { navigate } = useNavigation();
    const searchProduct = (data:any) =>{
        navigate('Search',{data})
    }

    let loadMore = ({}) => {
        //nối thêm dữ liệu vào
    }
    return (
        <SafeAreaView style={styles.container}>
            
            <View style={styles.searchContainer}>
                <SearchBarTop onSearch={searchProduct}/>
            </View>
            
            <View style={styles.categories}>  
                <SafeAreaView style={styles.categoriesRight}>                
                    <FlatList
                        data={categories1}
                        numColumns={1}
                        renderItem={({item,index})=>  <View key={item.id} style={{marginBottom:10,padding:2}}>
                                                    <Category item={item} index ={index} catergoryIndex={catergoryIndex} onTap={()=>setCategoryIndex(index)}/>
                                                </View>}
                        keyExtractor={(item) => `${item.id}`}
                        onEndReached={loadMore}
                        onEndReachedThreshold={0}
                    />  
                </SafeAreaView>  
                <SafeAreaView style={styles.categoriesLeft}>
                    <FlatList
                        data={categories1}
                        numColumns={3}
                        renderItem={({item,index})=>  <View key={item.id} style={{marginBottom:30,flex:1,marginLeft:5,padding:2}}>
                                                    <CategorySub item={item} />
                                                </View>}
                        keyExtractor={(item) => `${item.id}`}
                        onEndReached={loadMore}
                        onEndReachedThreshold={0}
                    /> 
                </SafeAreaView>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: COLORS.primary,
    },
    searchContainer:{
        marginTop:30
    },
    categories:{
        flexDirection:'row',
        flex:1,
        marginTop:20,
        borderTopColor:'#ccc',
        borderTopWidth:1
    },
    categoriesRight:{
        flex:1,
        padding:5,
        flexDirection:'row',
        justifyContent:'flex-start',
        backgroundColor: '#e7f0ee',
        borderRightColor:'#ccc',
        borderRightWidth:1
    },
    categoriesLeft:{
        flex:3,
        backgroundColor:'white',
        padding:10
    }
});
  