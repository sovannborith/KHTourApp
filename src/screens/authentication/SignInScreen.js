import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform  } from "react-native";
import {  useFormik} from 'formik';
import * as Yup from 'yup';
import * as Animatable from 'react-native-animatable';
import FormInput from "../../components/form/FormInput";
import FormButton from "../../components/form//FormButton";
import { UserContext } from "../../server/context/UserContext";

  

const SignInScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { login, user } = useContext(UserContext);
  
  const signIn =() =>
  {    
      try {
        setLoading(true);       
        if (isValid) {
          login(values.email, values.password);
        }
        if(user) {
          navigation.navigate("Home");
        }
      } catch (e) {        
        alert("Login failed! Please try again!");
      } finally {
        setLoading(false);
      }
  };

  const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required(),
    password: Yup.string().required(),
  }); 

  const {handleChange, handleBlur, handleSubmit, values, touched, errors, isValid} = useFormik({
    validationSchema: SignInSchema,
    initialValues:{ email: '', password: '' },
    onSubmit: () => {signIn(values.email,values.password)}
  });

  return (
    <KeyboardAvoidingView behavior={Platform.OS=="ios" ? "padding" : null} style={styles.container}>
      <View style={{flex: 1}}>      
        <View style={{alignItems:"center"}}>
          <Image source={require("../../assets/logo.png")} style={styles.logo} />
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
        <View style={styles.signInWrapper}>
          <View style={styles.loginHeader}>
            <Text style={styles.text}>Sign In</Text>  
          </View>        
          <View style={styles.formElement}>          
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
              
            />

            <TouchableOpacity
            style={styles.forgotButton}
            
            onPress={() => navigation.navigate("ForgetPassword")}
          >
            <Text style={styles.navButtonText}>Forgot Password?</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.formFooter}>

          </View>
        </View>
        </Animatable.View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,    
    padding: 20,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: "cover",
  },
  signInWrapper:{
    borderColor: "#246b6b",
    //backgroundColor: "#246b6b",
    borderWidth: 1,
    /* borderTopLeftRadius: 25,
    borderTopRightRadius: 25, */
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "flex-start",
    //padding: 10,
    height: "100%"
    
  },
  loginHeader:{
    position: "relative",
    top: -1,
    height: 50,
    backgroundColor: "#246b6b",
    borderColor: "#246b6b",
    borderWidth: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: "#fff",
    fontWeight: "bold",
    top: 3
  },
  formElement:{
    padding: 10,
    flex: 1,
    alignItems: "center",
    width: "100%"
  },
  signIn:{

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
  formFooter:{
    height: 50,
    backgroundColor: "#246b6b",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    width: "100%",
    top: 1
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    
},
});
