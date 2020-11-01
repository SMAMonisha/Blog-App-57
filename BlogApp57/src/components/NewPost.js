import React, { useState } from "react";
import { View } from "react-native";
import { Card, Button, Input } from "react-native-elements";
import { MaterialCommunityIcons, AntDesign,Entypo } from "@expo/vector-icons";
//mport moment from "moment";
import { storeDataJSON} from "../functions/AsyncStorageFunctions";

// function CurrentDate() {
//     var date = new moment().format("DD/MM/YYYY");
//     return date;
//   }
const NewPost = ({user,props}) =>{
    const [ Post, setPost] = useState("");
    console.log(user.name);
    return (
            
        <Card>
              <Card.Title> Write Blog</Card.Title>
                <Card.Divider></Card.Divider>

                        <Input
                           leftIcon={<Entypo name="pencil" size={24} color="black" />}
                            placeholder="What's on your mind?"
                            onChangeText={function (currentInput) {
                                setPost(currentInput);    

                            }}
                        />                    

                        <Button
                            title='Post'
                            type='solid'
                            onPress={function () {
                                var id = Math.floor(Math.random()*200);
                                let postDetails = {
                                    author: user.name,
                                    post: Post,
                                    //date : CurrentDate(),
                                    // postOwner: postOwner,
                                    id: "PostID"+id,
                                };
                                console.log(postDetails);
                                
                                storeDataJSON("PostID"+id, postDetails);
                          
                                alert("Post added ");
                              
                            }}
                        />

                    </Card>
                          
    );
};
export default NewPost;