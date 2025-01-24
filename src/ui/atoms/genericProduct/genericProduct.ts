import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff00',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 10,
    width: 160, // Larghezza fissa
    height: 220, // Altezza fissa per uniformità
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 140, // Dimensione fissa per l'immagine
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  loader: {
    position: 'absolute',
  },
  infoContainer: {
    padding: 10,
    flex: 1, // Per assicurarsi che lo spazio rimanente venga usato dal testo
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1, // Porta l'icona sopra l'immagine
  },
  
});
