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
      <Text style={styles.text}>Sign In</Text>

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
    </View>
  );
};

export default SignInScreen;

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
    color: "#246b6b",
    fontWeight: "bold"
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginTop: 10,
    width: "100%",
    height: 50,    
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#246b6b",
  },
  navButtonText: {
    fontSize: 16,
    color: "#246b6b",
  },
});
