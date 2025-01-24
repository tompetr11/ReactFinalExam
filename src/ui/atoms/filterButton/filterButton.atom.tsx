import React, { ReactNode } from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import { styles } from './filterButton.styles';

interface FilterButtonProps extends TouchableOpacityProps {
  onClick: () => void;
  children: ReactNode;
  selected?: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({ selected, onClick, children, style, ...props }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        styles.button,
        selected && styles.selected, // Aggiungi lo stile 'selected' se il bottone è selezionato
        style
      ]}
      {...props}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

export default FilterButton;
