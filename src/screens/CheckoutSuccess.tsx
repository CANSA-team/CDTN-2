import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '../utils/useNavigation';
import COLORS from './../consts/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function CheckoutSuccess() {
    const { navigate } = useNavigation();
    const onTabHome = () => {    
        navigate('home')
    }
    const onTabCart = () => {    
        navigate('Cart')
    }
    const onTabOrdered = () => {    
        navigate('Ordered')
    }
    return (
        <View style={styles.container}>

            <View style={{position:'absolute',left:10,top:40}}>
                <TouchableOpacity onPress={onTabCart}>
                    <MaterialIcons style={styles.headerIcon} name="arrow-back" size={35} color="white" />
                </TouchableOpacity>
            </View>


            <SimpleLineIcons  name="check" size={130} color={COLORS.primary}/>  

            <Text style={{fontSize:25,marginTop:20}}>Cảm ơn đã mua hàng</Text>
        
            <View style={{flexDirection:'column'}}>         
                <Button
                    onPress={onTabHome}
                    title="TIẾP TỤC MUA HÀNG"
                    buttonStyle={styles.btnReturn}
                />
            
                <Button
                onPress={onTabOrdered}
                    title="XEM ĐƠN HÀNG CỦA BẠN"
                    buttonStyle={styles.btnOrdered}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnReturn:{
        marginTop:20,
        backgroundColor:COLORS.primary,
        borderRadius:10,
        padding:20
    },
    btnOrdered:{
        marginTop:20,
        borderRadius:10,
        padding:20,
    },
    headerIcon:{ 
        backgroundColor:'rgba(0, 0, 0, 0.6)',
        borderRadius:50,
        padding:5
    },
});