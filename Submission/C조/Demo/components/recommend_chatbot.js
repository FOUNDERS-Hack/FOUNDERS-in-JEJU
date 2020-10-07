import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Button,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default class Recommend_chatbot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      msg: "",
      messages: [],
    };
    this.send = this.send.bind(this);
    this.reply = this.reply.bind(this);
    this.renderItem = this._renderItem.bind(this);
    this._get = this._get.bind(this);
  }

  _get() {
    return fetch("http://svc.saltlux.ai:31781", {
      headers: { "Content-Type": "application/json;" },
      method: "POST",
      body: JSON.stringify({
        key: "8109ab77-0547-4dcc-bfbb-65cf87c88cc6",
        serviceId: "01880175149",
        argument: {
          question: this.state.msg,
        },
      }),
    })
      .then((res) => {
        if (res.status != 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({ result: data.answer }, () => {
          var messages = this.state.messages;
          messages.push({
            id: Math.floor(Math.random() * 99999999999999999 + 1),
            sent: false,
            msg: this.state.result,
          });
          this.setState({ msg: "", messages: messages });
        });
      })
      .catch(function (err) {
        console.log("서버 오류");
      });
  }
  reply() {
    this._get();
  }

  send() {
    if (this.state.msg.length > 0) {
      var messages = this.state.messages;
      messages.push({
        id: Math.floor(Math.random() * 99999999999999999 + 1),
        sent: true,
        msg: this.state.msg,
      });
      this.setState({ messages: messages });

      this.reply();
    }
  }

  _renderItem = ({ item }) => {
    if (item.sent === false) {
      return (
        <View style={styles.eachMsg}>
          <Image
            source={require("../images/chatbot.png")}
            style={styles.userPic}
          />
          <View style={styles.msgBlock}>
            <Text style={styles.msgTxt}>{item.msg}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.rightMsg}>
          <View style={styles.rightBlock}>
            <Text style={styles.rightTxt}>{item.msg}</Text>
          </View>
          <Image source={require("../images/me.png")} style={styles.userPic} />
        </View>
      );
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Image
            style={styles.bookIcon}
            source={require("../images/book_icon2.png")}
          />
          <Text style={styles.logoText}>Folio Chain</Text>
        </View>
        <View style={{ flex: 0.15, backgroundColor: "white" }}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 25,
              marginTop: "5%",
            }}
          >
            챗봇과 대화를 시작합니다.
          </Text>
        </View>

        <KeyboardAvoidingView behavior="padding" style={styles.keyboard}>
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <FlatList
              style={styles.list}
              extraData={this.state}
              data={this.state.messages}
              keyExtractor={(item) => {
                return item.id;
              }}
              renderItem={this.renderItem}
            />
            <View style={styles.input}>
              <TextInput
                style={{ flex: 1 }}
                value={this.state.msg}
                placeholderTextColor="#696969"
                onChangeText={(msg) => this.setState({ msg })}
                blurOnSubmit={false}
                onSubmitEditing={() => this.send()}
                placeholder="Type a message"
                returnKeyType="send"
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    width,
    height,
  },
  //   header: {
  //     height: 65,
  //     flexDirection: "row",
  //     justifyContent: "space-between",
  //     alignItems: "center",
  //     backgroundColor: "#075e54",
  //   },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  right: {
    flexDirection: "row",
  },
  input: {
    flexDirection: "row",
    alignSelf: "flex-end",
    padding: "3%",
    height: "8%",
    width: width - 20,
    backgroundColor: "#fff",
    margin: "3%",
    borderColor: "#696969",
    borderWidth: 1,
  },
  eachMsg: {
    flexDirection: "row",
    alignItems: "flex-end",
    margin: "3%",
  },
  rightMsg: {
    flexDirection: "row",
    alignItems: "flex-end",
    margin: "3%",
    alignSelf: "flex-end",
  },
  userPic: {
    height: 50,
    width: 50,
    margin: 7,
    borderRadius: 20,
    backgroundColor: "black",
  },
  msgBlock: {
    width: "55%",
    borderRadius: 10,
    backgroundColor: "#112f4c",
    padding: "5%",
  },
  rightBlock: {
    width: "55%",
    borderRadius: 10,
    backgroundColor: "#112f4c",
    padding: "5%",
  },
  msgTxt: {
    fontSize: 18,
    color: "rgb(241, 196, 15)",
    fontWeight: "600",
  },
  rightTxt: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
  },
  header: {
    flex: 0.2,
    flexDirection: "row",
    backgroundColor: "white",
  },
  bookIcon: {
    marginLeft: 12,
    marginTop: 42,
    width: 42,
    height: 42,
    resizeMode: "contain",
  },
  logoText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: 5,
    marginTop: 42,
    marginBottom: 10,
    color: "#112f4c",
  },
});
