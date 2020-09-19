import React from "react";

import firebase from "@react-native-firebase/app";
import Auth from "@react-native-firebase/auth";

import App from "./App";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCbQkpMH5lagAZ87ZHxpvv0j1nWXMJL1U",
  authDomain: "kh-tour-app.firebaseapp.com",
  databaseURL: "https://kh-tour-app.firebaseio.com",
  projectId: "kh-tour-app",
  storageBucket: "kh-tour-app.appspot.com",
  messagingSenderId: "176491607727",
  appId: "1:176491607727:web:61a03dfce0c2699421465a",
  measurementId: "G-SN7DMNSR0H",
};

if (!firebase.app.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase, Auth };

function FirebaseConfig() {
  return <App />;
}

export default Setup;
