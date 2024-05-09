// Style.tsx
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width:300,
        maxHeight:600,
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
        resizeMode: 'contain', // Ajusta la imagen para que quepa dentro del contenedor sin recortarse
        width: '100%',
        height: null,
    }
});

export default styles;