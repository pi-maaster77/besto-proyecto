import React from "react";
import { ScrollView, View, Text, Image } from "react-native";
import style from "./Style";
interface ArticleProps {
    title: string;
    image: any;
}

interface ArticlesProps {
    articles: ArticleProps[];
}

/* 

breve explicacion de como va esto:
{View} es como usar div de html 
Se tienen que usar los componentes de react-native, no los por defecto de jsx
Los estilos son objetos. Similar a css pero con sintaxis de javascript
*/

const Articles: React.FC<ArticlesProps> = ({ articles }) => {
    /**
    * @param {ArticlesProps} articles es un array de articulos en formato @param ArticleProps
    */
    return (


        <ScrollView> {/* ScrollView es como un div,*/}
            {articles.map((article, index) => (
                <View style={style.container} key={index}>
                    <View style={style.textContainer}>
                        <Text style={style.title}>
                            {article.title}
                        </Text>
                    </View>
                    <Image 
                        source={article.image} 
                        style={style.image} 
                    />
                </View>
            ))}
        </ScrollView>
    );
};

export default Articles;
