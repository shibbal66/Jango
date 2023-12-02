import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const CustomHeader = ({ title, navigation }) => {
  return (
    <View style={styles.header}>
      {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../assets/images/ep_back.png')} style={styles.backImage} />
      </TouchableOpacity> */}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "#0000ee",
    height: 60,
    width: 360,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    left: 10,
  },
  backImage: {
    width: 24, // Adjust the width and height as needed
    height: 24,
  },
  headerTitle: {
    color: "#ffffff",
    fontFamily: "Inter-Medium",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.64,
    lineHeight: 23,
  },
});

export default CustomHeader;
