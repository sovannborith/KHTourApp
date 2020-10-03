import React from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import LottieView from "lottie-react-native";
import turism from "../assets/splash/splash-turismo.json";

import { UserContext } from "../server/context/UserContext";

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };

    const [_, setUser] = useContext(UserContext);

    useEffort(() => {
      setTimeout(async () => {
        Animated.timing(this.state.progress, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start();
        setUser((state) => ({
          ...state,
          isLoggedIn: false,
        }));
        this.props.navigation.navigate("Home");
      }, 3000);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <LottieView
          source={turism}
          progress={this.state.progress}
          autoSize
          loop
          autoPlay
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
