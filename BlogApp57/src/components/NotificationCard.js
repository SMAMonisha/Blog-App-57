import React from "react";
import {Card,Text} from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons';

const NotificationCard=({content,props})=>{
    console.log(content.data.postId);

return(
    <Card style={{borderRadius:10,shadowColor:'blue', shadowOffset:10, marginTop:5,marginLeft:5,marginRight:5}}onPress={function (){
        let postID =content.data.postId
        props.navigation.navigate("Comment",postID)
     }} >
        <Card.Title title={content.data.sender} subtitle=' commented on your post' left={()=><MaterialIcons name="insert-comment" size={22} color="black" />} />
  
    </Card>
)
}

export default NotificationCard;