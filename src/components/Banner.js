import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";

const Banner = ({ horizontal }) => {
  return (
    <View style={styles.sliderContainer}>
      <Swiper
        autoplay
        horizontal={horizontal}
        height={200}
        activeDotColor="#FF6347"
      >
        <View style={styles.slide}>
          <Image
            source={require("../assets/banners/tour_banner_01.jpg")}
            resizeMode="cover"
            style={styles.sliderImage}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require("../assets/banners/tour_banner_02.jpg")}
            resizeMode="cover"
            style={styles.sliderImage}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require("../assets/banners/tour_banner_03.jpg")}
            resizeMode="cover"
            style={styles.sliderImage}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require("../assets/banners/tour_banner_04.jpg")}
            resizeMode="cover"
            style={styles.sliderImage}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require("../assets/banners/tour_banner_05.jpg")}
            resizeMode="cover"
            style={styles.sliderImage}
          />
        </View>
      </Swiper>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  sliderContainer: {
    height: 200,
    width: "90%",
    marginTop: 10,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 8,
    overflow: "hidden",
  },

  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 8,
  },
  sliderImage: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
  },
});
