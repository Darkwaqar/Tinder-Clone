import {
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import tw from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-deck-swiper";
import { firebase } from "@react-native-firebase/firestore";
import generateId from "../lib/generatedid";

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
  const [profile, setProfile] = useState([]);

  useLayoutEffect(() => {
    const unSub = firebase
      .firestore()
      .collection("users")
      .onSnapshot((snapshot) => {
        if (snapshot.empty) {
          navigation.navigate("Modal");
        }
      });
    return unSub;
  }, []);
  useEffect(() => {
    let unSub;
    const fetchCards = async () => {
      const passes = await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("passes")
        .get()
        .then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const swipes = await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("swipes")
        .get()
        .then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const swipesUserIds = swipes.length > 0 ? swipes : ["test"];
      console.log(passedUserIds, swipesUserIds);

      unSub = firebase
        .firestore()
        .collection("users")
        // .where("id", "not-in", [...passedUserIds, ...swipesUserIds])
        .onSnapshot((snapshot) => {
          setProfile(
            snapshot.docs
              // .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        });
    };
    fetchCards();
    return unSub;
  }, []);

  console.log(profile);
  const swipeLeft = async (cardIndex) => {
    if (!profile[cardIndex]) return;
    const userSwiped = profile[cardIndex];
    console.log(`you swapped Pass on ${userSwiped.displayName}`);

    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("passes")
      .doc(userSwiped.id)
      .set(userSwiped);
  };

  const swipeRight = async (cardIndex) => {
    if (!profile[cardIndex]) return;
    const userSwiped = profile[cardIndex];
    console.log(`you swipped on ${userSwiped.displayName}`);

    const loginInProfile = await (
      await firebase.firestore().collection("users").doc(user.uid).get()
    ).data();

    // check uuf the user swiped on you
    firebase
      .firestore()
      .collection("users")
      .doc(userSwiped.id)
      .collection("swipes")
      .doc(user.uid)
      .onSnapshot((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log(`hooray .You MATCH with ${userSwiped.displayName}`);

          firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .collection("swipes")
            .doc(userSwiped.id)
            .set(userSwiped);

          //CREATE A MATCH !!
          firebase
            .firestore()
            .collection("matches")
            .doc(generateId(user.uid, userSwiped.id))
            .set({
              users: {
                [user.uid]: loginInProfile,
                [userSwiped.id]: userSwiped,
              },
              userMatched: [user.uid, userSwiped.id],
              timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(navigation.navigate("Match", { loginInProfile, userSwiped }));
        } else {
          console.log(`hooray .You MATCH with ${userSwiped.displayName}`);

          firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .collection("swipes")
            .doc(userSwiped.id)
            .set(userSwiped);
        }
      });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* header */}
      <View style={tw`flex-row justify-between px-5`}>
        <TouchableOpacity onPress={signOut}>
          <Image
            style={tw`h-10 w-10 rounded-full`}
            source={{ uri: user?.photoURL }}
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
          cards={profile}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          onSwipedLeft={(cardIndex) => swipeLeft(cardIndex)}
          onSwipedRight={(cardIndex) => swipeRight(cardIndex)}
          containerStyle={{
            backgroundColor: "transparent",
          }}
          renderCard={(card) =>
            card ? (
              <View
                key={card.id}
                style={tw`bg-red-500 h-3/4 rounded-xl relative shadow-lg`}
              >
                <Image
                  style={tw`h-full w-full rounded-xl`}
                  source={{ uri: card.photoURL }}
                ></Image>
                <View
                  style={tw`absolute bottom-0 flex-row bg-white w-full justify-between items-center h-20 px-6 py-2 rounded-b-xl shadow-lg `}
                >
                  <View>
                    <Text style={tw`text-xl font-bold text-black`}>
                      {card.displayName} {card.lastName}
                    </Text>
                    <Text>{card.job}</Text>
                  </View>
                  <Text style={tw`text-2xl font-bold`}>{card.age}</Text>
                </View>
              </View>
            ) : (
              <View
                style={tw`relative bg-white h-3/4 rounded-xl shadow-lg justify-center items-center`}
              >
                <Text style={tw`font-bold pb-5`}>No more Profiles</Text>
                <Image
                  resizeMode="contain"
                  style={tw`h-20 `}
                  height={100}
                  width={100}
                  source={{
                    uri: "https://cdn.shopify.com/s/files/1/1061/1924/products/Crying_Face_Emoji_large.png?v=1571606037",
                  }}
                ></Image>
              </View>
            )
          }
        ></Swiper>
      </View>
      <View style={tw`flex-row justify-evenly`}>
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
