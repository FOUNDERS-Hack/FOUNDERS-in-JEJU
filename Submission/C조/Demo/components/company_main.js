import React, { Component, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "react-navigation-stack";
import "react-native-gesture-handler";
import Company from "./company_list";
import Company_employment from "./company_employment";
import Content from './content';

function CompanyMainScreen({ navigation }) {


  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Image style={styles.bookIcon} source={require("../images/book.png")} />
        <Text style={styles.logoText}>Folio Chain</Text>
      </View>
      <View style={styles.case1}>
        <Text style={styles.item1}>현재 채용 공고</Text>

        <View style={styles.card1}>
          <Content />
        </View>
      </View>
      <View style={styles.case2}>
        <View style={styles.itemHeader}>
          <Text style={styles.item1}>지원자 리스트(현황)</Text>
          <TouchableOpacity>
            <Text
              style={styles.item2}

              onPress={() => {

                navigation.navigate("Company_list")
              }}
            >
              더보기
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card2}>
          <Text style={styles.information}>지원자1</Text>
        </View>
        <View style={styles.card2}>
          <Text style={styles.information}>지원자2</Text>
        </View>
        <View style={styles.card2}>
          <Text style={styles.information}>지원자3</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Company_employment")}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#424242" }}>
            채용 공고 작성하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default CompanyMainScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flex: 1.5,
    flexDirection: "row",
    backgroundColor: "#112f4c",
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
    color: "white",
  },
  case1: {
    flex: 3,
    backgroundColor: "#112f4c",
  },
  case2: {
    flex: 6,
    backgroundColor: "#112f4c",
  },
  itemHeader: {
    flexDirection: "row",
  },
  item1: {
    marginTop: "3%",
    marginLeft: "6%",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  item2: {
    marginTop: "5%",
    marginLeft: "53%",
    fontSize: 20,
    fontWeight: "bold",
    color: "rgb(241, 196, 15)",
  },
  card1: {
    marginVertical: "3%",
    backgroundColor: "white",
    marginHorizontal: "5%",
    paddingHorizontal: "3%",
    paddingTop: "9%",
    paddingBottom: "17%",
  },
  card2: {
    marginVertical: "3%",
    backgroundColor: "white",
    marginHorizontal: "5%",
    paddingHorizontal: "3%",
    paddingVertical: "4%",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "15%",
    marginBottom: "7%",
    marginLeft: "5%",
    marginRight: "5%",
    borderRadius: 5,
    backgroundColor: "rgb(241, 196, 15)",
  },
  information: {
    fontSize: 15,
  },
});

// export default App;
