import React, { useState , useEffect} from "react";
import { View, Image, Text } from "react-native"
import styles from "./Styles"
import axios from "axios";

export interface DataItem {
    id: number;
    image: string;
    title: string;
  }
export function Article (props:DataItem) {
    const [likes, setLikes] = useState()

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://127.0.0.1:5000/likes?id=${props.id}`);
            setLikes(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData()

        const intervalo = setInterval(() => {
            fetchData();
        }, 10000);
        return () => clearInterval(intervalo);
      }, [likes]);

return (
    <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={styles.title}>{props.title}</Text>
        </View>
        <Image
            style={styles.image}
            source={{
                uri: `http://localHost:5000/image?nombre=${props.image}`,
            }}
            resizeMode="contain"
        />
        <Text style={styles.title}>{likes}</Text>
    </View>
)
}

