import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const Recommend = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.bookIcon}
          source={require("../images/book_icon2.png")}
        />
        <Text style={styles.logoText}>Folio Chain</Text>
      </View>
      <View style={{ backgroundColor: "#112f4c", flexDirection: "row" }}>
        <Text style={styles.item1}>AI 비서</Text>
      </View>
      <View
        style={{ flex: 1, backgroundColor: "#112f4c", alignItems: "center" }}
      >
        <TouchableOpacity
          style={{ flexDirection: "column", alignItems: "center" }}
          onPress={() => {
            navigation.navigate("Recommend_chatbot");
          }}
        >
          <Image
            style={styles.aiIcon2}
            source={require("../images/ai_bot.png")}
          />
          <Text style={styles.text}>챗봇</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "#112f4c",
  },
  header: {
    flex: 0.3,
    flexDirection: "row",
    backgroundColor: "white",
  },
  bookIcon: {
    marginLeft: "4%",
    marginTop: "10%",
    width: "10%",
    height: "50%",
    resizeMode: "contain",
  },
  listIcon: {
    marginLeft: "25%",
    marginTop: "10%",
    width: "20%",
    height: "50%",
    resizeMode: "contain",
  },
  logoText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: "2%",
    marginTop: "11%",
    color: "#112f4c",
  },
  item1: {
    marginTop: "5%",
    marginBottom: "10%",
    marginLeft: "6%",
    fontSize: 25,
    fontWeight: "bold",
    color: "rgb(241, 196, 15)",
  },
  text: {
    fontSize: 20,
    marginTop: "5%",
    fontWeight: "bold",
    color: "rgb(241, 196, 15)",
  },
  aiIcon1: {
    width: "110%",
    height: "75%",
    resizeMode: "contain",
  },
  aiIcon2: {
    marginTop: "5%",
    width: 160,
    height: "70%",
    resizeMode: "contain",
  },
});

export default Recommend;
