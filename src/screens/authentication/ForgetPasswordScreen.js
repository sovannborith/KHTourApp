import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import FormInput from "../../components/form/FormInput";
import FormButton from "../../components/form/FormButton";
import { UserContext } from "../../server/context/UserContext";

const ForgetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useContext(UserContext);
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.text}>KH Tour App</Text>

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormButton
        buttonTitle="Reset Password"
        loading={loading}
        onPress={() => {
          try {
            setLoading(true);
            resetPassword(email);
            navigation.navigate("SignIn");
            alert("Password reset link has sent to your email address");
          } catch (e) {
            alert(e);
          } finally {
            setLoading(false);
          }
        }}
      />

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={styles.navButtonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
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
