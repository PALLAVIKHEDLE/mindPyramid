import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from 'expo-web-browser';


import Colors from "../../style/colors";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {

  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "686074631278-cpml0o7kvti07gnds3cppu2gpa421e99.apps.googleusercontent.com",
    iosClientId: "686074631278-obhvesikr6juspq95v8bsbolvlh81ciq.apps.googleusercontent.com",
    clientId: "686074631278-co8vng6rkbqrvh6juhtlm02klm4puqrj.apps.googleusercontent.com",
  
  });


  useEffect(() => {
    const signInWithGoogle = async () => {
      console.log("signInWithGoogle called, response:", response);
  
      if (response?.type === "success") {
        console.log("Login Success, fetching user info...");
        await getUserInfo(response.authentication.accessToken);
      } else {
        console.log("Login not successful or waiting for login...");
      }
    };
  
    if (response) {
      signInWithGoogle();
    }
  }, [response]);
  
console.log(JSON.stringify(userInfo))


  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
console.log('response',response)
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
      navigation.navigate('Home')
    } catch (error) {
      console.error('error',error)
    }
  };

  
  return (
    <View style={{ backgroundColor: Colors.white, flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../../assets/loginScreen.png")}
        style={{ width: 200, height: 200, marginBottom: 20 }}
      />
      <Text style={{ fontSize: 24, fontWeight: "bold", color: Colors.activeColor, marginBottom: 10 }}>
        Welcome to your Haven
      </Text>
      <Text style={{ fontSize: 16, color: Colors.lightBlue, marginBottom: 20 }}>
        Take a deep breath and begin your healing journey
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.lightBlue,
          borderRadius: 7,
          paddingHorizontal: 20,
          paddingVertical: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => {
            promptAsync();
          }}
      >
        <Image source={require("../../assets/gImage.png")} style={{ width: 30, height: 30, marginRight: 10 }} />
        <Text style={{ fontSize: 18, color: Colors.white }}>
          Login With Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;