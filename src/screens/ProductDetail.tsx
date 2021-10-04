import React from 'react'
import { SafeAreaView } from 'react-navigation'
import { View, StyleSheet, Text, TouchableOpacity,ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Carousel from './../components/Carousel';
import COLORS from '../consts/Colors';
import RatingComment from '../components/RatingComment';
import Comment from '../components/Comment';
import { useNavigation } from './../utils/useNavigation';
import { Rating } from 'react-native-elements';
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
export default function ProductDetail(props:any) {
    const { navigate } = useNavigation();
   
    const {navigation,route} = props;
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity>
                        <MaterialIcons style={styles.headerIcon} name="arrow-back" size={30} color="white" onPress={()=>navigation.goBack()}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcons onPress={()=>navigate('cart')} style={styles.headerIcon} name="shopping-cart" color="white" size={30}/>
                    </TouchableOpacity>
                </View>
                <View >
                    <Carousel images ={dummyData} auto={false}/>
                </View>
                <View style={styles.detailContainer}>
                    <View style={{alignItems:'center',flexDirection:'row',marginBottom:10}}>
                        <Rating readonly imageSize={28} fractions="{1}" startingValue="{3.3}" />
                        <Text style={{marginLeft:20,color:'#444',fontSize:22}}>3.3</Text>
                    </View>
                    <Text style={styles.title}>Potted Plant Potted Plant Potted Plant</Text>
                    <View style={{display:'flex',flexDirection:'row'}}>
                        <View style={{ flex:1,flexDirection:'column',alignItems:'flex-start'}}>
                            <Text style={{marginBottom:10,color:'red',fontSize:26}}>200.000đ</Text>
                            <Text style={{textDecorationLine: 'line-through',color:'gray',fontSize:23}}>400.000đ</Text>
                        </View>
                        <View style={{ flex:1,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor voluptate unde laboriosam, voluptatem nesciunt rem perferendis, a temporibus cum nisi officia magni. Fugiat veniam repellendus molestiae eveniet nisi voluptates ducimus!
                    </Text>

                    <Text style={styles.headerTitle}>Đánh giá & nhận xét :</Text>

                    <RatingComment />

                    <Comment />
                    <Comment />
                </View>
            </ScrollView>
            
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        marginTop:35
    },
    header: {
      flexDirection:'row',
      justifyContent:'space-between',
      padding: 5,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex:2
    },
    headerIcon:{
        backgroundColor:'rgba(0, 0, 0, 0.6)',
        borderRadius:50,
        padding:5
    },
    detailContainer:{
        flex: 0.55,
        marginHorizontal:7,
        borderRadius:20,
        padding: 5,
        backgroundColor:'white'
    },
    title:{
        fontSize:30,
        fontWeight:'bold',
        color:COLORS.primary,
        marginBottom:10
    },
    headerTitle:{
        fontSize:22,
        fontWeight:'bold',
        color:'#111'
    },
    desc:{
        fontSize:18,
        lineHeight:25,
        color:'#111',
        padding:2
    },
    btnBuy:{
        backgroundColor:'#00FF7F',
        padding:7,
        width:150,
        borderRadius:20,
        marginBottom:10,
        fontSize:18,
        textAlign:'center',
        fontWeight:'700',
        color:'#222'
    }
});