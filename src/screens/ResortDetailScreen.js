import React, { useState,  useEffect } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import Card from "../components/Card";
import Loading from "../components/LoadingComponent";

import { firebase } from "../server/firebase/firebase";
const ResortDetailScreen = ({ navigation }) => {
  
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
      <View style={styles.body}>
      <FlatList
        showsVerticalScrollIndicator="false"
        data={provinceList}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </View>
    </View>
  );
};

export default ResortDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#c6ecec"
  },
  body: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
});
