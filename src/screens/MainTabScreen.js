import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import AnimatedTabBar, { TabsConfigsType } from "curved-bottom-navigation-bar";

import AntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { useTheme, Avatar } from "react-native-paper";
import { View } from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";
import CardListScreen from "./CardListScreen";
import CardItemDetails from "./CardItemDetails";
import HomeScreen from "./HomeScreen";
import NotificationScreen from "./NotificationScreen";
import ExploreScreen from "./ExploreScreen";
import ProfileScreen from "./ProfileScreen";
//import SplashScreen from "./SplashScreen";
import EditProfileScreen from "./EditProfileScreen";
import { PRIMARY_COLOR } from "../constants/constant";

const HomeStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const tabs = {
  Home: {
    icon: ({ progress }) => (
      <AntDesign name={"home"} size={26} color={PRIMARY_COLOR} />
    ),
  },
  Notifications: {
    icon: ({ progress }) => (
      <AntDesign name={"notification"} size={26} color={PRIMARY_COLOR} />
    ),
  },
  Profile: {
    icon: ({ progress }) => (
      <AntDesign name={"user"} size={26} color={PRIMARY_COLOR} />
    ),
  },
  Explore: {
    icon: ({ progress }) => (
      <FontAwesome5 name={"search-location"} size={26} color={PRIMARY_COLOR} />
    ),
  },
};

const MainTabScreen = () => (
  <Tab.Navigator
    tabBar={(props) => (
      <AnimatedTabBar
        dotColor={"#f54ece"}
        dotSize={50}
        barColor={"#246b6b"}
        tabs={tabs}
        {...props}
      />
    )}
  >
    {/* <Tab.Screen
      name="SplashScreen"
      component={SplashScreen}
      options={{
        tabBarLabel: "",
        tabBarColor: "#FF6347",
        tabBarVisible: false,
      }}
    /> */}
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: "Home",
        tabBarColor: "#FF6347",
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={NotificationStackScreen}
      options={{
        tabBarLabel: "Updates",
        tabBarColor: "#1f65ff",
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: "Profile",
        tabBarColor: "#694fad",
      }}
    />
    <Tab.Screen
      name="Explore"
      component={ExploreScreen}
      options={{
        tabBarLabel: "Explore",
        tabBarColor: "#d02860",
      }}
    />
  </Tab.Navigator>
);

const HomeStackScreen = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {/* <HomeStack.Screen name="Splash" component={SplashScreen} /> */}
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Welcome to KH Tour",

          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Icon.Button
                name="ios-menu"
                size={25}
                color={colors.text}
                backgroundColor={colors.background}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", marginRight: 10 }}>
              <Icon.Button
                name="ios-search"
                size={25}
                color={colors.text}
                backgroundColor={colors.background}
                onPress={() => {}}
              />
              <TouchableOpacity
                style={{ paddingHorizontal: 10, marginTop: 5 }}
                onPress={() => {
                  navigation.navigate("Profile");
                }}
              >
                <Avatar.Image
                  source={{
                    uri:
                      "https://api.adorable.io/avatars/80/abott@adorable.png",
                  }}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <HomeStack.Screen
        name="CardListScreen"
        component={CardListScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerBackTitleVisible: false,
        })}
      />
      <HomeStack.Screen
        name="CardItemDetails"
        component={CardItemDetails}
        options={({ route }) => ({
          // title: route.params.title,
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: "#fff",
        })}
      />
    </HomeStack.Navigator>
  );
};

const NotificationStackScreen = ({ navigation }) => (
  <NotificationStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#1f65ff",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <NotificationStack.Screen
      name="Notifications"
      component={NotificationScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#1f65ff"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </NotificationStack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}
    >
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "",
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <MaterialCommunityIcons.Button
                name="account-edit"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.navigate("EditProfile")}
              />
            </View>
          ),
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        options={{
          title: "Edit Profile",
          headerBackTitle: null,
          headerBackTitleVisible: false,
        }}
        component={EditProfileScreen}
      />
    </ProfileStack.Navigator>
  );
};

export default MainTabScreen;
