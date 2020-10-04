import React from "react";
import { View, FlatList, StyleSheet, useState, useContext } from "react-native";
//import { data } from "../models/data";
import Card from "../components/Card";
import Loading from "../components/LoadingComponent";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const [provinceList, setProvinceList] = useState();
const [loading, setLoading] = useState(true);
const countryCode = "fld_002";

const ProvinceListScreen = ({ navigation }) => {
  if (loading) {
    return <Loading size="large" />;
  }

  useEffect(() => {
    const provinceSubscriber = firebase
      .firestore()
      .collection("tbl_field_values")
      .where("field_master", "=", countryCode)
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
    return () => provinceSubscriber();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <Card
        itemData={item}
        onPress={() =>
          navigation.navigate("ProvinceDetailScreen", { itemData: item })
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={provinceList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
