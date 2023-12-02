// import * as React from 'react';
// import { View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import WelcomeScreen from './Screens/Welcome';
// import SignUpScreen from './Screens/Signup';
// import Login from './Screens/login';
// import ForgetPassword from './Screens/ForgotPassword';
// import Menu from './components/Menu';
// import FirstPage from './pages/FirstPage';
// import SecondPage from './pages/SecondPage';
// import ThirdPage from './pages/ThirdPage';

// const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Signup" component={SignUpScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
//         <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }} />
//         <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
//         <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// function DrawerNavigator() {
//   return (
//     <Drawer.Navigator screenOptions={{drawerStyle: {backgroundColor: '#f7f7f7',width: 262,height:724,
//         },headerStyle: {
//           backgroundColor: 'red',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         },
//       }}>
//       <Drawer.Screen
//         name="FirstPage"
//         options={{
//           drawerLabel: 'Profile',
//           title: 'First Stack',
//         }}
//         component={FirstPage}
//       />
//       <Drawer.Screen
//         name="SecondPage"
//         options={{
//           drawerLabel: 'Second page Option',
//           title: 'Second Stack',
//         }}
//         component={SecondPage}
//       />
//     </Drawer.Navigator>
//   );
// }

// export default App;

import React from "react";


import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Splash from "./Screens/Splash.js";
import WelcomeScreen from "./Screens/Welcome";
import SignUpScreen from "./Screens/Signup";
import Login from "./Screens/login";
import ForgetPassword from "./Screens/ForgotPassword";
import ForgetPin from "./Screens/ForgotPin.js";
import CreateJangoAddress from "./Screens/CreateJangoAddress";
import MainLandingPageGetDirection from "./Screens/mainLandingpagegetDirection";
import MainRouteandDriveTime from "./Screens/mainRouteandDriveTime";
import Menu from "./components/Menu";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Addresses from "./pages/Addresses";
import Notification from "./pages/Notification";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Logout from "./pages/Logout";
import CustomSideMenu from "./components/CustomSideMenu";
import CustomHeader from "./components/CustomHeader";
import { useFonts } from 'expo-font';
import FontLoader from './components/FontLoader.js'; 
import {
  ProfileDrawerLabel,
  AddressesDrawerLabel,
  HorizontalLine,
  NotificationDrawerLabel,
  SettingsDrawerLabel,
  HelpDrawerLabel,
  LogoutDrawerLabel,
} from "./components/CustomDrawerLabel.js";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Helvetica': require('./assets/fonts/Helvetica.ttf'),
    'Inter': require('./assets/fonts/Inter.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
    'GenBkBasR': require('./assets/fonts/GenBkBasR.ttf'),
    'GenBkBasB': require('./assets/fonts/GenBkBasB.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    
    <NavigationContainer>
   
         <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
    
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} /> 
         <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{ headerShown: false }}
        /> 
         <Stack.Screen
          name="ForgetPin"
          component={ForgetPin}
          options={{ headerShown: false }}
        /> 
        {/* 
     
     
        <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} /> */}
        <Stack.Screen
          name="CreateJangoAddress"
          component={CreateJangoAddress}
        />
        <Stack.Screen
          name="mainLandingpagegetDirection"
          component={MainLandingPageGetDirection}
        />
        {/* <Stack.Screen name="mainRouteandDriveTime" component={MainRouteandDriveTime} /> */}
        <Stack.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        </Stack.Navigator>
  
    </NavigationContainer>
  );

  // import {
  //   Image, KeyboardAvoidingView, TouchableWithoutFeedback,ScrollView,Platform
  // } from 'react-native';
  function DrawerNavigator() {
    return (
     
      <Drawer.Navigator
        drawerActiveTintColor={{ backgroundColor: "red" }}
        drawerContent={(props) => <CustomSideMenu {...props} />}
        screenOptions={{
          sceneContainerStyle: {
            backgroundColor: "white", // Set the background color of the active screen to transparent
          },
          drawerLabelStyle: {
            backgroundColor: "transparent", // Set the background color of the drawer labels to transparent
          },
        }}
        contentOptions={{
          activeBackgroundColor: "transparent", // Set the background color for the active item to transparent
          activeTintColor: "transparent", // Set the text color for the active item to transparent
          labelStyle: {
            fontSize: 16,
          },
        }}
      >
        
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{
            drawerLabel: ({ focused }) => <ProfileDrawerLabel />, // Use the custom drawer label component
            headerTitle: "Profile", // Set a custom header title
            headerStyle: {
              backgroundColor: "#0000ee",
              height: 60,
              position: "absolute",
              top: 0,
              width: 360,
              elevation: 5, // Simulates box-shadow
            },
            headerTitleStyle: {
              color: "#ffffff",
              fontFamily: "Inter-Medium", // Use the actual font family name here
              fontSize: 16,
              fontWeight: "500",
              letterSpacing: 0.64,
              lineHeight: 23,
              position: "absolute",
              top: 0,
              left: 0,
              textAlign: "center", // Center the text
            },
          }}
        />
        <Drawer.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            drawerLabel: ({ focused }) => null, // Set drawerLabel to null to hide the label
          }}
        />

        <Drawer.Screen
          name="My Addresses"
          component={Addresses}
          options={{
            drawerLabel: ({ focused }) => <AddressesDrawerLabel />, // Use the custom drawer label component
          }}
        />

        {/* Add a Group or Custom Drawer Item here */}

        {/* <Drawer.Screen name="My Addresses" component={Addresses} /> */}
        <Drawer.Screen
          name="Notification"
          component={Notification}
          options={{
            drawerLabel: () => <NotificationDrawerLabel />, // Use the custom drawer label component
          }}
        />

        <Drawer.Screen
          name="Settings"
          component={Settings}
          options={{
            drawerLabel: ({ focused }) => <SettingsDrawerLabel />, // Use the custom drawer label component
          }}
        />

        <Drawer.Screen
          name="Help"
          component={Help}
          options={{
            drawerLabel: ({ focused }) => <HelpDrawerLabel />, // Use the custom drawer label component
          }}
        />
        <Drawer.Screen
          name="Logout"
          component={Logout}
          options={{
            drawerLabel: ({ focused, onPress ,navigation}) => (
              <LogoutDrawerLabel onPress={onPress} focused={focused} />
            ),
          }}
        />
        {/* <Drawer.Screen
          name="Logout"
          component={Logout}
          options={{
            drawerLabel: ({ focused }) => <LogoutDrawerLabel />, // Use the custom drawer label component
          }}
        /> */}
         
      </Drawer.Navigator>
    );
  }
}
// const App = () => {
//   return (
//     <NavigationContainer>
//       <StackNavigator />
//       <DrawerNavigator />
//     </NavigationContainer>
//   );
// };
export default App;
