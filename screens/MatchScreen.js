import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "twrnc";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const MatchScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { loginInProfile, userSwiped } = route.params;
  return (
    <View style={tw`h-full bg-red-500 pt-20`}>
      <View style={tw`justify-center px-10 pt-20`}>
        <Image
          style={tw`w-full h-19`}
          source={{
            uri: "https://e9digital.com/love-at-first-website/images/its-a-match.png",
          }}
        ></Image>
        <Text style={tw`text-white text-center mt-5`}>
          You and {userSwiped.displayName} have liked each other
        </Text>
        <View style={tw`flex-row justify-between items-center mt-5`}>
          <Image
            style={tw`h-32 w-32 rounded-full`}
            source={{ uri: loginInProfile.photoURL }}
          ></Image>
          <Image
            style={tw`h-32 w-32 rounded-full`}
            source={{ uri: userSwiped.photoURL }}
          ></Image>
        </View>
      </View>
      <TouchableOpacity
        style={tw`bg-white items-center m-5 px-10 py-8 rounded-full mt-20`}
        onPress={() => navigation.replace("Chat")}
      >
        <Text>Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchScreen;

const styles = StyleSheet.create({});
