import React from "react";

import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const config = {
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
  firebase.initializeApp(config);
}

export default firebase;
