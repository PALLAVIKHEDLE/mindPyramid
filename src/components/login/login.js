import React, { useState } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import Colors from "../../style/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const LoginScreen = ({ navigation }) => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={{ backgroundColor: Colors.white, flex:1 }}>
      <View>
        <Image
          source={require("../../assets/loginScreen.png")}
          style={{ width: screenWidth, height: 550, marginBottom: 5 }}
        />
      </View>
      <View style={{ alignItems: "center", justifyContent: "center", marginTop:25 }}>
        <Text
          style={{
            fontSize: 21,
            fontWeight: "bold",
            color: Colors.activeColor,
          }}
        >
          Welcome to your Haven
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: Colors.lightBlue,
          }}
        >
          Take a deep breath and begin your
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: Colors.lightBlue,
          }}
        >
          healing journey
        </Text>
      </View>
      <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color:Colors.activeColor,
            alignSelf:'center',
            marginTop:100
          }}
        >
          Get Started
        </Text>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.lightBlue,
          borderRadius: 7,
          width: 200,
          height: 50,
          padding: 5,
          alignItems: "center",
          justifyContent: "center",
          alignSelf:'center',
          marginTop:5
        }}
      >
       
        <View style={{display:'flex', flexDirection:'row'}}>
          <Image source={require("../../assets/gImage.png")} style={{ width:30, height:30}}/>
          <Text
            style={{
              fontSize: 18,
              color: Colors.white,
              marginLeft:7
            }}
          >
            Login With Google
        </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
