import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaView, StyleSheet, View,Text,
  Platform, PermissionsAndroid, TouchableHighlight
} from 'react-native';
import { CameraKitCameraScreen, } from 'react-native-camera-kit';

const QRScreen = () => {
  const [qrvalue, setValue] = React.useState(0);
  const [scanStart, setScan] = React.useState(false);

  function onQRScan(value) {
    setValue(value);
    setScan(false);
  }

  onOpenScanner = () => {
    var that = this;
    if(Platform.OS == 'android'){
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
            setValue(0);
            setScan(false);
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
      setValue(0);
      setScan(true);
    }  
  }

  if(!{scanStart}){
    return (
      <View style={styles.container}>
          <Text style={styles.heading}>React Native QR Code Example</Text>
          <Text style={styles.simpleText}>{{qrvalue} ? 'Scanned QR Code: '+{qrvalue} : ''}</Text>
          <TouchableHighlight
            onPress={() => this.onOpenScanner()}
            style={styles.button}>
              <Text style={{ color: '#FFFFFF', fontSize: 12 }}>
              Open QR Scanner
              </Text>
          </TouchableHighlight>
      </View>
    );
  }else{
    return (
      <View style={{ flex: 1 }}>
        <CameraKitCameraScreen
          showFrame={false}
          //Show/hide scan frame
          scanBarcode={true}
          //Can restrict for the QR Code only
          laserColor={'blue'}
          //Color can be of your choice
          frameColor={'yellow'}
          //If frame is visible then frame color
          colorForScannerFrame={'black'}
          //Scanner Frame color
          onReadCode={event =>
            onQRScan(event.nativeEvent.codeStringValue)
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white'
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
    fontSize: 24, 
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
  }
});

export default QRScreen;