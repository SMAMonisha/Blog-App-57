import React, { useState,useEffect } from 'react';
import {Text, StyleSheet,View,Image,TouchableOpacity} from 'react-native';
import {Input,Button, Card} from 'react-native-elements';
import { FontAwesome,Feather,AntDesign,Ionicons } from '@expo/vector-icons'; 
import {storeDataJSON} from '../functions/AsyncStorageFunctions';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from "firebase";
import 'firebase/firestore';

const SignUpScreen=(props)=>{
    
    const [Name, setName] = useState("");
    const [SID, setSID] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [image,setImage] = useState(null);

    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);
  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };
    return (
        <View style={styles.viewStyle}>
          <Image
                style = {styles.imageStyle}
                source = {require('./../../assets/blog.jpg')}
            /> 
        <Card>
            <Card.Title> Welcome to Auth App</Card.Title>
            <Card.Divider></Card.Divider>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 50, height: 50 }} 
            />} 
            <Input 
            leftIcon ={<AntDesign name="user" size={24} color="black" />}
            placeholder="Name"
            onChangeText={function (currentInput) {
                setName(currentInput);
              }}
              />

            <Input 
          leftIcon={<Ionicons name="ios-school" size={24} color="black" />}
          placeholder="Student ID"
            onChangeText={function (currentInput) {
                setSID(currentInput);
              }}
              />

            <Input 
            leftIcon ={<FontAwesome name="envelope" size={24} color="black" />}
            placeholder="E-mail Address"
            onChangeText={function (currentInput) {
                setEmail(currentInput);
              }}
              />

            <Input 
            leftIcon ={<Feather name="key" size={24} color="black" />}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={function (currentInput) {
                setPassword(currentInput);
              }}
            />
           <Button
           icon ={<AntDesign name="login" size={24} color="white"/>}
           title='  Sign Up '
           type='solid'
           onPress={function () {    
            if (Name && SID && Email && Password) {
                
            firebase
            .auth()
            .createUserWithEmailAndPassword(Email,Password)
            .then(
            (userCreds)=>{
                userCreds.user.updateProfile({displayName:Name});
                firebase
                  .firestore().collection('users').doc(userCreds.user.uid).set({
                    name:Name,
                    sid:SID,
                    email:Email,
                })
                .then(()=>{
                    alert(userCreds.user.uid+" Account Created")
                    props.navigation.navigate("SignIn");
                })
            })
            .catch((error)=>{
                alert(error)
            })      
            }
            // let currentUser = {
            //     name: Name,
            //     sid: SID,
            //     email: Email,
            //     password: Password,
            //     image : image,
            //   };
            //   storeDataJSON(Email, currentUser);
        
            //    props.navigation.navigate("SignIn");
           }}
           />
           <Button
           type="clear"
           icon ={<AntDesign name="user" size={24} color="dodgerblue"/>}
           title=" Already have an account?"
           onPress={function () {
            props.navigation.navigate("SignIn");
          }}
           />

        </Card>
                    
       </View>
         )
};

const styles=StyleSheet.create(
    {
        viewStyle:{
            flex:1,
            justifyContent:'center',
            backgroundColor: '#78c6f0',
            textAlign : "center",
        },
        imageStyle:
        {
            width: 400, 
            height: 100,
            alignSelf: 'center' 
        },
       
    }    
);

export default SignUpScreen;