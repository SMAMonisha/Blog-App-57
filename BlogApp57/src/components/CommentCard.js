import React from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";

const CommentCard = ({content})=>{
    return (
        <Card>
            <Text style={{color:"blue"}}>{content.author}</Text>
            <Text>{content.comment}</Text>
        </Card>
    );
}

export default CommentCard;