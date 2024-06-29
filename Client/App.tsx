// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Articles from './components/Articles/Articles';
import Registro from './components/Registro/Registro';
import Inicio_sesion from './components/Inicio_Sesion/Inicio_sesion';
import Uploader from './components/Uploader/Uploader';
import { RootStackParamList } from './navigationTypes'; // Importa los tipos de las rutas

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={Articles} />
        <Stack.Screen name="Articles" component={Articles} />
        <Stack.Screen name="Register" component={Registro} />
        <Stack.Screen name="Login" component={Inicio_sesion} />
        <Stack.Screen name="Upload" component={Uploader} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
