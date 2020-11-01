import React from "react";
import {Card,Text} from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons';

const NotificationCard=({content})=>{
return(
    <Card>
        <Card.Title title={content.author} subtitle=' commented on your post' left={()=><MaterialIcons name="insert-comment" size={22} color="black" />} />
  
    </Card>
)
}

export default NotificationCard;