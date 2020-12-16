import React, { useState,useEffect } from "react";
import { View, StyleSheet,FlatList, AsyncStorage } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../provider/AuthProvider";
import NotificationCard from "../components/NotificationCard";
import {getDataJSON,storeDataJSON} from "../functions/AsyncStorageFunctions";
import * as firebase from "firebase";
import "firebase/firestore";


const NotificationScreen = (props) => {
    let[notification,setNotification]=useState([])
    const getNotification=async()=>{
    //   let Allnotice=await getDataJSON('notification')
    //   if(Allnotice!=null){
    //     setNotification(Allnotice)
    //     console.log(notification);
    //   }
    //   else{
    //     console.log('No notification')
    //   }
     firebase
      .firestore()
      .collection("notifications")
      .onSnapshot((querySnapshot)=>{
          let allNotify=[]
          querySnapshot.forEach((doc)=>{
              allNotify.push({
                  id:doc.id,
                  data:doc.data(),
              });
          });
          if(allNotify!=null){
              setNotification(allNotify)
          }
          else console.log("no Notification")
         // setReload(false)
      },(error)=>{
          //setReload(false);
          console.log(error);
      });
    } 

    useEffect(()=>{
      getNotification()
    },[])
    console.log(notification);
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
                        centerComponent={{ text: "Blog App", style: { color: "#fff" } }}
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
                            //     auth.setIsLoggedIn(false);
                            //     auth.setCurrentUser({});
                            // },
                        }}
                    />
          <Card>
          <View style={{ flexDirection: "row" }}>
         
              {/* <Text>N</Text> */}
              <FlatList 
              data={notification}
              renderItem={function({item}){
               
                 if(item.data.receiver==auth.CurrentUser.email){
                  return(
                     
                    <NotificationCard 
                    content={item.data} props={props}
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