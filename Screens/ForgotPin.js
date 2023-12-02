import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import PhoneInput from "react-native-phone-number-input";
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import axios from 'axios';
const ForgetPin = () => {

  
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const handleResetPin = async () => {
        setPhoneNumberError(null);
      
        if (!phoneNumber.trim()) {
          setPhoneNumberError('Phone Number is required *');
          return;
        }
      
        try {
          const response = await axios.get(`https://jango-api-dev.jangoaddress.com/forgotPincode.php?phone_number=${phoneNumber}`);
          console.log('Response from the server:', response.data);
          // Handle the response from the server as needed
        } catch (error) {
          console.error('Error:', error);
          // Handle errors, such as displaying an error message
        }
      };
      

  return (
      <View style={styles.container}>
          

          
      <Image
    source={require('../assets/images/ForgetpwdBackground.png')} // Replace with the correct path to your image
    style={styles.resetImage} // Apply custom styles to the image here
          /> 
          <Text style={styles.heading}>Forgot your pin</Text>
          <Text style={styles.subheading}>Enter your phone number below to {'\n'}create new pin</Text>
          <View style={styles.inputContainer}>
              <PhoneInput
                value={phoneNumber}
                defaultCode="US"
                layout="second"
                withDarkTheme
                textInputProps={{
                  style: [
                    styles.phoneNumberInput,
                    styles.inputContainer2,
                    { paddingLeft: 20 },
                  ],
                  placeholder: "Phone Number",
                  marginLeft: 10,
                  top: -1,
                }}
                textProps={{
                  style: {
                    color: "#000000cc",
                    fontWeight: "normal",
                  },
                }}
                onChangeFormattedText={(text) => {
                  // 'text' here contains the formatted number including the country code
                  console.log("Formatted Phone Number:", text);
                  setPhoneNumber(text);
                  setPhoneNumberError("");
                }}
              />
              <Text style={styles.errorText}>{phoneNumberError}</Text>
            </View>


     {/* <View style={styles.inputContainer}>
          <Image
              source={require('../assets/images/email.png')}
              style={styles.iconEmail}
            />
        <TextInput
          style={styles.input}
          placeholder="Email "
          value={email}
          onChangeText={text => {
                setEmail(text);
                setEmailError('');
              }}
          keyboardType="email-address"
        />
      </View>
      {emailError && (
  <Text style={styles.errorText}>{emailError}</Text>
)} */}

      {/* <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
        <Text style={styles.resetButtonText}>Recover password</Text>
      </TouchableOpacity> */}
          <TouchableOpacity style={styles.resetButton} onPress={handleResetPin}>
        <Text style={styles.resetButtonText}>Recover pin</Text>
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007bff', // Blue color
      marginBottom: 20,
      top: -80,
    left:0,
      lineHeight: 28.8,
    },
    subheading: {
      color: '#000000',
    fontFamily: 'Inter-Regular', // Make sure to load the correct font
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.56,
    lineHeight: 20.2,
        textAlign: 'center',
    top: -100,
  },
//   inputContainer: {
//     backgroundColor: '#ffffff',
//     borderRadius: 2,
//     height: 50,
//     width: 330,
//     elevation: 2,
//     color: 'rgba(0, 0, 0, 0.4)',
//     fontFamily: 'Montserrat-Regular',
//     fontSize: 12,
//     fontWeight: '400',
//     letterSpacing: 0.48,
//     lineHeight: 17.3,
//       marginBottom: 20,
//     top: -80,
//   },
   input: {
     flex: 1, // Take up remaining space
    paddingVertical: 10,
    paddingHorizontal: 15,
      fontSize: 16,
    height: 50,
      width: 328,
 color: '#00000040', // Text color with opacity
     fontFamily: 'Montserrat-Regular', // You should have this font imported
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.48, // Letter spacing
    lineHeight: 17.3, // Line height
    position: 'absolute', // Position fixed is not available in React Native, use 'absolute' instead
    top: 0,
    left: 0,
    marginLeft:25,
    },
  resetButton: {
    // backgroundColor: '#007bff',
    // paddingVertical: 12,
    // paddingHorizontal: 24,
      //   borderRadius: 4,
         backgroundColor: '#0000ee', // You can replace this color with your desired color
    borderRadius: 3,
    height: 40,
    width: 328,
    // position: 'absolute',
    top: 0,
    left: 0,
    
  },
 
    errorText: {
      top: -80,
  color: 'red', // Change the text color to red
  fontSize: 7, // Adjust the font size
    marginTop: -20, // Add some space between the input field and the error message
    marginLeft: 240, // Add some space between the input field and the error
  paddingTop: 1, // Add some space between the input field and the error
},
  resetButtonText: {
    color: 'white',
    fontSize: 16,
      fontWeight: 'bold',
        color: '#ffffff', // Text color
    fontFamily: 'Inter-SemiBold', // Replace with the appropriate font family
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.56,
    lineHeight: 20.2,
      textAlign: 'center',
    paddingTop:8,
    // position: 'absolute',
    top: 0,
    left: 0,
    },
    line: {
       height: 1,
    // position: 'absolute',
    top: 29.3,
    left: 120,
    width: 84,
    resizeMode: 'cover',
        color: 'red',
    height: 1,
//   width: '20%', // Set the width to fill the parent
  backgroundColor: '0px 2px 4px 0px rgba(0, 0, 0, 0.1);', // You can replace 'red' with your desired color
  marginTop: 20, 
    },
    resetImage: {
        marginLeft: -490, 
        position: 'fixed',
        top:-90,
    //    height: 231,
    // width: 206,   
    },
    inputContainer: {
        backgroundColor: '#ffffff',
        borderRadius: moderateScale(2),
        height: verticalScale(50),
        width: scale(330),
        elevation: 2,
        color: 'rgba(0, 0, 0, 0.4)',
        fontFamily: 'Montserrat-Regular',
        fontSize: moderateScale(12),
        fontWeight: '400',
        letterSpacing: moderateScale(0.48),
        lineHeight: moderateScale(17.3),
        top: -verticalScale(20),
        left: 0,
        marginBottom: verticalScale(20),
    },
    phoneNumberInput: {
        fontSize: moderateScale(16),
        height: moderateScale(30),
        color: '#00000040',
        fontSize: moderateScale(12),
        fontWeight: '400',
        letterSpacing: moderateScale(0.48),
        lineHeight: moderateScale(17.3),
        position: 'absolute',
        top: 0,
        left: -1,
    },
    inputContainer2: {
        top: 0,
        marginBottom: verticalScale(10),
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: moderateScale(2),
        borderWidth: moderateScale(0.5),
        borderColor: '#ffffff',
        elevation: Platform.OS === 'android' ? moderateScale(5) : 0,
        height: verticalScale(50),
        width: scale(240),
        flexShrink: 0,
        zIndex: 1,
      },
});

export default ForgetPin;
