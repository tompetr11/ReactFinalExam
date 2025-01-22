import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { styles } from './genericProduct';

interface GenericProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ProductProps {
  genericProduct: GenericProduct;
  onPress: () => void;
}

export const GenericProduct = ({ genericProduct, onPress }: ProductProps) => {
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
            source={{ uri: image }}
            style={styles.image}
          />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};
