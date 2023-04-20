import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import useAuth from "../hooks/useAuth";
import getMatchUserInfo from "../lib/getMatchedUserInfo";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "@react-native-firebase/auth";

const ChatRow = ({ matchDetails }) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [matchUserInfo, setMatchUserInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  useEffect(() => {
    setMatchUserInfo(getMatchUserInfo(matchDetails.users, user.uid));
  }, [matchDetails, user]);

  useEffect(() => {
    const unSubscribe = firebase
      .firestore()
      .collection("matches")
      .doc(matchDetails.id)
      .collection("messages")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) =>
        setLastMessage(snapshot.docs[0].data()?.message)
      );
    return unSubscribe;
  }, [matchDetails]);
  return (
    <TouchableOpacity
      style={tw`flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg`}
      onPress={() => navigation.navigate("Message", { matchDetails })}
    >
      <Image
        style={tw`rounded-full h-16 w-16 mr-4`}
        source={{ uri: matchUserInfo?.photoURL }}
      ></Image>
      <View>
        <Text style={tw`text-lg font-semibold`}>
          {matchUserInfo?.displayName}
        </Text>
        <Text>{lastMessage ? lastMessage : "Say Hi"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;

const styles = StyleSheet.create({});
