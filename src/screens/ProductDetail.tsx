import React from 'react'
import { SafeAreaView } from 'react-navigation'
import { View,StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default function ProductDetail(props:any) {
    const {navigation,route} = props;
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
            <View style={styles.header}>
                <MaterialIcons name="arrow-back" size={28}/>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    header: {
      paddingHorizontal:20,
      marginTop:20,
      flexDirection:'row',
      justifyContent:'space-between'
    },
});