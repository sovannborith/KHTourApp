import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const HeaderLeft = ({ onPress }) => {
  return (
    <View style={styles.menuOuter}>
      <Icon name="ios-menu" size={25} color={"black"} onPress={onPress} />
    </View>
  );
};

export default HeaderLeft;

const styles = StyleSheet.create({
  menuOuter: {
    
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
