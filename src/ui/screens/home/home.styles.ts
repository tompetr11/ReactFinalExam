import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#f5f5f5',
    paddingTop: 20, // Aggiungi un po' di spazio sopra
  },
  productsFlatList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
     
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 20, // Aggiungi spazio sopra la lista dei prodotti
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
  filterSeparator: {
    width: 10,
  },
  filterFlatList: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignContent: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});
