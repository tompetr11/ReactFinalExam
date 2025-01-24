import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainParamList, Screen } from '../../navigation/types';
import { useProducts } from '../hook/useProducts.facade';
import React, { useCallback, useEffect, useState } from 'react';
import { GenericProduct } from '../../atoms/genericProduct/genericProduct.atom';
import { FlatList, View, Text, StyleSheet, ListRenderItem } from 'react-native';
import { styles } from './home.styles';
import FilterButton from '../../atoms/filterButton/filterButton.atom';



interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.Home>;
}

const HomeScreen = ({ navigation }: Props) => {
  const {
    products,
    setProducts,
    refreshProducts,
    loadFavorites,
    favorites,
    addFavorite,
    refreshFilter,
    filter,
    initialProducts,
  } = useProducts();
  const [selectedFilter, setSelectedFilter] = useState<string>('All'); // Stato per il filtro selezionato



  

  useEffect(() => {
    if (selectedFilter === 'All' || !selectedFilter) {
      console.log('Showing all products');
      setProducts(initialProducts);
    } else {
    fetch('https://fakestoreapi.com/products/category/'+selectedFilter)
            .then((res)=>res.json())
            .then((data)=>
            setProducts(data));
          }

  }, [selectedFilter]);
    

  const handleFilterClick = useCallback(
    (filter: string) => {
      console.log('Filter clicked:', filter);
      setSelectedFilter(filter); // Imposta il filtro selezionato
    },
    [] // Usa il `onFilterApply` aggiornato
  );

  const renderFilterItem = useCallback(
    ({ item }) => (
      <FilterButton
        onClick={() => handleFilterClick(item)} // Chiama la funzione quando cliccato
        selected={selectedFilter === item} // Se il filtro è uguale a quello selezionato, applica lo stile 'selected'
      >
        {item}
      </FilterButton>
    ),
    [selectedFilter] // Ri-renderizza solo se `selectedFilter` cambia
  );
  

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.card}>
      <GenericProduct
          title={item.title}
          price={item.price}
          image={item.image}
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

  const ItemSeparatorComponent = useCallback(
    () => <View style={styles.productSeparator}></View>,
    []
  );

  const FilterSeparatorComponent = useCallback( 
    () => <View style={styles.filterSeparator}></View>,
    []
  );

  // Fetch data on screen load
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Favorites screen focused');
      refreshProducts();
      refreshFilter();
      loadFavorites();
    });

    return unsubscribe;
  }, [loadFavorites, navigation, refreshProducts]);

  

  useEffect(() => {
    console.log('Products:', products); // Debugging
  }, [products]);


  return (
    
    <View style={styles.container}>
      <View style={styles.filterContainer}>
      <FlatList
        data={filter}
        renderItem={renderFilterItem}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={FilterSeparatorComponent}
        contentContainerStyle={styles.filterFlatList}
        horizontal={true}
      />
      </View>
      {products.length > 0 ? (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={ItemSeparatorComponent}
          contentContainerStyle={styles.productsFlatList}
          horizontal={false}
        />
      ) : (
        <Text style={styles.emptyMessage}>No products available</Text>
      )}
    </View>
  );
};
export default HomeScreen;