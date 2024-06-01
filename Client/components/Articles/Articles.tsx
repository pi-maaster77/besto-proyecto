// Importamos los módulos necesarios de React y React Native
import React from "react";
import { ScrollView, View, Text, Image, FlatList } from "react-native";
import style from "./Styles"; // Importamos los estilos desde un archivo separado
import axios from 'axios'; // Importamos axios para hacer solicitudes HTTP
import { useEffect, useState } from 'react'; // Importamos hooks de React
import { Article, DataItem } from "../Article/Article"; // Importamos componentes y tipos desde otro archivo

/* 
Breve explicación de cómo funciona esto:
{View} es como usar div de HTML.
Se tienen que usar los componentes de react-native, no los por defecto de JSX.
Los estilos son objetos. Similar a CSS pero con sintaxis de JavaScript.
*/

// Definimos el componente de función Articles
function Articles() {
  /**
  * @param {ArticlesProps} articles es un array de artículos en formato @param ArticleProps
  */
  
  // Definimos los estados locales para manejar los datos y el estado de carga
  const [data, setData] = useState<DataItem[]>([]); // Estado para almacenar los datos de los artículos
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar el estado de carga

  // useEffect se usa para manejar efectos secundarios como la carga de datos
  useEffect(() => {
    // Función asíncrona para obtener los datos de los artículos desde el servidor
    const fetchData = async () => {
      try {
        // Hacemos una solicitud GET a la URL del servidor para obtener los datos
        const response = await axios.get<DataItem[]>('http://localhost:5000');
        setData(response.data); // Actualizamos el estado con los datos obtenidos
        setIsLoading(false); // Cambiamos el estado de carga a falso
      } catch (error) {
        console.error('Error fetching data:', error); // Imprimimos cualquier error que ocurra
        setIsLoading(false); // Cambiamos el estado de carga a falso
      }
    };

    // Llamamos a la función fetchData para cargar los datos
    fetchData();

    // Establecemos un intervalo para volver a cargar los datos cada 100000 milisegundos
    const intervalo = setInterval(() => {
      fetchData();
    }, 100000);

    // Limpiamos el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalo);
  }, []);

  // Imprimimos los datos en la consola para depuración
  console.log(data);

  // Renderizamos la interfaz de usuario
  return (
    <ScrollView>
      {/* Mostramos un mensaje de carga mientras los datos están siendo obtenidos */}
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        // Mapeamos sobre los datos y renderizamos un componente Article para cada artículo
        data.map((article) => (
          <Article {...article} key={article.id}/>
        ))
      )}
    </ScrollView>
  );
};

// Exportamos el componente para que pueda ser usado en otras partes de la aplicación
export default Articles;
