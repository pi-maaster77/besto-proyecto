// Importamos los componentes necesarios
import Articles from './components/Articles/Articles';
import React, { useState } from 'react';
import Uploader from './components/Uploader/Uploader';
import Inicio_sesion from './components/Inicio_Sesion/Inicio_sesion';
import Registro from './components/Registro/Registro';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
// Definimos el componente principal de la aplicación
function App() {
  // Renderizamos la interfaz de usuario
  return (
    // se crea el contenedor para el navegador 
    <NavigationContainer> 
      {/** 
       * 21: se establece que la ruta por defecto sea "Main" 
       * 22: se quita una barra de arriba propia del componente
      */}
      <Stack.Navigator 
        initialRouteName="Main"
        screenOptions={{ headerShown: false }}
      > 
      {/** 
       * 27 en adelante: establecemos rutas para el navegador, como la pagina principal, el regustro, el inicio de sesion y para subir articulos
      */}
        <Stack.Screen name="Main" component={Articles}/> 
        <Stack.Screen name="Register" component={Registro}/>
        <Stack.Screen name="Login" component={Inicio_sesion}/>
        <Stack.Screen name="Upload" component={Uploader}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Exportamos el componente App para que pueda ser usado en otras partes de la aplicación
export default App;






// pequeño tutorial sobre el condicional tripartito
/**
<condicion> ? <si se cumple, asignar este valor> : <si no se cumle, asignar este otro>

donde <frase> es un dato y <palabra> es un booleano (verdadero o falso)

*/