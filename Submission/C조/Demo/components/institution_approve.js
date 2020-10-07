import React, { Component } from "react";
import { StyleSheet, Text, View, Image, AsyncStorage } from "react-native";
import { Container, Item, Form, Input, Label, Button } from "native-base";
import { AntDesign } from '@expo/vector-icons';
import SelectPicker from "react-native-form-select-picker";
import web3 from '../web3';
import userCertification from "../UserCertification.js";

const database = "https://react-dapp.firebaseio.com";

export default class Institution_approve extends Component {

  constructor() {
    super()

    this.state = {
      userCertification: userCertification,
      from: '',
      to: '',
      value: '',
      certificate: '',
      insititution: {},
      id: '',
      approve: {},
      type: '',
      typeOptions: ["학력", "자격증", "수상내역", "대외활동", "기타"]
    }
  }

  _get = () => {
    fetch(`${database}/agency/approve/${this.state.id}.json`)
      .then((res) => {
        if (res.status != 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((insititution) => this.setState({ insititution: insititution }));

    fetch(`${database}/address/approve.json`).then((res) => {
      if (res.status != 200) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
      .then((approve) => this.setState({ approve: approve }));
  }

  _deleteUser = (id) => {
    return fetch(`${database}/address/approve/${id}.json`, {
      method: "DELETE"
    })
      .then((res) => {
        if (res.status != 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
      });

  }
  _deleteAgency = (name) => {
    Object.keys(this.state.insititution).map((data) => {
      const tmp = this.state.insititution[data];

      if (tmp.name == name) {
        return fetch(`${database}/agency/approve/${data}.json`, {
          method: "DELETE"
        })
          .then((res) => {
            if (res.status != 200) {
              throw new Error(res.statusText);
            }
            return res.json();
          })
          .then((data) => {

          });
      }
    })
  }

  _sendTransaction = async () => {

    await userCertification.methods.setInstitution().send(
      this.state.certificate,
      {
        from: this.state.from,
        // ,
        gas: 4000000
      });


    await userCertification.methods.setUser().send(
      this.state.to,
      {
        to: this.state.to,
        // ,
        gas: 4000000
      });


    web3.eth.sendTransaction({
      from: this.state.from,
      to: this.state.to,
      value: '1'
    }), function (err) {
      alert(err);
    }
  }




  _post = () => {
    if (this.state.from != '' && this.state.to != '' && this.state.certificate != '' && this.state.value != '') {

      Object.keys(this.state.insititution).map((in_id) => {
        const tmp = this.state.insititution[in_id];
        if (tmp.content == this.state.certificate) {

          Object.keys(this.state.approve).map((id) => {
            const user = this.state.approve[id];
            if (user.name == this.state.to) {
              this._deleteUser(id);
              this._deleteAgency(user.name);
              const data = {
                content: this.state.certificate,
                institution: this.state.from,
                name: this.state.value,
                type: this.state.type,
                verify: true
              }

              return fetch(`${database}/address/approve.json`, {
                method: "POST",
                body: JSON.stringify(data)
              })
                .then((res) => {
                  if (res.status != 200) {
                    throw new Error(res.statusText);
                  }
                  return res.json();
                })
                .then((data) => {

                  alert('승인 되었습니다!');

                });

            }
          })
        }
      })

    } else {
      alert('모두 적어주세요!');
    }
  }


  async componentDidMount() {

    const certificate = await userCertification.methods.setInstitution().call();

    this.setState({ certificate: certificate });

    AsyncStorage.getItem('id').then((id) => {

      this.setState({ id: id })
    })
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
        <View style={{ flex: 0.5,flexDirection: 'row', marginTop: 1}}>
          <Text style={{ marginLeft: '5%', color: '#f1c40f', fontWeight: 'bold', fontSize: 25 }}>승인</Text>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25 }}>하기</Text>
        </View>
        <Form style={{ flex: 5, height: 400, marginTop: '3%', marginBottom: 10 }}>

          <SelectPicker
            style={{
              alignSelf: "center",
              borderRadius: 6,
              width: "85%",
              backgroundColor: "white",
              marginBottom: '5%',
            }}
            onValueChange={(value) => this.setState({ type: value })}
            selected={this.state.type}
            placeholder="Select Type"
          >
            {Object.values(this.state.typeOptions).map((val, index) => (
              <SelectPicker.Item label={val} value={val} key={`type:${index}`} />
            ))}
          </SelectPicker>

          <Input placeholder=' 자격증'
            style={styles.input}
            value={this.state.certificate}
            autoCorrect={false}
            onChangeText={(certificate) => {
              this.setState({ certificate });
            }} />

          <Input placeholder=' 상대 주소'
            value={this.state.to}
            autoCorrect={false}
            style={styles.input}
            onChangeText={(to) => {
              this.setState({ to });
            }} />
          <Input placeholder=' 기관'
            value={this.state.from}
            autoCorrect={false}
            style={styles.input}
            onChangeText={(from) => {
              this.setState({ from });
            }} />
          <Input placeholder=' 값'
            value={this.state.value}
            autoCorrect={false}
            style={styles.input}
            onChangeText={(value) => {
              this.setState({ value });
            }} />
        </Form>

        <Button
          onPress={this._post}
          style={{ flex: 0.5, paddingRight: 20, marginBottom: '5%', paddingLeft: 20, borderRadius: 8, backgroundColor: '#f1c40f', alignSelf: 'center' }}>
          <Text style={{ color: '#112f4c', fontWeight: 'bold', fontSize: 20 }}>Approve</Text>
        </Button>

      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#112f4c'
  },
  header: {
    flex: 1,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: 'flex-start',
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
    fontSize: 29,
    marginLeft: "2%",
    marginTop: "10%",
    color: 'white',
  },
  input: {
    width: '85%',
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    textAlignVertical: "center",
    marginBottom: "6%",
    alignSelf: 'center'
  }
});