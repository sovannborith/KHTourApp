import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import turism from "../assets/splash/splash-turismo.json";

import { UserContext } from "../server/context/UserContext";

export default SplashScreen = () => {
  const [_, setUser] = useContext(UserContext);

  useEffect(() => {
    setTimeout(async () => {
      setUser((state) => ({
        ...state,
        isLoggedIn: false,
      }));
      this.props.navigation.navigate("Home");
      console.log(this.props);
    }, 5000);
  }, []);
  return (
    <View style={styles.container}>
      <LottieView source={turism} autoSize loop autoPlay />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //width: "50%",
  },
});
