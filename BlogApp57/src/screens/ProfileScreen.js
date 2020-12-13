import React, { useState } from "react";
import { View,Image, StyleSheet, AsyncStorage } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../provider/AuthProvider";
import {removeData} from "../functions/AsyncStorageFunctions";
import * as firebase from "firebase";

const ProfileScreen = (props) => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <Header
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: function () {
                props.navigation.toggleDrawer();
              },
            }}
            centerComponent={{ text: "Profile", style: { color: "#fff" } }}
            rightComponent={{
              icon: "lock-outline",
              color: "#fff",
              onPress: function () {
                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    auth.setIsLoggedIn(false);
                    auth.setCurrentUser({});
                  })
                  .catch((error) => {
                    alert(error);
                  });
              },
              // onPress: function () {
              //   auth.setIsLoggedIn(false);
              //   auth.setCurrentUser({});
              // },
            }}
          />
          <Card>
          <View>
              <Text style={{ alignSelf : 'center',fontWeight: "bold",fontSize: 30 }}>
                {auth.CurrentUser.name} 
              </Text>
              <Card.Divider/>
              {auth.CurrentUser.image && <Image source = {{uri : auth.CurrentUser.image}} 
              style={{ width: 100, 
              height: 100,
               alignSelf: 'center'   }}/> }
              <Text style = {styles.textStyle}>
              <Text style = {{fontWeight: "bold",fontSize:24}}>Student ID : {auth.CurrentUser.sid} </Text >{"\n"}
              <Text style = {{fontWeight: "bold",fontSize:24}}>Email : {auth.CurrentUser.email} </Text>{"\n"}
              <Text style = {{fontWeight: "bold",fontSize:24}}>Address : {auth.CurrentUser.address}</Text> {"\n"}
              <Text style = {{fontWeight: "bold",fontSize:24}}>Place of Work : {auth.CurrentUser.worksAt}</Text> {"\n"}
              </Text>
            <Button
            title = 'Delete Account'
            type = "solid"
            onPress={
                async function(){
                    await removeData(auth.CurrentUser.email);
                    auth.setIsLoggedIn(false);
                    
                }
            }
            />
            </View>
          </Card>
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
});

export default ProfileScreen;
