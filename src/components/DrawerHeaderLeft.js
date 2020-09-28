import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function DrawerHeaderLeft({ onPress }) {
  return (
    <View>
      <View style={styles.menuOuter}>
        <Icon name="ios-menu" size={25} color={"black"} onPress={onPress} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  menuOuter: {
    top: -5,
    marginLeft: 20,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#92a3b0",
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 2,
    borderRadius: 22,
    shadowColor: "grey",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
});
