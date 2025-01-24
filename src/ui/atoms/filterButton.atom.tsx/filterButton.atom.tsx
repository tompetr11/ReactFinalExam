import React, { ReactElement } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './filterButton.styles';


const FilterButton = ({
 
  selected,
  onClick,
  title,
}:{
  
  selected?: boolean;
  onClick: ()=> void;
  title:string;
})=>{
  return(
    <TouchableOpacity
    onPress={onClick}
    style={[
      styles.button,
      selected && styles.selected,
    ]}
    
  >
   <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
  );
};


export default FilterButton;