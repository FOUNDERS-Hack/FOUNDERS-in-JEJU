import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Dimensions,
  Image,
} from "react-native";
import { Input, Label, Item, Textarea } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const Recommend_search = ({ navigation }) => {
  const [companyName, setCompanyName] = React.useState("");
  const [answer, setAnswer] = React.useState("");

  return (
    <View style={styles.container}>
       <View style={styles.header}>
        <Image
          style={styles.bookIcon}
          source={require("../images/book_icon2.png")}
        />
        <Text style={styles.logoText}>Folio Chain</Text>
      </View>
      <View style={styles.searchBox}>
        <TextInput
          value={companyName}
          onChangeText={(v) => setCompanyName(v)}
          placeholder="회사명을 입력해주세요"
          backgroundColor="white"
          style={{  height: "100%", fontSize: 20, width: screenWidth - 50 }}
        />
        <Ionicons
          name="md-search"
          size={50}
          style={{ paddingLeft: "1%", color:"black" }}
          onPress={() => {
            alert("검색");
            setCompanyName("");
            setAnswer("삼성전자는 .....\n아아아아악입니다.\n");
          }}
        />
      </View>
      <View>
        <Text style={styles.messageHeader}>MESSAGE</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Textarea
          style={styles.messageBox}
          value={answer}
          disabled={true}
        ></Textarea>
        <View style={styles.logoStyle}>
          <View>
            <Ionicons name="logo-android" size={80} color={"#f1c40f"} />
          </View>
        </View>
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
  searchBox: {
    flexDirection: "row",
    backgroundColor: "#f1c40f",
    marginBottom: "11%",
    marginHorizontal:"1%",
    marginVertical:"3%",
  },
  header: {
    flex: 0.215,
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
  logoText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: "2%",
    marginTop: "11%",
    color: "#112f4c",
  },
  messageHeader: {
    color: "#f1c40f",
    fontWeight: "bold",
    fontSize: 30,
    width: "70%",
    marginLeft: "3%",
    textAlign: "center",
    backgroundColor: "white",
  },
  messageBox: {
    width: "70%",
    height: "300%",
    backgroundColor: "white",
    marginLeft: "3%",
    fontSize: 17,
  },
  logoStyle: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 20,
  },
});
export default Recommend_search;
