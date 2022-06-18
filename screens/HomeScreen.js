import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, Button, StyleSheet, Text, View, FlatList, TextInput,KeyboardAvoidingView, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://192.168.42.166:3000')

const HomeScreen = () => {
	let chatlist = useRef()
    let [userLoggedIn, setU] = useState(null);
    useEffect(() => {
		let isMounted = true;
		//get()
        async function fetchData(){
            let userLogged = await AsyncStorage.getItem('@user')
            setU(userLogged)
            //console.log(userLoggedIn) 
			//get()
        }
        fetchData()
		//get()
		socket.on('data', (data)=>{
			setMessages((prevMsgs)=>{
				return [...prevMsgs,{key:Math.random(),user:data.user,title:data.title}]
			})
			chatlist.current.scrollToEnd()
		})
		
		return () => {
			isMounted = false;
		};
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

	
	
    
    let [msg,setMsg] = useState()
    function sendMsg(){
      //if(msg != null){
      //  setMessages((prevMsgs)=>{
      //    return [...prevMsgs,{key:Math.random(),user:userLoggedIn,title:msg}]
      //  })
      //  setMsg()
      //  Keyboard.dismiss()
      //  chatlist.current.scrollToEnd()
      //}
	  if(msg != null){
		socket.emit('data',{key:Math.random(),user:userLoggedIn,title:msg})
		setMsg()
		Keyboard.dismiss()
		chatlist.current.scrollToEnd()
	  }
	  //socket.on('data', (data)=>{
		//setMessages((prevMsgs)=>{
			//return [...prevMsgs,{key:Math.random(),user:data.user,title:data.title}]
		//})
	  //})
    }
	//async function get(){
	//	await socket.on('data', (data)=>{
	//		setMessages((prevMsgs)=>{
	//			return [...prevMsgs,{key:Math.random(),user:data.user,title:data.title}]
	//		})
	//	})
	//	chatlist.current.scrollToEnd()
	//}
	

    let [messages,setMessages] = useState([])

    return(
        <View style={styles.container}>
          <View style={styles.appBar}>
            <Text style={{color: 'white',fontSize:25,fontWeight:'bold'}}>Chats</Text>
            <TouchableOpacity onPress={logOut}>
              <View style={styles.logoutbtn}>
                <Text style={{color: 'white'}}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
            {/* <Text>you are logged in</Text>
            <Text>{userLoggedIn}</Text>
            <Button title="logOut" onPress={logOut}/>
            <Button title="logUser" onPress={logUser}/> */}
            <View style={styles.chats}>
                <FlatList
                    ref={chatlist}
                    data={messages}
                    renderItem={({item})=>(
                      <View style={{padding:20,margin:10,borderWidth:2,borderRadius:15}}>
                        <Text style={{position:'absolute',top:-4,left:6,color:'gray',fontFamily:'sans-serif-condensed'}}>{item.user}</Text>
                        <Text>{item.title}</Text>
                      </View> 
                    )}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Type here..'
                    value={msg}
                    onChangeText={text => setMsg(text)}
                    style={styles.input} 
                />
                <TouchableOpacity style={styles.btn} onPress={sendMsg}>
                    <MaterialIcons name="send" size={50} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    },
    chats:{
        flex: 1,
        width: '100%',
        //alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: 'white',
        //marginBottom: 5
    },
    inputContainer:{
        width: '100%',
        height: 70,
        backgroundColor: 'white',
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent: 'space-around',
        //elevation: 20
    },
    input:{
        //flexGrow: 8,
        width: '80%',
        height: '80%',
        borderWidth:2,
        borderColor:'black',
        //marginBottom:10,
        padding:20,
        borderRadius:50,
    },
    btn:{
        // flexGrow: 1,
        width: '20%',
        alignItems: 'center'
    },
    appBar:{
      height: 60,
      width: '100%',
      backgroundColor: 'black',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20
    },
    logoutbtn:{
      padding: 5
    }
})