// Styles.ts
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width:'50%',
        maxHeight:'80%',
        justifyContent: 'center',
        backgroundColor: '#303030',
        borderRadius: 20,
        padding: 20,
        margin: 20,
        flex: 1,
    },
    title: {
        color: '#FFF',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontSize: 20,
        paddingBottom: 10,
    },
    description: {
        color: '#CCC',
        paddingBottom: 30,
    },
    textContainer:{

    },
    image: {
        flex: 1,
        aspectRatio: 1, // Para mantener la relación de aspecto original
        width: '100%', // Para que la imagen ocupe todo el ancho del contenedor
    }
});

export default styles;