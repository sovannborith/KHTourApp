import React, { createContext, useState } from "react";
import { firebase } from "../firebase/firebase";

const UserContext = createContext([{}, () => {}]);

const db = firebase.firestore();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const userFirebase = {
    user,
    setUser,
    login: async (email, password) => {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .catch((error) => {
            alert(error.message);
          });
      } catch (e) {
        console.log(e);
      }
    },
    register: async (email, password) => {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
      } catch (e) {
        console.log(e);
      }
    },
    resetPassword: async (email) => {
      try {
        await firebase.auth().sendPasswordResetEmail(email);
      } catch (e) {
        console.log(e);
      }
    },
    signOut: async () => {
      try {
        await firebase.auth().signOut();
      } catch (e) {
        console.log(e);
      }
    },
    getCurrentUser: async () => {
      return firebase.auth().currentUser;
    },

    isLoggedIn: async () => {
      let user = getCurrentUser();
      console.log(user);
      if (user) return true;
      else return false;
    },

    uploadProfilePhoto: async (uri) => {
      const uid = getCurrentUser().uid;
      try {
        const photo = await Firebase.getBlob(uri);
        const imgRef = firebase.storage().ref("profilePhotos").child(uid);
        await imgRef.put(photo);
        const url = await imgRef.getDownloadURL();

        await db.collection("tbl_user_profile").doc(uid).update({
          profile_pic: url,
        });

        return url;
      } catch (error) {
        console.log("Error @uploadProfilePhoto: ", error);
      }
    },

    getBlob: async (url) => {
      return await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onload = () => {
          resolve(xhr.response);
        };

        xhr.onerror = () => {
          reject(new TypeError("Network request failed!"));
        };

        xhr.responseType = "blob";
        xhr.open("GET", url, true);
        xhr.send(null);
      });
    },
  };
  return (
    <UserContext.Provider value={userFirebase}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
