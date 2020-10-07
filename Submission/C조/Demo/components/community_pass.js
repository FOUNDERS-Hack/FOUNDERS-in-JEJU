import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import {
  MaterialIcons,
  Entypo,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
const screenWidth = Math.round(Dimensions.get("window").width);

const Community_pass = () => {
  const [title, content, time] = useState([
    {
      image: true,
      key: 1,
      time: "1분 전",
      title: "토익 100점",
      content: "하하 저 토익 100점 입니다~! 이딴 거 안보내줘도 괜찮은데 ",
    },
    {
      image: false,
      key: 2,
      time: "4분 전",
      title: "근황",
      content:
        "전 해커톤에 참여하고 있어서 얼른 수료증이 나왔으면 좋겠어요 얼른 트랜잭션을 받았으면 좋겠습니다.",
    },
    {
      image: false,
      key: 3,
      time: "12:55",
      title: "포트폴리오",
      content:
        "전 백수입니다. 아무것도 없어요 뭐하고 살죠? 전 힘든 일도 싫습니다 다음에는 돌로 태어날래요",
    },
    {
      image: true,
      key: 4,
      time: "07:34",
      title: "인생",
      content: "다음에는 우리집 반려 식물 우각이로 태어날래요 ",
    },
    {
      image: false,
      key: 5,
      time: "03:12",
      title: "folio app",
      content:
        "이 앱 너무 좋네요 편리하고 커뮤니티 기능이 있어서 너무 좋습니다 하하하 ",
    },
    {
      image: false,
      key: 6,
      time: "01:00",
      title: "개발",
      content:
        "진지하게 개발을 그만둘 생각을 하고 있습니다 그냥 침대랑 결혼할래요",
    },
    {
      image: false,
      key: 7,
      time: "09/27",
      title: "지금 죽고싶다",
      content:
        "팀원들이 좋아서 아직까지 HP:1 남은 상태에서 생존해나가고 있습니다",
    },
    {
      image: false,
      key: 8,
      time: "09/27",
      title: "인생",
      content: "다음에는 우리집 반려 식물 우각이로 태어남 ",
    },
    {
      image: false,
      key: 9,
      time: "09/27",
      title: "삼성전자",
      content:
        "여러분 ㅋ 저 이정도면 ㅋ 하반기 ㅋ삼ㅋ성ㅋ전ㅋ자ㅋ 합격 가능 ?ㅋ  그냥 Easy 하게 가겠네요 ㅋ",
    },
    {
      image: false,
      key: 10,
      time: "09/26",
      title: "개발",
      content:
        "진지하게 개발을 그만둘 생각을 하고 있습니다 그냥 침대랑 결혼할래요",
    },
    {
      image: false,
      key: 11,
      time: "09/25",
      title: "행복",
      content: "다 했어요 이제 곧 회의해요 ",
    },
  ]);
  return (
    <View style={{ backgroundColor: "#112f4c" }}>
      <View style={styles.imageLine}>
      <Image style={{width:"10%", height:"100%"}}
        source={require("../images/book_icon2.png")} />
        <Text style={styles._header}> Folio Chain</Text>
      </View>
      <View>
        <Text style={styles.boradName}>합격 게시판</Text>
      </View>
      <View style={styles.container}>
        <ScrollView>
          {title.map((user) => {
            return (
              <View key={user.key} style={styles.data}>
                <View style={styles.profile_wrap}>
                  <MaterialIcons name="person-pin" size={24} color="#4A485C" />
                  <Text style={styles.name}> 익명 </Text>
                  <Text style={styles.date}>{user.time}</Text>
                </View>
                <Text style={styles.title}>{user.title}</Text>
                <Text>{user.content}</Text>
                <View style={styles.icon_wrap}>
                  {user.image ? (
                    <Entypo name="image" size={14} color="#4A485C" />
                  ) : (
                    <Text />
                  )}
                  <AntDesign name="like2" size={14} color="red" />
                  <FontAwesome name="comment-o" size={14} color="blue" />
                </View>
              </View>
            );
          })}
          <View style={{ height: 65 }}></View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#025880",
  },
  imageLine: {
    paddingLeft: "3%",
    flexDirection: "row",
    paddingTop: "10%",
    paddingBottom: "5.5%",
    backgroundColor: "white",
  },
  _header: {
    fontSize: 30,
    paddingTop: 5,
    fontWeight: "bold",
    color: "#112f4c",
  },
  boradName: {
    fontSize: 25,
    color: "#f1c40f",
    fontWeight: "bold",
    paddingLeft: "5%",
    marginTop: "3%",
    marginBottom: "3%",
  },
  container: {
    backgroundColor: "white",
    width: screenWidth - 50,
    borderWidth: 2,
    alignItems: "center",
    alignSelf: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
  },
  content: {
    textAlign: "center",
  },
  profile_wrap: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
  },
  data: {
    width: "90%",
    // padding: 20,
    borderBottomColor: "gray",
    borderBottomWidth: 0.3,
    marginTop: 5,
  },
  name: {
    paddingLeft: "1%",
  },
  date: {
    paddingLeft: 190,
    fontSize: 13,
  },
  icon_wrap: {
    width: "17%",
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "space-between",
    marginLeft: 210,
  },
});

export default Community_pass;
