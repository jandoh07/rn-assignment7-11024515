import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

const ProductDetailScreen = ({ route }) => {
  const { id } = route.params;
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        console.log(data);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [id]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 10 }}>
          <Image
            source={{ uri: `${product.image}` }}
            style={{ height: 350, width: "100%" }}
            resizeMode="contain"
          />
        </View>
        <View style={{ padding: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Text style={{ fontSize: 20, width: "90%" }}>{product.title}</Text>
            <EvilIcons
              name="share-apple"
              size={27}
              color="black"
              style={{ padding: 5 }}
            />
          </View>
          <Text
            style={{
              color: "gray",
              textTransform: "capitalize",
              marginBottom: 5,
            }}
          >
            {product.category}
          </Text>
          <Text style={{ color: "orange", fontSize: 20, marginBottom: 10 }}>
            ${product.price}
          </Text>
          <Text style={{ color: "gray" }}>{product.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.addToBasket}>
        <AntDesign name="plus" size={24} color="white" />
        <Text style={{ color: "white" }}>Add To Basket</Text>
        <AntDesign name="hearto" size={24} color="white" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingBottom: 55,
    position: "relative",
  },
  addToBasket: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
    paddingBottom: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
export default ProductDetailScreen;
