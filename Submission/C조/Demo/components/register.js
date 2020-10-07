import React, { Component } from "react";
import { Text, Alert, View, StyleSheet, Image } from "react-native";
import {
  Container,
  Item,
  Form,
  Input,
  Label,
  Button,

  CheckBox,
  AsyncStorage
} from "native-base";
import Portfolio from "./portfolio";
import Company_main from "./company_main";
// import firebase from '../firebase';

const database = "https://react-dapp.firebaseio.com";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      name: "",
      address: "",
      key: "",
      ids: "",
      company_checked: true,
      institution_checked: false,
    };
  }

  _post(user) {
    if (!this.state.company_checked && !this.state.institution_checked) {
      return fetch(`${database}/address.json`, {
        method: "POST",
        body: JSON.stringify(user),
      })
        .then((res) => {
          if (res.status != 200) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          AsyncStorage.setItem('id', this.state.ids);
          AsyncStorage.setItem('name', this.state.name);
          AsyncStorage.setItem('userData', this.state.user);
          this.props.navigation.navigate("After");
          // this.props.gotoPage("Portfolio", { ids: this.state.user });
          // this.props.gotoPage("Portfolio");
        });
    } else if (this.state.institution_checked) {
      return fetch(`${database}/agency.json`, {
        method: "POST",
        body: JSON.stringify(user),
      })
        .then((res) => {
          if (res.status != 200) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          AsyncStorage.setItem('id', this.state.ids);

          this.props.navigation.navigate("After_Institution");
        });
    } else {
      return fetch(`${database}/company.json`, {
        method: "POST",
        body: JSON.stringify(user),
      })
        .then((res) => {
          if (res.status != 200) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          AsyncStorage.setItem('companyname', this.state.name);
          AsyncStorage.setItem('companyId', this.state.ids);
          this.props.navigation.navigate("After_Company");
        });
    }
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleAddressChange = (e) => {
    this.setState({ address: e.target.value });
  };

  handleKeyChange = (e) => {
    this.setState({ key: e.target.value });
  };

  handleSubmit() {
    const user = {
      address: this.state.address,
      key: this.state.key,
      name: this.state.name,
    };
    if (!user.name || !user.address || !user.key) {
      alert("모두 입력해주세요");
      return;
    }
    this._post(user);
  }

  render() {
    return (
      <Container style={styles.container}>
        <View
          style={{
            marginTop: "30%",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Image source={require("../images/book.png")} style={styles.image} />
          <Text style={styles.title}>Folio Chain</Text>
        </View>
        <Form
          style={{
            marginTop: "10%",
            height: 270,
            width: "100%",
            alignItems: "center",
          }}
        >
          <Input
            autoCapitalize="none"
            value={this.state.name}
            placeholder=" Name"
            style={styles.input}
            autoCorrect={false}
            onChangeText={(name) => {
              this.setState({ name });
            }}
          />

          <Input
            autoCapitalize="none"
            value={this.state.address}
            placeholder=" Address"
            autoCorrect={false}
            style={styles.input}
            onChangeText={(address) => {
              this.setState({ address });
            }}
          />

          <Input
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder=" Private Key"
            value={this.state.key}
            style={styles.input}
            onChangeText={(key) => {
              this.setState({ key });
            }}
          />
        </Form>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            marginTop: "5%",
          }}
        >
          <Text
            style={{
              fontSize: 19,
              color: "#f1c40f",
              fontWeight: "bold",
              textDecorationLine: "underline",
            }}
          >
            기업회원
          </Text>
          <Text style={{ color: "white", fontWeight: "bold" }}> 이신가요?</Text>
          <CheckBox
            style={styles.checkbox}
            checked={this.state.company_checked}
            onPress={() =>
              this.setState({ company_checked: !this.state.company_checked })
            }
          />
        </View>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            marginTop: "5%",
          }}
        >
          <Text
            style={{
              fontSize: 19,
              color: "#f1c40f",
              fontWeight: "bold",
              textDecorationLine: "underline",
            }}
          >
            기관회원
          </Text>
          <Text style={{ color: "white", fontWeight: "bold" }}> 이신가요?</Text>
          <CheckBox
            style={styles.checkbox}
            checked={this.state.institution_checked}
            onPress={() =>
              this.setState({
                institution_checked: !this.state.institution_checked,
              })
            }
          />
        </View>
        <Button
          block
          style={styles.register_btn}
          onPress={this.handleSubmit.bind(this)}
        >
          <Text
            style={{
              color: "#112f4c",
              fontWeight: "bold",
              fontSize: 21,
            }}
          >
            Register
          </Text>
        </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#112f4c",
    alignItems: "center",
    color: "white",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 20,
    color: "white",
  },
  image: {
    width: 38,
    height: 38,
  },
  input: {
    borderRadius: 7,
    borderColor: "#000000",
    borderWidth: 0.5,
    backgroundColor: "white",
    color: "black",
    width: "85%",
    height: 3,
    marginTop: 45,
  },
  register_btn: {
    alignSelf: "center",
    marginTop: "22%",
    width: 100,
    borderRadius: 6,
    backgroundColor: "#f1c40f",
  },
  checkbox: {
    borderColor: "#112f4c",
  },
});
