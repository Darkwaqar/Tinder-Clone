import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { firebase } from "@react-native-firebase/firestore";
import useAuth from "../hooks/useAuth";
import ChatRow from "./ChatRow";

const ChatList = () => {
  const { user } = useAuth();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("matches")
      .where("userMatched", "array-contains", user.uid)
      .onSnapshot((snapshot) =>
        setMatches(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      );
    return unsubscribe;
  }, []);

  console.log(matches);

  return matches.length > 0 ? (
    <FlatList
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <View style={tw`p-5`}>
      <Text style={tw`text-center text-lg`}>No matches at the moment</Text>
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({});
