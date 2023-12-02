import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity , Image} from 'react-native';
import Button from '../components/Button';
import { useFonts, GentiumBookBasic_400Regular } from '@expo-google-fonts/dev';

const WelcomeScreen = ({ navigation }) => {

   const [fontsLoaded] = useFonts({
    GentiumBookBasic_400Regular,
  });

  if (!fontsLoaded) {
    // You can return a loading indicator here
    return null;
  }

  const handleLogin = () => {
    // Implement your button's logic here
    // You can navigate to another screen or perform any action on button press
    navigation.navigate('Login');
  };
  const handleSignUpPress = () => {
    // Navigate to the next screen when "Sign Up" is pressed
    navigation.navigate('Signup'); // Replace 'SignUpScreen' with the actual screen name
  };

  return (
    
    <View style={styles.container}>
     
      <Image
    source={require('../assets/images/jango.png')} // Replace with the correct path to your image
    style={styles.image} // Apply custom styles to the image here
      /> 
       <Image
    source={require('../assets/images/backmain.png')} // Replace with the correct path to your image
    style={styles.backgroundmain} // Apply custom styles to the image here
      /> 
      <Image
    source={require('../assets/images/radiobtn.png')} // Replace with the correct path to your image
    style={styles.rbtn} // Apply custom styles to the image here
        />
        {/* <Image
    source={require('../assets/images/background.png')} // Replace with the correct path to your image
    style={styles.background_complete} // Apply custom styles to the image here
      /> 
       <Image
    source={require('../assets/images/character.png')} // Replace with the correct path to your image
    style={styles.character} // Apply custom styles to the image here
      /> 
       <Image
    source={require('../assets/images/device.png')} // Replace with the correct path to your image
    style={styles.device} // Apply custom styles to the image here
      />  */}
     
       
      <View style={styles.textContainer}>
      <Text style={styles.welcomeText}>Enabling Street Addressing & GPS Navigation Anywhere On The Globe </Text>
       <Text style={styles.subText}>when there are no officials addresses create your personal address for GPS navigation </Text>
     </View>
      <View style={styles.buttonContainer}>
        <Button
          title="LOGIN"
          onPress={handleLogin}
          style={styles.loginButton} // Apply custom styles here
        />
          </View>
           <TouchableOpacity onPress={handleSignUpPress}>
        <Text style={styles.signUpText}>
          DONT HAVE AN ACCOUNT?{'      '}
          <Text style={styles.signUpText1}>SIGN UP</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Customize the background color
  },

  image: {
     backgroundColor: '#f4ed3e',
    borderRadius: 21.5, // Half of the height (43px) to make it circular
    height: 43,
    width: 43,
    top: 75,
  },
  backgroundmain: {
      width: 297,
    height: 258,
    overflow: 'hidden',
    top: 120,
  },
    rbtn: {
        position: 'relative',   // Use 'absolute' for positioning within the container
    top: 150,                 // Position from the top edge of the container
    left: 0,                // Position from the left edge of the container
    width: 37,              // Set the desired width
    height: 9, 
  },
  character: {
     height: 213, // Set your desired height
    width: 77,
  },
  textContainer: {
    marginTop: 190,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: 'semibold',
    marginTop: -25,
    color: '#000000b2',
     fontFamily: 'GenBkBasB', // Replace with your font
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.64,
    lineHeight: 23,
    textAlign: 'center',
  },
  subText: {
    fontSize: 12,
    marginTop: 18,
    textAlign: 'center',
       color: '#000000b2',
    fontFamily: 'GenBkBasR', // You should use the correct font family if available
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.48,
    lineHeight: 17.3,
    textAlign: 'center',
  },
  buttonContainer: {
      justifyContent: 'center',
      width: '90%',
    alignItems: 'center',
    marginTop: 60, // Adjust the margin top to your preference
    top: -80,
  },
  loginButton: {
    width: '100%', // Customize the button width
    height: 40, // Customize the button height
    backgroundColor: '#0000ee', // Customize the button background color
    borderRadius: 5, // Customize the button border radius
    marginTop: 50,
        color: '#000000b2',
    fontFamily: 'Helvetica', // Use the appropriate font family
    fontSize: 16,
    fontWeight: 'bold', // Use '700' for fontWeight if needed
    letterSpacing: 0.64,
    lineHeight: 23,
    textAlign: 'center',
    width: 328, // Set your desired width
  },
   signUpText: {
    marginTop: -60,
     fontWeight: 'bold',
   color: '#000000',
    fontFamily: 'Helvetica', // Use the appropriate font family
    fontSize: 12,
    fontWeight: '500', // Use '500' for fontWeight if needed
    letterSpacing: 0.48,
    lineHeight: 17.3,
    textAlign: 'left', // Adjust as needed
    whiteSpace: 'nowrap',
  },
  signUpText1: {
      color: '#0000ee',
    fontFamily: 'Helvetica', // Use the appropriate font family
    fontSize: 14,
    fontWeight: '600', // Use '600' for fontWeight if needed
    letterSpacing: 0.56,
    lineHeight: 20.2,
    textAlign: 'left', // Adjust as needed
    whiteSpace: 'nowrap', 
   },
});

export default WelcomeScreen;
