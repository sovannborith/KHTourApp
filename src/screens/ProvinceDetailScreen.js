import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { data } from "../models/data";
import Card from "../components/Card";

const ProvinceDetailScreen = ({ route }) => {
  const itemData = route.params.itemData;
  return (
    <View style={styles.container}>
      <Text>{itemData.field_desc_en}</Text>
    </View>
  );
};

export default ProvinceDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
});
