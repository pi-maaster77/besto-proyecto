import React from "react";
import { ScrollView, View, Text, Image, FlatList } from "react-native";
import style from "./Styles";
import axios from 'axios';
import { useEffect, useState } from 'react';

/* 

breve explicacion de como va esto:
{View} es como usar div de html 
Se tienen que usar los componentes de react-native, no los por defecto de jsx
Los estilos son objetos. Similar a css pero con sintaxis de javascript
*/

interface DataItem {
  id: number;
  image: string;
  title: string;
}
  

function Articles() {
  /**
  * @param {ArticlesProps} articles es un array de articulos en formato @param ArticleProps
  */
  const [data, setData] = useState<DataItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DataItem[]>('http://localhost:5000');
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(data)
  return (
    <ScrollView>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        data.map((article, index) => (
        <View style={style.container} key={index}>
          <View style={style.textContainer}>
            <Text style={style.title}>{article.title}</Text>
          </View>
          <Image
            style={style.image}
            source={{
              uri: `http://localHost:5000/image?nombre=${article.image}`,
            }}
            resizeMode="contain"
          />
        </View>
      ))
    )}
    </ScrollView>
  );
};

export default Articles;
