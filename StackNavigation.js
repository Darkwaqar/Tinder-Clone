import { Text, View } from "react-native";
import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import LoginScreen from "./screens/LoginScreen";
import useAuth from "./hooks/useAuth";
import ModelScreen from "./screens/ModelScreen";

const Stack = createStackNavigator();

const StackNavigation = () => {
  const { user } = useAuth();
  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Group>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen name="Chat" component={ChatScreen}></Stack.Screen>
          </Stack.Group>

          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen
              name="Modal"
              component={ModelScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;
