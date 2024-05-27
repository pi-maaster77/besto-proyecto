import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import styles from "./Styles";
import axios from "axios";

function Inicio_sesion ( ) {
    const [myerror, setError] = useState("")
    const [user, setUser] = useState("")
    const [passwd, setPasswd] = useState("")
    function handleUpload (){
        if(!user || !passwd){
            setError("no se ingreso el usuario o la contraseña")
            return
        }
        const formData = new FormData();
        formData.append('user', user)
        formData.append('passwd', passwd)
        axios.post('http://localhost:5000/login', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(response => {
            console.log('Server response:', response.data);
            if(response.data == null){
                setError("usuario o contraseña incorrectos")
            }
          })
          .catch(error => {
            console.error('Error uploading form:', error.response?.data || error.message);
            setError(error.message)
          });
    }
    
    const onClick = () => {
        setError("hasdawd")
    }

    return <View>
        {myerror? <Text style={styles.textError}>{myerror}</Text> : null}
        <TextInput 
            placeholder="Nombre de usuario" 
            style={styles.textInput}
            value={user}
            onChangeText={text => setUser(text)}   
        />
        <TextInput 
            placeholder="Contraseña" 
            style={styles.textInput}
            value={passwd}
            onChangeText={text => setPasswd(text)}
            secureTextEntry  
        />
        <Button title="hola" onPress={handleUpload}/>
    </View>

} 

export default Inicio_sesion