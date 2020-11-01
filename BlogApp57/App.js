import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeScreen from './src/screens/HomeScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import CommentScreen from './src/screens/CommentScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';

import { Entypo,Ionicons,AntDesign } from '@expo/vector-icons';
import {AuthContext, AuthProvider } from "./src/provider/AuthProvider";

const HomeStack = createStackNavigator()
const AuthStack = createStackNavigator()
const HomeTab = createMaterialBottomTabNavigator();
const AppDrawer = createDrawerNavigator();
const CommentStack =createStackNavigator();

const AppDrawerScreen =() =>{
  return (
    <AppDrawer.Navigator initialRouteName="Home" >
      <AppDrawer.Screen name="Home" component={CommentStackScreen} />
      <AppDrawer.Screen name="Profile" component={ProfileScreen}/>
    </AppDrawer.Navigator>
  )
}

const HomeTabScreen =() =>{
  return (
    <HomeTab.Navigator initialRouteName= 'Home'>
      <HomeTab.Screen 
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ focused }) =>
          focused ? (
            <Entypo name="home" color="white" size={26} />
          ) : (
            <AntDesign name="home" color="white" size={22} />
          ),
      }}
      />
      <HomeTab.Screen name="Notification" component={NotificationScreen}
     options={{
      tabBarLabel: "Notifications",
      tabBarIcon: ({ focused }) =>
        focused ? (
          <Ionicons name="ios-notifications" size={26} color="white" />
        ) : (
          <Ionicons
            name="ios-notifications-outline" size={22} color="white"
          />
        ),
    }}
     />
    </HomeTab.Navigator>
  )
}

const AuthStackScreen =() =>{
  return (
    <AuthStack.Navigator initialRouteName='SignIn'>
      <AuthStack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false}}/>
      <AuthStack.Screen name="SignIn" component={SignInScreen} options={{headerShown:false}}/>
    </AuthStack.Navigator>
  )
}

const CommentStackScreen =() =>{
  return (
    <CommentStack.Navigator initialRouteName='Home'>
      <CommentStack.Screen name="Home" component={HomeTabScreen} />
      <CommentStack.Screen name="Comment" component={CommentScreen} />
    </CommentStack.Navigator>
  )
}

function App(){
  return(
    <AuthProvider>
      <AuthContext.Consumer>
      {(auth)=> (
       <NavigationContainer>
         {auth.IsLoggedIn ? <AppDrawerScreen/> : <AuthStackScreen/> }
       
        </NavigationContainer>)
      } 
      </AuthContext.Consumer>
    </AuthProvider>   
  );
}


export default App;