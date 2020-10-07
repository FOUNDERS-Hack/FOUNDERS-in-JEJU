import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList, AsyncStorage
} from 'react-native';


const database = "https://react-dapp.firebaseio.com";
export default class Company extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      apply: {},
      companys: {}
      , compnyName: ''
    };
  }

  _get = () => {
    AsyncStorage.getItem('companyname').then((name) => {
      this.setState({ compnyName: name });
    })

    fetch(`${database}/company/apply.json`)
      .then((res) => {
        if (res.status != 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((apply) => this.setState({ apply: apply }))





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
            지원자
        </Text>
          <Text style={styles.item2}>
            현황
        </Text>
        </View>
        <ScrollView
          style={styles.notificationList}>
          {


            Object.keys(this.state.apply).map((data) => {

              const applicant = this.state.apply[data];
              if (applicant.company == this.state.compnyName) {
                return (
                  <View style={styles.notificationBox} onPress={this.approve}>
                    <Image style={styles.icon}
                      source={require('../images/personal-information.png')} />
                    <Text style={styles.username}>{applicant.name} 지원</Text>
                    <Text style={styles.username}>{this.state.compnyName} 지원</Text>
                  </View>
                )

              }
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
    marginTop: "10%",
    width: "10%",
    height: "50%",
    resizeMode: 'contain',
  },
  logoText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: "2%",
    marginTop: "11%",
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
