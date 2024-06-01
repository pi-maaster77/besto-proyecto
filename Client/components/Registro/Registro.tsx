import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import styles from "./Styles";
import axios from "axios";

function Registro ( ) {
    const [myerror, setError] = useState("")
    const [user, setUser] = useState("")
    const [passwd, setPasswd] = useState("")
    const [cpasswd, setCPasswd] = useState("")
    function handleUpload (){
        if(!user || !passwd || !cpasswd){
            setError("no se ingreso el usuario o la contraseña")
            return
        }
        if(passwd !== cpasswd){
            setError("las contraselas no coinciden")
            return
        }
        const formData = new FormData();
        formData.append('user', user)
        formData.append('passwd', passwd)
        axios.post('http://localhost:5000/register', formData, {
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
            placeholder="Nombre de Usuario" 
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
        <TextInput 
            placeholder="Confirmar Contraseña" 
            style={styles.textInput}
            value={cpasswd}
            onChangeText={text => setCPasswd(text)}
            secureTextEntry  
        />
        <Button title="hola" onPress={handleUpload}/>
    </View>

} 

export default Registro