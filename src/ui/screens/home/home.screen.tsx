import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainParamList, Screen } from '../../navigation/types';
import { useProducts } from '../hook/useProducts.facade';
import React, { useCallback, useEffect, useState } from 'react';
import { GenericProduct } from '../../atoms/genericProduct/genericProduct.atom';
import { FlatList, View, Text, StyleSheet, ListRenderItem, TouchableOpacity, Button } from 'react-native';
import { styles } from './home.styles';
import FilterButton from '../../atoms/filterButton.atom.tsx/filterButton.atom';


enum FilterOrder {
  initial = 'initial',
  ascendent= 'asc',
  descendent = 'desc',
}

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

  const [selectedFilter, setSelectedFilter] = useState<string>('All'); 
  const [categoryInitialProducts, setCategoryInitialProducts] = useState<any[]>([]);
  const ratingFilter =['asc','desc','initial']
  const[filterRatingOrder,setFilterRatingOrder]=useState<FilterOrder>(FilterOrder.initial);
  
  

//**   USE CALLBACK *//
const onFilterApply = useCallback(
  (type: FilterOrder)=> {
    console.log('filtro passato: '+type)
    setFilterRatingOrder(type);
    if (type === FilterOrder.initial) {
      if (selectedFilter === 'All') {
        setProducts(initialProducts);
      } else {
        setProducts([...categoryInitialProducts]); 
      }
      return;
    }if(type ===FilterOrder.ascendent){
      setProducts([...products].sort((a, b) => a.rating.rate - b.rating.rate))
      return;
    }if(type ===FilterOrder.descendent){
      setProducts([...products].sort((a, b) => b.rating.rate - a.rating.rate))
      return;
    }
  
},[products, initialProducts,setProducts, categoryInitialProducts,selectedFilter]);

  

  

  const handleFilterClick = useCallback(
    (filter: string ) => {
      console.log('Filter clicked:', filter);
       setSelectedFilter(filter);
    },
    []
  );
 
 

  const renderFilterItem = useCallback<ListRenderItem<any>>(
    ({ item }) => (
      <FilterButton
      title={item}
      onClick={ ()=>handleFilterClick(item)}
      selected={selectedFilter===item}
    >
    </FilterButton>
    ),
    [selectedFilter] 
  );
  
const renderOrderFilter = useCallback<ListRenderItem<any>>(
  ({item})=>(
    <FilterButton
      title={item}
      onClick={ ()=>onFilterApply(item)}
      selected={filterRatingOrder===item}
    >
    </FilterButton>
  ), [filterRatingOrder, onFilterApply]
);
  const renderItem = useCallback<ListRenderItem<any>>(
    ({ item }) => (
      <View style={styles.card}>
        <GenericProduct
          id={item.id} 
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
          }}
          onAddFavorite={() => addFavorite(item)} 
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
    console.log('Products:', products); 
  }, [products]);

  useEffect(() => {
    if (selectedFilter.startsWith('★')) {
      
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
      setCategoryInitialProducts(initialProducts); 
    }
    else {
     
      fetch(`https://fakestoreapi.com/products/category/${selectedFilter}`)
  .then((res) => res.json())
  .then((data) => {
    const sortedData = [...data]; 
    setProducts(sortedData);
    setCategoryInitialProducts(sortedData);
  });
       
    }
    setFilterRatingOrder(FilterOrder.initial);
  }, [selectedFilter, initialProducts]);


  return (
    
    <View style={styles.container}>
      <View style={styles.filterContainer}>
      <FlatList
        data={filter}
        renderItem={renderFilterItem}
        keyExtractor={(filterItem) => filterItem}
        ItemSeparatorComponent={FilterSeparatorComponent}
        contentContainerStyle={styles.filterFlatList}
        horizontal={true}
      />
      
      </View>
      <View style={styles.filterContainer}>
<FlatList
      data={ratingFilter}
      renderItem={renderOrderFilter}
      keyExtractor={(orderItem)=>orderItem}
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