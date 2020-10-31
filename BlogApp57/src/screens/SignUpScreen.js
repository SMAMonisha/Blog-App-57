import React, { useState } from 'react';
import {Text, StyleSheet,View,Image,TouchableOpacity} from 'react-native';
import {Input,Button, Card} from 'react-native-elements';
import { FontAwesome,Feather,AntDesign,Ionicons } from '@expo/vector-icons'; 
import {storeDataJSON} from '../functions/AsyncStorageFunctions';

const SignUpScreen=(props)=>{
    console.log(props)
    const [Name, setName] = useState("");
    const [SID, setSID] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    return (
        <View style={styles.viewStyle}>
        <Card>
            <Card.Title> Welcome to Auth App</Card.Title>
            <Card.Divider></Card.Divider>

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
            console.log("sign");

            let currentUser = {
                name: Name,
                sid: SID,
                email: Email,
                password: Password,
              };
              storeDataJSON(Email, currentUser);
        
               props.navigation.navigate("SignIn");
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
            backgroundColor: '#8df7f6',
            textAlign : "center",
        },
       
    }    
);

export default SignUpScreen;