import React from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../consts/Colors';
export default function Comment() {
    const maxRating = [1,2,3,4,5];
    const starNumber = 3;

    return (
        <View style={styles.container}>
            
            <View style={styles.commentContainer}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image style={styles.imgUser} source={{uri:'https://photo-cms-sggp.zadn.vn/w580/Uploaded/2021/evofzyresfj/2021_08_17/cristianoronaldotinhchuyenroijuventustrongnhungngaytoi_mktg.jpg'}} />
                    <Text style={styles.nameUser}>Cristiano Ronaldo</Text>
                </View>
            </View>
            <View style={{display:'flex',flexDirection:'row'}}>    
                {
                    maxRating.map((item,index)=>
                        <View key={index}>
                            <FontAwesome name={ item<=starNumber ? "star" : "star-o"} size={28} color="gold"/>      
                        </View>
                    )
                }
            </View>
            <Text style={{fontSize:17}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam quaerat sunt corrupti tempore quia, quibusdam enim mollitia dignissimos rerum harum exercitationem accusamus ratione et sapiente molestias veritatis ab! Commodi, placeat?</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        padding:10,
        backgroundColor:'#f0e8e8',
        marginTop:20,
        marginBottom:5,
        borderRadius:10
    },
    commentContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:10,
        marginBottom:5
    },
    imgUser:{
        height:50,
        width:50,
        borderRadius:50,
        borderWidth:2,
        borderColor:COLORS.primary,
        resizeMode:'cover'
    },
    nameUser:{
        marginLeft:10,
        fontSize:20,
        fontWeight:'bold'
    }
});