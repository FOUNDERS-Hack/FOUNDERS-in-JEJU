import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: '고객센터(결제)', value : '최근대화'},
          {key: '고객센터(사고처리)', value : '최근대화'},
        ]}
        renderItem={({item}) => {
          return(
            <TouchableOpacity style={styles.chatView}>
              <View>
                <Text style={styles.keyStyle}>{item.key}</Text>
                <Text style = {styles.valueStyle}>{item.value}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  chatView: {
    borderBottomWidth: 2,
    padding:8,
    backgroundColor : 'white'
  },
  keyStyle : {
    fontWeight : 'bold',
    fontSize : 20,
    marginBottom : 10,
    color : 'skyblue'
  },
  valueStyle : {
    marginBottom : 20
  }
});


export default ChatScreen;