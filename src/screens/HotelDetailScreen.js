import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { data } from "../models/data";
import Card from "../components/Card";

const HotelDetailScreen = ({ navigation }) => {
  const renderItem = ({ item }) => {
    return (
      <Card
        itemData={item}
        onPress={() =>
          navigation.navigate("CardItemDetails", { itemData: item })
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default HotelDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
});