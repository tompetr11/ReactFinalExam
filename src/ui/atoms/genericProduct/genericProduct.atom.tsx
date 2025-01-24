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
  rating?: number;
  onPress: () => void;
  onAddFavorite?: () => void;
}

export const GenericProduct = ({ title, price, image,rating,selected, onAddFavorite, onPress }: ProductProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating); // Stelle piene
    const halfStar = rating % 1 >= 0.5; // Mezza stella
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Stelle vuote

    return (
      <View style={styles.ratingContainer}>
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <Ionicons key={`full-${index}`} name="star" size={16} color="#ffd700" />
          ))}
        {halfStar && <Ionicons name="star-half" size={16} color="#ffd700" />}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <Ionicons key={`empty-${index}`} name="star-outline" size={16} color="#ffd700" />
          ))}
      </View>
    );
  };

 return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Contenitore immagine con icona */}
      <View style={styles.imageContainer}>
        {/* Stella in alto a destra */}
        <Ionicons
          onPress={onAddFavorite}
          name={selected ? 'star' : 'star-outline'}
          size={28}
          color={'#ffd700'}
          style={styles.favoriteIcon}
        />

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

      {/* Contenitore informazioni */}
      <View style={styles.infoContainer}>
        <Text 
          style={styles.title}
          numberOfLines={2} 
          ellipsizeMode="tail"
        >
          {title}
        </Text>
<Text style={styles.price}>${price.toFixed(2)}</Text>
{rating != null && renderStars(rating)} {/* Aggiunto rating */}
      </View>
    </TouchableOpacity>
  );
};

export default memo(GenericProduct);
