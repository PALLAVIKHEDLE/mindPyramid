import React, { useState } from "react";
import { View, Text,StyleSheet } from "react-native";
import Colors from "../../style/colors";

import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";


const SettingScreen = ({ navigation }) => {

  return (
    <>
       <LinearGradient
      colors={["#CADFED", "#EDF5F9"]}
      style={styles.container}
    >
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
        </LinearGradient>
     
    </>
  );
};

export default SettingScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

});
