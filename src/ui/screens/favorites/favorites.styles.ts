import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  flatList: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  productSeparator: {
    height: 10,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1, 
    margin: 5,
    maxWidth: '48%', 
  },
  
});
