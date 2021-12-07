import React from 'react'
import { Dimensions, View, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import SlideItem from './SlideItem';
import SlideProduct from './SlideProduct';

const WIDTH = Dimensions.get('window').width ;
const HEIGHT = Dimensions.get('window').height;

export default function Carousel(props:any) {
    const {images,auto, type} = props;
    if (type === 'product') {
        return (    
            <View style={styles.container}>
                <Swiper 
                    loop
                    autoplay = {auto}
                    width={WIDTH} 
                    height={HEIGHT / 2.6} 
                    dot={<View style={styles.dot}></View>}
                    activeDot={<View style={styles.activeDot}></View>}>
                        {
                            images && images.map((item:object,index:number)=><SlideProduct key={index} item ={item} />) 
                        }
                </Swiper>  
            </View> 
        )
    }else{
        return (    
            <View style={styles.container}>
                <Swiper 
                    loop
                    autoplay = {auto}
                    width={WIDTH} 
                    height={150} 
                    dot={<View></View>}
                    activeDot={<View></View>}>
                        {
                            images && images.map((item:object,index:number)=><SlideItem key={index} item ={item} />) 
                        }
                </Swiper>  
            </View> 
        )
    }
    
}
const styles = StyleSheet.create({
    container:{
        flex: 1 
    },
    activeDot:{
        width: 10,
        height: 10,
        borderRadius:50,
        marginHorizontal: 5,
        backgroundColor: 'white'    
    },
    dot:{
        width: 10,
        height: 10,
        borderRadius:50,
        marginHorizontal: 5,
        backgroundColor: 'gray' 
    }
});