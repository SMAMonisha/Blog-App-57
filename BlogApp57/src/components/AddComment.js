import React,{useState} from 'react';
import { View ,StyleSheet} from 'react-native';
import { Card, Button ,Input} from 'react-native-elements';
import { getDataJSON, storeDataJSON} from "../functions/AsyncStorageFunctions";
import NotificationFunction from '../functions/NotificationFunction';

const NewComment=({postDetails,user})=>{
    const input =React.createRef();
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
                  onPress= { async function(){
                    var id = Math.floor(Math.random() * 200);
                      let currentComment={
                          postId:postDetails.id,
                          comment:comment,
                          author:user,
                          receiver:postDetails.author,
                          commentId:'commentId'+id
                      };
                   
                      await storeDataJSON("commentId"+id,currentComment);
                      await NotificationFunction(currentComment);
                    
                      setComment("");
                    input.current.clear();
                  }}/>}
                multiline={true}
                ref={input}/>
            </View>
        </Card>
    )
}

export default NewComment;