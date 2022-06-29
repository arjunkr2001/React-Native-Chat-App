import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

let gL = {}

const LoginScreen = () => {
    let userLoggedIn = null;
    useEffect(() => {
        (async function fetchData(){
            userLoggedIn = await AsyncStorage.getItem('@user')
            console.log(userLoggedIn) 
        })();
        //fetchData()

        // const [location, setLocation] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);

  
        (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        let address = await Location.reverseGeocodeAsync(location.coords)
        //setLocation(location);
        console.log(address)
        //setLocation(JSON.stringify(address))
        //console.log(location)
        gL.ad = address
        })();

    },[])
    
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    const navigation = useNavigation()

    function handleSignUp(){
        if(email != '' && password != ''){
            Keyboard.dismiss()
            console.log(email.split("@")[0])
            storeData(email.split("@")[0])
            ToastAndroid.show("Registerd :)", ToastAndroid.SHORT);
        }
    }
    function handleLogIn(){
        Keyboard.dismiss()
        async function fetchData(){
            let userLoggedIn = await AsyncStorage.getItem('@user')
            console.log(userLoggedIn)
            if(userLoggedIn != null){
                navigation.replace("Home") 
            } 
        }
        fetchData()
    }

    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('@user', value)
        } catch (e) {
          // saving error
        }
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
export {gL}

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