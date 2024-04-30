// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import { getAuth } from "firebase/compat/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY62siEmoVqmseOcrqrhAcxT4MxOpELeM",
  authDomain: "react-native-login-ddc4a.firebaseapp.com",
  projectId: "react-native-login-ddc4a",
  storageBucket: "react-native-login-ddc4a.appspot.com",
  messagingSenderId: "418528729043",
  appId: "1:418528729043:web:c3a6438b495ca1e26d0126",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();

// export const auth = getAuth(app);
