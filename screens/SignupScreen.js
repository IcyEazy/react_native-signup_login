import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useDispatch } from "react-redux";
import { signUp, storeUsers } from "../slices/authSlice";
import * as ImagePicker from "expo-image-picker";

export default function SignupScreen() {
  const [email, setEmail] = useState(""); // "Israel@gmail.com"
  const [password, setPassword] = useState(""); // "test12345"
  const [fullName, setFullName] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const navigation = useNavigation();
  const ios = Platform.OS === "ios";
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (email && password) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        dispatch(signUp({ fullName, email, password, image }));
        dispatch(storeUsers({ fullName, email, password, image }));
        navigation.navigate("Login");
        setFullName("");
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
      style={{ backgroundColor: themeColors.bg, paddingTop: ios ? 0 : 50 }}
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
        <View className="flex-row justify-center mb-10">
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
        style={{
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
          // paddingBottom: 50,
        }}
      >
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Full Name</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            placeholder="Enter Name"
          />
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter Email"
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-5"
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Enter Password"
            secureTextEntry={true}
            // onSubmitEditing={() => navigation.navigate("Home")}
          />
          <TouchableOpacity
            onPress={pickImage}
            className="flex justify-center items-center p-4 bg-gray-700 rounded-2xl mb-5"
          >
            <Text className="text-white">
              {image ? "Image Selected" : "Pick your profile picture"}
            </Text>
          </TouchableOpacity>
          {/* <Button  title="Pick an image from camera roll" onPress={pickImage} /> */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="py-3 bg-yellow-400 rounded-xl"
          >
            <Text className="text-center text-xl text-gray-700 font-bold">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-xl text-gray-700 font-bold text-center py-5">
          Or
        </Text>
        <View className="flex-row justify-center gap-x-12">
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
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text className="text-yellow-500 font-semibold ml-1">Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
