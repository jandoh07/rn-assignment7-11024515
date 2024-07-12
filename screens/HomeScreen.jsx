import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products?limit=16");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const addToCart = (item) => {
    return async () => {
      try {
        const value = await AsyncStorage.getItem("cart");
        let cart = value ? JSON.parse(value) : [];
        cart.push(item);
        await AsyncStorage.setItem("cart", JSON.stringify(cart));
        alert("Item added to cart");
      } catch (error) {
        console.log(error);
      }
    };
  };

  const productPress = (id) => {
    navigation.navigate("ProductDetail", { id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.ourStory}>
          <Text style={styles.ourStoryHeading}>Our Story</Text>
          <View style={styles.ourStoryIcons}>
            <TouchableOpacity>
              <Image source={require("../assets/Listview.png")} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require("../assets/Filter.png")} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.imageCatalogue}>
          {products?.map((item) => (
            <View style={{ width: 150, overflow: "hidden" }} key={item.id}>
              <View style={{ position: "relative" }}>
                <TouchableOpacity onPress={() => productPress(item.id)}>
                  <Image
                    source={{
                      uri: `${item.image}`,
                    }}
                    style={{ width: "100%", height: 200 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={addToCart(item)}>
                  <Image
                    source={require("../assets/add_circle.png")}
                    style={{ position: "absolute", bottom: 10, right: 10 }}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={() => productPress(item.id)}>
                  <Text style={{ fontSize: 18, fontWeight: "400" }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "400",
                      textTransform: "capitalize",
                    }}
                  >
                    {item.category}
                  </Text>
                  <Text
                    style={{ fontSize: 18, fontWeight: "400", color: "orange" }}
                  >
                    ${item.price}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  ourStory: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  ourStoryIcons: {
    flexDirection: "row",
    gap: 10,
  },
  ourStoryHeading: {
    fontSize: 24,
    fontWeight: "500",
  },
  imageCatalogue: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignSelf: "center",
    gap: 10,
  },
});

export default HomeScreen;
