import React, { memo, useState } from 'react';
import { TouchableOpacity, Image, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { styles } from './genericProduct';
import { Ionicons } from '@expo/vector-icons';

interface ProductProps {
  id: number;
  title: string;
  price: number;
  image: string;
  selected?: boolean;
  onPress: () => void;
  onAddFavorite?: () => void;
}

export const GenericProduct = ({ title, price, image, onAddFavorite, onPress }: ProductProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.imageContainer}>
      {loading && !error && (
        <ActivityIndicator size="large" color="#000" style={styles.loader} />
      )}
      {!error ? (
        <Image
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true); // Segnala l'errore
          }}
          source={{ uri: image }}
          style={styles.image}
        />
      ) : (
        <Ionicons name="image-outline" size={50} color="#ccc" /> // Icona di fallback
      )}
    </View>
    <View style={styles.infoContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>${price.toFixed(2)}</Text>
    </View>
  </TouchableOpacity>
);
};

export default memo(GenericProduct);
