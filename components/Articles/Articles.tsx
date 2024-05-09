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

const Articles: React.FC<ArticlesProps> = ({ articles }) => {
    return (
        <ScrollView>
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
}

export default Articles;
