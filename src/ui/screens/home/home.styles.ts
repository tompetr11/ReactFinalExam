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
  ratingFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  starText: {
    fontSize: 16,
    color: '#ffd700',
    fontWeight: 'bold',
  },
  button: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  selectedButton: {
    padding: 10,
    backgroundColor: '#ffd700',
    borderRadius: 5,
  },
  resetButtonContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  resetButton: {
    backgroundColor: '#ff5555', // Rosso acceso
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
