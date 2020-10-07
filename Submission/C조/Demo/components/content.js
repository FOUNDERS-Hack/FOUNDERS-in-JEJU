
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

const database = 'https://react-dapp.firebaseio.com';

export default class Content extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {}
    }
  }

  componentDidMount = () => {
    fetch(`${database}/company/post.json`).then(res => {
      if (res.status != 200) {
        throw new Error(res.statusText);
      }
      return res.json();
    }).then(posts => this.setState({ data: posts }))

  }
  componentDidUpdate = () => {
    fetch(`${database}/company/post.json`).then(res => {
      if (res.status != 200) {
        throw new Error(res.statusText);
      }
      return res.json();
    }).then(posts => this.setState({ data: posts }))

  }


  render() {
    return (
      <View>
        {
          Object.keys(this.state.data).map(id => {
            const tmp = this.state.data[id];
            return (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.text}>{tmp.name}</Text>
                <Text>  {tmp.owner}</Text>
                <Text>  {tmp.notice}</Text>
              </View>
            )
          })
        }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: '700',
  }

});