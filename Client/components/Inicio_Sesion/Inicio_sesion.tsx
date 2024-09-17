import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import styles from "./Styles";
import axios from "axios";
import NavigationButtons from "../Navegator/navegator";

// Función para calcular el hash SHA-256
async function sha256(message:string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

function Inicio_sesion() {
    const [myerror, setError] = useState("");
    const [user, setUser] = useState("");
    const [passwd, setPasswd] = useState("");

    async function handleUpload() {
        if (!user || !passwd) {
            setError("No se ingresó el usuario o la contraseña");
            setPasswd("");
            return;
        }

        // Calculamos el hash SHA-256 de la contraseña
        const hashedPasswd = await sha256(passwd);

        const formData = new FormData();
        formData.append('user', user);
        formData.append('passwd', hashedPasswd); // Usamos la contraseña hasheada

        axios.post('http://localhost:5000/login', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            console.log('Server response:', response.data);
            if (response.data == null) {
                setError("Usuario o contraseña incorrectos");
            }
        })
        .catch(error => {
            console.error('Error uploading form:', error.response?.data || error.message);
            setPasswd("");
            setError(error.message);
        });
    }

    return (
        <View style={styles.container}>
            {myerror ? <Text style={styles.textError}>{myerror}</Text> : null}
            <TextInput 
                placeholder="Nombre de usuario"
                placeholderTextColor={styles.textPlaceHolder.color} 
                style={styles.textInput}
                value={user}
                onChangeText={text => setUser(text)}
            />
            <TextInput 
                placeholder="Contraseña" 
                placeholderTextColor={styles.textPlaceHolder.color}
                style={styles.textInput}
                value={passwd}
                onChangeText={text => setPasswd(text)}
                secureTextEntry
            />
            <Button title="Iniciar sesión" onPress={handleUpload}/>
            <NavigationButtons />
        </View>
    );
}

export default Inicio_sesion;
