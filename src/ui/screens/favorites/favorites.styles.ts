import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    productSeparator: {
        height: 20,
      },
      container: {
        flex: 1,
        backgroundColor: '#f5f5f5', // Sfondo chiaro e neutro
        padding: 10,
      },
      flatList: {
        flexGrow: 1,
      },
      productContainer: {
        marginBottom: 15, // Spaziatura tra i prodotti
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff', // Sfondo bianco per ogni card
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3, // Ombra per Android
      },
      productImage: {
        height: 150,
        width: '100%',
        resizeMode: 'cover', // Adatta l'immagine senza distorsioni
      },
      productInfo: {
        padding: 10,
      },
      productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333', // Testo scuro per contrasto
        marginBottom: 5,
      },
      productPrice: {
        fontSize: 14,
        fontWeight: '600',
        color: '#888', // Testo più tenue per il prezzo
      },
      emptyMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      emptyMessageText: {
        fontSize: 16,
        color: '#777', // Testo grigio tenue per i messaggi vuoti
        textAlign: 'center',
      },
    });