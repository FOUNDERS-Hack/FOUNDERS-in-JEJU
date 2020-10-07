import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { Input, Form, Label, Item, Button } from "native-base";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const PortfolioBox = ({ data }) => {
  let [currentData, setCurrentData] = useState(data);
  const [searchWord, setSearchWord] = useState("");
  useEffect(() => {
    setCurrentData(data);
  }, data);

  const onKeyPress = () => {
    const tempData = data.filter((v) => v["name"].includes(searchWord));
    if (tempData.length === 0) {
      alert("검색 결과가 없습니다. 다시 입력해주세요");
      setCurrentData(data);
    } else setCurrentData(tempData);
    setSearchWord("");
  };

  const head = ["NAME", "FROM", "VALUE", "VERIFY"];
  return (
    <ScrollView>
      <View style={{ alignItems: "center" }}>
        <View style={styles.big_container}>
          <View
            style={{
              flexDirection: "row",
              margin: 20,
              justifyContent: "space-between",
            }}
          >
            <TextInput
              style={styles.input}
              placeholder="검색어 입력란"
              value={searchWord}
              onChangeText={(value) => setSearchWord(value)}
            />
            <Button style={styles.searchBtn} onPress={onKeyPress}>
              <Text style={styles.text}>검색</Text>
            </Button>
          </View>

          <View style={{ alignItems: "center" }}>
            <Table
              style={styles.small_container}
              borderStyle={{ borderWidth: 1.5 }}
            >
              <Row
                style={styles.head}
                textStyle={styles.textheader}
                data={head}
              />
              <Rows
                textStyle={styles.text}
                data={currentData.map((v) => [
                  v["name"],
                  v["from"],
                  v["value"],
                  v["verify"],
                ])}
              />
            </Table>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  big_container: {
    borderWidth: 2,
    // width: deviceWidth - 20,
    // height: deviceHeight / 2,
    backgroundColor: "lightgrey",
  },
  small_container: { backgroundColor: "#fff", width: 350 },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  textheader: { margin: 6, textAlign: "center", fontWeight: "bold" },
  text: { margin: 6, textAlign: "center" },
  input: { width: 300, borderWidth: 1, padding: 10 },
  searchBtn: {
    borderWidth: 1,
    width: 50,
    height: 50,
    backgroundColor: "lightblue",
    fontWeight: "bold",
    borderColor: "black",
  },
});

export default PortfolioBox;