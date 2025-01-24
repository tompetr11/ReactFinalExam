import React, { ReactElement } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './filterButton.styles';


const FilterButton = ({
  children,
  selected,
  onClick,
  title,
}:{
  children: ReactElement;
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
    {title?<Text style={styles.text}>{title}</Text>:children}
  </TouchableOpacity>
  );
};


export default FilterButton;