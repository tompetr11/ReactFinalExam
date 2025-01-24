import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainParamList, Screen } from '../../navigation/types';
import { useProducts } from '../hook/useProducts.facade';
import React, { useCallback, useEffect, useState } from 'react';
import { GenericProduct } from '../../atoms/genericProduct/genericProduct.atom';
import { FlatList, View, Text, StyleSheet, ListRenderItem, TouchableOpacity, Button } from 'react-native';
import { styles } from './home.styles';
import FilterButton from '../../atoms/filterButton.atom.tsx/filterButton.atom';




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
 
  
  
  

//**   USE CALLBACK *//


  const handleFilterClick = useCallback(
    (filter: string | number) => {
      console.log('Filter clicked:', filter);
  
      if (typeof filter === 'number') {
        // Filtro per rating
       
        setSelectedFilter(''); // Resetta i filtri per categoria
      }else {
        // Filtro per categoria
        setSelectedFilter(filter);
       
      }
    },
    []
  );
  
 

  const renderFilterItem = useCallback(
    ({ item }) => (
      <FilterButton
      title={item}
      onClick={ ()=>handleFilterClick(item)}
      selected={selectedFilter===item}
    >
      
    </FilterButton>
    ),
    [selectedFilter] // Ri-renderizza solo se `selectedFilter` cambia
  );
  

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.card}>
        <GenericProduct
          id={item.id} // Passa l'id
          title={item.title} // Passa il titolo
          price={item.price} // Passa il prezzo
          image={item.image} // Passa l'immagine
          rating={item.rating.rate} // Passa il rating come prop
          selected={favorites.includes(item.id)} // Controlla se è tra i preferiti
          onPress={() => {
            if (!item.id) {
              console.log('Invalid item id');
              return;
            }
            navigation.navigate(Screen.Detail, {
              id: item.id,
              idsArray: products.map((product) => product.id),
            });
          }}
          onAddFavorite={() => addFavorite(item)} // Funzione per aggiungere ai preferiti
        />
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



  //**  USE EFFECT   *//
  

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


  useEffect(() => {
    let filteredProducts = initialProducts;
    if (selectedFilter.startsWith('★')) {
      // Filtro per stelle
      const rating = parseInt(selectedFilter.replace('★', ''), 10);
      setProducts(
        initialProducts.filter(
          (product) => Math.floor(product.rating.rate) === rating
        )
      );
    } 
    
    else if (selectedFilter === 'All' ) {
      console.log('Showing all products');
      setProducts(initialProducts);
    }
    
    else  if (selectedFilter === 'Desc') {
      filteredProducts = filteredProducts.sort((a, b) =>
       a.rating.rate - b.rating.rate 
      );
      setProducts(filteredProducts);
    }
    else if (selectedFilter === 'Asc') {
      filteredProducts = filteredProducts.sort((a, b) =>
        b.rating.rate - a.rating.rate
      );
      setProducts(filteredProducts);
    }
    
    else {
      fetch(`https://fakestoreapi.com/products/category/${selectedFilter}`)
        .then((res) => res.json())
        .then((data) => setProducts(data));
    }
  }, [selectedFilter]);


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