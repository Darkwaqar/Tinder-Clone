import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useRoute } from "@react-navigation/native";
import getMatchUserInfo from "../lib/getMatchedUserInfo";
import useAuth from "../hooks/useAuth";
import tw from "twrnc";
import { Keyboard } from "react-native";
import SendMessage from "../components/SendMessage";
import ReceiverMessage from "../components/ReceiverMessage";
import { firebase } from "@react-native-firebase/firestore";

const MessageScreen = () => {
  const { user } = useAuth();
  const route = useRoute();
  const { matchDetails } = route.params;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    firebase
      .firestore()
      .collection("matches")
      .doc(matchDetails.id)
      .collection("messages")
      .add({
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        userId: user.uid,
        displayName: user.displayName,
        photoURL: matchDetails.users[user.uid].photoURL,
        message: input,
      });
    setInput("");
  };
  useEffect(() => {
    const unSubscribe = firebase
      .firestore()
      .collection("matches")
      .doc(matchDetails.id)
      .collection("messages")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
    return unSubscribe;
  }, [matchDetails]);
  console.log(messages);
  return (
    <SafeAreaView style={tw`flex-1`}>
      <Header
        title={getMatchUserInfo(matchDetails.users, user.uid).displayName}
        callEnabled
      ></Header>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={10}
        style={tw`flex-1`}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <FlatList
            inverted
            data={messages}
            keyExtractor={(item) => item.id}
            style={tw`pl-4`}
            renderItem={({ item: message }) =>
              // message.userId === user.uid ? (
              message.displayName === user.displayName ? (
                <SendMessage key={message.id} message={message}></SendMessage>
              ) : (
                <ReceiverMessage
                  key={message.id}
                  message={message}
                ></ReceiverMessage>
              )
            }
          ></FlatList>
        </TouchableWithoutFeedback>
        <View
          style={tw`flex-row justify-between items-center border-t border-gray-200 px-5 py-2`}
        >
          <TextInput
            style={tw`h-10 text-lg`}
            placeholder="Send Message"
            value={input}
            onChangeText={setInput}
          ></TextInput>
          <Button title="Send" color="#FF5864" onPress={sendMessage}></Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({});
