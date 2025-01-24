// StarRating.tsx
import React from 'react';
import { FlatList, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StarRatingProps {
  rating: number; 
}

const StarRating = ({ rating }: StarRatingProps) => {
  const fullStars = Math.floor(rating); 
  const halfStar = rating % 1 >= 0.5; 
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); 

  
  const stars = [
    ...Array(fullStars).fill('full'),
    ...(halfStar ? ['half'] : []),
    ...Array(emptyStars).fill('empty'),
  ];

  return (
    <FlatList
      data={stars}
      renderItem={({ item, index }) => {
        let iconName = '';
        switch (item) {
          case 'full':
            iconName = 'star';
            break;
          case 'half':
            iconName = 'star-half';
            break;
          case 'empty':
            iconName = 'star-outline';
            break;
        }
        return (
          <Ionicons key={index} name={iconName as 'star' | 'star-half' | 'star-outline'} size={16} color="#ffd700" />
        );
      }}
      keyExtractor={( index) => index.toString()}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default StarRating;
