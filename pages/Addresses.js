// AddressesScreen.js
import React, { useState,useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity,ScrollView } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import axios from 'axios';


const JangoAddressScreen = () => {
  const [jangoAddresses, setJangoAddresses] = useState([]);

  useEffect(() => {
    const fetchJangoAddresses = async () => {
      try {
        const response = await axios.get('https://jango-api-dev.jangoaddress.com/getMyJanGoAddresses.php?created_by=e5b8868dd8a9877b');
        if (response.status === 200) {
          setJangoAddresses(response.data.list); // Assuming the addresses are in the response.data.list
          console.log('Jango Screen API Response:', response.data); // Log the API response
        } else {
          console.error('Failed to fetch Jango addresses. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching Jango addresses:', error);
      }
    };

    fetchJangoAddresses();
  }, []);



  


  
  //home address end

  const handlegetDirections = () => {
    console.log('Getting directions...');
    // Implement your logic for getting directions
  };

  const handleshareAddress = () => {
    console.log('Sharing address...');
    // Implement your logic for sharing the address
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
    {Array.isArray(jangoAddresses) && jangoAddresses.length > 0 ? (
      jangoAddresses.map((jangoAddress, index) => (
        <View key={index} style={styles.subAddressItemContainer}>
          <TouchableOpacity onPress={handlegetDirections} style={styles.NotificationIconcontainer}>
            <Image source={require("../assets/images/direction.png")} style={styles.directionIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleshareAddress} style={styles.NotificationIconcontainer}>
            <Image source={require("../assets/images/shareDirection.png")} style={styles.dotIcon} />
          </TouchableOpacity>
          <Text style={styles.addressText}>{jangoAddress.modified_formatted_address}</Text>
          {/* Add any other address details you want to display */}
        </View>
      ))
    ) : (
      <Text>No Jango Addresses available</Text>
    )}
  </ScrollView>
  );
};



// const JangoAddressScreen = ({ route }) => {
//   const { jangoAddresses } = route.params || {};
  
//   const handlegetDirections = () => {
//     console.log('Getting directions...');
//     // Implement your logic for getting directions
//   };

//   const handleshareAddress = () => {
//     console.log('Sharing address...');
//     // Implement your logic for sharing the address
//   };

//   return (
//     <View style={[styles.scene, styles.jangoScene]}>
//       <View style={styles.SubsaveAddressContainer}>
//         {Array.isArray(jangoAddresses) && jangoAddresses.length > 0 ? (
//           jangoAddresses.map((jangoAddress, index) => (
//             <View key={index} style={styles.subAddressItemContainer}>
//               <TouchableOpacity onPress={handlegetDirections} style={styles.NotificationIconcontainer}>
//                 <Image source={require("../assets/images/direction.png")} style={styles.directionIcon} />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={handleshareAddress} style={styles.NotificationIconcontainer}>
//                 <Image source={require("../assets/images/shareDirection.png")} style={styles.dotIcon} />
//               </TouchableOpacity>
//               <Text style={styles.addressText}>
//                 {jangoAddress.modified_formatted_address || 'Address Not Available'}
//               </Text>
//               {/* Add any other address details you want to display */}
//             </View>
//           ))
//         ) : (
//           <Text>No Jango Addresses available</Text>
//         )}
//       </View>
//     </View>
//   );
// };

const AliasAddressScreen = () => {
  const [myAliasAddresses, setMyAliasAddresses] = useState([]);

  useEffect(() => {
    const fetchMyAliasAddresses = async () => {
      try {
        const userId = 'e5b8868dd8a9877b'; // Your user ID, replace with the actual value
        const response = await axios.get(`https://jango-api-dev.jangoaddress.com/getMyAliasAddresses.php?id=${userId}`);
        if (response.status === 200) {
          setMyAliasAddresses(response.data.list); // Assuming the addresses are in the response.data.list
          console.log('MyAliasAddresses API Response:', response.data); // Log the API response
        } else {
          console.error('Failed to fetch MyAliasAddresses. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching MyAliasAddresses:', error);
      }
    };

    fetchMyAliasAddresses();
  }, []);

  const handlegetDirections = () => {
    // Implement getDirections logic
  };

  const handleshareAddress = () => {
    // Implement shareAddress logic
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
    {Array.isArray(myAliasAddresses) && myAliasAddresses.length > 0 ? (
      myAliasAddresses.map((aliasAddress, index) => (
        <View key={index} style={styles.subAddressItemContainer}>
          <TouchableOpacity onPress={handlegetDirections} style={styles.NotificationIconcontainer}>
            <Image source={require("../assets/images/direction.png")} style={styles.directionIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleshareAddress} style={styles.NotificationIconcontainer}>
            <Image source={require("../assets/images/shareDirection.png")} style={styles.dotIcon} />
          </TouchableOpacity>
          <Text style={styles.addressText}>{aliasAddress.alias_name}</Text>
          {/* Add any other address details you want to display */}
        </View>
      ))
    ) : (
      <Text>No Alias Addresses available</Text>
    )}
  </ScrollView>
  );
};
const HomeWorkScreen = () => {
  const [homeAddresses, setHomeAddresses] = useState([]);
  const [workAddresses, setWorkAddresses] = useState([]);
  const [workAddressExists, setWorkAddressExists] = useState(false);
  const [workAddress, setWorkAddress] = useState('');

  // Define userId outside the useEffect so that it's accessible
  const userId = 'e5b8868dd8a9877b';

  useEffect(() => {
    const fetchHomeAddresses = async () => {
      try {
        const response = await axios.get(`https://jango-api-dev.jangoaddress.com/getMyHomeAddresses.php?id=${userId}`);
        setHomeAddresses(response.data);
        console.log('Home Addresses:', response.data);
      } catch (error) {
        console.error('Error fetching home addresses:', error);
      }
    };

    const fetchWorkAddresses = async () => {
      try {
        const response = await axios.get(`https://jango-api-dev.jangoaddress.com/getMyWorkAddresses.php?id=${userId}`);
        setWorkAddresses(response.data);

        // Check if work addresses exist
        setWorkAddressExists(response.data && response.data.list && response.data.list.length > 0);

        // Set the first work address if available
        if (response.data.list && response.data.list.length > 0) {
          setWorkAddress(response.data.list[0].formatted_address);
        }

        console.log('Work Addresses:', response.data);
      } catch (error) {
        console.error('Error fetching work addresses:', error);
      }
    };

    // Fetch both home and work addresses
    fetchHomeAddresses();
    fetchWorkAddresses();
  }, [userId]);// Dependency array includes userId so that it re-fetches when userId changes
// Empty dependency array to fetch data only once when the component mounts

  const handleMore = () => {
    // Implement the logic for handling 'More' button press
  };
  const createUserWorkAddress = () => {
    // Implement the logic for handling 'More' button press
  };
  return (
    <View style={[styles.scene, styles.homeWorkScene]}>
      <View style={styles.homeAddressContainer}>
        <Text style={styles.homeAddressText}>Home Address</Text>
        <TouchableOpacity onPress={handleMore} style={styles.NotificationIconcontainer}>
          <Image source={require("../assets/images/dots.png")} style={styles.dotIcon} />
        </TouchableOpacity>
       
        {homeAddresses.list && homeAddresses.list.length > 0 && (
          <View style={styles.addressDetailsContainer}>
            <Text style={styles.addressTextHome}>{homeAddresses.list[0].formatted_address}</Text>
          </View>
        )}
      </View>


      <View style={styles.workAddressContainer}>
  <Text style={styles.homeAddressText}>Work Address</Text>
  <TouchableOpacity onPress={handleMore} style={styles.NotificationIconcontainer}></TouchableOpacity>

  {workAddressExists ? (
    <View style={styles.addressDetailsContainer}>
      <Text style={styles.addressTextWork}>{workAddress}</Text>
    </View>
  ) : (
    <View style={styles.noAddressContainer}>
      <Text style={styles.noAddressText}>No Work Address</Text>
      <TouchableOpacity style={styles.editButton} onPress={createUserWorkAddress}>
        <Text style={styles.addAddressText}>+ Add</Text>
      </TouchableOpacity>
    </View>
  )}
</View>



{/* 
     
      <View style={styles.workAddressContainer}>
        <Text style={styles.homeAddressText}>Work Address</Text>
        <TouchableOpacity onPress={handleMore} style={styles.NotificationIconcontainer}></TouchableOpacity>
     
        {workAddressExists ? (
          <View style={styles.addressDetailsContainer}>
            <Text style={styles.addressTextWork}>{workAddress}</Text>
          </View>
        ) : (
          <View style={styles.workAddressContainer}>
            <Text style={styles.noAddressText}>No Work Address</Text>
            <TouchableOpacity style={styles.editButton} onPress={ createUserWorkAddress}>
                <Text style={styles.addAddressText}>+ Add</Text>
                
              </TouchableOpacity>
             
              


          </View>
        )}
      </View> */}
    
    </View>
  );
};


// const initialLayout = { width: Dimensions.get("window").width };

const Addresses = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "jango",
      title: "Jango Address",
      icon: require("../assets/images/circle.png"),
    },
    {
      key: "alias",
      title: "Alias Address",
      icon: require("../assets/images/AlisIcon.png"),
    },
    {
      key: "homeWork",
      title: "Home & Work",
      icon: require("../assets/images/homes.png"),
    },
  ]);

  const renderScene = SceneMap({
    jango: JangoAddressScreen,
    alias: AliasAddressScreen,
    homeWork: HomeWorkScreen,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      renderLabel={({ route, focused }) => (
        <View style={styles.tab}>
          <Image
            source={route.icon}
            style={[
              styles.tabIcon,
              { tintColor: focused ? "#00E" : "rgba(0, 0, 0, 0.75)" },
            ]}
          />
          <Text
            style={[
              styles.tabText,
              { color: focused ? "#00E" : "rgba(0, 0, 0, 0.75)" },
            ]}
          >
            {route.title}
          </Text>
        </View>
      )}
      style={styles.tabBar}
      indicatorStyle={styles.tabIndicator}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      // initialLayout={initialLayout}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tab: {
    flexDirection: "column", // Change to column direction
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  tabText: {
    color: "#000",
  },
  tabBar: {
    backgroundColor: "#fff",
  },
  tabIndicator: {
    backgroundColor: "#00E",
  },
  tabIcon: {
    width: 24,
    height: 24,
    marginBottom: 5, // Add margin to separate icon and title
  },
  tabText: {
    fontFamily: "Inter",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 14.4,
    letterSpacing: 0.4,
  },
  jangoScene: {},
  SubsaveAddressContainer: {
    width: 360,
    height: 62,
    // backgroundColor: "rgba(0, 0, 238, 0.02)",
    backgroundColor: "red",
    top: -280,
 
  
  },
  NotificationIconcontainer: {
    top: 25,
    alignSelf: "flex-end",
  },
  directionIcon: {
    height: 15,
    width: 15,
    marginRight: 35,
    top: -15,
  },
  // SubsaveAddressContainer: {
  //   width: 328,
  //   height: 443,
  //  alignSelf: 'center',
  //   // backgroundColor: "rgba(0, 0, 238, 0.02)",
  //   top: 10,
  // },
  subAddressItemContainer: {
    width: 328,
    width: 328,
    height: 43,
    backgroundColor: "rgba(0, 0, 238, 0.02)",
    marginTop: 10, // Add margin-top for the first item
    marginBottom: 10,alignSelf: "center",
  },
  addressText: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 14.4,
      letterSpacing: 0.4,
      alignSelf: 'center',
      top: -20,
  },
  addressTextHome: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 14.4,
      letterSpacing: 0.4,
      alignSelf: 'center',
      top: 10,
  },
  addressTextWork: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 14.4,
      letterSpacing: 0.4,
      alignSelf: 'center',
    top: 20,
      marginLeft: 3,
  },
  addAddressText: {
    color: "#0000ee",
    fontFamily: "Inter-Regular", // Make sure the font is available in your project
    fontSize: 10,
    fontWeight: "400",
    alignSelf: "center",
    top: 0,
    
  textAlign: "center",
  },
  editButton: {
    backgroundColor: "#0000ee1a",
    borderRadius: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, // Set your preferred shadow opacity
    shadowRadius: 2,
    // elevation: 2, // Android shadow elevation
    height: 23,
    width: 84,
    justifyContent: "center",
    alignItems: "center",
    // position: 'absolute',
    top: 50,
    alignSelf: "center",
    // alignSelf:'flex-end',
  },
  noAddressText: {
    color: 'rgba(0, 0, 0, 0.50)',
    fontFamily: 'Inter',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 14.4,
    letterSpacing: 0.4,
    alignSelf: 'center',
    top: 30,
  },
  aliasScene: {},
  AlisAddressContainer: {
    width: 360,
    height: 43,
    backgroundColor: "rgba(0, 0, 238, 0.02)",
    backgroundColor: "red",
    top: -280,
  },
  homeWorkScene: {
    // Styles for Home & Work Screen
  },
  homeAddressContainer: {
    width: 328,
    height: 89,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 238, 0.75)",
    backgroundColor: "#FFF",
    top: -200,
  },
  workAddressContainer: {
    width: 328,
    height: 128,

    backgroundColor: "#FFF",
    top: -180,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.20)",
    backgroundColor: "#FFF",
  },
  homeAddressText: {
    color: "rgba(0, 0, 0, 0.50)",
    fontFamily: "Inter",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 17.28, // This is the converted value from line-height: 144%
    letterSpacing: 0.48,
    top: 10,
    marginLeft: 15,
  },
  dotIcon: {
    height: 15,
    width: 15,
    marginRight: 10,
    top: -30,
  },
});

export default Addresses;


// React Native Navigation Drawer
// https://aboutreact.com/react-native-navigation-drawer/




// import * as React from 'react';
// import {
//   Button,
//   View,
//   Text,
//   SafeAreaView
// } from 'react-native';

// const Addresses = ({ navigation }) => {
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={{ flex: 1, padding: 16 }}>
//         <View
//           style={{
//             flex: 1,
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <Text
//             style={{
//               fontSize: 25,
//               textAlign: 'center',
//               marginBottom: 16
//             }}>
//             This is Second Page under Second Page Option
//           </Text>
//           <Button
//             title="Go to First Page"
//             onPress={
//               () => navigation.navigate('FirstPage')
//             }
//           />
//           <Button
//             title="Go to Third Page"
//             onPress={
//               () => navigation.navigate('ThirdPage')
//             }
//           />
//         </View>
//         <Text
//           style={{
//             fontSize: 18,
//             textAlign: 'center',
//             color: 'grey'
//           }}>
//           React Navigate Drawer
//         </Text>
//         <Text
//           style={{
//             fontSize: 16,
//             textAlign: 'center',
//             color: 'grey'
//           }}>
//           www.aboutreact.com
//         </Text>
//       </View>
//     </SafeAreaView>
//   );
// }

// export default  Addresses;