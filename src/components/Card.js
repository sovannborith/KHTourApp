import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import StarRating from "./StarRating";
import firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import config from "../server/firebase/config/firebaseConfig";
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const Card = ({ itemData, onPress }) => {
  const [imageUri, setImageUri] = useState();

  useEffect(() => {
    const subscriber = firebase
      .storage()
      .ref(itemData.param_01)
      .getDownloadURL()
      .then((url) => {
        setImageUri(url);
      });
    // Unsubscribe from events when no longer in use
    return () => subscriber;
  }, []);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.cardImgWrapper}>
          <Image
            source={{ uri: imageUri }}
            resizeMode="cover"
            style={styles.cardImg}
          />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{itemData.field_desc_en}</Text>
          <StarRating ratings={itemData.ratings} reviews={itemData.reviews} />
          <Text numberOfLines={2} style={styles.cardDetails}>
            {itemData.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: "row",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: "98%",
    width: "98%",
    alignSelf: "center",
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontWeight: "bold",
  },
  cardDetails: {
    fontSize: 12,
    color: "#444",
  },
});
