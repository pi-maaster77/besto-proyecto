import React, { useState } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from './Styles';
import axios from 'axios';
import NavigationButtons from '../Navegator/navegator';

const Uploader: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    // Pedir permisos para acceder a la galería de imágenes
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Lo sentimos, necesitamos permisos de cámara para hacer esto funcionar!');
        return;
      }
    }

    // Abrir el selector de imágenes
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) return;

    // Obtener información del archivo
    const response = await fetch(selectedImage);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append('image', blob, 'photo.jpg');

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload success', response.data);
      alert('Imagen subida con éxito!');
    } catch (error) {
      console.error('Error uploading image', error);
      alert('Error subiendo la imagen.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Seleccionar Imagen" onPress={pickImage} />
      {selectedImage && (
        <>
          <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
          <Button title="Subir Imagen" onPress={uploadImage} />
        </>
      )}
    <NavigationButtons />
    </View>
  );
};

export default Uploader;
    