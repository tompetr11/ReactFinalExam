import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    button: {
        borderWidth: 2, 
        borderColor: '#007BFF', 
        paddingVertical: 6, 
        paddingHorizontal: 12, 
        borderRadius: 20, 
        backgroundColor: 'transparent', 
        alignSelf: 'flex-start', 
      },
      text: {
        color: '#007BFF', 
        fontSize: 14, 
        fontWeight: 'bold', 
      },
      selected: {
        backgroundColor: '#ff6347', 
      },
      selectedText: {
        color: '#fff', 
      },
  });