import React from "react";
import Start from "./start";
import Login from "./login";
import Register from "./register";
import { createStackNavigator } from "react-navigation-stack";

const Start_navigation = createStackNavigator({
  Start: { screen: Start, navigationOptions: { headerShown: false } },
  Login: { screen: Login, navigationOptions: { headerShown: false } },
  Register: { screen: Register, navigationOptions: { headerShown: false } },
});

export default Start_navigation;
