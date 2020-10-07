import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const database = "https://react-dapp.firebaseio.com";
export default class Company_employment extends Component {

  constructor(props) {
    super(props);

    this.state = {
      company: '',
      owner: '',
      notice: ''

    }
  }

  _post = () => {
    const data = {
      name: this.state.company,
      owner: this.state.owner,
      notice: this.state.notice
    };

    return fetch(`${database}/company/post.json`, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status != 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        alert('채용 공고 작성 완료!');
      });
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
            채용 공고
            </Text>
          <Text style={styles.item2}>
            작성하기
            </Text>
        </View>
        <View style={styles.case1}>
          <Text style={styles.item3}>
            기업명
            </Text>
          <View style={styles.inputContainer1}>
            <TextInput style={styles.inputs}
              placeholder="Company Name" value={this.state.company} onChangeText={(company) => {
                this.setState({ company })
              }
              } />
          </View>
          <Text style={styles.item3}>
            사업주명
            </Text>
          <View style={styles.inputContainer1}>
            <TextInput style={styles.inputs}
              placeholder="Owner Name"
              value={this.state.owner} onChangeText={(owner) => {
                this.setState({ owner })
              }
              } />
          </View>
          <Text style={styles.item3}>
            소개글
            </Text>
          <View style={styles.inputContainer2}>
            <TextInput style={styles.inputs}
              placeholder="A notice of employment"
              value={this.state.notice} onChangeText={(notice) => {
                this.setState({ notice })
              }
              } />
          </View>
        </View>
        <View style={styles.case2}>
          <TouchableOpacity style={styles.button}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#424242" }} onPress={this._post}>
              채용 공고 올리기</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
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
  item1: {
    marginTop: "2%",
    marginBottom: "2%",
    marginLeft: "5%",
    fontSize: 25,
    fontWeight: "bold",
    color: 'white',
  },
  item2: {
    marginTop: "2.6%",
    marginBottom: "2%",
    marginLeft: "2%",
    fontSize: 25,
    fontWeight: "bold",
    color: 'rgb(241, 196, 15)',
  },
  item3: {
    marginTop: "2%",
    //marginBottom: 10,
    marginLeft: "5%",
    fontSize: 20,
    fontWeight: "bold",
    color: 'white',
  },
  case1: {
    flex: 4,
    backgroundColor: '#112f4c',
  }, case2: {
    flex: 1,
    backgroundColor: '#112f4c',
    flexDirection: "row",
  },
  inputContainer1: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderBottomWidth: 1,
    width: "90%",
    height: "12%",
    marginTop: "2%",
    marginBottom: "3%",
    marginLeft: "4%",
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer2: {
    paddingVertical: "18%",
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderBottomWidth: 10,
    width: "90%",
    height: "12%",
    marginTop: "2%",
    marginBottom: "3%",
    marginLeft: "4%",
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 30,
    marginLeft: "5%",
    borderBottomColor: '#FFFFFF',
    flex: 1,
    fontSize: 18,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "5.5%",
    marginBottom: "7%",
    marginLeft: "5%",
    marginRight: "5%",
    borderRadius: 5,
    backgroundColor: "rgb(241, 196, 15)"
  }
});