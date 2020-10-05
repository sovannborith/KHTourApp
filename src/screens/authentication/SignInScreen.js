import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import FormInput from "../../components/form/FormInput";
import FormButton from "../../components/form//FormButton";
import { UserContext } from "../../server/context/UserContext";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const { login } = useContext(UserContext);
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.text}>KH Tour</Text>

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Sign In"
        loading={loading}
        onPress={() => {
          try {
            setLoading(true);
            login(email, password);
            alert("Login successful!");
            navigation.navigate("Home");
          } catch (e) {
            alert(e);
          } finally {
            setLoading(false);
          }
        }}
      />

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate("ForgetPassword")}
      >
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: "cover",
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f",
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
  },
});
