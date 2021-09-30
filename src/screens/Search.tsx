import React, { useState } from 'react'
import { SafeAreaView, View, StyleSheet } from 'react-native'
import SearchBarTop from '../components/SearchBarTop'
import COLORS from './../consts/Colors';
import SelectDropdown from 'react-native-select-dropdown'
const countries = ["Egypt", "Canada", "Australia", "Ireland"]

export default function Search() {
    let [service, setService] = useState("")
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
            <SearchBarTop />
                <View style={{flexDirection:'row',margin:10}}>
                    <View style={{flex:1,borderRadius:50}}>
                      
                    </View>
                    <View style={{flex:1}}>
                       
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
    },
    searchContainer:{
        marginTop:30
    }
});
  