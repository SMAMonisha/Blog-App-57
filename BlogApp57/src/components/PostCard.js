import React, { useState } from "react";
import { View } from "react-native";
import { Card,CardItem, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { mergeData,getDataJSON} from "../functions/AsyncStorageFunctions";
import * as firebase from "firebase";
import 'firebase/firestore';

 const PostCard = ({content,props}) =>{
     //const [Like,setLike] = useState(content.like);
     const Like =content.data.likeCount;
     const Date =content.data.creatTime.toDate().toDateString();

     return(
         <Card >
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
          {content.data.user_name}
        </Text>
        <Text note>
          {Date}
        </Text>
      </View>
             <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}>
        <Text style={{paddingVertical: 8,}}>
        {content.data.post}
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
          onPress={
            async ()=>{
              await firebase
                        .firestore()
                        .collection("posts")
                        .doc(content.id)
                        .update(
                        {
                          likeCount:Like+1
                        })
                        .catch((error)=>{
                          console.log(error)
                        });
              //await mergeData(content.id,JSON.stringify({Like:Like+1}));
            //setLike(Like+1)
            //storeDataJSON("PostID"+id, postDetails);
         }}
        />
         
      
        <Button type="solid" title="Comment" 
         onPress={function (){
            let postID =content
            props.navigation.navigate("Comment",postID)
         }}
         />
      </View>
         </Card>
     )
 }

 export default PostCard;