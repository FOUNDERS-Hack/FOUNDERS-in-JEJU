import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { Textarea } from "native-base";
import {
  MaterialIcons,
  Entypo,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import { Container } from "native-base";
import { Button } from "native-base";
import { ScrollView } from "react-native-gesture-handler";

const database = "https://react-dapp.firebaseio.com";
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const Portfolio_info = ({ navigation }) => {
  const [info, setInfo] = useState(navigation.state.params);
  const [user, setUserData] = useState({});

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
  return (
    <View style={{ backgroundColor: "white" }}>
      <View style={{ backgroundColor: "#112f4c", height: screenHeight }}>
        <View style={styles.container}>
          <View style={styles.imageLine}>
            <Image
              style={styles.bookIcon}
              source={require("../images/book_icon2.png")}
            />
            <Text style={styles.header}> Folio Chain</Text>
          </View>

          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text style={styles.messageHeader}>{info.type}</Text>
            {_post()}
            <ScrollView>
              <View style={styles.messageBox}>
                {Object.keys(user).map((id) => {
                  const data = user[id];
                  // console.log(id);
                  if (data.type === info.type) {
                    if (data.institution != null) {
                      return (
                        <View style={styles.infoBox}>
                          <View
                            style={{
                              flexDirection: "column",
                              justifyContent: "space-around",
                            }}
                          >
                            <Text style={styles.name}>
                              {" "}
                              이름:{JSON.stringify(data.content)}
                            </Text>
                            <Text style={styles.name}>
                              {" "}
                              기관:{JSON.stringify(data.institution)}
                            </Text>
                            <Text style={styles.verify}>
                              {" "}
                              검증 : {data.verify ? "O" : "X"}
                            </Text>
                          </View>
                        </View>
                      );
                    }
                  }
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: "60%",
    backgroundColor: "#112f4c",
  },
  imageLine: {
    paddingLeft: "4%",
    flexDirection: "row",
    paddingTop: 30,
    paddingBottom: 10,
    marginBottom: 50,
    backgroundColor: "white",
  },
  header: {
    fontSize: 30,
    paddingTop: "3%",
    paddingBottom: "3.3%",
    fontWeight: "bold",
    color: "#112f4c",
  },
  bookIcon: {
    marginLeft: "0.01%",
    marginRight: "0.7%",
    marginTop: "0.6%",
    width: "10.3%",
    height: "100%",
    resizeMode: "contain",
  },
  messageHeader: {
    color: "#112f4c",
    fontWeight: "bold",
    borderWidth: 0.5,
    borderColor: "white",
    fontSize: 30,
    width: screenWidth - 50,
    textAlign: "center",
    backgroundColor: "#f1c40f",
  },
  messageBox: {
    width: screenWidth - 50,
    borderWidth: 0.5,
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 2,
    fontSize: 17,
  },
  infoBox: {
    flexDirection: "row",
    borderBottomColor: "#112f4c",
    borderBottomWidth: 1,
    padding: 5,
  },
  index: {
    fontWeight: "bold",
    fontSize: 20,
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
  },
  value: {
    fontWeight: "bold",
    fontSize: 20,
  },
  verify: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Portfolio_info;
