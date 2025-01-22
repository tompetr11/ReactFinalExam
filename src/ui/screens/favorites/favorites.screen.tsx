import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainParamList, Screen } from "../../navigation/types";
import { useCallback, useEffect, useMemo } from "react";
import { GenericProduct } from "../../atoms/genericProduct/genericProduct.atom";
import { useProducts } from "../hook/useProducts.facade";
import { styles } from "./favorites.styles";
import { FlatList, View } from "react-native";

interface Props{
    navigation:NativeStackNavigationProp<MainParamList,Screen.Favorites>;
}

const FavoritesScreen =({navigation}: Props) => {
const {products,favorites,refreshProducts,loadFavorites,addFavorite}= 
useProducts();

const favoritesList = useMemo(
    () => products.filter((genericProduct) => favorites.includes(genericProduct.id)),
    [products, favorites]
  );
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

  const ItemSeparatorComponent = useCallback(() => <View style={styles.productSeparator} />, []);
  // ** USE EFFECT ** //
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Favorites screen focused');
      refreshProducts();
      loadFavorites();
    });

    return unsubscribe;
  }, [loadFavorites, navigation, refreshProducts]);
  return (
     <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item)=>item.id.toString()}
        ItemSeparatorComponent={ItemSeparatorComponent}
      contentContainerStyle={styles.flatList}
        />
    );
    };
    export default FavoritesScreen;