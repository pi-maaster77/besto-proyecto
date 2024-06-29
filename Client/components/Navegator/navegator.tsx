// NavigationButtons.tsx
import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigationTypes'; // Importa los tipos de las rutas

const NavigationButtons: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View>
      <Button title="Go to Main" onPress={() => navigation.navigate('Main')} />
      <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
      <Button title="Go to Upload" onPress={() => navigation.navigate('Upload')} />
    </View>
  );
};

export default NavigationButtons;
