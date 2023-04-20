import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import useAuth from "../hooks/useAuth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const ModelScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);
  const incompleteForm = !image || !job || !age;

  const updateUserProfile = () => {
    firestore()
      .collection("users")
      .add({
        id: user.uid,
        displayName: user.displayName,
        photoURL: image,
        job: job,
        age: age,
        timestamp: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => navigation.navigate("Home"))
      .catch((error) => alert(error.message));
  };
  return (
    <SafeAreaView style={tw`flex-1 items-center pt-1`}>
      <Image
        style={tw`w-full h-20`}
        resizeMode="contain"
        source={{
          uri: "https://1000logos.net/wp-content/uploads/2018/07/Tinder-logo.png",
        }}
      ></Image>
      <Text style={tw`text-xl text-gray-500 p-2 font-bold`}>
        Welcome, {user.displayName}
      </Text>
      <Text style={tw`text-center p-4 font-bold text-red-400`}>
        Step 1:The profile Pic
      </Text>
      <TextInput
        value={image}
        onChangeText={setImage}
        style={tw`text-center text-xl pb-2`}
        placeholder="Enter a profile Pic Url"
      ></TextInput>
      <Text style={tw`text-center p-4 font-bold text-red-400`}>
        Step 2:The Job
      </Text>
      <TextInput
        value={job}
        onChangeText={setJob}
        style={tw`text-center text-xl pb-2`}
        placeholder="Enter your Occupation"
      ></TextInput>
      <Text style={tw`text-center p-4 font-bold text-red-400`}>
        Step 3:The profile Pic
      </Text>
      <TextInput
        value={age}
        onChangeText={setAge}
        style={tw`text-center text-xl pb-2`}
        placeholder="Enter your age"
        maxLength={2}
        keyboardType="numeric"
      ></TextInput>
      <TouchableOpacity
        onPress={updateUserProfile}
        disabled={incompleteForm}
        style={[
          tw`w-64 p-3 rounded-xl absolute bottom-10 ${
            incompleteForm ? "bg-gray-400" : "bg-red-400"
          }`,
        ]}
      >
        <Text style={tw`text-center text-white text-xl `}>Update Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ModelScreen;

const styles = StyleSheet.create({});
