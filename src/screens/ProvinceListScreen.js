import React, { useState, useContext, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import Card from "../components/Card";
import Loading from "../components/LoadingComponent";

import { firebase } from "../server/firebase/firebase";
/* import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import config from "../server/firebase/config/firebaseConfig";
if (!firebase.apps.length) {
  firebase.initializeApp(config);
} */

const ProvinceListScreen = ({ navigation }) => {
  //Manual log into firebase
  firebase
    .auth()
    .signInWithEmailAndPassword("yun.sovannborith@gmail.com", "Rith_07081984");

  const [provinceList, setProvinceList] = useState();
  const [loading, setLoading] = useState(true);
  const countryCode = "fld_002";

  useEffect(() => {
    const subscriber = firebase
      .firestore()
      .collection("tbl_field_values")
      .where("field_master", "==", countryCode)
      .onSnapshot((querySnapshot) => {
        const provinces = [];

        querySnapshot.forEach((documentSnapshot) => {
          provinces.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setProvinceList(provinces);
        setLoading(false);
      });
    // Unsubscribe from events when no longer in use
    return () => subscriber;
  }, []);
  //console.log(provinceList);
  const renderItem = ({ item }) => {
    return (
      <SafeAreaView>
        <Card
          itemData={item}
          onPress={() =>
            navigation.navigate("ProvinceDetail", { itemData: item })
          }
        />
      </SafeAreaView>
    );
  };

  if (loading) {
    return <Loading size="large" />;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={provinceList}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

export default ProvinceListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
});
