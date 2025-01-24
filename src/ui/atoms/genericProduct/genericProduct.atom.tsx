import React, { memo, useState } from 'react';
import { TouchableOpacity, Image, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { styles } from './genericProduct';
import { Ionicons } from '@expo/vector-icons';
import StarRating from '../starRating/starRating.atom';

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

  

 return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      
      <View style={styles.imageContainer}>
        
        <Ionicons
          onPress={onAddFavorite}
          name={selected ? 'heart' : 'heart-outline'}
          size={28}
          color={'red'}
          style={styles.favoriteIcon}
        />

        
          <Image
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setError(true); 
            }}
            source={{ uri: image }}
            style={styles.image}
          />
        
      </View>

     
      <View style={styles.infoContainer}>
        <Text 
          style={styles.title}
          numberOfLines={2} 
          ellipsizeMode="tail"
        >
          {title}
        </Text>
<Text style={styles.price}>${price.toFixed(2)}</Text>
{rating != null && <StarRating rating={rating} />}
      </View>
    </TouchableOpacity>
  );
};

export default memo(GenericProduct);
