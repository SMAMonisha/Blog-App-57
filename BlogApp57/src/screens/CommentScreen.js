import React, { useEffect, useState } from "react";
import { View, StyleSheet, AsyncStorage, FlatList } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../provider/AuthProvider";
import AddComment from "../components/AddComment";
import CommentCard from "../components/CommentCard";
import { getDataJSON } from "../functions/AsyncStorageFunctions";
import * as firebase from "firebase";
import 'firebase/firestore';

const CommentScreen = ({navigation,route}) =>{
  //console.log(route.params);
    //let Post =route.params.data;
    let postid =route.params;
    // const [AllComments, setAllComments] = useState([]);
    const [Post, setPosts] = useState({});
    //let creatTime=Post.creatTime.toDate().toDateString();
    const [Comments,setComment]=useState([]);
    // const getpostdetails = async () => {
    //     let postDetails = await getDataJSON(postId);
    //     if (postDetails != null) {
    //       setpostDetails(postDetails);
    //     } else {
    //       console.log("no post");
    //     }
    //   };
    const getpostdetails=async()=>{
      firebase
        .firestore()
        .collection("posts")
        .doc(postid)
        .get()
        .then((doc)=>{
            let post=doc.data()
            post.id=postid
            post.creatTime=post.creatTime.toDate().toDateString()
            console.log(post)
            setPosts(post)
        })
        .catch((error)=>console.log(error));
  }
    const getComments=async()=>{
      firebase
      .firestore()
      .collection("notifications")
      //.orderBy("creatTime","desc")
      .onSnapshot((querySnapshot)=>{
          let allComment=[]
          querySnapshot.forEach((docRef)=>{
            //console.log(docRef.data())
              allComment.push({
                  id:docRef.id,
                  data:docRef.data(),
              });
          });
          //console.log(allComment)
          if(allComment!=null){
              let Comment=allComment.filter(c=>c.data.postId==postid && c.data.comments!=undefined)
              setComment(Comment)
          }
          else console.log("no comment")
          //setReload(false)
      },(error)=>{
          //setReload(false);
          console.log(error);
      });
   // console.log(Comments)
      // const getComments = async () => {
      //   firebase
      //     .firestore()
      //     .collection("notifications")
      //     .onSnapshot((querySnapshot)=>{
      //         querySnapshot.forEach((doc)=>{
      //             let AllComments=[]
      //             AllComments.push({
      //                 id:doc.id,
      //                 data:doc.data(),
      //             });
      //         });
      //         if(AllComments!=null){
      //             let Comment=AllComments.filter(c=>c.data.postid==postId && c.data.comment!=undefined)
      //             setComment(Comment)
      //         }
      //         else console.log("no comment")
      //         //setReload(false)
      //     },(error)=>{
      //         //setReload(false);
      //         console.log(error);
      //     });
        // let Allkeys = await AsyncStorage.getAllKeys();      
        // let comments = [];
        // if (Allkeys != null) {
        //   for (let key of Allkeys) {
        //     if (key.startsWith("commentId")) {
        //       let comment = await getDataJSON(key);
        //       comments.push(comment);
        //     }
        //   }
        //   setAllComments(comments);
        // } else {
        //   console.log("No keys");
        // }
      };
      // useEffect(() => {
      //   getpostdetails();
      // }, []);
      useEffect(() => {
        getComments();
        getpostdetails();
      },[]);


      return(
        <AuthContext.Consumer>
                  {(auth) => (
            <View style={styles.viewStyle}>
          
              <Card>
                <Text>{Post.user_name}</Text>
                <Text style={{color:"green"}}>{Post.creatTime}</Text>
                <Text style={{fontSize:16}}>{Post.post}</Text>
              </Card>
              <AddComment post={Post} user={auth.CurrentUser.displayName}/>
              <FlatList 
              data={Comments}

              renderItem={function({item}){
                  if(postid==item.data.postId)
                 {
                    return(
                        <CommentCard 
                        content={item.data}/>
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


