import React, { useState } from "react";
import { View, Text } from "react-native";
import Colors from "../../style/colors";

import { TouchableOpacity } from "react-native-gesture-handler";


const SettingScreen = ({ navigation }) => {

  return (
    <>
      <View
        style={{ justifyContent: "center", alignItems: "flex-end", margin: 10 }}>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: Colors.orange,
              textDecorationLine: "underline",
            }}
          >
            Setting Screen
          </Text>
        </TouchableOpacity>
      </View>
     
    </>
  );
};

export default SettingScreen;
