import Articles from './components/Articles/Articles';
import React from 'react';
import styles from './Style';
import { View } from 'react-native';

function App() {
  const article1 = {
    title: 'Título del artículo',
    image: require('./assets/favicon.png')
  };
  const article2 = {
    title: 'Título del artículo',
    image: require('./assets/icon.png')
  };
  const article3 = {
    title: 'Título del artículo',
    image: require('./assets/splash.png')
  };
  return (
    <View style={styles.app}>
      <Articles articles={[article1, article3, article2]} />
    </View>
  );
}

export default App;
