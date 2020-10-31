import React from 'react';
import {Text, StyleSheet,View,Image,TouchableOpacity} from 'react-native';
import {AuthContext } from "../provider/AuthProvider";
import { Button } from 'react-native-elements';

const HomeScreen=(props)=>{
    console.log(props)
    return (
        <AuthContext.Consumer>
            {(auth)=>(
            <View>
             <Text style={styles.textStyle}>Department of CSE </Text>
             <Text style={styles.textStyle}>Program : SWE </Text>
           <Button
           type="outline"
           title="Log Out"
           onPress={function(){
               auth.setIsLoggedIn(false);
           }
        }
           />
           
        </View>)}
        </AuthContext.Consumer>   
         );
};

const styles=StyleSheet.create(
    {
        textStyle:{
            fontSize:22,
            color: '#000001',
            textAlign : "center",
        },
       
    }    
);

export default HomeScreen;