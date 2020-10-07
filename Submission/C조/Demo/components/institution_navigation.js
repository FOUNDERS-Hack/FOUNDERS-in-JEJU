import React from "react";
import Institution_approve from "./institution_approve";
import Institution_main from "./institution_main";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "react-native-vector-icons";

const Institution_navigation = createBottomTabNavigator(
  {
    Institution_main: {
      screen: Institution_main,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-people" size={40} style={{ color: tintColor }} />
        ),
      },
    },
    Institution_approve: {
      screen: Institution_approve,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-document" size={40} style={{ color: tintColor }} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      style: {
        height: 70,
        backgroundColor: "white",
      },
      inactiveTintColor: "#112f4c",
      activeTintColor: "#f1c40f",
    },
  }
);

export default Institution_navigation;
