import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainParamList, Screen } from "../../navigation/types";
import { useProducts } from "../hook/useProducts.facade";
import React, { useCallback, useEffect } from "react";
import { GenericProduct } from "../../atoms/genericProduct/genericProduct.atom";
import { FlatList, View } from "react-native";
import { styles } from "./home.styles";

interface Props {
    navigation: NativeStackNavigationProp<MainParamList, Screen.Home>;
}

const HomeScreen =({navigation}: Props) => {
const {products,setProducts,initialProducts,refreshProducts,loadFavorites,favorites,setFavorites,addFavorite}=
useProducts();

const renderItem = useCallback(
    ({item})=>(
    <GenericProduct
    genericProduct={item}
    onAddFavorite={()=>addFavorite(item)}
    selected={favorites.includes(item.id)}
    onPress={()=>{
        if(!item.id){
        return;
        }
        navigation.navigate(Screen.Detail,{
        id:item.id,
        idsArray:products.map((product)=>product.id),
    })
}}
    />
),[addFavorite, favorites, products,navigation]);

const ItemSeparatorComponent = useCallback(() => <View style={styles.productSeparator}></View>, []);


//** USE EFFECT **//
useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Favorites screen focused');
      refreshProducts();
      loadFavorites();
    });

    return unsubscribe;
  }, [loadFavorites, navigation, refreshProducts]);

return (
    <View style={styles.container}>
    <FlatList
    data={products}
    renderItem={renderItem}
    keyExtractor={(item)=>item.id.toString()}
    ItemSeparatorComponent={ItemSeparatorComponent}
    contentContainerStyle={styles.flatList}
    />
    </View>
);
};

export default HomeScreen;