import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';


const LoginScreen = ({ navigation }) => {
  const [idValue, setIdValue] = React.useState('');
  const [pwdValue, setPwdValue] = React.useState('');
  
  return (
    <SafeAreaView style = {styles.container}>
      <View style = {styles.titleView}>
        <Text style = {styles.title}>LOGIN</Text>
      </View>
      <View style = {styles.inputView}>
        <TextInput style = {styles.input} placeholder={'id'} 
        onChangeText={text => setIdValue(text)} value = {idValue}></TextInput>
        {/* <Text>{idValue}</Text> */}
        <TextInput style = {styles.input} placeholder = {'pwd'}
         onChangeText={text => setPwdValue(text)} value = {pwdValue}></TextInput>
      </View>
      <View>
        <TouchableOpacity style={[styles.touchable, {backgroundColor : 'black'}]} 
        // onPress = {() => setUserId()}>
        onPress = {() => navigation.navigate('Sub', {screen: 'Home', params :{screen : 'Main', params : {userId : {idValue}, userPwd : {pwdValue}},},} )}>
          {/* 로그인 확인 절차 - db연결 후 진행 */}
          <Text style = {{color : 'white', fontWeight: 'bold'}}>LOG IN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container : {
    flex : 1,
    margin : 10
  },
  titleView : {
    justifyContent : 'center',
    marginBottom : 10
  },
  title : {
    fontSize : 30,
    fontWeight : 'bold'
  },
  inputView : {
    marginBottom : 20
  },
  input : {
    fontSize : 15,
    borderColor : 'black',
    borderWidth : 1,
    marginTop : 10
  },
  touchable : {
    height : 50,
    marginBottom: 10, 
    justifyContent : 'center', 
    alignItems : 'center'
  }
});

export default LoginScreen;