import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const database = "https://react-dapp.firebaseio.com";

export default class Institution_main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 1, username: "승인대기자 1", value: '토익 점수 요청' },
        { id: 2, username: "승인대기자 2", value: '한국사 인증 요청' },
        { id: 3, username: "승인대기자 3", value: '정보처리기사 요청' },
        { id: 4, username: "승인대기자 4", value: '오픽 요청' },
        { id: 5, username: "승인대기자 5", value: '토익 스피킹 요청' },
        { id: 6, username: "승인대기자 6", value: '정보 보안 기사 ' },
        { id: 7, username: "승인대기자 7", value: '한식조리기능사 자격증' },
        { id: 8, username: "승인대기자 8", value: '토플 점수 요청' },
        { id: 9, username: "승인대기자 9", value: '컴퓨터 활용 능력 2급' },
      ],
      users: {},
      id: 1,
    };
  }

  _get = () => {
    fetch(`${database}/agency/approve.json`)
      .then((res) => {
        if (res.status != 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((agency) => this.setState({ users: agency }));


  }

  componentDidMount() {
    this._get();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.bookIcon}
            source={require('../images/book.png')} />
          <Text style={styles.logoText}>
            Folio Chain
        </Text>
        </View>
        <View style={{ backgroundColor: '#112f4c', flexDirection: "row" }} >
          <Text style={styles.item1}>
            승인 요청
        </Text>
          <Text style={styles.item2}>
            현황
        </Text>
        </View>
        <ScrollView
          style={styles.notificationList}>
          {
            Object.keys(this.state.users).map((id) => {
              const user = this.state.users[id];
              return (
                <View style={styles.notificationBox} onPress={this.approve}>
                  <Image style={styles.icon}
                    source={require('../images/personal-information.png')} />

                  <Text style={styles.username}>{user.content} 인증 요청</Text>
                </View>
              )
            })
          }
        </ScrollView>
      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.2,
    flexDirection: "row",
    backgroundColor: '#112f4c',
  },
  bookIcon: {
    marginLeft: "4%",
    marginTop: "9%",
    width: "9.5%",
    height: "50%",
    resizeMode: 'contain',
  },
  logoText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 29,
    marginLeft: "2.5%",
    marginTop: "10%",
    color: 'white',
  },
  notificationList: {
    flex: 10,
    paddingRight: "5%",
    paddingLeft: "5%",
    backgroundColor: '#112f4c',
  },
  notificationBox: {
    padding: "6%",
    marginTop: "3%",
    marginBottom: "2%",
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
  },
  icon: {
    width: "10%",
    height: "130%",
    resizeMode: "contain",
  },
  username: {
    color: "black",
    fontSize: 17,
    alignSelf: 'center',
    marginLeft: "5%"
  },
  item1: {
    marginTop: "1%",
    marginBottom: "5%",
    marginLeft: "6%",
    fontSize: 25,
    fontWeight: "bold",
    color: 'white',
  },
  item2: {
    marginTop: "1%",
    marginBottom: "5%",
    marginLeft: "3%",
    fontSize: 25,
    fontWeight: "bold",
    color: 'rgb(241, 196, 15)',
  },
});