import React, { useState } from 'react';
import { StyleSheet,View,Image,TouchableOpacity} from 'react-native';
import {Input,Button, Card} from 'react-native-elements';
import { FontAwesome,Feather,AntDesign } from '@expo/vector-icons'; 
import {AuthContext} from "../provider/AuthProvider";
import {getDataJSON} from "../functions/AsyncStorageFunctions";

const SignInScreen=(props)=>{
    console.log(props)
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    return (
        <AuthContext.Consumer>
            {(auth)=>(
                <View style={styles.viewStyle}>
         <Card>
             <Card.Title> Welcome to Auth App</Card.Title>
             <Card.Divider></Card.Divider>
             <Input 
             leftIcon ={<FontAwesome name="envelope" size={24} color="black" />}
             placeholder='E-mail Address'
             onChangeText={function (currentInput) {
                setEmail(currentInput);
              }}
              />

             <Input 
             leftIcon ={<Feather name="key" size={24} color="black" />}
             placeholder='Password'
             onChangeText={function (currentInput) {
                setPassword(currentInput);
              }}/>
            <Button
            icon ={<AntDesign name="login" size={24} color="white"/>}
            title='  Sign In '
            type='solid'
            onPress={async function () {
                let UserData = await getDataJSON(Email);
                if (UserData.password == Password) {
                  auth.setIsLoggedIn(true);
                  auth.setCurrentUser(UserData);
                } else {
                  alert("Login Failed");
                  console.log(UserData);
                }
              }}
            />
            <Button
            type="clear"
            icon ={<AntDesign name="user" size={24} color="dodgerblue"/>}
            title=" Don't have an account?"
            onPress={function () {
                props.navigation.navigate("SignUp");
            }}
            />

         </Card>            
        </View>
            )}

        </AuthContext.Consumer>
        
         );
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



export default SignInScreen;