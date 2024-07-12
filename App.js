import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import Header from "./components/Header";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Text, View } from "react-native";
import ProductDetailScreen from "./screens/ProductDetailScreen";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={() => (
          <View>
            <Text
              style={{
                fontSize: 20,
                paddingBottom: 7,
              }}
            >
              ERIC ATSU
            </Text>
            <View
              style={{
                height: 2,
                width: 85,
                backgroundColor: "orange",
                marginLeft: 5,
              }}
            ></View>
          </View>
        )}
      />
      <DrawerItem label="Store" />
      <DrawerItem label="Locations" />
      <DrawerItem label="Blog" />
      <DrawerItem label="Jewelery" />
      <DrawerItem label="Electronic" />
      <DrawerItem label="Clothing" />
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={CustomDrawerContent}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{ header: () => <Header screen={"home"} /> }}
        />
        <Drawer.Screen
          name="Cart"
          component={CartScreen}
          options={{ header: () => <Header screen={"cart"} /> }}
        />
        <Drawer.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ header: () => <Header screen={"home"} /> }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
