// Importamos los módulos necesarios de React y React Native
import React, { useState, useEffect } from "react";
import { View, Image, Text } from "react-native";
import styles from "./Styles"; // Importamos los estilos desde un archivo separado
import axios from "axios"; // Importamos axios para hacer solicitudes HTTP

// Definimos una interfaz para el tipo de datos que se manejarán
export interface DataItem {
  id: number;
  image: string;
  title: string;
}

// Definimos el componente de función Article que recibe props de tipo DataItem
export function Article(props: DataItem) {
  // Definimos el estado local para manejar los likes
  const [likes, setLikes] = useState<number | undefined>();

  // useEffect se usa para manejar efectos secundarios como la carga de datos
  useEffect(() => {
    // Función asíncrona para obtener los likes del artículo desde el servidor
    const fetchData = async () => {
      try {
        // Hacemos una solicitud GET a la URL del servidor para obtener los likes
        const response = await axios.get(`http://127.0.0.1:5000/likes?id=${props.id}`);
        setLikes(response.data); // Actualizamos el estado con los datos obtenidos
      } catch (error) {
        console.error('Error fetching data:', error); // Imprimimos cualquier error que ocurra
      }
    };

    // Llamamos a la función fetchData para cargar los datos
    fetchData();

    // Establecemos un intervalo para volver a cargar los datos cada 10000 milisegundos
    const intervalo = setInterval(() => {
      fetchData();
    }, 10000);

    // Limpiamos el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalo);
  }, [props.id]); // El efecto se ejecuta cada vez que cambian los likes

  // Renderizamos la interfaz de usuario
  return (
    <View style={styles.container}>
      {/* Contenedor para el título del artículo */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      
      {/* Imagen del artículo */}
      <Image
        style={styles.image}
        source={{
          uri: `http://localhost:5000/image?nombre=${props.image}`, // URL de la imagen del artículo
        }}
        resizeMode="contain" // Modo de redimensionamiento de la imagen
      />
      
      {/* Texto que muestra la cantidad de likes */}
      <Text style={styles.title}>{likes}</Text>
    </View>
  );
}
