import React, { useContext,useState, useEffect } from "react";
import { Text, StyleSheet, Alert,Image, View ,Share} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import StreakContext from '../stats/streakContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from "../../style/colors";

const SettingScreen = ({ navigation }) => {
  const { markedDates, setMarkedDates } = useContext(StreakContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {

    const fetchUserFromStorage = async () => {
      try {
        const userData = await AsyncStorage.getItem("@user");
        if (userData !== null) {
          setProfile(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserFromStorage();
  }, []);

console.log(profile,'profile')
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("@user");
      // Navigate back to login screen
      navigation.navigate('login');
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };
  const handleClearStats = () => {
    Alert.alert("Clear Streak", "Do you want to clear the streak?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK",  onPress: () => {
        setMarkedDates([]);
      },
    },
    ]);
  };

  const handleShare = async (option) => {
    try {
      let shareOptions = {
        message: "Check out this amazing app!", // Your shared message
      };
      switch (option) {
        case 'whatsapp':
          shareOptions.url = 'whatsapp://send?text=Check out this amazing app: https://example.com'; // WhatsApp share link
          break;
        case 'email':
          shareOptions.subject = 'Check out this amazing app!'; // Email subject
          break;
        case 'facebook':
          shareOptions.url = 'https://www.facebook.com/sharer/sharer.php?u=https://example.com'; // Facebook share link
          break;
        case 'twitter':
          shareOptions.url = 'https://twitter.com/intent/tweet?url=https://example.com&text=Check out this amazing app!'; // Twitter share link
          break;
        case 'instagram':
          shareOptions.url = 'https://www.instagram.com/'; // Instagram share link
          break;
        default:
          break;
      }
      await Share.share(shareOptions);
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };



  return (
    <>
      <LinearGradient colors={["#CADFED", "#EDF5F9"]} style={styles.container}>
          <View style={styles.profileContainer}>
            <Image source={{ uri: profile?.picture }} style={styles.profileImage} />
            <Text style={styles.profileName}>{profile?.name}</Text>
          </View>

             {/* Share Card */}
        <View style={styles.shareCard}>
          <Text style={styles.shareCardTitle}>Share to your friend:</Text>
          <View style={styles.shareOptionsContainer}>
            <TouchableOpacity onPress={() => handleShare('whatsapp')} style={styles.shareOption}>
              <Ionicons name="logo-whatsapp" size={30} style={styles.shareOptionIcon} />
              <Text style={styles.shareOptionText}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleShare('email')} style={styles.shareOption}>
              <Ionicons name="mail-outline" size={30} style={styles.shareOptionIcon} />
              <Text style={styles.shareOptionText}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleShare('facebook')} style={styles.shareOption}>
              <Ionicons name="logo-facebook" size={30} style={styles.shareOptionIcon} />
              <Text style={styles.shareOptionText}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleShare('twitter')} style={styles.shareOption}>
              <Ionicons name="logo-twitter" size={30} style={styles.shareOptionIcon} />
              <Text style={styles.shareOptionText}>Twitter</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleShare('instagram')} style={styles.shareOption}>
              <Ionicons name="logo-instagram" size={30} style={styles.shareOptionIcon} />
              <Text style={styles.shareOptionText}>Instagram</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop:270}}>
          <TouchableOpacity onPress={handleClearStats} style={styles.card}>
            <Ionicons name="flame-outline" size={34}  style={styles.icon} />
            <Text style={styles.cardText}>Clear Stats</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.card}>
            <Ionicons name="log-out-outline" size={34}  style={styles.icon} />
            <Text style={styles.cardText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  cardText: {
    fontSize: 20,
    color: 'black',
    textAlign: "center",
    marginLeft: 10, 
  },
  icon: {
    marginRight: 10, 
    color:'black'
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    margin: 10,
  },
  shareCard: {
    backgroundColor: '#CEDDE8',
    borderRadius: 10,
    padding: 25,
    marginBottom: 10,
    marginTop:15,
  },
  shareCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  shareOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shareOption: {
    alignItems: 'center',
  },
  shareOptionIcon: {
    marginBottom: 5,
    color: 'black', 
  },
  shareOptionText: {
    fontSize: 16,
    color: 'black', 
  },
});
