// import React, { useState } from "react";
// import { View, Text, Switch, StyleSheet, SafeAreaView } from "react-native";

// const Settings = () => {
//   const [notificationEnabled, setNotificationEnabled] = useState(false);
//   const [contactAccessEnabled, setContactAccessEnabled] = useState(false);
//   const [shareAddressEnabled, setShareAddressEnabled] = useState(false);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View>
//         <View style={styles.viewContainer}>
//           <Text style={styles.heading}>Notification</Text>

//           <Text style={styles.description}>
//             Enable notification to display over other apps
//           </Text>
//         </View>
//         <Switch
//           value={notificationEnabled}
//           onValueChange={(value) => setNotificationEnabled(value)}
//           style={styles.toggleButton}
//         />
//         <View style={styles.line} />
//         {/* Contact View */}
//         <View style={styles.viewContainer}>
//           <Text style={styles.heading}>Contact</Text>
//           <Text style={styles.description}>
//             Allow Jango to access contact list
//           </Text>
//           <Switch
//             value={contactAccessEnabled}
//             onValueChange={(value) => setContactAccessEnabled(value)}
//             style={styles.toggleButton}
//           />
//         </View>
//         <View style={styles.line} />
//         {/* Share Address View */}
//         <View style={styles.viewContainer}>
//           <Text style={styles.heading}>Share Address</Text>
//           <Text style={styles.description}>
//             Enable share address with friends and contacts
//           </Text>
//           <Switch
//             value={shareAddressEnabled}
//             onValueChange={(value) => setShareAddressEnabled(value)}
//             style={styles.toggleButton}
//           />
//         </View>
//         <View style={styles.line} />
//         {/* Language View */}
//         <View style={styles.viewContainer}>
//           <Text style={styles.heading}>Language</Text>
//           <Text style={styles.description}>Choose language of your choice</Text>
//         </View>
//         <View style={styles.line} />
//         {/* Delete Account View */}
//         <View style={styles.deleteAccountContainer}>
//           <Text style={styles.heading}>Delete Account</Text>
//           <Text style={styles.deletedescription}>
//             Account will be deleted permanently
//           </Text>
//           {/* Add image here */}
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     backgroundColor: "#F8F8F8",
//   },
//   viewContainer: {
//     width: 360,
//     height: 75,
//     // borderRadius: 18,
//     // borderWidth: 1,
//     // borderColor: "black",
//     padding: 10,
//     paddingTop: 20,
//     // marginBottom: 30,
//   },
//   deleteAccountContainer: {
//     width: 360,
//     height: 75,
//     // borderRadius: 18,
//     // borderWidth: 1,
//     // borderColor: "black",
//     padding: 10,
//     paddingTop: 20,
//     // marginBottom: 10,
//     backgroundColor: "rgba(248, 32, 32, 0.10)",
//     shadowColor: "rgba(0, 0, 0, 0.02)",
//   },
//   heading: {
//     fontFamily: "Inter",
//     fontSize: 12,
//     fontWeight: "400",
//     color: "#000",
//     fontStyle: "normal",
//     letterSpacing: 0.48,
//     lineHeight: 17.28,
//     marginBottom: 5,
//   },
//   description: {
//     color: "rgba(0, 0, 0, 0.50)",
//     fontFamily: "Inter",
//     fontSize: 10,
//     fontStyle: "normal",
//     fontWeight: "400",
//     lineHeight: 14.4, // Adjusted based on the provided comment
//     letterSpacing: 0.4,
//   },
//   deletedescription: {
//     color: "#860505",
//     fontFamily: "Inter",
//     fontSize: 10,
//     fontStyle: "normal",
//     fontWeight: "400",
//     lineHeight: 14.4,
//     letterSpacing: 0.4,
//   },
//   toggleButton: {
//     transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
//     alignSelf: "flex-end",
//   },
//   line: {
//     width: 360,
//     height: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.04)",
//   },
// });

// export default Settings;
import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";

const Settings = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [contactAccessEnabled, setContactAccessEnabled] = useState(false);
  const [shareAddressEnabled, setShareAddressEnabled] = useState(false);
  const handleDeleteAccount = () => {
    // Perform any necessary logic before deleting the account

    // Show an alert to confirm deletion
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // Perform the deletion action
            // For demonstration purposes, we'll just set a state to simulate deletion
            setAccountDeleted(true);
          },
        },
      ]
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* Notification View */}
        <View style={styles.viewContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Notification</Text>
            <Switch
              value={notificationEnabled}
              onValueChange={(value) => setNotificationEnabled(value)}
              style={styles.toggleButton1}
            />
          </View>
          <Text style={styles.description}>
            Enable notification to display over other apps
          </Text>
        </View>
        <View style={styles.line} />

        {/* Contact View */}
        <View style={styles.viewContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Contact</Text>
            <Switch
              value={contactAccessEnabled}
              onValueChange={(value) => setContactAccessEnabled(value)}
              style={styles.toggleButton2}
            />
          </View>
          <Text style={styles.description}>
            Allow Jango to access the contact list
          </Text>
        </View>
        <View style={styles.line} />

        {/* Share Address View */}
        <View style={styles.viewContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Share Address</Text>
            <Switch
              value={shareAddressEnabled}
              onValueChange={(value) => setShareAddressEnabled(value)}
              style={styles.toggleButton3}
            />
          </View>
          <Text style={styles.description}>
            Enable share the address with friends and contacts
          </Text>
        </View>
        <View style={styles.line} />

        {/* Language View */}
        <View style={styles.viewContainer}>
          <Text style={styles.heading}>Language</Text>
          <Text style={styles.description}>
            Choose the language of your choice
          </Text>
        </View>
        <View style={styles.line} />

        {/* Delete Account View */}
        <View style={styles.deleteAccountContainer}>
          <Text style={styles.heading}>Delete Account</Text>
          <Text style={styles.deletedescription}>
            Account will be deleted permanently
          </Text>
          <TouchableOpacity
            onPress={handleDeleteAccount}
            style={styles.NotificationIconcontainer}
          >
            <Image
              source={require("../assets/images/delete_bucket.png")}
              style={styles.notificationIcon}
            />
          </TouchableOpacity>
          {/* Add image here */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#F8F8F8",
  },
  viewContainer: {
    width: 360,
    padding: 10,
    alignItems: "flex-start", // Align content to the start
  },
  deleteAccountContainer: {
    width: 360,
    padding: 10,
    backgroundColor: "rgba(248, 32, 32, 0.10)",
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Align items horizontally
    alignItems: "center", // Center items vertically
  },
  heading: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "400",
    color: "#000",
    fontStyle: "normal",
    letterSpacing: 0.48,
    marginBottom: 5,
  },
  description: {
    color: "rgba(0, 0, 0, 0.50)",
    fontFamily: "Inter",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 14.4,
    letterSpacing: 0.4,
  },
  deletedescription: {
    color: "#860505",
    fontFamily: "Inter",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 14.4,
    letterSpacing: 0.4,
  },
  toggleButton1: {
    alignSelf: "flex-end",
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    left: 220,
  },
  toggleButton2: {
    alignSelf: "flex-end",
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    left: 245,
  },
  toggleButton3: {
    alignSelf: "flex-end",
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    left: 200,
  },
  line: {
    width: 360,
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
  notificationIcon: {
    height: 21,
    width: 21,
    top: -30,
    alignSelf: "flex-end",
  },
});

export default Settings;
