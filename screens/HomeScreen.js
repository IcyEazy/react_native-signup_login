import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { selectLogin, selectSignup, selectUsers } from "../slices/authSlice";
import { useNavigation, useRoute } from "@react-navigation/native";
import { themeColors } from "../theme";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { params: user } = useRoute();
  console.log(user.email);

  const users = useSelector(selectUsers);
  console.log(users);

  const userToDisplay = users.find((usr) => usr.email === user.email);
  console.log(userToDisplay);

  // const navigation = useNavigation();
  // const routes = navigation.getState()?.routes;
  // const prevRoute = routes[routes.length - 2]?.name;
  // const currentRoute = routes[routes.length - 1]?.name;

  // console.log(prevRoute);
  // console.log(currentRoute);

  // if (prevRoute === "Login" && currentRoute === "SignUp") {
  //   navigation.navigate("SignUp");
  // }

  // if (prevRoute === "SignUp" && currentRoute === "Login") {
  //   navigation.navigate("Login");
  // }

  const dispatch = useDispatch();
  const handleLogout = async () => {
    // TODO: implement logout logic
    await signOut(auth);
    // dispatch(logOut());
    navigation.navigate("Welcome");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: themeColors.bg,
      }}
    >
      {userToDisplay.image && (
        <Image
          source={{ uri: userToDisplay.image }}
          style={{ width: 200, height: 200 }}
          className="mb-7 rounded-full"
        />
      )}
      <Text className="mb-7 text-lg text-white">
        Welcome to <Text className="font-bold">{userToDisplay.fullName}'s</Text>{" "}
        Page
      </Text>
      <Text className="mb-7 text-base font-bold text-white">
        Email: <Text className="font-normal">{userToDisplay.email}</Text>
      </Text>
      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-500 px-3 py-1 rounded-lg"
      >
        <Text className="text-white text-lg font-bold">Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
