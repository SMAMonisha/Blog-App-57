import React, { useState } from "react";
import { View } from "react-native";
import { Card,CardItem, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { storedataJSON,getDataJSON} from "../functions/AsyncStorageFunctions";

 const PostCard = ({content,props}) =>{
     const [Like,setLike] = useState(0);
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
        <Text >
          {content.date}
        </Text>
      </View>
             <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}>
        <Text style={{paddingVertical: 8,}}>
        {content.post}
      </Text>
             </View>
             <Card.Divider/>
             <Text style={{fontSize:20}}> {Like} </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                
        <Button buttonStyle={{}}
          type="outline"
          title=" Like "
          alignItems="Left"
          icon={<AntDesign name="like1" size={22} color="skyblue" />}
          onPress={function (){
            setLike(Like+1)
            //storeDataJSON("PostID"+id, postDetails);
         }}
        />
         
      
        <Button type="solid" title="Comment" 
         onPress={function (){
            let postID =content.id
            props.navigation.navigate("Comment",postID)
         }}
         />
      </View>
         </Card>
     )
 }

 export default PostCard;