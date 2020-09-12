import React from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

import LottieView from "lottie-react-native";

import turism from "../assets/splash/splash-turismo.json";

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }
  render() {
    setTimeout(() => {
      this.props.navigation.navigate("Home");
    }, 5000);

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
/* 
const SplashScreen = ({ navigation }) => {
  return (
    <LottieView
      ref={(animation) => {
        this.animation = animation;
      }}
      source={turism}
    />
  );
};

export default SplashScreen; */

/* const { height } = Dimensions.get("screen");
const height_logo = height * 0.28; */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
