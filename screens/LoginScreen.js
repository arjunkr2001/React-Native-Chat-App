import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

const LoginScreen = () => {
    
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    const navigation = useNavigation()

    function handleSignUp(){
        Keyboard.dismiss()
    }
    function handleLogIn(){
        Keyboard.dismiss()
        navigation.navigate("Home")
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.container} >
            <Text style={styles.heading}>Login</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input} 
                />
                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry 
                />
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity
                 style={[styles.btn, styles.rbtn]}
                 onPress={handleSignUp}
                >
                    <Text style={{color:'white'}}>SignUp</Text>
                </TouchableOpacity>
                <TouchableOpacity
                 style={styles.btn}
                 onPress={handleLogIn}
                >
                    <Text>LogIn</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    },
    inputContainer:{
        width: '80%'
    },
    input:{
        width: '100%',
        borderWidth:2,
        borderColor:'black',
        marginBottom:10,
        padding:20,
        borderRadius:50,
    },
    btnContainer:{
        flexDirection:'row',
        width:'80%',
        marginTop: 20
    },
    btn:{
        borderWidth: 2,
        padding: 20,
        borderRadius: 50,
        flexGrow:1,
        alignItems:'center',
    },
    rbtn:{
        backgroundColor:'black',
        marginRight:10
    },
    heading:{
        fontSize: 40,
        marginBottom: 50,
    }
})