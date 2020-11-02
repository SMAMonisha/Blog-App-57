import React from "react";
import {Card,Text} from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons';

const NotificationCard=({content,props})=>{
    //console.log(props)
    //onPress={()=>props.navigation.navigate('Comment',{post:content.postId})}
    //  onPress={function (){
    //     let postID =content.id
    //     props.navigation.navigate("Comment",postID)
    //  }}
return(
    <Card style={{borderRadius:10,shadowColor:'blue', shadowOffset:10, marginTop:5,marginLeft:5,marginRight:5}}onPress={function (){
        let postID =content.postId
        props.navigation.navigate("Comment",postID)
     }} >
        <Card.Title title={content.author} subtitle=' commented on your post' left={()=><MaterialIcons name="insert-comment" size={22} color="black" />} />
  
    </Card>
)
}

export default NotificationCard;