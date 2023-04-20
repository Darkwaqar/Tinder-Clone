import { Button, StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

// const SignInWithGoogle = () => {
//   const { onGoogleButtonPress } = useAuth();
//   return (
//     <Button
//       title="Google Sign-In"
//       onPress={() =>
//         onGoogleButtonPress().then(() => console.log("Signed in with Google!"))
//       }
//     />
//   );
// };

const LoginScreen = () => {
  const { onGoogleButtonPress, loading } = useAuth();
  const navigation = useNavigation();
  return (
    <View style={tw`flex-1`}>
      {/* <Text>{loading ? "loading..." : "LoginScreen"}</Text>
      <SignInWithGoogle /> */}
      <ImageBackground
        resizeMode="cover"
        style={tw`flex-1`}
        source={{
          uri: "https://tinder.com/static/tinder.png",
        }}
      ></ImageBackground>
      <GoogleSigninButton
        disabled={loading}
        onPress={onGoogleButtonPress}
        style={tw`absolute bottom-40 w-52 mx-[25%] p-4 rounded-2xl`}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
