import React, { useState } from 'react';
import { StyleSheet,View,Image,TouchableOpacity, AsyncStorage} from 'react-native';
import {Input,Button, Card} from 'react-native-elements';
import {MaterialIcons, FontAwesome,Feather,AntDesign } from '@expo/vector-icons'; 
import {AuthContext} from "../provider/AuthProvider";
import {getDataJSON} from "../functions/AsyncStorageFunctions";

const SignInScreen=(props)=>{

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
             secureTextEntry={true}
             onChangeText={function (currentInput) {
                setPassword(currentInput);
              }}/>
            <Button
            // disabled={Email.length==0? true:false}
            icon ={<AntDesign name="login" size={24} color="white"/>}
            title='  Sign In '
            type='solid'
            
            onPress={async function () {
              if(Email.length!=0 && Password.length!=0)
              {
                let UserData = await getDataJSON(Email);
               
                if (UserData.password == Password) {
                  auth.setIsLoggedIn(true);
                  auth.setCurrentUser(UserData);
                } else {
                  alert("Login Failed");
                
                }
              }
              else 
                  alert("Insert Email & Password");
                
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
             <Button
            type="clear"
            icon ={<MaterialIcons name="clear" size={22} color="black" />}
            title=" Clean App"
            onPress={function () {
                AsyncStorage.clear()
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