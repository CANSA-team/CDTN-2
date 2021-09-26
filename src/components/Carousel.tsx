import React from 'react'
import { Dimensions, View, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import SlideItem from './SlideItem';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width ;

export default function Carousel(props:any) {
    const {images} = props;
    return (    
        <View style={styles.container}>
            <Swiper loop autoplay width={WIDTH} height={HEIGHT / 3.4} 
                dot={<View style={styles.dot}></View>}
                activeDot={<View style={styles.activeDot}></View>}>
                    {
                        images.map((item:object,index:number)=>
                            <SlideItem key={index} item ={item} />
                        ) 
                    }
            </Swiper>  
        </View> 
    )
}
const styles = StyleSheet.create({
    container:{
        marginTop:20,
        flex: 1 
    },
    activeDot:{
        width: 10,
        height: 10,
        borderRadius:50,
        margin: 5,
        backgroundColor: 'white'    
    },
    dot:{
        width: 10,
        height: 10,
        borderRadius:50,
        margin: 5,
        backgroundColor: 'gray' 
    }
});