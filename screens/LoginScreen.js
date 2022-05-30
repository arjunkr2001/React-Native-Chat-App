import React from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

const LoginScreen = () => {
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.container} >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    style={styles.input} 
                />
                <TextInput
                    placeholder='Password'
                    style={styles.input}
                    secureTextEntry 
                />
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={[styles.btn, styles.rbtn]}>
                    <Text style={{color:'white'}}>SignUp</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
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
    }
})