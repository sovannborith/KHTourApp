import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";

const RootStack = createStackNavigator();

const RootStackScreen = ({ props }) => (
  <RootStack.Navigator headerMode="none" initialRouteName="SignIn">
    <RootStack.Screen name="SignIn" component={SignInScreen} />
    <RootStack.Screen name="SignUp" component={SignUpScreen} />
  </RootStack.Navigator>
);

export default RootStackScreen;
