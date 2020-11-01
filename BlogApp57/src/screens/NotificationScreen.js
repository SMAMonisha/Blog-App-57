import React, { useState,useEffect } from "react";
import { View, StyleSheet,FlatList, AsyncStorage } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../provider/AuthProvider";
import NotificationCard from "../components/NotificationCard";
import {getDataJSON,storeDataJSON} from "../functions/AsyncStorageFunctions";


const NotificationScreen = (props) => {
    let[notification,setNotification]=useState([])
    const getNotification=async()=>{
      let Allnotice=await getDataJSON('notification')
      if(Allnotice!=null){
        setNotification(Allnotice)
        console.log(notification);
      }
      else{
        console.log('No notification')
      }
    } 

    useEffect(()=>{
      getNotification()
    },[])
    console.log(notification);
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          {/* <Header
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: function () {
                props.navigation.toggleDrawer();
              },
            }}
            centerComponent={{ text: "The Office", style: { color: "#fff" } }}
            rightComponent={{
              icon: "lock-outline",
              color: "#fff",
              onPress: function () {
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              },
            }}
          /> */}
          <Card>
          <View style={{ flexDirection: "row" }}>
              <Text>N</Text>
              <FlatList 
              data={notification}
              renderItem={function({item}){
               
                 if(item.receiver==auth.CurrentUser.name){
                  return(
                     
                    <NotificationCard 
                    content={item}
                    />
                  )
                }
              }}
              keyExtractor={(item, index) => index.toString()}
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

export default NotificationScreen;