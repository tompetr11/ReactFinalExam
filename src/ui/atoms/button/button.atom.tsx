import React, { ReactElement } from 'react';
import { TouchableOpacity, Text} from 'react-native';
import { styles } from './button.styles';

const Button = ({
  children,
  disabled,
  onPress,
  title,
}: {
  children: ReactElement;
  disabled?: boolean;
  onPress: () => void;
  title?: string;
}) => {
  return (
    <TouchableOpacity disabled={disabled} style={styles.button} onPress={onPress}>
      {title ? <Text style={styles.buttonText}>{title}</Text> : children}
    </TouchableOpacity>
  );
};

export default Button;
