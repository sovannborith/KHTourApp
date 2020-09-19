/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
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

import MainTabScreen from "./src/screens/MainTabScreen";
import SupportScreen from "./src/screens/SupportScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import BookmarkScreen from "./src/screens/BookmarkScreen";

import { AuthContext } from "./src/components/context";

import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const StackScreen = ({ navigation, style }) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTitle: true,
          headerLeft: () => (
            <View style={styles.menuOuter}>
              <Icon
                name="ios-menu"
                size={25}
                color={"black"}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
        }}
      >
        <Stack.Screen name="HomeDrawer">
          {(props) => <MainTabScreen {...props} />}
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

const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = { borderRadius, transform: [{ scale }] };

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

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

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (foundUser) => {
        // setUserToken('fgkj');
        // setIsLoading(false);
        const userToken = String(foundUser[0].userToken);
        const userName = foundUser[0].username;

        try {
          await AsyncStorage.setItem("userToken", userToken);
        } catch (e) {
          console.log(e);
        }
        // console.log('user token: ', userToken);
        dispatch({ type: "LOGIN", id: userName, token: userToken });
      },
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: () => {
        // setUserToken('fgkj');
        // setIsLoading(false);
      },
      toggleTheme: () => {
        setIsDarkTheme((isDarkTheme) => !isDarkTheme);
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          <LinearGradient style={{ flex: 1 }} colors={["#b5ffbe", "#b5ffbe"]}>
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
            </Drawer.Navigator>
          </LinearGradient>
        </NavigationContainer>
      </AuthContext.Provider>
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
