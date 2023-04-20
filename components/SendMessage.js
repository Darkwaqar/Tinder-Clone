import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";

const SendMessage = ({ message }) => {
  return (
    <View
      style={tw`bg-purple-600 rounded-lg rounded-tr-none px-5 py-3 mx-3 my-2 ml-auto`}
    >
      <Text style={tw`text-white`}>{message.message}</Text>
    </View>
  );
};

export default SendMessage;

const styles = StyleSheet.create({});
