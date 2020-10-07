import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';
import QRScreen from './qrcode';

//using에 따라 대여/반납 컨트랙트 실행 : 해당 value의 킥보드의 이용상태 확인 후
const LendingScreen = ({route, navigation}) => {
    const { kickNum } = route.params;
    const { isUsing } = route.params;
        // const using = this.props.navigation.getParam('using');
    if(isUsing == true){
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>{JSON.stringify(kickNum)}</Text>
              {/* <Button title = 'goback' onPress = {() => this.props.navigation.navigate('QR')}></Button> */}
            </View>
        );
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>반납되었습니다</Text>
          {/* <Button title = 'goback' onPress = {() => this.props.navigation.navigate('QR')}></Button> */}
        </View>
    );    
}

export default LendingScreen;