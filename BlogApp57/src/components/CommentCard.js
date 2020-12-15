import React from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";

const CommentCard = ({content})=>{
    return (
        <Card>
            <Text style={{color:"blue"}}>{content.sender}</Text>
            <Text>{content.comments}</Text>
        </Card>
    );
}

export default CommentCard;