// Importamos los módulos necesarios de React y React Native
import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import styles from "./Styles"; // Importamos los estilos desde un archivo separado
import axios from "axios"; // Importamos axios para hacer solicitudes HTTP

// Definimos el componente de función Inicio_sesion
function Inicio_sesion() {
    // Definimos los estados locales para manejar errores y los valores de los inputs
    const [myerror, setError] = useState(""); // Estado para manejar los mensajes de error
    const [user, setUser] = useState(""); // Estado para almacenar el nombre de usuario
    const [passwd, setPasswd] = useState(""); // Estado para almacenar la contraseña

    // Función que se llama cuando el usuario presiona el botón para iniciar sesión
    function handleUpload() {
        // Validamos que todos los campos estén llenos
        if (!user || !passwd) {
            setError("No se ingresó el usuario o la contraseña"); // Establecemos un mensaje de error si falta algún campo
            setPasswd("");
            return; // Terminamos la ejecución de la función si hay error
        }

        // Creamos un objeto FormData para enviar los datos del formulario
        const formData = new FormData();
        formData.append('user', user); // Añadimos el nombre de usuario al FormData
        formData.append('passwd', passwd); // Añadimos la contraseña al FormData

        // Hacemos una solicitud POST a la URL del servidor
        axios.post('http://localhost:5000/login', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Indicamos que estamos enviando datos de formulario
            },
        })
        .then(response => {
            console.log('Server response:', response.data); // Imprimimos la respuesta del servidor en la consola
            if (response.data == null) {
                setError("Usuario o contraseña incorrectos"); // Establecemos un mensaje de error si el servidor responde con datos nulos
            }
        })
        .catch(error => {
            // Imprimimos cualquier error que ocurra durante la solicitud
            console.error('Error uploading form:', error.response?.data || error.message);
            setPasswd("");
            setError(error.message); // Establecemos un mensaje de error con el mensaje del error capturado
        });
    }

    // Renderizamos la interfaz de usuario
    return (
        <View>
            {/* Mostramos el mensaje de error si existe */}
            {myerror ? <Text style={styles.textError}>{myerror}</Text> : null}
            
            {/* Campo de entrada para el nombre de usuario */}
            <TextInput 
                placeholder="Nombre de usuario"
                placeholderTextColor={styles.textPlaceHolder.color} 
                style={styles.textInput}
                value={user} // El valor del campo es el estado user
                onChangeText={text => setUser(text)} // Actualizamos el estado user cuando el texto cambia
            />
            
            {/* Campo de entrada para la contraseña */}
            <TextInput 
                placeholder="Contraseña" 
                placeholderTextColor={styles.textPlaceHolder.color}
                style={styles.textInput}
                value={passwd} // El valor del campo es el estado passwd
                onChangeText={text => setPasswd(text)} // Actualizamos el estado passwd cuando el texto cambia
                secureTextEntry // Ocultamos el texto para la contraseña
            />
            
            {/* Botón para enviar el formulario */}
            <Button title="Iniciar sesión" onPress={handleUpload}/>
        </View>
    );
}

// Exportamos el componente para que pueda ser usado en otras partes de la aplicación
export default Inicio_sesion;
