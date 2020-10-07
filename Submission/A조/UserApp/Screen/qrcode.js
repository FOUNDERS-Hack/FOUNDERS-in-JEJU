//This is an example code to Scan QR code//
import React, { Component } from 'react';
//import react in our code.
import { Text, View, Linking, TouchableHighlight, PermissionsAndroid, 
Platform, StyleSheet, Button} from 'react-native';
// import all basic components
import { createStackNavigator } from '@react-navigation/stack';
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
//import CameraKitCameraScreen we are going to use.

const QRScreen = ({ navigation }) => {
  const [qrvalue, setQR] = React.useState(0);
  const [openScanner, setScanner] = React.useState(false);
  const [using, setUsing] = React.useState(false);

  function onBarcodeScan(value) {
    //called after te successful scanning of QRCode/Barcode
    setQR(value);
    setScanner(false);
    if(using == false) setUsing(true); //컨트랙트 연결 시 수정 필요
    else setUsing(false);
  }
  
  function onOpenScanner() {
    //To Start Scanning
    if(Platform.OS === 'android'){
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,{
              'title': 'CameraExample App Camera Permission',
              'message': 'CameraExample App needs access to your camera '
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //If CAMERA Permission is granted
            setQR(0);
            setScanner(true);
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
          alert("Camera permission err",err);
          console.warn(err);
        }
      }
      //Calling the camera permission function
      requestCameraPermission();
    }else{
      setQR(0);
      setScanner(true);
    }    
  }
    let displayModal;
    //If qrvalue is set then return this view
    if (openScanner == false) {
      if(qrvalue != 0){
        return ( 
        <View style={styles.container}>
          <Text style={styles.heading}>킥보드 정보</Text>
          <Text style={styles.simpleText}>{qrvalue != 0 ? qrvalue : ''}</Text>
          <TouchableHighlight
            onPress={() => {
              navigation.navigate('lending', {
                kickNum : qrvalue,
                isUsing : using,
              })
              setQR(0);
            }}
            style={styles.button}>
              <Text style={{ color: 'skyblue', fontSize: 12 }}>
                확인
              </Text>
          </TouchableHighlight>
        </View> );
      }
      else{
        if(using == false){
          return ( <View style={styles.container}>
            <Text style={styles.heading}>대여할 킥보드를 인식시켜주세요.</Text>
            <TouchableHighlight
              onPress={() => onOpenScanner()}
              style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>
                Open QR Scanner
                </Text>
            </TouchableHighlight>
          </View> );
        }
        else{
          return (
            <View style={styles.container}>
              <Text style={styles.heading}>반납할 킥보드를 인식시켜주세요.</Text>
              <TouchableHighlight
                onPress={() => onOpenScanner()}
                style={styles.button}>
                  <Text style={{ color: '#FFFFFF', fontSize: 12 }}>
                  Open QR Scanner
                  </Text>
                </TouchableHighlight>
            </View>
          );
        }
      }
    }
    return (
      <View style={styles.qrstyle}>
        {<CameraKitCameraScreen
          showFrame={true} //Show/hide scan frame
          scanBarcode={true} //Can restrict for the QR Code only
          laserColor={'white'} //Color can be of your choice
          frameColor={'white'} //If frame is visible then frame color
          colorForScannerFrame={'black'} //Scanner Frame color
          onReadCode={event =>
            onBarcodeScan(event.nativeEvent.codeStringValue)
          }/> }
      </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2c3539',
    padding: 10,
    width:300,
    marginTop:16
  },
  heading: { 
    color: 'black', 
    fontSize: 15, 
    alignSelf: 'center', 
    padding: 10, 
    marginTop: 30
  },
  simpleText: { 
    color: 'black', 
    fontSize: 20, 
    alignSelf: 'center', 
    padding: 10, 
    marginTop: 16
  },
  qrstyle : {
    flex : 1
  },
  camera : {
    height : 300
  }
});

export default QRScreen;