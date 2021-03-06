
import React, { useState ,useEffect} from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,AsyncStorage,
} from "react-native";
import {
    Card,
    Button,
    Text,
    Avatar,
    Input,
    Header,
} from "react-native-elements";
 import PostCard from "../components/PostCard";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../provider/AuthProvider";
import { storeDataJSON, getDataJSON, removeData } from '../functions/AsyncStorageFunctions';
import NewPost from "../components/NewPost";
import * as firebase from "firebase";

const HomeScreen = (props) => {
    const [AllPosts,setAllPosts] = useState([]);
    const [Loading,setLoading] = useState(false);
    const getPost = async () =>{
        setLoading(true);
        firebase
            .firestore()
            .collection("posts")
            .orderBy("creatTime","desc")
            .onSnapshot((querySnapshot)=>{
                let Posts=[]
                querySnapshot.forEach((doc)=>{
                    Posts.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                setAllPosts(Posts);
                setLoading(false);      
            },(error)=>{
                setLoading(false);      
                console.log(error);
            });
        //setLoading(false);      

        //let AKeys =await AsyncStorage.getAllKeys();
        // let posts=[];
        // if (AKeys != null) {
        //     for (let key of AKeys) {
        //       if(key.startsWith("PostID")){
        //        let post = await getDataJSON(key);
        //         posts.push(post);
        //       } 
        //     }
        //     setAllPosts(posts);
               

        //   }
        //   else{
        //     console.log('No keys')
        //   }   
    };
    //console.log(AllPosts);
    useEffect(() => {
        getPost();
        setLoading(false); 
      });


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
                            // onPress: function () {
                            //     auth.setIsLoggedIn(false);
                            //     auth.setCurrentUser({});
                            // },
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
                        }}
                    />
                    <Text style={styles.textStyle  }> Welcome {auth.CurrentUser.name}  </Text>
                    <NewPost user={auth.CurrentUser}  props={props}/>
             <ActivityIndicator size="large" color="Pink" animating={Loading}/>
            <FlatList style={styles.flatStyle}
            data={AllPosts}
            renderItem={function ({ item }) {
              return (<PostCard 
                content={item}
                props={props}                
                />);
            }}
            keyExtractor={(item, index) => index.toString()}
          />
         
                    
                </View>)}
        </AuthContext.Consumer>
    );
};

const styles = StyleSheet.create(
    {
        textStyle: {
            fontSize: 22,
            color: '#000001',
            textAlign: "center",
        },
        flatStyle:{
            paddingTop:5,
            paddingBottom:10,
            marginBottom:20,
            marginTop: 5
        },
        viewStyle: {
            flex: 1,
          },

    }
);

export default HomeScreen;