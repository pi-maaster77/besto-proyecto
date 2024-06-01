// Importamos los componentes necesarios
import Articles from './components/Articles/Articles';
import React, { useState } from 'react';
import styles from './Styles'; // Importamos los estilos desde un archivo separado
import { View, Button, Text, TouchableOpacity } from 'react-native';
import Uploader from './components/Uploader/Uploader';
import Inicio_sesion from './components/Inicio_Sesion/Inicio_sesion';
import Registro from './components/Registro/Registro';

// Definimos el componente principal de la aplicación
function App() {
  /*
  // Estado para manejar si se muestra el componente Uploader o Articles
  const [upload, setUpload] = useState(false);
  
  // Función para manejar el evento de presionar el botón
  const handlePress = () => {
    setUpload(!upload); // Alterna el estado de upload entre true y false
  }; 
  */

  // Renderizamos la interfaz de usuario
  return (
    <View style={styles.app}>
      {/*
      // Condicionalmente renderizamos Uploader o Articles basado en el estado upload
      {upload ? <Uploader /> : <Articles />}
      
      // Botón dentro de un TouchableOpacity para cambiar entre Uploader y Articles
      <TouchableOpacity style={styles.button}>
        <Button onPress={handlePress} title='Apretar'/>
      </TouchableOpacity>
      */}
      
      {/* Renderizamos el componente Inicio_sesion */}
      <Inicio_sesion />
      
      {/* Renderizamos el componente Registro */}
      <Registro />
    </View>
  );
}

// Exportamos el componente App para que pueda ser usado en otras partes de la aplicación
export default App;






// pequeño tutorial sobre el condicional tripartito
/**
<condicion> ? <si se cumple, asignar este valor> : <si no se cumle, asignar este otro>

donde <frase> es un dato y <palabra> es un booleano (verdadero o falso)

*/