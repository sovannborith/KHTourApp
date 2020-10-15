import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
//import { useTheme } from "react-native-paper";

import { windowHeight, windowWidth } from "../../utils/Dimensions";

import { AntDesign } from "@expo/vector-icons";

const FormInput = ({ labelValue, placeholderText, iconType, touched, error, ...rest }) => {
  
  const errorBackgroundColor = !error ? "blue":"red";
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <AntDesign name={iconType} size={25} color="#666" />
      </View>
      <TextInput
        value={labelValue}
        style={styles.input}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor="#666"
        underlineColorAndroid="transparent"
        {...rest}
      />
      {touched && (
        <View style={{height:20,
        width: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor:{errorBackgroundColor},
        right: 10}} >        
        <AntDesign name ={!error ? "check" : "close"} size={16} color="white" style={{textAlign: "center"}}/>
      </View>
      )}
    
    </View>
  )
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: "100%",
    height: windowHeight / 15,
    borderColor: "#ccc",
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  iconStyle: {
    padding: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    //borderRightColor: "#ccc",
    //borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    color: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});
