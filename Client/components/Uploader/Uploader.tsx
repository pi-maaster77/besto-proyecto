import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import styles from './Styles';
const Uploader: React.FC = () => {
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission required',
          'This app needs permission to access your camera roll.',
          [{ text: 'OK' }]
        );
      }
    };

    requestPermissions();
  }, []);

  const handleSubmit = () => {
    if (!title) {
      console.log('Title or image is missing');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    axios.post('http://localhost:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      console.log('Server response:', response.data);
    })
    .catch(error => {
      console.error('Error uploading image:', error.response?.data || error.message);
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <Button title="Upload" onPress={handleSubmit} />
    </View>
  );
};

export default Uploader;
