import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import useAuth from "../hooks/useAuth";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  // const { user } = useAuth();
  // console.log(user.email);

  // if (user) {
  //   return (
  //     <NavigationContainer>
  //       <Stack.Navigator initialRouteName="Home">
  //         <Stack.Screen
  //           name="Home"
  //           options={{
  //             headerShown: false,
  //           }}
  //           component={HomeScreen}
  //         />
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   );
  // } else {
  //   return (
  //     <NavigationContainer>
  //       <Stack.Navigator initialRouteName="Welcome">
  //         <Stack.Screen
  //           name="Welcome"
  //           options={{
  //             headerShown: false,
  //           }}
  //           component={WelcomeScreen}
  //         />
  //         <Stack.Screen
  //           name="Login"
  //           options={{
  //             headerShown: false,
  //           }}
  //           component={LoginScreen}
  //         />
  //         <Stack.Screen
  //           name="SignUp"
  //           options={{
  //             headerShown: false,
  //           }}
  //           component={SignupScreen}
  //         />
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   );
  // }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
          }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Welcome"
          options={{
            headerShown: false,
          }}
          component={WelcomeScreen}
        />
        <Stack.Screen
          name="Login"
          options={{
            headerShown: false,
          }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="SignUp"
          options={{
            headerShown: false,
          }}
          component={SignupScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
