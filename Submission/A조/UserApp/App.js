import React from 'react';
import StartScreen from './Screen/start.js';
import LoginScreen from './Screen/login.js';
import RegisterScreen from './Screen/register.js';
import MainScreen from './Screen/main.js';
import ChatScreen from './Screen/chat.js';
import AccountScreen from './Screen/account.js';
import HistoryScreen from './Screen/userHistory/history.js';
import QRScreen from './Screen/qrcode.js';
import payHistoryScreen from './Screen/userHistory/payHistory.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LendingScreen from './Screen/lending.js';

var id = 'csmoon';
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={StartScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerTitle:''}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerTitle:''}}/>
        <Stack.Screen name="Sub" component={SubMenu} options={{headerTitle:''}}/> 
        {/* header 처리 알아보기 */}
        <Stack.Screen name="payHistory" component={payHistoryScreen} options = {{headerTitle:'이용내역'}}/>
        <Stack.Screen name="lending" component={LendingScreen} options = {{headerTitle:'대여'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );  
}

const Drawer = createDrawerNavigator();
function SubMenu() {
  return(
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name = "Home" component={Home} />
      <Drawer.Screen name = "Account" component={AccountScreen}/>
      <Drawer.Screen name = "History" component={HistoryScreen}/>
    </Drawer.Navigator>
  );
}

const Tab = createBottomTabNavigator();
// const SearchScreenComponent = () => {
//   return null;
// }
function Home() {
  return ( //대여 button(qr코드), serach(map api) 추가
    <Tab.Navigator tabBarOptions = {{labelStyle:{fontSize : 13}, tabStyle : {justifyContent : 'center'}} }>
      <Tab.Screen name = "Main" component={MainScreen}/>
      {/* <Tab.Screen name = "Search" component={MainScreen} options={{
        tabBarButton: () => (<ModalTester />),
      }}/> */}
      <Tab.Screen name = "QR" component={QRScreen}/>
      <Tab.Screen name = "Chat" component={ChatScreen}/>
    </Tab.Navigator>
  );
}

export default App;