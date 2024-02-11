// import React, { useEffect, useState } from "react";
// import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
// import * as AuthSession from 'expo-auth-session';
// import * as Google from "expo-auth-session/providers/google";
// import { makeRedirectUri } from 'expo-auth-session';
// import * as WebBrowser from "expo-web-browser";

// import Colors from "../../style/colors";

// WebBrowser.maybeCompleteAuthSession();
// const LoginScreen = ({ navigation }) => {

//   const [token, setToken] = useState("");
//   const [userInfo, setUserInfo] = useState(null);

//   const [request, response, promptAsync] = Google.useAuthRequest({
//     androidClientId: "686074631278-cpml0o7kvti07gnds3cppu2gpa421e99.apps.googleusercontent.com",
//     iosClientId: "686074631278-obhvesikr6juspq95v8bsbolvlh81ciq.apps.googleusercontent.com",
//     webClientId: "686074631278-co8vng6rkbqrvh6juhtlm02klm4puqrj.apps.googleusercontent.com",
//     // // Add redirectUri here
//     redirectUri: makeRedirectUri({
//     //   native: 'com.peace.mindPyramid',
//       useProxy: true, // Add this line if you're not using standalone app, e.g., Expo Go
//     }),
//   });


//   useEffect(() => {
//     const signInWithGoogle = async () => {
//       console.log("signInWithGoogle called, response:", response);
  
//       if (response?.type === "success") {
//         console.log("Login Success, fetching user info...");
//         await getUserInfo(response.authentication.accessToken);
//       } else {
//         console.log("Login not successful or waiting for login...");
//         // Consider additional logic here for handling different response types (e.g., error, dismiss)
//       }
//     };
  
//     if (response) {
//       signInWithGoogle();
//     }
//   }, [response]);
  
// console.log(JSON.stringify(userInfo))


//   const getLocalUser = async () => {
//     const data = await AsyncStorage.getItem("@user");
//     if (!data) return null;
//     return JSON.parse(data);
//   };

//   const getUserInfo = async (token) => {
//     if (!token) return;
//     try {
//       const response = await fetch(
//         "https://www.googleapis.com/userinfo/v2/me",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
// console.log('response',response)
//       const user = await response.json();
//       await AsyncStorage.setItem("@user", JSON.stringify(user));
//       setUserInfo(user);
//     } catch (error) {
//       // Add your own error handler here
//     }
//   };

  
//   return (
//     <View style={{ backgroundColor: Colors.white, flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Image
//         source={require("../../assets/loginScreen.png")}
//         style={{ width: 200, height: 200, marginBottom: 20 }}
//       />
//       <Text style={{ fontSize: 24, fontWeight: "bold", color: Colors.activeColor, marginBottom: 10 }}>
//         Welcome to your Haven
//       </Text>
//       <Text style={{ fontSize: 16, color: Colors.lightBlue, marginBottom: 20 }}>
//         Take a deep breath and begin your healing journey
//       </Text>
//       <TouchableOpacity
//         style={{
//           backgroundColor: Colors.lightBlue,
//           borderRadius: 7,
//           paddingHorizontal: 20,
//           paddingVertical: 10,
//           flexDirection: "row",
//           alignItems: "center",
//         }}
//         onPress={() => {
//             promptAsync();
//           }}
//       >
//         <Image source={require("../../assets/gImage.png")} style={{ width: 30, height: 30, marginRight: 10 }} />
//         <Text style={{ fontSize: 18, color: Colors.white }}>
//           Login With Google
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default LoginScreen;

import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [accessToken, setAccessToken] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    androidClientId: "686074631278-cpml0o7kvti07gnds3cppu2gpa421e99.apps.googleusercontent.com",
        iosClientId: "686074631278-obhvesikr6juspq95v8bsbolvlh81ciq.apps.googleusercontent.com",
        clientId: "686074631278-co8vng6rkbqrvh6juhtlm02klm4puqrj.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if(response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
    }
  }, [response, accessToken])

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const useInfo = await response.json();
    setUser(useInfo);
  }

  const ShowUserInfo = () => {
    if(user) {
      return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 35, fontWeight: 'bold', marginBottom: 20}}>Welcome</Text>
          {/* <Image source={{uri: user.picture}} style={{width: 100, height: 100, borderRadius: 50}} /> */}
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{user.name}</Text>
        </View>
      )
    }
  }  

  return (
    <View style={styles.container}>
      {user && <ShowUserInfo />}
      {user === null &&
          <>
          <Text style={{fontSize: 35, fontWeight: 'bold'}}>Welcome</Text>
          <Text style={{fontSize: 25, fontWeight: 'bold', marginBottom: 20, color: 'gray'}}>Please login</Text>
        <TouchableOpacity
          disabled={!request}
          onPress={() => {
            promptAsync();
            }} 
        >
          <Image source={require("../../assets/gImage.png")} style={{width: 300, height: 40}} />
        </TouchableOpacity>
        </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});