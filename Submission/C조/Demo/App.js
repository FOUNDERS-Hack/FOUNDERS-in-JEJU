import  './global' ;
import  './shim' ;
import web3 from './web3';
import crypto from 'crypto'
import { StatusBar } from "expo-status-bar";
import React, {Component } from "react";
import { createAppContainer } from "react-navigation";
import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Start from "./components/start";
import Login from "./components/login";
import Start_navigation from "./components/start_navigation";
import Bottom_navigation from "./components/bottom_navigation";
import Company_navigation from "./components/company_navigation";
import Institution_navigation from "./components/institution_navigation";
import { createStackNavigator } from "react-navigation-stack";
import fire from "./firebase";
import Register from "./components/register";
import { NavigationContainer } from "@react-navigation/native";
import Portfolio from "./components/portfolio";
import Enroll from "./components/portfolio_enrollment";
import Company_main from "./components/company_main";
import { render } from 'react-dom';






const temp = createStackNavigator(
  {
    Before: {
      screen: Start_navigation,
      navigationOptions: { headerShown: false },
    },
    After: {
      screen: Bottom_navigation,
      navigationOptions: { headerShown: false },
    },
    After_Company: {
      screen: Company_navigation,
      navigationOptions: { headerShown: false },
    },
    After_Institution: {
      screen: Institution_navigation,
      navigationOptions: { headerShown: false },
    },
  },
  {
    initialRouteName: "Before",
  }
);

const BottomNavi = createAppContainer(Bottom_navigation);


export default function App() {


  //var network_version = web3.version.network;
  //console.log(network_version);
  //web3.eth.getBlock('latest').then(console.log);



  


  

  
  // const [page, setPage] = useState("Start");

  // const gotoPage = (page) => {
  //   setPage(page);
  // };

  // //화면 이동
  // let content = <Start gotoPage={gotoPage} />;
  // if (page === "Login") content = <Login gotoPage={gotoPage} />;
  // else if (page === "Register") content = <Register gotoPage={gotoPage} />;
  // else if (page === "Company_main")
  //   content = <Company_main gotoPage={gotoPage} />;

  // const notNaviPages = ["Start", "Login", "Register", "Company_main"];
  // return (
  //   <View style={styles.container}>
  //     {notNaviPages.includes(page) ? (
  //       content
  //     ) : (
  //       <NavigationContainer>
  //         <BottomNavi />
  //       </NavigationContainer>
  //     )}
  //   </View>
  // );

  const Navi = createAppContainer(temp);

 
  return (
   
    // <View style={styles.container}>
    //   {notNaviPages.includes(page) ? (
    //     content
    //   ) : (
    <NavigationContainer>
      <Navi />
    </NavigationContainer>
    //     )}
    // </View>
  );
  }




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

