import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; // Assicurati di avere @expo/vector-icons installato
import { styles } from './genericProduct';


interface GenericProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: any;
}

interface ProductProps {
  genericProduct: GenericProduct;
  selected?: boolean;
  onPress: () => void;
  onAddFavorite?: () => void;
}

export const GenericProduct = ({ genericProduct, onPress, onAddFavorite, selected }: ProductProps) => {
  const [loading, setLoading] = useState(false);

  const { title, price, image } = genericProduct;

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: '#fff' }]}
      onPress={onPress}
    >
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <>
          <Image
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            source={ image }
            style={styles.image}
          />
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Ionicons
              onPress={onAddFavorite}
              name={selected ? 'star' : 'star-outline'}
              size={28}
              color={'#ffd700'}
            />
          </View>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};
