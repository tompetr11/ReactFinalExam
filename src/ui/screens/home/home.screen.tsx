import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainParamList, Screen } from '../../navigation/types';
import { useProducts } from '../hook/useProducts.facade';
import React, { useCallback, useEffect } from 'react';
import { GenericProduct } from '../../atoms/genericProduct/genericProduct.atom';
import { FlatList, View, Text, StyleSheet, ListRenderItem } from 'react-native';
import { styles } from './home.styles';

interface Product {
    id: number;
    title: string;
    price: number;
    image: any;
    selected?: boolean;
    onPress: () => void;
    onAddFavorite?: () => void;
  }

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.Home>;
}

const HomeScreen = ({ navigation }: Props) => {
  const {
    products,
    refreshProducts,
    loadFavorites,
    favorites,
    addFavorite,
  } = useProducts();

  /*const renderItem = useCallback(
    ({ item }) => (
      <GenericProduct
        genericProduct={item}
        onAddFavorite={() => addFavorite(item)}
        onPress={() => {
          if (!item.id) return;

          navigation.navigate(Screen.Detail, {
            id: item.id,
            idsArray: products.map((product) => product.id),
          });
        }}
      />
    ),
    [addFavorite, favorites, products, navigation]
  );*/

  const renderItem = useCallback<ListRenderItem<Product>>(
    ({ item }) => {
        return (
            <View style={styles.card}>
                <GenericProduct
                    title={item.title}
                    price={item.price}
                    image={item.image}
                    onPress={() => {
                        navigation.navigate(Screen.Detail, {
                            id: item.id,
                            idsArray: products.map((product) => product.id),
                        });
                    } }
                    onAddFavorite={() => addFavorite(item)} id={0}                />
           </View>
        );
},[]);

  const ItemSeparatorComponent = useCallback(
    () => <View style={styles.productSeparator}></View>,
    []
  );

  // Fetch data on screen load
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Favorites screen focused');
      refreshProducts();
      loadFavorites();
    });

    return unsubscribe;
  }, [loadFavorites, navigation, refreshProducts]);

  useEffect(() => {
    console.log('Products:', products); // Debugging
  }, [products]);

  return (
    <View style={styles.container}>
      {products.length > 0 ? (
        <FlatList
          data={products}
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
export default HomeScreen;