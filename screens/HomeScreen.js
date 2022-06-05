import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Button, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

const HomeScreen = () => {
    let [userLoggedIn, setU] = useState(null);
    useEffect(() => {
        async function fetchData(){
            let userLogged = await AsyncStorage.getItem('@user')
            setU(userLogged)
            //console.log(userLoggedIn) 
        }
        fetchData()
    },[])

    const navigation = useNavigation()

    let logOut = async () => {
        try {
          await AsyncStorage.removeItem('@user')
        } catch(e) {
          // remove error
        }
      
        console.log('Logged Out.')
        navigation.replace("Login")
    }

    function logUser(){
        AsyncStorage.getItem('@user').then((val)=>{console.log(val)})
    }

    return(
        <View>
            <Text>you are logged in</Text>
            <Text>{userLoggedIn}</Text>
            <Button title="logOut" onPress={logOut}/>
            <Button title="logUser" onPress={logUser}/>
        </View>
    )
}

export default HomeScreen