import React from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { getDataJSON} from "../functions/AsyncStorageFunctions";

 const PostCard = ({content,props}) =>{
     
     return(
         <Card>
             <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar
          containerStyle={{ backgroundColor: "skyblue" }}
          rounded
          icon={{ name: "user", type: "font-awesome", color: "black" }}
          activeOpacity={1}
        />
        <Text h4Style={{ padding: 10 }} h4>
          {content.author}
        </Text>
      </View>
             <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}>
        <Text style={{paddingVertical: 10,}}>
        {content.post}
      </Text>
             </View>
         </Card>
     )
 }

 export default PostCard;