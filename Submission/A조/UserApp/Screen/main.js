import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {Marker} from 'react-native-maps';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

const MainScreen = ({ route, navigation }) => {
    const { userId } = route.params;
    const { userPwd } = route.params;
    return (
        <SafeAreaView style = {styles.container}>
            <View style = {styles.inputView}>
              <TextInput style = {styles.input} placeholder={'원하는 장소를 검색하세요'}></TextInput>
              <TouchableOpacity style = {styles.touchable}>
                <Text style = {styles.touchText}>검색</Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.map}>
            <MapView style={{ flex: 1 }} 
            provider={PROVIDER_GOOGLE} 
            initialRegion={{ latitude: 37.78825, 
            longitude: -122.4324, 
            latitudeDelta: 0.0922, 
            longitudeDelta: 0.0421, 
              }} >
            <Marker
          coordinate={{latitude: 37.78825, longitude: -122.4324}}
          title="this is a marker"
          description="this is a marker example"
        />
        </MapView>
            </View>
        {/* <View style = {styles.titleView}>
            <Text style = {styles.title}>{JSON.stringify(userId)}</Text>
            <Text style = {styles.title}>{JSON.stringify(userPwd)}</Text>
        </View> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container : {
    flex : 1,
    margin : 10,
    marginTop : 20,
    marginBottom : 20
  },
  inputView : {
    flex : 1,
    flexDirection:'row'
  },
  input : {
    flex:3,
    fontSize : 15,
    borderColor : 'black',
    borderWidth : 1,
    marginRight : 10
  },
  touchable : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : 'skyblue'
  },
  touchText : {
    fontSize : 15,
    color : 'black'
  },
  map : {
    flex : 11,
    backgroundColor : 'gray',
    marginTop : 10
  }
});

export default MainScreen;