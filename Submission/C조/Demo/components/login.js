import React, { Component, useState } from "react";
import { Text, Alert, View, StyleSheet, Image, Dimensions, AsyncStorage } from "react-native";
import { Container, Item, Form, Input, Label, Button } from "native-base";
import Portfolio from "./portfolio";

const database = "https://react-dapp.firebaseio.com";
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "",
      key: "",
      id: '',
    };
  }


  onLogin = () => {

    Object.keys(this.state.users).map((id) => {
      const user = this.state.users[id];
      if (user.address == this.state.address) {
        if (user.key == this.state.key) {
          this.setState({ id: id });
          AsyncStorage.setItem('name', user.name);

          this.props.navigation.navigate("After");
        }
      }
    });

    Object.keys(this.state.company).map((id) => {
      const cp = this.state.company[id];
      if (cp.address == this.state.address) {
        if (cp.key == this.state.key) {
          this.setState({ id: id });
          AsyncStorage.setItem('companyname', cp.name);
          AsyncStorage.setItem('companyId', this.state.id);
          this.props.navigation.navigate("After_Company");
        }
      }
    });

    Object.keys(this.state.agency).map((id) => {
      const cp = this.state.agency[id];
      if (cp.address == this.state.address) {
        if (cp.key == this.state.key) {
          this.setState({ id: id });
          AsyncStorage.setItem('id', this.state.id);
          this.props.navigation.navigate("After_Institution");
        }
      }
    });
  };

  _get() {
    fetch(`${database}/address.json`)
      .then((res) => {
        if (res.status != 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((users) => this.setState({ users: users }));

    fetch(`${database}/company.json`)
      .then((res) => {
        if (res.status != 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((company) => this.setState({ company: company }));

    fetch(`${database}/agency.json`)
      .then((res) => {
        if (res.status != 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((agency) => this.setState({ agency: agency }));
  }

  componentDidMount() {
    this._get();
  }

  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.image}>
          <Image source={require("../images/foliochain.png")} />
        </View>
        <Form style={{ alignItems: "center" }}>
          <Item style={styles.inputBox}>
            <Label>Address : </Label>
            <Input
              autoCorrect={false}
              value={this.state.address}
              onChangeText={(address) => {
                this.setState({ address });
              }}
            />
          </Item>
          <Item style={styles.inputBox}>
            <Label>Private Key : </Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              value={this.state.key}
              onChangeText={(key) => {
                this.setState({ key });
              }}
            />
          </Item>
          <View style={{ alignSelf: "center" }}>
            <Button block style={styles.loginButton} onPress={this.onLogin}>
              <Text style={styles.loginText}>Log in</Text>
            </Button>
          </View>

          <Text
            style={styles.registerText}
            onPress={() => {
              this.props.navigation.navigate("Register");
              // this.props.gotoPage('Register');
            }}
          >
            <Text style={{ color: "#f1c40f", textDecorationLine: "underline" }}>
              처음
            </Text>
            이신가요?
          </Text>
        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "#112f4c",
  },
  image: {
    paddingTop: "30%",
    paddingBottom: "20%",
    alignItems: "center",
  },
  inputBox: {
    marginBottom: "8%",
    width: screenWidth - 50,
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    textAlignVertical: "center",
  },
  loginButton: {
    borderRadius: 5,
    width: 100,
    backgroundColor: "#f1c40f",
    marginTop: "10%",
  },
  loginText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  registerText: {
    textAlign: "center",
    marginTop: "10%",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});