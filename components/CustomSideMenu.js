import * as React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

function CustomSideMenu(props) {
  const closeDrawer = () => {
    props.navigation.closeDrawer(); // Close the drawer
  };

  return (
    <DrawerContentScrollView
      {...props}
      state={props.state}
      navigation={props.navigation}
      contentContainerStyle={styles.drawerContent}
    >
      {/* <DrawerContentScrollView
      {...props}
   
      contentContainerStyle={styles.drawerContent}
    > */}
      {/* Header with your logo */}
      <View style={styles.header}>
        <Image
          source={require("../assets/images/jango.png")}
          style={styles.logo}
        />
      </View>

      {/* Drawer content */}
      <DrawerItemList {...props} />

      {/* Close Drawer Icon */}
      <TouchableOpacity style={styles.closeIcon} onPress={closeDrawer}>
        <Image
          source={require("../assets/images/cross.png")}
          style={styles.closeIconImage}
        />
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    backgroundColor: "#f7f7f7",
    height: 724,
    position: "relative",
    transition: "all 0.2s ease",
    width: 282,
  },
  header: {
    backgroundColor: "#0000eebf",
    borderBottomRightRadius: 194,
    borderTopRightRadius: 0,
    height: 118,
    width: 272,
    top: 0,
    left: 0,
    marginLeft: 10,
  },
  logo: {
    height: 57,
    width: 57,
    top: 40,
    alignItems: "center",
    marginLeft: 100,
  },
  closeIcon: {
    position: "absolute",
    top: 50,
    right: 16,
  },
  closeIconImage: {
    width: 24,
    height: 24,
  },
});

export default CustomSideMenu;
