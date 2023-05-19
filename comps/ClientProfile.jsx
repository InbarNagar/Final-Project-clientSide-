import { React, useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Image,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { UserContext } from "./UserDietails";
export default function ClientProfile() {
  const [showAppointmentSection, setShowAppointmentSection] = useState(false); //להציג את התורים שלי

  const handleAppointmentToggleSection = () => {
    console.log("התורים שלי: "+showAppointmentSection);
    setShowAppointmentSection(!showAppointmentSection);
  };
  const { userDetails, setUserDetails } = useContext(UserContext);
  // const ClientData = userDetails;
  const ClientData = {
    ID_number: "123456789 ",
    First_name: "maya",
    Last_name: "cohen",
    birth_date: "1990-01-01T00:00:00",
    gender: "F",
    phone: "521111111",
    Email: "maya@gmail.com",
    AddressStreet: "hamenora",
    AddressHouseNumber: "2         ",
    AddressCity: "haifa",
    Facebook_link:
      "https://www.facebook.com/profile.php?id=1750014197&mibextid=ZbWKwL",
    Instagram_link:
      "https://instagram.com/inbar_nagar7?igshid=NTc4MTIwNjQ2YQ==",
    password: "111",
    userType: "Cli",
  };
  const handleEditDetails = () => {
    // Handle edit details button press
    // Add your logic here
  };

  const handleNavigate = () => {
    // Handle navigate button press
    // Add your navigation logic here
  };

  const handleFacebookLink = () => {
    Linking.openURL(ClientData.Facebook_link); // לשים משתנה של כתובת פייסבוק שהמשתמש יזין
  };

  const handleInstagramLink = () => {
    Linking.openURL(ClientData.Instagram_link); //לשים משתנה של כתובת אינסטגרם שהמשתמש יזין
  };

  return (
    <View>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <AntDesign name="edit" size={24} color="black" />
          <Text style={styles.menuText}>עריכת פרטים</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Search3")}
        >
          <AntDesign name="home" size={24} color="black" />
          <Text style={styles.menuText}>מסך בית</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleAppointmentToggleSection}
        >
          <AntDesign name="calendar" size={24} color="black" />
          <Text style={styles.menuText}>התורים שלי</Text>
        </TouchableOpacity>
      </View>
      <View>
        {/* <Image source={require('')} style={{ width: 150, height: 150 }} /> */}
        <Image
          source={require(".././assets/Wpic.jpg")}
          style={{ width: 100, height: 100 }}
        />
        <Text style={{ fontSize: 30, fontWeight: 2 }}>
          {ClientData.First_name} {ClientData.Last_name}
        </Text>
        <Text>טלפון: {ClientData.phone}</Text>
        <Text>
          כתובת: {ClientData.AddressStreet} {ClientData.AddressHouseNumber},
          {ClientData.AddressCity}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={handleFacebookLink}>
            <Feather name="facebook" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleInstagramLink}>
            <AntDesign name="instagram" size={24} color="black" />
          </TouchableOpacity>
        </View>
        </View>

        {showAppointmentSection && (
          <View>
            <Text>התורים שלי!</Text>
          </View>
        )}
    </View>
  );
}
const styles = StyleSheet.create({
  menu: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // backgroundColor: '#f2f2f2',
    height: 60,
    width: "100%",
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
  },
  menuItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  menuText: {
    fontSize: 12,
    paddingTop: 5,
  },
});
