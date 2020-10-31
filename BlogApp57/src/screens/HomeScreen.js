
import React, { useState } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from "react-native";
import {
    Card,
    Button,
    Text,
    Avatar,
    Input,
    Header,
} from "react-native-elements";
// import PostCard from "./../components/PostCard";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../provider/AuthProvider";
import { storeDataJSON, getDataJSON } from '../functions/AsyncStorageFunctions';


const HomeScreen = (props) => {
    const [post, setPost] = useState("");
    const [postOwner, setPostOwner] = useState("");
    return (
        <AuthContext.Consumer>
            {(auth) => (
                <View style={styles.viewStyle}>
                    <Header
                        leftComponent={{
                            icon: "menu",
                            color: "#fff",
                            onPress: function () {
                                props.navigation.toggleDrawer();
                            },
                        }}
                        centerComponent={{ text: "The Office", style: { color: "#fff" } }}
                        rightComponent={{
                            icon: "lock-outline",
                            color: "#fff",
                            onPress: function () {
                                auth.setIsLoggedIn(false);
                                auth.setCurrentUser({});
                            },
                        }}
                    />
                    <Text style={styles.textStyle}> Welcome {auth.CurrentUser.name}  </Text>
                    <Text style={styles.textStyle}>Home </Text>
                    <Card>
                        <Card.Title> Write Blog</Card.Title>
                        <Card.Divider></Card.Divider>

                        <Input
                            leftIcon={<AntDesign name="user" size={24} color="black" />}
                            placeholder="What's on your mind?"
                            onChangeText={function (currentInput) {
                                setPost(currentInput);
                                setPostOwner(auth.CurrentUser.email);

                            }}
                        />
                     


                        <Button
                            title='  Post '
                            type='solid'
                            onPress={function () {

                                let postDetails = {
                                    post: post,
                                    postOwner: postOwner
                                };
                                storeDataJSON(postOwner, postDetails);

                                alert("Post added ");
                              
                            }}
                        />

                    </Card>

                </View>)}
        </AuthContext.Consumer>
    );
};

const styles = StyleSheet.create(
    {
        textStyle: {
            fontSize: 22,
            color: '#000001',
            textAlign: "center",
        },

    }
);

export default HomeScreen;