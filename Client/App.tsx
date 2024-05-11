import Articles from './components/Articles/Articles';

import React from 'react';
import styles from './Styles';
import { View, Text, Image } from 'react-native';


function App() {
  return (
    <View style={styles.app}>
      <Articles/>
    </View>
  );
}

export default App;