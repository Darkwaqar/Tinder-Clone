import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";

const ReceiverMessage = ({ message }) => {
  return (
    <View
      style={[
        tw`bg-red-400 rounded-lg rounded-tl-none px-5 py-3 mx-3 my-2 ml-14`,
        { alignSelf: "flex-start" },
      ]}
    >
      <Image
        style={tw`w-12 h-12 rounded-full absolute top-0 -left-14`}
        source={{ uri: message.photoURL }}
      ></Image>
      <Text style={tw`text-white`}>{message.message}</Text>
    </View>
  );
};

export default ReceiverMessage;

const styles = StyleSheet.create({});
