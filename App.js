import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Animated from "react-native-reanimated";

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

import { DrawerContent } from "./src/navigation/DrawerContent";

//import { Icon } from "@expo/vector-icons";
import MainTabNavigation from "./src/navigation/MainTabNavigation";
import SupportScreen from "./src/screens/SupportScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import BookmarkScreen from "./src/screens/BookmarkScreen";
import SignInScreen from "./src/screens/authentication/SignInScreen";
import SignUpScreen from "./src/screens/authentication/SignUpScreen";
import ForgetPasswordScreen from "./src/screens/authentication/ForgetPasswordScreen";
import HeaderLeft from "./src/components/HeaderLeft";
//import AsyncStorage from "@react-native-community/async-storage";

import { UserProvider } from "./src/server/context/UserContext";
import { FirebaseProvider } from "./src/server/context/FirebaseContext";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const App = () => {
  // -- Animated screen
  const [progress, setProgress] = React.useState(new Animated.Value(0));

  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 30],
  });

  const animatedStyle = {
    borderRadius,
    transform: [{ scale }],
    shadowColor: "grey",
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  };
  // -- Animated screen
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: "#ffffff",
      text: "#333333",
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: "#333333",
      text: "#ffffff",
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const AuthStack = createStackNavigator();

  const AuthenticationStackScreen = ({ navigation, style }) => {
    const { colors } = useTheme();

    return (
      <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
        <AuthStack.Navigator
          initialRouteName="SignUp"
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.background,
              shadowColor: colors.background, // iOS
              elevation: 0, // Android
            },
            headerTintColor: colors.text,
            headerLeft: () => (
              <HeaderLeft onPress={() => navigation.openDrawer()} />
            ),
          }}
        >
          <AuthStack.Screen
            name="SignUp"
            options={{
              title: "Sign Up",
              headerBackTitle: null,
              headerBackTitleVisible: false,
            }}
            component={SignUpScreen}
          />
          <AuthStack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              title: "Sign In",
              headerBackTitle: null,
              headerBackTitleVisible: false,
            }}
          />

          <AuthStack.Screen
            name="ForgetPassword"
            options={{
              title: "Reset Password",
              headerBackTitle: null,
              headerBackTitleVisible: false,
            }}
            component={ForgetPasswordScreen}
          />
        </AuthStack.Navigator>
      </Animated.View>
    );
  };

  const StackScreen = ({ navigation, style }) => {
    return (
      <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
        <Stack.Navigator
          screenOptions={{
            headerTransparent: true,
            headerTitle: null,
            backgroundColor: "#246b6b",
            headerLeft: () => (
              <HeaderLeft onPress={() => navigation.openDrawer()} />
            ),
          }}
        >
          <Stack.Screen name="Home">
            {(props) => <MainTabNavigation {...props} />}
          </Stack.Screen>
          <Stack.Screen name="SupportScreen">
            {(props) => <SupportScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen name="SettingsScreen">
            {(props) => <SettingsScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen name="BookmarkScreen">
            {(props) => <BookmarkScreen {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </Animated.View>
    );
  };

  return (
    <PaperProvider theme={theme}>
      <FirebaseProvider>
        <UserProvider>
          <LinearGradient style={{ flex: 1 }} colors={["#f5f5f5", "#fff0f0"]}>
            <NavigationContainer theme={theme}>
              <Drawer.Navigator
                drawerType="slide"
                overlayColor="transparent"
                drawerStyle={styles.drawerStyles}
                contentContainerStyle={{ flex: 1 }}
                drawerContentOptions={{
                  activeBackgroundColor: "transparent",
                  activeTintColor: "white",
                  inactiveTintColor: "white",
                }}
                sceneContainerStyle={{ backgroundColor: "transparent" }}
                drawerContent={(props) => {
                  setProgress(props.progress);
                  return <DrawerContent {...props} />;
                }}
              >
                <Drawer.Screen name="HomeDrawer">
                  {(props) => <StackScreen {...props} style={animatedStyle} />}
                </Drawer.Screen>

                <Drawer.Screen name="AuthScreen">
                  {(props) => (
                    <AuthenticationStackScreen
                      {...props}
                      style={animatedStyle}
                    />
                  )}
                </Drawer.Screen>
              </Drawer.Navigator>
            </NavigationContainer>
          </LinearGradient>
        </UserProvider>
      </FirebaseProvider>
    </PaperProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: "#FFF",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    overflow: "hidden",
  },
  drawerStyles: { flex: 1, width: "70%", backgroundColor: "transparent" },
  drawerItem: { alignItems: "flex-start", marginVertical: 0 },
  drawerLabel: { color: "white", marginLeft: -16 },
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    borderColor: "white",
    borderWidth: StyleSheet.hairlineWidth,
  },

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
