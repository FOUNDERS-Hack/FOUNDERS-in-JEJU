import React, { useEffect, useState, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
  List,
  TouchableOpacity,
  Modal,
  Alert,
  AsyncStorage,
} from "react-native";

import { Table, Row, Rows } from "react-native-table-component";
import sample from "../database/sample";
// import userCertification from '../build/contracts/UserCertification.json';
// import getWeb3 from './utils/getWeb3';
import Issuer from "./issuer";
import { Button } from "native-base";
import {
  MaterialCommunityIcons,
  Feather,
  Entypo,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import { color } from "react-native-reanimated";

const database = "https://react-dapp.firebaseio.com";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const head = ["학력", "자격증", "수상내역", "대외활동", "기타"];

const Portfolio = ({ navigation }) => {
  let getData = { ...sample };
  const data = [...getData.data];
  let [currentData, setCurrentData] = useState(data);
  const [user, setUserData] = useState({});
  const [searchWord, setSearchWord] = useState("");
  const [name, setName] = useState(
    AsyncStorage.getItem("name").then((mobileNo) => {
      setName(mobileNo);
    })
  );

  useEffect(() => {
    setCurrentData(data);
  }, data);

  const _post = () => {
    fetch(`${database}/address/approve.json`)
      .then((res) => {
        if (res.status != 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((users) => {
        setUserData(users);
      });
  };

  const onSearch = () => {
    _post();
    const tempData = Object.keys(user)
      .slice()
      .map((id) => user[id])
      .filter((v) => v["content"].includes(searchWord));

    if (searchWord === "") alert("검색어를 입력해주세요");
    else if (tempData.length === 0) {
      alert("검색 결과가 없습니다. 다시 입력해주세요");
    } else {
      let tempString = "";
      tempData
        .slice()
        .sort((a, b) => (a.type > b.type ? -1 : 1))
        .forEach((value, index) => {
          tempString += `${value["type"]} /\n ${index + 1}.\n\t 내용 : ${
            value["content"]
          }\n\t 기관 : ${value["institution"]}\n\t 검증여부 : ${
            value["verify"] ? "O" : "X"
          }\n\n`;
        });
      Alert.alert(`"${searchWord}" 검색 결과`, tempString, [
        {
          text: "확인",
          onPress: () => {},
        },
      ]);
    }
    setSearchWord("");
  };

  const onPressInfo = (value) => {
    const info = data.filter((v) => v.type === value);
    alert(`등록된 ${value} 정보를 확인합니다.`);
    navigation.navigate("Portfolio_info", { type: value, info: info });
  };

  // componentDidMount = () => {
  //   fetch(`${database}/address.json`)
  //     .then((res) => {
  //       if (res.status != 200) {
  //         throw new Error(res.statusText);
  //       }
  //       return res.json();
  //     })
  //     .then((user) => {
  //       this.setState({
  //         data: getData.data,
  //       });
  //     });
  // };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.bookIcon}
          source={require("../images/book_icon2.png")}
        />
        <Text style={styles.logoText}>Folio Chain</Text>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          marginBottom: "5%",
        }}
      >
        <Text style={styles.userText}>{JSON.stringify(name)} 님</Text>
        <Button
          style={styles.enrollmentBtn}
          onPress={() => navigation.navigate("Portfolio_enrollment")}
        >
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={styles.enrollmentText}>등록</Text>
          </View>
        </Button>
      </View>
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            marginBottom: "10%",
          }}
        >
          <TextInput
            style={styles.input}
            placeholder="검색어 입력란"
            value={searchWord}
            onChangeText={(value) => setSearchWord(value)}
          />
          <Button style={styles.searchBtn} onPress={onSearch}>
            <Entypo
              name="magnifying-glass"
              size={35}
              color="#112f4c"
              style={{ padding: "10%" }}
            />
          </Button>
        </View>
      </View>

      <View style={styles.bigbox}>
        {head.map((value, index) => {
          return (
            <TouchableOpacity
              key={value}
              onPress={() => {
                onPressInfo(value);
              }}
            >
              <View style={styles.smallbox}>
                <Text style={styles.title}>{value}</Text>
                <AntDesign name="right" size={24} color="white" />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#112f4c",
    width: screenWidth,
    height: screenHeight,
  },
  header: {
    flex: 0.455,
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
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: "5%",
    marginLeft: "3%",
    marginTop: "3%",
  },
  userText: {
    marginLeft: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: "3%",
    marginTop: 20,
    color: "white",
  },
  enrollmentBtn: {
    marginTop: "5%",
    width: 60,
    height: 40,
    backgroundColor: "#f1c40f",
    marginRight: 20,
  },
  enrollmentText: {
    color: "#112f4c",
    fontWeight: "bold",
    fontSize: 18,
  },
  bigbox: {
    borderColor: "white",
    borderWidth: 0.5,
    width: "90%",
    height: "43%",
    backgroundColor: "#112f4c",
    alignSelf: "center",
  },
  smallbox: {
    borderBottomColor: "white",
    borderBottomWidth: 0.5,
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  small_container: { color: "white", backgroundColor: "white" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  textheader: { margin: 6, textAlign: "center", fontWeight: "bold" },
  text: { margin: 6, textAlign: "left" },
  input: {
    height: 50,
    width: 280,
    borderWidth: 1,
    backgroundColor: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  searchBtn: {
    borderWidth: 0.5,
    width: 50,
    height: 50,
    backgroundColor: "#f1c40f",
    fontWeight: "bold",
    borderColor: "gray",
  },
});

export default Portfolio;
