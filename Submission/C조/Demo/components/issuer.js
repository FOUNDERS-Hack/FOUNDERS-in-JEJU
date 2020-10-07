import { Container, Button, Form, Input, Label, Item } from "native-base";
import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";

const database = 'https://react-dapp.firebaseio.com';

const Issuer = (props) => {
  this.state = {
    block: {},
    users: {},
    id: ''
  }
  const firstData = {
    to: "",
    name: "",
    from: "",
    value: "",
  };
  const [transferData, setTransferData] = useState(firstData);
  const [records, setRecords] = useState([]);

  const onChangeName = (e) => setTransferData({ ...transferData, name: e });
  const onChangeTo = (e) => setTransferData({ ...transferData, to: e });
  const onChangeFrom = (e) => setTransferData({ ...transferData, from: e });
  const onChangeValue = (e) => setTransferData({ ...transferData, value: e });

  const onClickTransfer = () => {
    let element = ["name", "to", "from", "value"];
    for (let i = 0; i < element.length; i++)
      if (transferData[element[i]] === "") {
        alert("모두 입력해주세요");
        return;
      }
    let addRecord = records.concat(transferData);
    setRecords(addRecord);




  };

  function _get() {

    fetch(`${database}/address.json`).then(res => {
      if (res.status != 200) {
        throw new Error(res.statusText);
      }
      return res.json();
    }).then(users => this.setState({
      users: users
    }));

    Object.keys(this.state.users).map(id => {
      fetch(`${database}/address/${id}.json`).then(res => {
        if (res.status != 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      }).then(result => this.setState({
        block: result,
        id: id
      }));
      Object.keys(this.state.block).map(add => {
        if (add == this.firstData.to) {
          return fetch(`${database}/address/${this.state.id}/${this.state.block.address}.json`, {
            method: "POST",
            body: JSON.stringify(firstData),
          })
            .then((res) => {
              if (res.status != 200) {
                throw new Error(res.statusText);
              }
              return res.json();
            })
            .then((data) => {
              alert('성공');
            });
        }
      })
    });
    //<Issuer userData={this.state.userData}/>

  }

  componentDidMount = () => {
    this._get();
  }

  const head = ["NAME", "TO", "FROM", "VALUE"];
  return (
    <Container>
      {/* <Image source={require("../images/logo_renew_remove.png")} /> */}

      <Form>
        <Item floatingLabel>
          <Label>자격증</Label>
          <Input
            value={transferData.name}
            autoCorrect={false}
            onChangeText={onChangeName}
          />
        </Item>

        <Item floatingLabel>
          <Label>상대주소</Label>
          <Input
            value={transferData.to}
            autoCorrect={false}
            onChangeText={onChangeTo}
          />
        </Item>
        <Item floatingLabel>
          <Label>내 주소</Label>
          <Input
            value={transferData.from}
            autoCorrect={false}
            onChangeText={onChangeFrom}
          />
        </Item>
        <Item floatingLabel>
          <Label>값</Label>
          <Input
            value={transferData.value}
            autoCorrect={false}
            onChangeText={onChangeValue}
          />
        </Item>
        <Item style={{ alignSelf: "center" }}>
          <Button style={{ width: 50, height: 50 }} onPress={onClickTransfer}>
            <Text>전송</Text>
          </Button>
        </Item>
      </Form>
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 30 }}> 기록 </Text>
      </View>
      <View style={{ alignSelf: "center" }}>
        <Table
          style={styles.small_container}
          borderStyle={{ borderWidth: 1.5 }}
        >
          <Row style={styles.head} textStyle={styles.textheader} data={head} />
          <Rows
            textStyle={styles.text}
            data={records.map((v) => [
              v["name"],
              v["to"],
              v["from"],
              v["value"],
            ])}
          />
        </Table>
      </View>
    </Container>
  );
};
const styles = StyleSheet.create({
  big_container: {
    borderWidth: 2,
    backgroundColor: "lightgrey",
  },
  small_container: { backgroundColor: "#fff", width: 350 },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  textheader: { margin: 6, textAlign: "center", fontWeight: "bold" },
  text: { margin: 6, textAlign: "center" },
  input: { width: 300, borderWidth: 1, padding: 10 },
  searchBtn: {
    borderWidth: 1,
    width: 50,
    height: 50,
    backgroundColor: "lightblue",
    fontWeight: "bold",
    borderColor: "black",
  },
});
export default Issuer;
