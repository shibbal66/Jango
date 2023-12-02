import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  Image,
  Alert,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
//  const { userId } = route.params;
// import Geolocation from '@react-native-community/geolocation';
import * as Location from "expo-location";
import * as ImageManipulator from "expo-image-manipulator";
import {
  // Other imports
  PermissionsAndroid,
  Platform,
} from "react-native";

import CheckBox from "@react-native-community/checkbox";
import HelpView from "../components/HelpView";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

// import { launchCamera} from 'react-native-image-picker'; // Import the image picker library
// // import { TouchableOpacity } from 'react-native-gesture-handler';
// import {launchImageLibrary} from 'react-native-image-picker';

const CreateJangoAddress = ({ navigation }) => {
  const [businessName, setBusinessName] = useState("");
  const [plotNumber, setPlotNumber] = useState("");
  const [unitType, setUnitType] = useState("");
  const [street, setStreet] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [unitNum, setUnitNum] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [isCheckBoxChecked, setCheckBoxChecked] = useState(false);
  const [businessNameHelpVisible, setBusinessNameHelpVisible] = useState(false);
  const [plotNumberHelpVisible, setPlotNumberHelpVisible] = useState(false);
  const [unitTypeHelpVisible, setUnitTypeHelpVisible] = useState(false);
  const [unitTypeSelection, setUnitTypeSelection] = useState("");
  const [unitTypeModalVisible, setUnitTypeModalVisible] = useState(false);
  // Add more states for other input fields as needed
  const [helpViewVisible, setHelpViewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null); // State variable to store the captured image URI
  const [latitude, setLatitude] = useState(null); // Declare latitude state variable
  const [longitude, setLongitude] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isImageCaptured, setIsImageCaptured] = useState(false);
  // useEffect(() => {
  //   const getStoredUserId = async () => {
  //     try {
  //       const userId = await AsyncStorage.getItem("userId");
  //       if (userId !== null) {
  //         // Use the userId here
  //         console.log("Stored userId:", userId);
  //       } else {
  //         console.error("userId is not stored in AsyncStorage.");
  //         // Handle the case where userId is not available in AsyncStorage
  //       }
  //     } catch (error) {
  //       console.error("Error retrieving userId from AsyncStorage:", error);
  //     }
  //   };

  //   getStoredUserId();
  // }, []);
  useEffect(() => {
    // const getStoredUserData = async () => {
    //   try {
    //     const userDataString = await AsyncStorage.getItem("userData");
    //     if (userDataString) {
    //       const userData = JSON.parse(userDataString);
    //       const userId = userData.id; // Access the userId from the userData
    //       console.log("Stored userId:", userId);
    //     } else {
    //       console.error("User data is not stored in AsyncStorageuuu.");
    //       // Handle the case where user data is not available in AsyncStorage
    //     }
    //   } catch (error) {
    //     console.error("Error retrieving user data from AsyncStorage:", error);
    //   }
    // };
    // getStoredUserData();

    const getStoredUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const full_names = await AsyncStorage.getItem("full_names");
        const email_address = await AsyncStorage.getItem("email_address");

        if (userId !== null) {
          // Use the user data here
          console.log("Stored userId:", userId);
          console.log("Stored userName:", full_names);
          console.log("Stored userEmail:", email_address);
        } else {
          console.error("User data is not stored in AsyncStorage.");
          // Handle the case where user data is not available in AsyncStorage
        }
      } catch (error) {
        console.error("Error retrieving user data from AsyncStorage:", error);
      }
    };

    getStoredUserData();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({});
        location(location);

        // Obtain the user ID and other data needed for the API request
        const userId = await AsyncStorage.getItem("userId"); // Replace with the actual user ID
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;

        // Function to fetch address components
        const fetchAddressComponents = async () => {
          try {
            const url = `https://jango-api-dev.jangoaddress.com/getAddressComponents.php?id=${userId}&latitude=${latitude}&longitude=${longitude}`;
            const response = await axios.get(url);
            return response.data;
          } catch (error) {
            console.error("API call error:", error);
            return null;
          }
        };

        // Call the function to fetch address components
        const data = await fetchAddressComponents();
        if (data) {
          // Store the fetched data in the component's state (if needed)
          console.log("Fetched data:", data);
        }
      } catch (error) {
        setErrorMsg("Error getting location: " + error.message);
      }
    })();
  }, []);

  // const takePhoto = async () => {
  //     const { status } = await ImagePicker.requestCameraPermissionsAsync();

  //     if (status !== 'granted') {
  //       Alert.alert('Permission Denied', 'We need access to your camera to take a picture.');
  //       return;
  //     }

  //     const result = await ImagePicker.launchCameraAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       quality: 1,
  //     });

  //     if (!result.cancelled) {
  //       setCapturedImage(result.uri);
  //     }
  //   };
  //remove below in caseor error

  const takePhoto = () => {
    Alert.alert(
      "Choose Image Source",
      "Select the image source for your profile picture:",
      [
        {
          text: "Camera",
          onPress: () => {
            // Capture image from the camera
            captureImageFromCamera();
          },
        },
        {
          text: "Gallery",
          onPress: () => {
            // Select an image from the gallery
            pickImage();
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  const captureImageFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need access to your camera to take a picture."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageType = result.uri.split(".").pop().toLowerCase();

      if (imageType === "jpeg" || imageType === "jpg" || imageType === "png") {
        try {
          const resizedImage = await ImageManipulator.manipulateAsync(
            result.uri,
            [{ resize: { width: 500 } }]
          );

          // Now, you can set the captured image
          setCapturedImage(resizedImage.uri);
        } catch (error) {
          console.error("Image manipulation failed:", error);
        }
      } else {
        console.log(
          "Image format is not supported. Please upload a JPEG, JPG, or PNG file."
        );
      }
    } else {
      console.log("Image capture cancelled");
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need access to your gallery to select an image."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const imageType = result.uri.split(".").pop().toLowerCase();

      if (imageType === "jpeg" || imageType === "jpg" || imageType === "png") {
        setCapturedImage(result.uri);
        setIsImageCaptured(true);
      } else {
        console.log(
          "Image format is not supported. Please select a JPEG, JPG, or PNG file."
        );
      }
    } else {
      console.log("Image selection from gallery cancelled");
    }
  };

  const removeImage = () => {
    setCapturedImage(null);
  };

  const retakePhoto = async () => {
    // Implement the logic to retake a photo here
    // For example, you can reset the capturedImage state to null
    setCapturedImage(null);
  };

  const toggleHelpView = (fieldName) => {
    switch (fieldName) {
      case "businessName":
        setBusinessNameHelpVisible(!businessNameHelpVisible);
        setPlotNumberHelpVisible(false);
        setUnitTypeHelpVisible(false);
        // Add similar lines for other help states as needed
        break;
      case "plotNumber":
        setPlotNumberHelpVisible(!plotNumberHelpVisible);
        setBusinessNameHelpVisible(false);
        setUnitTypeHelpVisible(false);
        // Add similar lines for other help states as needed
        break;
      case "unitType":
        setUnitTypeHelpVisible(!unitTypeHelpVisible);
        setBusinessNameHelpVisible(false);
        setPlotNumberHelpVisible(false);
        // Add similar lines for other help states as needed
        break;
      // Add more cases for other fields as needed
      default:
        // Handle unexpected cases here
        break;
    }
  };

  const toggleUnitTypeModal = () => {
    setUnitTypeModalVisible(!unitTypeModalVisible);
  };

  const handleSubmit = async () => {
    setBusinessNameHelpVisible(false);
    setPlotNumberHelpVisible(false);
    setUnitTypeHelpVisible(false);
    try {
      // Prepare the data to send to the API

      const userId = await AsyncStorage.getItem("userId");
      const requestData = {
        business_name: businessName,
        image: capturedImage, // Assuming capturedImage holds the image data.
        image_extension: ".jpg", // Example image extension
        latitude: latitude,
        longitude: longitude,
        house_plot_nbr: plotNumber, // Assuming plotNumber holds the house/plot number
        house_plot_extension: "", // Add extension if needed
        userSSName: street,
        userSNName: zipCode,
        ras_number: unitType,
        ras_type: "", // Add type if needed
        city_town_village: city,
        region_province_state: region,
        country: country,
        // Add other fields as needed
      };

      const response = await axios.post(
        `https://jango-api-dev.jangoaddress.com/createJanGoAddress.php?id=${userId}`,
        requestData
      );

      console.log("API response:", response.data);
      Alert.alert(
        "Success",
        `Your Address has been successfully created\nJango Address: ${plotNumber} ${street} ${unitType}, ${city}, ${region}, ${country}`,
        [
          {
            text: "Share Address",
            onPress: () => {
              // Implement the Share Address functionality
              // For example, you can use Share API
            },
          },
          {
            text: "View My Addresses",
            onPress: () => {
              // Implement the View My Addresses functionality
              // For example, navigate to a screen that displays user addresses
            },
          },
        ]
      );
      // Handle the API response as needed
    } catch (error) {
      console.error("API call error:", error);
      console.error("API response data:", error.response.data);
      // Handle the error, e.g., display an error message to the user
    }
  };
  const handleEdit = () => {
    // Implement user registration logic here
    // Include validations and registration API call
  };
  //    const handleHelp = (fieldName) => {
  //   switch (fieldName) {
  //     case 'BusinessName':
  //       Alert.alert('If this address is for your business or an organization like NGO, Bank, School, Hospital, Restaurant etc. You can enter the name of that business organization here.');
  //       break;
  //     case 'PlotNumber':
  //       Alert.alert('House/Plot Number Help', 'Enter your house or plot number.');
  //       break;
  //     case 'UnitType':
  //       Alert.alert('Unit Type & Number Help', 'Provide the type and number of the unit.');
  //       break;
  //     // Add more cases for other fields as needed
  //     default:
  //       // Handle unexpected cases here
  //       break;
  //   }
  // };

  useEffect(() => {
    // const requestLocationPermission = async () => {
    //   if (Platform.OS === 'ios') {
    //     getOneTimeLocation();
    //   } else {
    //     try {
    //       const granted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //         {
    //           title: 'Location Access Required',
    //           message: 'This App needs to Access your location',
    //         }
    //       );
    //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //         getOneTimeLocation();
    //       } else {
    //         // Handle permission denied
    //       }
    //     } catch (err) {
    //       console.warn(err);
    //     }
    //   }
    // };

    const requestLocationPermission = async () => {
      if (Platform.OS === "ios") {
        getOneTimeLocation();
      } else {
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (!hasPermission) {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: "Location Access Required",
                message: "This App needs to Access your location",
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              getOneTimeLocation();
            } else {
              // Handle permission denied
            }
          } catch (err) {
            console.warn(err);
          }
        } else {
          getOneTimeLocation(); // Permission is already granted
        }
      }
    };
    requestLocationPermission();

    requestLocationPermission();
  }, []);

  const getOneTimeLocation = () => {
    Location.getCurrentPositionAsync({ enableHighAccuracy: true })
      .then((position) => {
        const currentLatitude = position.coords.latitude;
        const currentLongitude = position.coords.longitude;
        setLatitude(currentLatitude);
        setLongitude(currentLongitude);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const getOneTimeLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //       // Store the latitude and longitude in the state
  //       const currentLatitude = position.coords.latitude;
  //       const currentLongitude = position.coords.longitude;
  //       setLatitude(currentLatitude);
  //       setLongitude(currentLongitude);
  //     },
  //     (error) => {
  //       console.log(error);
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       timeout: 20000,
  //       maximumAge: 1000,
  //     }
  //   );
  // };

  return (
    <SafeAreaView>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={takePhoto}>
          {capturedImage ? (
            <>
              <TouchableOpacity
                onPress={removeImage}
                style={styles.closeButton}
              >
                <Image
                  source={require("../assets/close.png")}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
              <Image
                source={{ uri: capturedImage }}
                style={styles.imageContainercaptured} // Apply styles to match the container
              />

              <TouchableOpacity
                onPress={retakePhoto}
                style={styles.changebuttonContainer}
              >
                <Image
                  source={require("../assets/images/changebutton.png")}
                  style={styles.changebutton}
                />
              </TouchableOpacity>
            </>
          ) : (
            <Image
              source={require("../assets/images/jangoAdress/Maincamera.png")}
              style={styles.CameraimagePlaceholder} // Apply styles to match the container
            />
          )}
        </TouchableOpacity>
        <Text style={styles.cameraText}>+ Add a Picture</Text>
      </View>

      <ScrollView contentContainerStyle={styles.formcontainer}>
        {businessNameHelpVisible && (
          <View style={styles.helpContainer1}>
            <Text style={styles.helpText}>
              If this address is for your business or an organization like NGO,
              Bank, School, Hospital, Restaurant, etc., you can enter the name
              of that business organization here.
            </Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/images/jangoAdress/field1.png")} // Replace with the correct path to your image
            style={styles.icon} // Apply custom styles to the image here
          />
          <TextInput
            style={styles.input}
            placeholder="Business Name"
            value={businessName}
            onChangeText={(text) => {
              setBusinessName(text);
              // Hide the help dialog for this field
              setBusinessNameHelpVisible(false);
            }}
          />
          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => toggleHelpView("businessName")}
          >
            <Image
              source={require("../assets/images/help.png")}
              style={styles.Helpicon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/images/jangoAdress/field2.png")} // Replace with the correct path to your image
            style={styles.icon} // Apply custom styles to the image here
          />
          {plotNumberHelpVisible && (
            <View style={styles.helpContainer2}>
              <Text style={styles.helpText}>
                A letter can be attached to the house numbers if you are
                creating an address for multiple buildings within the same
                compound, so each has a distinct address. Example: 75A Borstal
                Street and 75B Borstal Street.
              </Text>
            </View>
          )}
          <TextInput
            style={styles.input}
            placeholder="House/Plot Number"
            value={plotNumber}
            onChangeText={(text) => {
              setPlotNumber(text);
              // Hide the help dialog for this field
              setPlotNumberHelpVisible(false);
            }}
          />

          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => toggleHelpView("plotNumber")}
          >
            <Image
              source={require("../assets/images/help.png")}
              style={styles.Helpicon}
            />
          </TouchableOpacity>
        </View>


        


        {/* UnitNumber */}
        

      



        <View style={styles.inputContainer}>
          
          <Image
            source={require("../assets/images/jangoAdress/field3.png")}
            style={styles.icon}
          />
          {unitTypeHelpVisible && (
            <View style={styles.helpContainer3}>
              <Text style={styles.helpText}>
                Use this to specify the address of a Room, Apartment, Suite, or
                Plot within a compound or large building.
              </Text>
            </View>
          )}
         
        
    
          <TextInput
            style={styles.input}
            placeholder="Unit Number"
            value={unitType}
            onChangeText={(text) => {
              setUnitType(text);
              // Hide the help dialog for this field
              setUnitTypeHelpVisible(false);
            }}
            />
     
    
          <View style={styles.dropdownContainer}>
            <TouchableOpacity onPress={() => setUnitTypeModalVisible(true)}>
              <Image
                source={require("../assets/images/jangoAdress/down.png")}
                style={styles.dropdownArrow}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => toggleHelpView("unitType")}
          >
            <Image
              source={require("../assets/images/help.png")}
              style={styles.Helpicon}
            />
          </TouchableOpacity>
        </View>



        
        <Modal
          animationType="slide"
          transparent={true}
          visible={unitTypeModalVisible}
          onRequestClose={() => {
            setUnitTypeModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <FlatList
              data={["Room", "Apartment", "Suite", "Plot"]}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setUnitType(item);
                    setUnitTypeModalVisible(false);
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>

{/* extra can remove */}
        
        <View style={styles.inputContainerUnit}>
  
  <Image
    source={require("../assets/images/jangoAdress/field3.png")}
    style={styles.icon}
          />
          
  {unitTypeHelpVisible && (
    <View style={styles.helpContainer3}>
      <Text style={styles.helpText}>
        Use this to specify the address of a Room, Apartment, Suite, or
        Plot within a compound or large building.
      </Text>
    </View>
  )}

  <View style={styles.inpNum}>
    <TextInput
      placeholder="Enter a number"
      keyboardType="numeric"
      value={unitNum}
      onChangeText={setUnitNum}
    />
  </View>

  <View style={styles.line}></View>

  {unitType !== '' && (
    <View style={styles.selectedUnitTypeContainer}>
      <Text>{unitType}</Text>
    </View>
  )}

  <Modal
    animationType="slide"
    transparent={true}
    visible={unitTypeModalVisible}
    onRequestClose={() => {
      setUnitTypeModalVisible(false);
    }}
  >
    <View style={styles.modalContainer}>
      <FlatList
        data={["Room", "Apartment", "Suite", "Plot"]}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.modalItem}
            onPress={() => {
              setUnitType(item);
              setUnitTypeModalVisible(false);
            }}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
            </View>
            
  </Modal>

  <View style={styles.dropdownContainer}>
    <TouchableOpacity onPress={() => setUnitTypeModalVisible(true)}>
      <Image
        source={require("../assets/images/jangoAdress/down.png")}
        style={styles.dropdownArrow}
      />
            </TouchableOpacity>
          </View>
          <View style={styles.helpImageContainer}>
            <TouchableOpacity
            style={styles.helpButtons}
            onPress={() => toggleHelpView("unitType")}
          >
            <Image
              source={require("../assets/images/help.png")}
              style={styles.Helpicon}
            />
          </TouchableOpacity>
          </View>

 
</View>
{/* extra can remove */}

        

        
{/* ending  */}















        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/images/jangoAdress/field4.png")} // Replace with the correct path to your image
            style={styles.icon} // Apply custom styles to the image here
          />
          <TextInput
            style={styles.input}
            placeholder="Street"
            value={street}
            onChangeText={setStreet}
          />

          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/images/jangoAdress/field5.png")} // Replace with the correct path to your image
            style={styles.icon} // Apply custom styles to the image here
          />
          <TextInput
            style={styles.input}
            placeholder="Zip Code"
            value={zipCode}
            onChangeText={setZipCode}
          />

          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/images/jangoAdress/field6.png")} // Replace with the correct path to your image
            style={styles.icon} // Apply custom styles to the image here
          />
          <TextInput
            style={styles.input}
            placeholder="City-Town-Village"
            value={city}
            onChangeText={setCity}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/images/jangoAdress/field77.png")} // Replace with the correct path to your image
            style={styles.icon} // Apply custom styles to the image here
          />
          <TextInput
            style={styles.input}
            placeholder="Region-Province-State"
            value={region}
            onChangeText={setRegion}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/images/jangoAdress/field8.png")} // Replace with the correct path to your image
            style={styles.icon} // Apply custom styles to the image here
          />
          <TextInput
            style={styles.input}
            placeholder="Country"
            value={country}
            onChangeText={setCountry}
          />
        </View>

        {/* Add a checkbox for "I confirm the address" */}
        {/* <View style={styles.checkboxContainer}>
          <CheckBox
            disabled={false}
            value={isCheckBoxChecked}
            onValueChange={(newValue) => setCheckBoxChecked(newValue)}
          />
          <Text>
            Check the box to confirm that you are currently standing at the
            location of the address you are creating
          </Text>
        </View> */}

        {/* Button */}

        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Submit Address</Text>
        </TouchableOpacity>
        {/* <View style={styles.checkboxContainer}>
          <CheckBox
            value={isCheckBoxChecked}
            onValueChange={setCheckBoxChecked}
          />
          <Text>Agree to terms and conditions</Text>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    
    alignItems: "center",
    top: 0,
    padding: 16,
  },

  imageContainer: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#0000000d",
    borderRadius: 4,
    height: 178,
    alignItems: "center",
    top: 40,
    left: 0,
    width: 345,
    marginLeft: 15,
  },
  formcontainer: {
    
    alignSelf: "center",
    top: 30,
    padding: 16,
  },
  imageContainercaptured: {
    //  backgroundColor: '#ffffff',
    borderWidth: 2,
    // borderColor: '#0000000d',
    borderRadius: 4,
    height: 178,
    alignItems: "center",
    top: 0,
    left: 0,
    width: 345,
    // marginLeft: 15,
  },
  CameraimageContainer: {
    height: 59,
    width: 71,
    position: "absolute",
    top: 11,
    left: 5,
    alignSelf: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "transparent",
    zIndex: 1,
    padding: 5,
    borderRadius: 50,
  },
  changebuttonContainer: {
    position: "absolute",
    top: 145,
    right: 10,
    backgroundColor: "transparent",
    zIndex: 1,
    padding: 5,
    borderRadius: 50,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  cameraText: {
    color: "#0000ee",
    fontFamily: "Inter-Regular",
    fontSize: 10,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 14.4,

    top: 10,
    left: 0,
    //   whiteSpace: 'nowrap',
  },
  inputContainer: {
    top: 0,
    marginBottom: 10,
    flexDirection: "row", // Align icon and input horizontally
    alignItems: "center", // Center vertically
    backgroundColor: "#ffffff", // Light white background color
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: "#ccc", // Light gray border color

    elevation: Platform.OS === "android" ? 5 : 0,
    height: 50,
    width: 328,
  },
  inputContainerUnit: {
    top: 0,
    marginBottom: 10,
    flexDirection: "row", // Align icon and input horizontally
    alignItems: "center", // Center vertically
    backgroundColor: "red", // Light white background color
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: "#ccc", // Light gray border color

    elevation: Platform.OS === "android" ? 5 : 0,
    height: 50,
    width: 328,
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 2,
    shadowColor: "#0000001a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    height: 50,
    width: 330,
    marginVertical: 10,
    padding: 10,
  },
  icon: {
    height: 17,
    width: 21,
    marginLeft: 20,
  },
  helpButton: {
    height: 8,
    width: 10,
    // position: 'absolute',
    top: 0,
    left: 0,
    marginLeft: -90,
  },
  helpButtons: {
    height: 8,
    width: 10,
    alignSelf:"flex-end",
    top: -10,
    left: -37,

  },
  Helpicon: {
    height: 10,
    width: 10,
    marginLeft: 20,
  },
  //   checkboxContainer: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     marginVertical: 10,
  //   },

  loginButton: {
    // backgroundColor: '#007bff',
    // paddingVertical: 12,
    // paddingHorizontal: 24,
    //   borderRadius: 4,
    backgroundColor: "#0000ee", // You can replace this color with your desired color
    borderRadius: 3,
    height: 60,
    width: 328,
    // position: 'absolute',
    top: 0,
    left: 0,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff", // Text color
    fontFamily: "Inter-SemiBold", // Replace with the appropriate font family
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.56,
    lineHeight: 20.2,
    textAlign: "center",
    paddingTop: 8,
    // position: 'absolute',
    top: 0,
    left: 0,
  },

  editButton: {
    backgroundColor: "#0000ee", // You can replace this color with your desired color
    borderRadius: 2,
    height: 14,
    width: 36,
    // position: 'absolute',
    top: 0,
    left: 0,
    marginLeft: -90,
  },
  editButtonText: {
    color: "white",
    fontSize: 8,
    fontWeight: "400",
    color: "#ffffff", // Text color
    fontFamily: "Inter-SemiBold", // Replace with the appropriate font family

    letterSpacing: 0.32,
    lineHeight: 11.5,
    textAlign: "center",

    // position: 'absolute',
    top: 0,
    left: 0,
  },
  helpContainer1: {
    position: "absolute",
    zIndex: 1,
    top: 60, // Adjust this value to position it correctly above the first input field
    left: 16,
    width: 334,
    backgroundColor: "#ffffff",
    borderRadius: 2,
    elevation: 5,
    padding: 10,
  },
  helpContainer2: {
    position: "absolute",
    zIndex: 1,
    top: -90, // Adjust this value to position it correctly above the first input field
    left: 0,
    width: 334,
    backgroundColor: "#ffffff",
    borderRadius: 2,
    elevation: 5,
    padding: 10,
  },
  helpContainer3: {
    position: "absolute",
    zIndex: 1,
    top: -70, // Adjust this value to position it correctly above the first input field
    left: 0,
    width: 334,
    backgroundColor: "#ffffff",
    borderRadius: 2,
    elevation: 5,
    padding: 10,
  },

  helpText: {
    color: "#0b1719",
    fontFamily: "Lato-Regular",
    fontSize: 12,
    fontWeight: "400",
    left: 0,
    letterSpacing: 0.48,
    lineHeight: 17.3,
    position: "fixed",
    top: 0,
    width: 312,
  },
  dropdownContainer: {
    position: "absolute",
    top: 10,
    right: 0,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight:30,
  },
  dropdownArrow: {
    height: 10,
    width: 10,
    alignSelf:"flex-end",
    marginLeft: -70,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    top: 380,
    marginLeft: 60,
  },
  modalItem: {
    backgroundColor: "white",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  RASPtext: {
    color: '#00E',
  fontFamily: 'Lato',
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: 17.28, // This corresponds to 144% of font-size: 12px
    letterSpacing: 0.48,
    marginLeft:20,
    alignSelf: 'flex-start',
  
  },
  inputNumberContainer: {
    backgroundColor: 'red',
    alignSelf: 'center',
    width: 150,
  },
  line: {
    width: 1,
    height: 14,
    left: -30,
  
    alignSelf: 'center',
    marginLeft: 20,
    bottom: -10,
    textAlign: 'center',
   
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 14.4,
    backgroundColor:'#666',
    letterSpacing: 0.4,
  },
  inpNum: {
    width: 150,
    marginLeft: 10,
  },
  HeadingtextView: {
    width: 140,
    height:14,
  },
  helpImageContainer: {
    alignSelf: 'flex-end',
    marginLeft: 95,
    top: -10,
  },
});

export default CreateJangoAddress;
