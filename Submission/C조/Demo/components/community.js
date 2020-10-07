import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import {
  MaterialIcons,
  Entypo,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import { Container } from "native-base";
import { Button } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const Community = () => {
  let tempData = [
    {
      user_id: "관리자",
      image: require("../images/card_portfolio.png"),
      date: "2020.10.01",
      title: "완벽한 포트폴리오 작성하는 법!",
      content: "당신의 완벽한 포트폴리오를 위해서.. ",
      like: "6",
    },
    {
      user_id: "Good Person",
      image: require("../images/card_company.png"),
      date: "2020.10.11",
      title: "좋은 회사를 선택하는 Tip!!",
      content: "오늘은 좋은 회사를 선택하는 꿀팁을 가져왔습니다! 재미있게 봐주세요~",
      like: "14",
    },
    {
      user_id: "zzxc2313zvcz",
      image: require("../images/card_1.png"),
      date: "2020.09.10",
      title: "자격증 시험 준비",
      content:
        "자격증 시험 준비 중인데 아무것도 안하고 있어요! 기출문제만 풀면 그래도 필기는 합격하겠죠 ? ",
      like: "1",
    },
    {
      user_id: "관리자",
      image: require("../images/card_ai.png"),
      date: "2020.11.01",
      title: "AI 서비스",
      content: "Folio App에 AI 서비스를 간단하게 소개하려고 합니다~ 블로그. 뉴스. 트위터. 이 3가지 부분에서 저희가 원하고자 하는 회사에 대한 검색을 하실 수 있어요! 정말 멋진 기능이죠 ? 한번 사용해보세요! ",
      like: "128",
    },
    {
      user_id: "haha",
      image: require("../images/smile.png"),
      date: "2020.09.10",
      title: "항상 웃는 얼굴",
      content: "웃으면서 건강하게 살아요!",
      like: "0",
    },
    {
      user_id: "data",
      image: require("../images/data.png"),
      date: "2020.09.10",
      title: "데이터 분석",
      content: "제가 지금 특정 회사 합격자 스펙에 관한 데이터 분석을 하고 있는데 데이터가 너무 적네요.. 도움 주실 분 있으실까요? 여기 커뮤니티에 한번 글 써봅니다! ",
      like: "5",
    },
  ];
  tempData.sort((a, b) => (a.date > b.date ? -1 : 1));
  // const [communityData, setCommunityData] = useState(
  //   tempData.slice().sort((a, b) => (a.date > b.date ? -1 : 1))
  // );
  // useEffect(() => {
  //   setCommunityData(tempData);
  // }, tempData);

  return (
    <View style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.bookIcon}
            source={require("../images/book_icon2.png")}
          />
          <Text style={styles.logoText}>Folio Chain</Text>
        </View>
        <ScrollView>
          <View style={{ marginBottom: 230, alignItems: "center" }}>
            {tempData.map((card, i) => {
              return (
                <View style={styles.cardContainer} key={i}>
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <View style={styles.userImage}>
                          <Ionicons name="md-person" size={30} color="black" />
                        </View>
                        <View style={styles.userId}>
                          <Text style={{ fontSize: 15 }}>{card.user_id}</Text>
                        </View>
                      </View>
                      <View style={styles.date}>
                        <Text style={{ fontSize: 15 }}>{card.date}</Text>
                      </View>
                    </View>
                    <View
                      style={{ flexDirection: "column", paddingBottom: 10 }}
                    >
                      <View style={{ alignSelf: "center" }}>
                        <View style={{ height: 350, color: "red" }}>
                          <Image
                            style={{ height: 345, resizeMode: "contain" }}
                            source={card.image}
                          />
                        </View>
                      </View>
                    </View>
                    <View style={styles.title}>
                      <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                        {card.title}
                      </Text>
                    </View>
                    <View style={styles.content}>
                      <Text style={{ fontSize: 15 }}>{card.content}</Text>
                    </View>
                    <View style={{ flexDirection: "row", paddingTop: 20,paddingLeft: 20 }}>
                      <Ionicons name="md-heart" size={15} color="red" />
                      <Text style={{ paddingLeft: 3 }}>{card.like}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    backgroundColor: "#112f4c",
  },
  header: {
    paddingBottom: 30,
    flexDirection: "row",
    backgroundColor: "white",
  },
  bookIcon: {
    marginLeft: "4%",
    marginTop: "11%",
    width: "10%",
    height: "55%",
    resizeMode: "contain",
  },
  logoText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: "2%",
    marginTop: "11%",
    color: "#112f4c",
  },
  cardContainer: {
    alignContent: "center",
    backgroundColor: "white",
    width: screenWidth,
    paddingBottom: 40,
  },
  userImage: {
    fontSize: 40,
    padding: 10,
  },
  userId: {
    fontSize: 20,
    padding: 10,
  },
  date: {
    fontSize: 20,
    padding: 10,
  },
  title: {
    paddingLeft: 20,
  },
  content: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  like: {
    paddingLeft: 30,
  },
  boradName: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    paddingLeft: "5%",
    color: "#f1c40f",
    marginTop: "3%",
    marginBottom: "3%",
  },
});

export default Community;
