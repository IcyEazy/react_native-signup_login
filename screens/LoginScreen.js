import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { logIn, selectLogin } from "../slices/authSlice";
import useAuth from "../hooks/useAuth";

export default function LoginScreen() {
  const [email, setEmail] = useState(""); // "Israel@gmail.com"
  const [password, setPassword] = useState(""); // "test12345"

  const { user } = useAuth();
  const navigation = useNavigation();
  const ios = Platform.OS === "ios";
  const dispatch = useDispatch();
  const signedInUser = useSelector(selectLogin);

  const handleSubmit = async () => {
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        dispatch(logIn(user.email));
        navigation.navigate("Home", user);
        setEmail("");
        setPassword("");
      } catch (error) {
        console.log("got an error: ", error.message);
      }
    }
  };

  return (
    <View
      className="flex-1"
      style={{ backgroundColor: themeColors.bg, paddingTop: ios ? 0 : 30 }}
    >
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <FontAwesomeIcon icon={faArrowLeft} size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mb-5">
          <Image
            source={require("../assets/images/condo.jpeg")}
            style={{ width: 200, height: 200 }}
            className="rounded-full"
          />
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50 }}
      >
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter Email"
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Enter Password"
            secureTextEntry={true}
            // onSubmitEditing={() => navigation.navigate("Home")}
          />
          <TouchableOpacity className="flex items-end mb-5">
            <Text className="text-gray-700">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit}
            className="py-3 bg-yellow-400 rounded-xl"
          >
            <Text className="text-center text-xl text-gray-700 font-bold">
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-xl text-gray-700 font-bold text-center py-5">
          Or
        </Text>
        <View className="flex-row justify-between">
          <TouchableOpacity className="p-2 bg-gray-700 rounded-2xl">
            <Image
              source={require("../assets/icons/instagram.png")}
              className="w-10 h-10"
            />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-200 rounded-2xl">
            <Image
              source={require("../assets/icons/apple.png")}
              className="w-10 h-10"
            />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-700 rounded-2xl">
            <Image
              source={require("../assets/icons/facebook.png")}
              className="w-10 h-10 rounded-md"
            />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7 mb-12">
          <Text className="text-gray-500 font-semibold">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text className="text-yellow-500 font-semibold ml-1">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
