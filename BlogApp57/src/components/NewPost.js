import React, { useState } from "react";
import { View } from "react-native";
import { Card, Button, Input } from "react-native-elements";
import { MaterialCommunityIcons, AntDesign,Entypo } from "@expo/vector-icons";
import moment from "moment";
import { storeDataJSON} from "../functions/AsyncStorageFunctions";
import * as firebase from "firebase";
import 'firebase/firestore';

function CurrentDate() {
    var date = new moment().format("DD/MM/YYYY");
    return date;
  }
const NewPost = ({user,props}) =>{
    const input =React.createRef();
    const [ Post, setPost] = useState("");
    console.log(user.name);
    return (
            
        <Card >
              {/* <Card.Title> Write Blog</Card.Title>
                <Card.Divider></Card.Divider> */}
                        <Input ref={input}
                        multiline={true}
                           leftIcon={<Entypo name="pencil" size={24} color="black" />}
                            placeholder="What's on your mind?"
                            onChangeText={function (currentInput) {
                                setPost(currentInput);    
                            }}
                        />                    

                        <Button
                         disabled={Post.length==0? true:false}
                            title='Post'
                            type='solid'
                            onPress={function (){                             
                                    if(Post.length>0){ 
                                        firebase
                                            .firestore()
                                            .collection("posts")
                                            .add({
                                                post:Post,
                                                user_name:user.displayName,
                                                user_email:user.email,
                                                creatTime: firebase.firestore.Timestamp.now(),
                                                likeCount:0,
                                                comments:[]
                                            }).then((docRef)=>{
                                                alert("Post ID: "+ docRef.id);
                                            })
                                            .catch((error)=> {
                                                alert(error);
                                            });
                
                                        setPost("");
                                        input.current.clear();
                                    }
                                else {
                                     alert("Input Field Empty");
                                 }
                            }
                        }
                            // onPress={function () {
                            //     var id = Math.floor(Math.random()*200);
                            //     let postDetails = {
                            //         author: user.name,
                            //         post: Post,
                            //         user_email:user.email,
                            //         date : CurrentDate(),
                            //         Like : 0,
                            //         // postOwner: postOwner,
                            //         id: "PostID"+id,
                            //     };
                            //     //console.log(postDetails); 
                            //     storeDataJSON("PostID"+id, postDetails);
                               
                            //     alert("Post added ");
                            //     setPost("");
                            //     input.current.clear();                           
                            // }}
                        />

                    </Card>
                          
    );
};
export default NewPost;