import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Custom drawer label for Profile screen
export const ProfileDrawerLabel = ({ focused, navigation }) => (
  <View style={styles.labelContainer}>
    <Image
      source={require("../assets/images/user.png")}
      style={styles.labelIcon}
    />
    <Text
      style={[
        styles.labelText,
        focused ? styles.labelTextFocused : null,
        focused,
      ]}
    >
      Profile
    </Text>
  </View>
);

// Custom drawer label for My Addresses screen
export const AddressesDrawerLabel = ({ focused }) => (
  <View
    style={[styles.labelContainer, focused && styles.labelContainerFocused]}
  >
    <Image
      source={require("../assets/images/location.png")}
      style={styles.labelIcon}
    />
    <Text style={[styles.labelText, focused ? styles.labelTextFocused : null]}>
      My Addresses
    </Text>
  </View>
);
export const HorizontalLine = () => <View style={styles.horizontalLine}></View>;

// Custom drawer label for Notification screen
export const NotificationDrawerLabel = ({ focused }) => (
  <View style={styles.labelContainer}>
    <Image
      source={require("../assets/images/notification.png")}
      style={styles.labelIcon}
    />
    <Text style={[styles.labelText, focused ? styles.labelTextFocused : null]}>
      Notification
    </Text>
  </View>
);

export const SettingsDrawerLabel = ({ focused }) => (
  <View style={styles.labelContainer}>
    <Image
      source={require("../assets/images/setting.png")}
      style={styles.labelIcon}
    />
    <Text style={[styles.labelText, focused ? styles.labelTextFocused : null]}>
      Settings
    </Text>
  </View>
);

export const HelpDrawerLabel = ({ focused }) => (
  <View style={styles.labelContainer}>
    <Image
      source={require("../assets/images/help.png")}
      style={styles.labelIcon}
    />
    <Text style={[styles.labelText, focused ? styles.labelTextFocused : null]}>
      Help
    </Text>
  </View>
);

import { TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import LoadingSpinner from "../components/LoadingSpinner";
export const LogoutDrawerLabel = ({ focused, onPress }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);


  const handlePress = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            setIsLoading(true);
  
            try {
              // Clear all AsyncStorage data
              await AsyncStorage.clear();
  
              // Simulate some asynchronous operation
              await new Promise((resolve) => setTimeout(resolve, 2000));
  
              // Redirect to the login screen
              navigation.navigate('Login');
            } catch (error) {
              console.error('Error during logout:', error);
            } finally {
              setIsLoading(false);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  

  // const handlePress = async () => {
  //   Alert.alert(
  //     'Logout',
  //     'Are you sure you want to logout?',
  //     [
  //       {
  //         text: 'Cancel',
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'Logout',
  //         onPress: async () => {
  //           setIsLoading(true);

  //           try {
  //             await AsyncStorage.removeItem('userId');
  //             await AsyncStorage.removeItem('full_names');
  //             await AsyncStorage.removeItem('email_address');

  //             // Simulate some asynchronous operation
  //             await new Promise((resolve) => setTimeout(resolve, 2000));

  //             // Redirect to the login screen
  //             navigation.navigate('Login');
  //           } catch (error) {
  //             console.error('Error during logout:', error);
  //           } finally {
  //             setIsLoading(false);
  //           }
  //         },
  //       },
  //     ],
  //     { cancelable: false }
  //   );
  // };

// export const LogoutDrawerLabel = ({ focused, onPress ,navigation}) => {
//   const handlePress = () => {
//     Alert.alert(
//       "Logout",
//       "Are you sure you want to logout?",
//       [
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//         {
//           text: "Logout",
//           onPress: async () => {
//             await AsyncStorage.removeItem("userId");
//             await AsyncStorage.removeItem("full_names");
//             await AsyncStorage.removeItem("email_address");

//             // Redirect to the login screen
//             navigation.navigate("Login");
//           },
//         },
//       ],
//       { cancelable: false }
//     );
//   };

  return (
    <TouchableOpacity onPress={onPress || handlePress}>
    <View style={styles.labelContainer}>
      <Image
        source={require('../assets/images/logout.png')}
        style={styles.labelIcon}
      />
      <Text
        style={[styles.labelText, focused ? styles.labelTextFocused : null]}
      >
        Logout
      </Text>
      {isLoading && <LoadingSpinner />} 
    </View>
  </TouchableOpacity>
  );
};

// export const LogoutDrawerLabel = ({ focused }) => (
//   <View style={styles.labelContainer}>
//     <Image
//       source={require("../assets/images/logout.png")}
//       style={styles.labelIcon}
//     />

/* <Text style={[styles.labelText, focused ? styles.labelTextFocused : null]}>
  Logout
</Text>; */

//   </View>
// );

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5, // Add vertical margin to separate items
    height: 30,
    drawerActiveTintColor: "transparent",
  },
  labelContainerFocused: {
    backgroundColor: "transparent",
  },
  labelIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  labelText: {
    color: "#00000066", // Text color
    fontSize: 13, // Font size
    fontWeight: "400", // Font weight
    fontFamily: "Poppins-Regular", // Specify your font family
    letterSpacing: 0.52, // Letter spacing
    lineHeight: 18.7, // Default text color
  },
  labelTextFocused: {
    color: "red", // Set the text color when focused
  },
  labelTextUnfocused: {
    color: "pink", // Set the text color when not focused
  },
  horizontalLine: {
    height: 1, // Line height
    width: 202, // Line width
    backgroundColor: "black", // Line color
    // marginVertical: 5,
    top: 10,
    marginLeft: -10,
    marginTop: 0,
  },
});
export default {
  ProfileDrawerLabel,
  AddressesDrawerLabel,
  HorizontalLine,
  NotificationDrawerLabel,
  SettingsDrawerLabel,
  LogoutDrawerLabel,
  HelpDrawerLabel,
};
