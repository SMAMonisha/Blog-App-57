import React,{useState} from 'react';
import { View ,StyleSheet} from 'react-native';
import { Card, Button ,Input} from 'react-native-elements';
import { storeDataJSON} from "../functions/AsyncStorageFunctions";
import NotificationFunction from '../functions/NotificationFunction';
import NotificationScreen from '../screens/NotificationScreen';

const NewComment=({postDetails,user})=>{
    const [comment,setComment]=useState("")
    return(
        <Card>
            <View style={{flexDirection:'row'}}>
                <Input 
                placeholder="Comment Here :"
                onChangeText={function (inputComment) {
                    setComment(inputComment);
                  }}
                  rightIcon={<Button 
                  title="Comment"
                  type="outline"
                  onPress={function(){
                    var id = Math.floor(Math.random() * 200);
                      let currentComment={
                          postId:postDetails.id,
                          comment:comment,
                          author:user,
                          receiver:postDetails.author,
                          commentId:'commentId'+id
                      }
                      NotificationFunction(currentComment);
                      storeDataJSON("commentId"+id,currentComment)
                      
                  }}/>}
                multiline={true}/>
            </View>
        </Card>
    )
}

export default NewComment;