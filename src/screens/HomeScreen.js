import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import StarRating from "../components/StarRating";
import Banner from "../components/Banner";
const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
      <StatusBar
        barStyle={theme.dark ? "light-content" : "dark-content"}
        style={{ backgroundColor: "#019131" }}
      />
      <View style={{ flex: 1, backgroundColor: "#c6ecec" }}>
        <Banner horizontal={false} />
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator="false"
        >
          <View style={styles.cardsWrapper}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontSize: 18,
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Recently Viewed
            </Text>
            <View style={styles.card}>
              <View style={styles.cardImgWrapper}>
                <Image
                  source={require("../assets/Resorts/img_00001.jpg")}
                  resizeMode="cover"
                  style={styles.cardImg}
                />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>Amazing Food Place</Text>
                <StarRating ratings={4} reviews={99} />
                <Text style={styles.cardDetails}>
                  Amazing description for this amazing place
                </Text>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.cardImgWrapper}>
                <Image
                  source={require("../assets/Resorts/img_00002.jpg")}
                  resizeMode="cover"
                  style={styles.cardImg}
                />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>Amazing Food Place</Text>
                <StarRating ratings={4} reviews={99} />
                <Text style={styles.cardDetails}>
                  Amazing description for this amazing place
                </Text>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.cardImgWrapper}>
                <Image
                  source={require("../assets/Resorts/img_00003.jpg")}
                  resizeMode="cover"
                  style={styles.cardImg}
                />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>Amazing Food Place</Text>
                <StarRating ratings={4} reviews={99} />
                <Text style={styles.cardDetails}>
                  Amazing description for this amazing place
                </Text>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.cardImgWrapper}>
                <Image
                  source={require("../assets/Resorts/img_00004.jpg")}
                  resizeMode="cover"
                  style={styles.cardImg}
                />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>Amazing Food Place</Text>
                <StarRating ratings={4} reviews={99} />
                <Text style={styles.cardDetails}>
                  Amazing description for this amazing place
                </Text>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.cardImgWrapper}>
                <Image
                  source={require("../assets/Resorts/img_00005.jpg")}
                  resizeMode="cover"
                  style={styles.cardImg}
                />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>Amazing Food Place</Text>
                <StarRating ratings={4} reviews={99} />
                <Text style={styles.cardDetails}>
                  Amazing description for this amazing place
                </Text>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.cardImgWrapper}>
                <Image
                  source={require("../assets/Resorts/img_00006.jpg")}
                  resizeMode="cover"
                  style={styles.cardImg}
                />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>Amazing Food Place</Text>
                <StarRating ratings={4} reviews={99} />
                <Text style={styles.cardDetails}>
                  Amazing description for this amazing place
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    height: 200,
    width: "90%",
    marginTop: 10,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 8,
  },

  wrapper: {},

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
  categoryContainer: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: "30%",
    marginHorizontal: 0,
    alignSelf: "center",
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 70,
    height: 70,
    backgroundColor: "#fdeae7" /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: "center",
    marginTop: 5,
    color: "#de4f35",
  },
  cardsWrapper: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: "row",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontWeight: "bold",
  },
  cardDetails: {
    fontSize: 12,
    color: "#444",
  },
});
