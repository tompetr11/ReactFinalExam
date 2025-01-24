import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainParamList, Screen } from "../../navigation/types";
import { useCallback, useEffect, useMemo } from "react";
import { GenericProduct } from "../../atoms/genericProduct/genericProduct.atom";
import { useProducts } from "../hook/useProducts.facade";
import { styles } from "./favorites.styles";
import { FlatList, View, Text } from "react-native";

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
      ({ item }) => (
        <View style={styles.card}>
        <GenericProduct
            title={item.title}
            price={item.price}
            image={item.image}
            rating={item.rating.rate} 
            selected={favorites.includes(item.id)}
            onPress={() => {
              if (!item.id) {
                console.log('Invalid item id');
                return;
              }
                navigation.navigate(Screen.Detail, {
                    id: item.id,
                    idsArray: products.map((product) => product.id),
                });
            } }
            onAddFavorite={() => addFavorite(item)} id={0}                />
   </View>
      ),
      [addFavorite, favorites, products, navigation]
    );

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
    <View style={styles.container}>
          {favoritesList.length > 0 ? (
            <FlatList
              data={favoritesList}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={ItemSeparatorComponent}
              contentContainerStyle={styles.flatList}
              numColumns={undefined}
            />
          ) : (
            <Text style={styles.emptyMessage}>No products available</Text>
          )}
        </View>
    );
    };
    export default FavoritesScreen;