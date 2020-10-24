import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import FormInput from "../../components/form/FormInput";
import FormButton from "../../components/form/FormButton";
import { UserContext } from "../../server/context/UserContext";
import {  useFormik} from 'formik';
 import * as Yup from 'yup';
const ForgetPasswordScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useContext(UserContext);

  const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required()
  }); 

  const {handleChange, handleBlur, handleSubmit, values, touched, errors, isValid} = useFormik({
    validationSchema: SignInSchema,
    initialValues:{ email: ''},
    onSubmit: () => {
        try {
          setLoading(true);
          if(isValid){
            resetPassword(values.email);
            navigation.navigate("SignIn");
            alert("Password reset link has sent to your email address");
          }
        } catch (e) {
          alert(e);
        } finally {
          setLoading(false);
        }
      }});


  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.text}>Reset Password</Text>

      <FormInput
              labelValue={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              placeholderText="Email"
              iconType="user"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              error ={errors.email}
              touched={touched.email}
              autoFocus={true}
            />

      <FormButton
        buttonTitle="Reset Password"
        loading={loading}
        onPress={handleSubmit}
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
    backgroundColor: "#ffffff",
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
