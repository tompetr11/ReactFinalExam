import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainParamList, Screen } from '../../navigation/types';
import { useProducts } from '../hook/useProducts.facade';
import React, { useCallback, useEffect, useState } from 'react';
import { GenericProduct } from '../../atoms/genericProduct/genericProduct.atom';
import { FlatList, View, Text, StyleSheet, ListRenderItem, TouchableOpacity, Button } from 'react-native';
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
  const [selectedRating, setSelectedRating] = useState<number | null>(null); // Per il filtro delle stelle
  const [selectedCategory, setSelectedCategory] = useState<string>('All'); // Categoria selezionata
 
  
  
  

//**   USE CALLBACK *//
const resetFilters = useCallback(() => {
  setSelectedCategory('All');
  setSelectedRating(null);
  setProducts(initialProducts); // Mostra tutti i prodotti
}, [initialProducts, setProducts]);

  

  

  const handleFilterClick = useCallback(
    (filter: string | number) => {
      console.log('Filter clicked:', filter);
  
      if (typeof filter === 'number') {
        // Filtro per rating
        setSelectedRating(filter);
        setSelectedFilter(''); // Resetta i filtri per categoria
      }else {
        // Filtro per categoria
        setSelectedFilter(filter);
        setSelectedRating(null); // Resetta i filtri per rating
      }
    },
    []
  );
  
  const renderRatingFilter = useCallback(() => {
    const stars = [1, 2, 3, 4, 5]; // Valori per le stelle
  
    return (
      <View style={styles.ratingFilterContainer}>
        {stars.map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => handleFilterClick(star)}
            style={[
              styles.starButton,
              selectedRating === star && styles.selectedStarButton,
            ]}
          >
            <Text style={styles.starText}>
              {'★'.repeat(star)}{' '}
              <Text style={{ color: '#888' }}>{'☆'.repeat(5 - star)}</Text>
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }, [selectedRating, handleFilterClick]);
  

  const renderFilterItem = useCallback(
    ({ item }) => (
      <FilterButton
      
      onClick={ ()=>handleFilterClick(item)}
      selected={selectedCategory === item}
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
    if (selectedRating) {
      console.log(`Filtering products for rating >= ${selectedRating}`);
      setProducts(
        initialProducts.filter((product) => product.rating.rate >= selectedRating&& product.rating.rate <= selectedRating + 1)
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
  }, [selectedFilter, selectedRating]);


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

      
<Button title ="Reset Filters" onPress={resetFilters}/>

      {renderRatingFilter()} {/* Mostra i filtri con le stelle */}


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