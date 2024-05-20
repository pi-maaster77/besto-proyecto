import Articles from './components/Articles/Articles';

import React, { useState } from 'react';
import styles from './Styles';
import { View, Button, Text, TouchableOpacity} from 'react-native';
import Uploader from './components/Uploader/Uploader';


function App() {
  const [upload, setUpload] = useState(false)
  const handlePress = () => {
    setUpload(!upload);
  };
  return (
    <View style={styles.app}>
      {upload?  <Uploader/>:<Articles/>}
      <TouchableOpacity style={styles.button}>
        <Button onPress={handlePress} title='apretar'/>
      </TouchableOpacity>
    </View>
  );
}

export default App;