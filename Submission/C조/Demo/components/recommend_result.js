import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";

const Recommend_result = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Recommend_result </Text>
      <Button onPress={() => navigation.goBack()} title="확인"></Button>
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Recommend_result;