import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import * as AuthSession from 'expo-auth-session';
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from 'expo-auth-session';

import Colors from "../../style/colors";

const LoginScreen = ({ navigation }) => {

  useEffect(() => {
    const handleAuthSession = async () => {
      const redirectUrl = makeRedirectUri({ useProxy: true });
      const androidClientId = "686074631278-cpml0o7kvti07gnds3cppu2gpa421e99.apps.googleusercontent.com";
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${androidClientId}&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=https://www.googleapis.com/auth/userinfo.profile+https://www.googleapis.com/auth/userinfo.email&access_type=offline&prompt=consent`;
      
      const { type, params } = await AuthSession.startAsync({ authUrl });
      console.log('AuthUrl',authUrl, type)
  
      if (type === 'success') {
        console.log("Authentication successful:", params);
        // Handle successful authentication
      } else {
        console.log("Authentication canceled or failed");
        // Handle other types of results (e.g., cancellation or failure)
      }
    };

    handleAuthSession();
  }, []);

  const [, , promptAsync] = Google.useAuthRequest({
    clientId: "686074631278-cpml0o7kvti07gnds3cppu2gpa421e99.apps.googleusercontent.com",
    redirectUri: makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email'],
  });

  const handleLoginWithGoogle = async () => {
    try {
      await promptAsync();
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to authenticate with Google.");
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
        onPress={handleLoginWithGoogle}
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
