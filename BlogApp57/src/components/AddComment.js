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
                <Input  ref={input}
                placeholder="Comment Here :"
                onChangeText={function (input) {
                    setComment(input);
                  }}
                  rightIcon={<Button 
                    disabled={comment.length==0? true:false}
                  title="Comment"
                  type="outline"
<<<<<<< HEAD
                  onPress= {  function(){
=======
                  onPress= { async function(){
>>>>>>> main
                    var id = Math.floor(Math.random() * 200);
                      let currentComment={
                          postId:postDetails.id,
                          comment:comment,
                          author:user,
                          receiver:postDetails.author,
                          commentId:'commentId'+id
                      };
                   
<<<<<<< HEAD
                       storeDataJSON("commentId"+id,currentComment);
                       NotificationFunction(currentComment);
                    
                      setComment("");
                      input.current.clear();
                  }}
                 />}
                 multiline={true}
                 ref={input}
                />
=======
                      await storeDataJSON("commentId"+id,currentComment);
                      await NotificationFunction(currentComment);
                    
                      setComment("");
                    input.current.clear();
                  }}/>}
                multiline={true}
                ref={input}/>
>>>>>>> main
            </View>
        </Card>
    )
}

export default NewComment;