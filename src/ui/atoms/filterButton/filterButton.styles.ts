import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    button: {
        borderWidth: 2, // Bordo visibile
        borderColor: '#007BFF', // Colore del bordo
        paddingVertical: 6, // Piccola spaziatura verticale interna
        paddingHorizontal: 12, // Piccola spaziatura orizzontale interna
        borderRadius: 20, // Angoli arrotondati
        backgroundColor: 'transparent', // Sfondo trasparente
        alignSelf: 'flex-start', // Adatta il bottone alla dimensione del contenuto
      },
      text: {
        color: '#007BFF', // Colore del testo
        fontSize: 14, // Dimensione del testo
        fontWeight: 'bold', // Stile grassetto per il testo
      },
      selected: {
        backgroundColor: '#ff6347', // Colore di sfondo quando selezionato
      },
      selectedText: {
        color: '#fff', // Colore del testo quando selezionato
      },
  });
  
