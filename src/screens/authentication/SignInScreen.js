import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Formik} from 'formik';
 import * as Yup from 'yup';

import FormInput from "../../components/form/FormInput";
import FormButton from "../../components/form//FormButton";
import { UserContext } from "../../server/context/UserContext";

  

const SignInScreen = ({ navigation }) => {
  //const [email, setEmail] = useState();
  //const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const { login } = useContext(UserContext);
  const signIn =(email, password) =>{    
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
  };

  const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required(),
    password: Yup.string().required(),
  }); 

  /* const {handleChange, handleBlur, handleSubmit, values, touched, errors, isValid} = useFormik({
    validationSchema: SignInSchema,
    initialValues:{ email: '', password: '' },
    onSubmit: (values) => Alert.alert(JSON.stringify(values))
  }); */

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.text}>Sign In</Text>
        <Formik
          validationSchema= {SignInSchema}
          initialValues={{ email: '', password: '' }}
          onSubmit={values => console.log(JSON.stringify(values))}
        >
        {({ values, handleChange, touched, errors,  handleSubmit, handleBlur }) => (
          <View style={{width: "100%"}}>
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

            <FormInput
              labelValue={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              placeholderText="Password"
              iconType="lock"
              secureTextEntry={true}
              error ={errors.password}
              touched={touched.password}
            />

            <FormButton
              buttonTitle="Sign In"            
              loading={loading}
              onPress={handleSubmit}
              //disabled={!isValid}
            />

            <TouchableOpacity
            style={styles.forgotButton}
            
            onPress={() => navigation.navigate("ForgetPassword")}
          >
            <Text style={styles.navButtonText}>Forgot Password?</Text>
          </TouchableOpacity>
          </View>
        )}
        </Formik>
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
