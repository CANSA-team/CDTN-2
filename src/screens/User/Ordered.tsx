import React from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import HeaderTitle from '../../components/HeaderTitle';
import ProductOrdered from '../../components/ProductOrdered';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Ordered(props:any) {
    const {navigation,route} = props;
    return (
        <View style={styles.container}>
            <HeaderTitle title="ORDERED" />
            <View style={styles.header}>
                <TouchableOpacity>
                    <MaterialIcons name="arrow-back" size={35} color="white" onPress={()=>navigation.goBack()}/>
                </TouchableOpacity>       
            </View>
            <ScrollView style={{flex:1,marginTop:5}} showsVerticalScrollIndicator={false}>
                <ProductOrdered /> 
                <ProductOrdered /> 
                <ProductOrdered /> 
            </ScrollView>
            
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',      
    },
    header: {
        flexDirection:'row',
        justifyContent:'space-between',
        padding: 5,
        position: 'absolute',
        top: 33,
        left: 5,
        right: 0,
        zIndex:2
    },
    
});