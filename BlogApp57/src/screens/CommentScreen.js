import React, { useEffect, useState } from "react";
import { View, StyleSheet, AsyncStorage, FlatList } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../provider/AuthProvider";
import AddComment from "../components/AddComment";
import CommentCard from "../components/CommentCard";

import { getDataJSON } from "../functions/AsyncStorageFunctions";

const CommentScreen = ({navigation,route}) =>{
    let postId =route.params;
    const [AllComments, setAllComments] = useState([]);
    const [postDetails, setpostDetails] = useState({});

    const getpostdetails = async () => {
        let postDetails = await getDataJSON(postId);
        if (postDetails != null) {
          setpostDetails(postDetails);
        } else {
          console.log("no post");
        }
      };

      const getComments = async () => {
        let Allkeys = await AsyncStorage.getAllKeys();
        
        let comments = [];
        if (Allkeys != null) {
          for (let key of Allkeys) {
            if (key.startsWith("commentId")) {
              let comment = await getDataJSON(key);
              comments.push(comment);
            }
          }
          setAllComments(comments);
        } else {
          console.log("No keys");
        }
      };
      useEffect(() => {
        getpostdetails();
      }, []);
      useEffect(() => {
        getComments();
      });


      return(
        <AuthContext.Consumer>
                  {(auth) => (
            <View style={styles.viewStyle}>
          
              <Card>
                <Text>{postDetails.author}</Text>
                <Text>{postDetails.date}</Text>
                <Text>{postDetails.post}</Text>
              </Card>
              <AddComment postDetails={postDetails} user={auth.CurrentUser.name}/>
              <FlatList 
              data={AllComments}
              renderItem={function({item}){
                  if(postDetails.id==item.postId)
                  {
                    return(
                        <CommentCard 
                        content={item}/>
                      )
                  }              
              }}
              keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
        </AuthContext.Consumer>
    )
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
  
  export default CommentScreen;


