import {
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useRef } from "react";
import useAuth from "../hooks/useAuth";
import tw from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { Swipeable } from "react-native-gesture-handler";
import Swiper from "react-native-deck-swiper";

const DummyData = [
  {
    firstName: "Waqar",
    lastName: "Khan",
    job: "Developer",
    photoURL: "https://picsum.photos/200/300",
    age: 27,
    id: 123,
  },
  {
    firstName: "Waqar",
    lastName: "XXX",
    job: "Developer",
    photoURL: "https://picsum.photos/200/300",
    age: 27,
    id: 345,
  },
  {
    firstName: "Waqar",
    lastName: "XXX",
    job: "Developer",
    photoURL: "https://picsum.photos/200/300",
    age: 27,
    id: 567,
  },
];

const HomeScreen = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation();
  const swiperRef = useRef(null);
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* header */}
      <View style={tw`flex-row justify-between px-5`}>
        <TouchableOpacity onPress={signOut}>
          <Image
            style={tw`h-10 w-10 rounded-full`}
            source={{ uri: user.photoURL }}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image
            style={tw`h-10 w-10`}
            source={require("../assets/logo.png")}
          ></Image>
        </TouchableOpacity>
        <Ionicons
          name="chatbubbles-sharp"
          size={30}
          color="#FF5864"
          onPress={() => navigation.navigate("Chat")}
        ></Ionicons>
      </View>
      {/* cards */}
      <View style={tw`flex-1 -mt-6`}>
        <Swiper
          ref={swiperRef}
          cards={DummyData}
          stackSize={DummyData.length}
          verticalSwipe={false}
          containerStyle={{
            backgroundColor: "transparent",
          }}
          renderCard={(card) => (
            <View
              key={card.id}
              style={tw`bg-red-500 h-3/4 rounded-xl relative`}
            >
              <Image
                style={tw`h-full w-full rounded-xl`}
                source={{ uri: card.photoURL }}
              ></Image>
              <View
                style={tw`absolute bottom-0 flex-row bg-white w-full justify-between items-center h-20 px-6 py-2 rounded-b-xl shadow-lg `}
              >
                <View>
                  <Text style={tw`text-xl font-bold`}>
                    {card.firstName} {card.lastName}
                  </Text>
                  <Text>{card.job}</Text>
                </View>
                <Text style={tw`text-2xl font-bold`}>{card.age}</Text>
              </View>
            </View>
          )}
        ></Swiper>
      </View>
      <View style={tw`flex-row justify-evenly `}>
        <TouchableOpacity
          onPress={() => swiperRef.current.swipeLeft()}
          style={tw`justify-center items-center rounded-full w-16 h-16 bg-red-200 `}
        >
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => swiperRef.current.swipeRight()}
          style={tw`justify-center items-center rounded-full w-16 h-16 bg-green-200 `}
        >
          <Entypo name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
