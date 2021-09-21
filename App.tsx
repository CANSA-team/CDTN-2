import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList } from 'react-native';
import axios from 'axios';

const temp = {
  "product_id": 1,
  "shop_id": 1,
  "product_avatar": "https://firebasestorage.googleapis.com/v0/b/alien-marking-317003.appspot.com/o/4.png?alt=media&token=8454a0c4-53e4-4652-bb9a-cc7c077653af",
  "product_quantity": null,
  "product_view": 0,
  "product_price": 50000,
  "product_title": "Ốp lưng Iphone 14",
  "product_image":
    ["https://firebasestorage.googleapis.com/v0/b/alien-marking-317003.appspot.com/o/1.png?alt=media&token=cf84f08d-b73e-40b2-9789-409ebb225250",
      "https://firebasestorage.googleapis.com/v0/b/alien-marking-317003.appspot.com/o/2.png?alt=media&token=f664e5d0-4cb2-42a6-b342-c9ae5cdeecbf",
      "https://firebasestorage.googleapis.com/v0/b/alien-marking-317003.appspot.com/o/3.png?alt=media&token=8cb52d4d-fcfb-41a9-bc64-429b65b1ea2a"],
  "product_description": "Cái này là ốp lưng",
  "last_update": 0,
  "status": 1
};

const tmp = {
  "category_id": 1,
  "category_image": "https://firebasestorage.googleapis.com/v0/b/alien-marking-317003.appspot.com/o/1.png?alt=media&token=cf84f08d-b73e-40b2-9789-409ebb225250",
  "category_view": 0,
  "category_name": "Ốp lưng REAL",
  "last_update": 0,
  "status": 1
};

function Categories() {

  const [categories, setCategory] = useState([tmp]);


  useEffect(() => {
    axios.get(`http://192.168.1.4:3001/api/category/all/1/e4611a028c71342a5b083d2cbf59c494`)
      .then(res => {
        const { data } = res.data;
        setCategory(data);
      })
      .catch(error => console.log(error));
  }, []);

  return (

    <ScrollView style={{ marginTop: 200, marginBottom: 200 }}>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <View>
            <Text>category_id: {item.category_id}</Text>
            <Text>category_view: {item.category_view}</Text>
            <Text>category_name: {item.category_name}</Text>
            <Text>last_update: {item.last_update}</Text>
            <Text>status: {item.status}</Text>
            <Image
              source={{
                uri: String(item.category_image),
              }}
              style={{
                height: 200,
                width: 200,
                borderRadius: 10,
              }} />
            <StatusBar style="auto" />
          </View>
        )}
        keyExtractor={item => item.category_id}
      />

    </ScrollView>
  );
}

function Product() {

  const [product, setProduct] = useState(temp);


  useEffect(() => {
    // axios.get(`http://192.168.1.4:3001/api/product/get/2/1/e4611a028c71342a5b083d2cbf59c494`)
    axios.get(`http://192.168.1.4:3001/api/product/view/2/1/e4611a028c71342a5b083d2cbf59c494`)
      .then(res => {
        const { data } = res.data;
        setProduct(data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>product_id: {product.product_id}</Text>
      <Text>shop_id: {product.shop_id}</Text>
      <Text>product_quantity: {product.product_quantity}</Text>
      <Text>product_view: {product.product_view}</Text>
      <Text>product_price: {product.product_price}</Text>
      <Text>product_title: {product.product_title}</Text>
      <Text>product_description: {product.product_description}</Text>
      <Text>last_update: {product.last_update}</Text>
      <Text>status: {product.status}</Text>
      <Image
        source={{
          uri: String(product.product_avatar),
        }}
        style={{
          height: 200,
          width: 200,
          borderRadius: 10,
        }} />
      <FlatList
        data={product.product_image}
        numColumns={2}
        renderItem={({ item }) => (
          <Image
            source={{ uri: String(item) }}
            style={{
              width: 180,
              height: 220,
              borderRadius: 10,
              resizeMode: "contain",
              margin: 6,
            }}
          />
        )}
        keyExtractor={item => item}
      /><StatusBar style="auto" />
    </SafeAreaView>
  );
}

function Products() {
  const [products, setProduct] = useState([temp]);

  useEffect(() => {
    // axios.get(`http://192.168.1.4:3001/api/product/all/1/e4611a028c71342a5b083d2cbf59c494`)
    // axios.get(`http://192.168.1.4:3001/api/product/search/16/1/e4611a028c71342a5b083d2cbf59c494`)
    axios.get(`http://192.168.1.4:3001/api/category/get/1/1/e4611a028c71342a5b083d2cbf59c494`)
      .then(res => {
        const { data } = res.data;
        setProduct(data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <ScrollView style={{ marginTop: 200, marginBottom: 200 }}>
      {
        products.map((product) => {
          return (
            <SafeAreaView key={product.product_id} style={styles.container}>
              <Text>product_id: {product.product_id}</Text>
              <Text>shop_id: {product.shop_id}</Text>
              <Text>product_quantity: {product.product_quantity}</Text>
              <Text>product_view: {product.product_view}</Text>
              <Text>product_price: {product.product_price}</Text>
              <Text>product_title: {product.product_title}</Text>
              <Text>product_description: {product.product_description}</Text>
              <Text>last_update: {product.last_update}</Text>
              <Text>status: {product.status}</Text>
              <Image
                source={{
                  uri: String(product.product_avatar),
                }}
                style={{
                  height: 200,
                  width: 200,
                  borderRadius: 10,
                }} />
              <FlatList
                data={product.product_image}
                numColumns={2}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: String(item) }}
                    style={{
                      width: 180,
                      height: 220,
                      borderRadius: 10,
                      resizeMode: "contain",
                      margin: 6,
                    }}
                  />
                )}
                keyExtractor={item => item}
              />
              <StatusBar style="auto" />
            </SafeAreaView>
          )
        })
      }
    </ScrollView>
  );
}

export default function App() {
  const [img, setImg] = useState('');

  useEffect(() => {
    axios.get(`http://192.168.1.4:3001/api/product/search/16/1/e4611a028c71342a5b083d2cbf59c494`)
      .then(res => {
        const { data } = res.data;
        setImg(data);
      })
      .catch(error => console.log(error));
  }, []);

  console.log("run");

  return (
    <View style={styles.container}>
      {/* <Product /> */}
      {/* <Categories/> */}
      <Products />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});