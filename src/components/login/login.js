import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import Colors from "../../style/colors";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "686074631278-q607n2frm9dtpiqaandgln0fjvmsku7e.apps.googleusercontent.com",
    iosClientId:
      "686074631278-3rlp0ieu6ir77ucfqdit8qh9lkh7ti36.apps.googleusercontent.com",
    androidClientId:
      "686074631278-b1nh1kemt9ng4e9utfmd1h44q1leaccs.apps.googleusercontent.com",
  });

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const user = await getLocalUser();
      if (user) {
        navigation.navigate("Home");
      }
    };

    checkUserLoggedIn();
  }, []);

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

  console.log(JSON.stringify(userInfo));

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token) => {
    console.log("token", token);
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response", response);
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
      console.log("user,user", user);
      navigation.navigate("Home");
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Image
        source={require("../../assets/loginScreen.png")}
        style={{ width: "100%", height: 530, marginBottom: 40 }}
      />
      <Text style={styles.heavenTextStyle}>Welcome to your Haven</Text>
      <Text style={styles.healTextStyle}>
        Take a deep breath and begin your healing journey
      </Text>
      <TouchableOpacity
        style={styles.loginWithGoogle}
        onPress={() => {
          promptAsync();
        }}
      >
        <Image
          source={require("../../assets/gImage.png")}
          style={styles.gImage}
        />
        <Text style={{ fontSize: 18, color: Colors.white }}>
          Login With Google
        </Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  heavenTextStyle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.activeColor,
    marginBottom: 10,
  },
  healTextStyle: { fontSize: 16, color: Colors.lightBlue, marginBottom: 40 },
  loginWithGoogle: {
    backgroundColor: Colors.lightBlue,
    borderRadius: 7,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom:200,
    flexDirection: "row",
    alignItems: "center",
  },
  gImage: { width: 30, height: 30, marginRight: 10,  },
});
