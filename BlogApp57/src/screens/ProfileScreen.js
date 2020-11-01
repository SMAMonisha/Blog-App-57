import React, { useState } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../provider/AuthProvider";
import {removeData} from "../functions/AsyncStorageFunctions";

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
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              },
            }}
          />
          <Card>
          <View>
              <Text style={{ alignSelf : 'center',fontWeight: "bold",fontSize: 30 }}>
                {auth.CurrentUser.name} 
              </Text>
              <Card.Divider/>
              <Text style = {styles.textStyle}>
              <Text style = {{fontWeight: "bold"}}>Student ID : </Text>{auth.CurrentUser.sid} {"\n"}
              <Text style = {{fontWeight: "bold"}}>Date of Birth : </Text>{auth.CurrentUser.DoB} {"\n"}
              <Text style = {{fontWeight: "bold"}}>Address : </Text>{auth.CurrentUser.address} {"\n"}
              <Text style = {{fontWeight: "bold"}}>Place of Work : </Text>{auth.CurrentUser.worksAt} {"\n"}
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
