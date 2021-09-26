import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SearchBarTop from '../components/SearchBarTop';


export default function Categories() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.searchContainer}>
                <SearchBarTop />
            </View>
            
            <View>
                <Text>Categories Screen</Text>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#E5E5E5',
      paddingHorizontal:20
    },
    searchContainer:{
        marginTop:50
    }
});
  