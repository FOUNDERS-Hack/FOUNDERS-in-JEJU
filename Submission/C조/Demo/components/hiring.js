import { Button } from "native-base";
import React, { createRef, useState, Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions, ViewComponent, AsyncStorage
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const database = "https://react-dapp.firebaseio.com";
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const Hiring = (props) => {
  const [userData, setData] = useState({});
  const [comapnyData, setCompany] = useState({});
  const [userID, setID] = useState('');
  const [applicant, setApply] = useState({});
  const [datas, setDatas] = useState();


  AsyncStorage.getItem('name').then((id) => {
    setID(id);
  })

  _get = () => {



    fetch(`${database}/company/post.json`)
      .then((res) => {
        if (res.status != 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((company) => setData(company));

    fetch(`${database}/company.json`)
      .then((res) => {
        if (res.status != 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => setCompany(data));




  }

  _apply = (name) => {
    Object.keys(comapnyData).map(id => {
      const tmp = comapnyData[id];
      const datas = {
        company: name,
        name: userID
      }
      if (id != 'post' && tmp.name == name) {
        return fetch(`${database}/company/apply.json`, {
          method: "POST",
          body: JSON.stringify(datas)
        })
          .then((res) => {
            if (res.status != 200) {
              throw new Error(res.statusText);
            }
            return res.json();
          })
          .then((data) => {
            alert('지원되었습니다! ');
          });
      }
    })


  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.bookIcon}
          source={require("../images/book_icon2.png")}
        />
        <Text style={styles.logoText}>Folio Chain</Text>
      </View>
      <ScrollView>
        <View>
          <View style={styles.card}>
            {_get()}


            {
              Object.keys(userData).map((id) => {
                const cp = userData[id];
                return (
                  <TouchableOpacity

                    style={{
                      borderWidth: 1,
                      backgroundColor: "#112f4c",
                      paddingBottom: 40,
                      marginBottom: 20,
                    }}
                    onPress={() => {
                      _apply(cp.name);
                      alert(`${cp.name} 공고에 지원합니다.`);
                    }}
                  >
                    <View>
                      <Text style={styles.title}>{cp.name}</Text>
                      <Text style={styles.content}>{cp.notice}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    backgroundColor: "white",
  },
  header: {
    //flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
  },
  bookIcon: {
    marginLeft: "4%",
    marginTop: "10%",
    width: "10%",
    height: "50%",
    resizeMode: "contain",
  },
  logoText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: "2%",
    marginTop: "11%",
    color: "#112f4c",
    marginBottom: "5.8%",
  },
  card: {
    width: "93%",
    alignSelf: "center",
  },
  title: {
    fontSize: 40,
    color: "#f1c40f",
    fontWeight: "bold",
    paddingTop: "3%",
    paddingBottom: "10%",
    paddingLeft: "3%",
  },
  content: {
    fontSize: 20,
    color: "#f1c40f",
    paddingLeft: "3%",
  },
});

export default Hiring;
