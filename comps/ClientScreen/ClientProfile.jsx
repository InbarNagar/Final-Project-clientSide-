import { React, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Image,
  BackHandler,
  Alert
} from "react-native";
import {Button} from 'react-native-elements';
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { UserContext } from "../UserDietails";
import { exp } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { DeleteClient } from "../obj/FunctionAPICode";
import { TextInput } from "react-native-gesture-handler";
import { string } from "prop-types";

const ClientProfile = (props) => {
  const navigation = useNavigation();

  const { userDetails, setUserDetails } = useContext(UserContext);
  const ClientData = userDetails;

  const handleFacebookLink = () => {
    Linking.openURL(ClientData.Facebook_link); // לשים משתנה של כתובת פייסבוק שהמשתמש יזין
  };

  const handleInstagramLink = () => {
    Linking.openURL(ClientData.Instagram_link); //לשים משתנה של כתובת אינסטגרם שהמשתמש יזין
  };
  const [deleteSection, SetDeleteSection] = useState(false);
  const[confirmID,SetConfirmID]=useState('');
  const handleDeleteSection = () => SetDeleteSection(prevState => !prevState);
  function exitApp() {
    BackHandler.exitApp();
    return true;
}

function deleteAccount() {
  if(confirmID==="DELETE"){
    console.log("starting to delete account");
    DeleteClient(ClientData.ID_number).then(
    (result) => {
      console.log(`client ${ClientData.ID_number} DELETED! `);
      console.log(result.data);
      
      exitApp();
    },
    (error) => {
      console.log("error", error);
      // Handle error, including finding a way to display to the user that deletion failed.
    }
  );
}
else{
  console.log("confirmation didn't operate correctly");
  Alert.alert("confirmation of ID was wrong!")
}
}
  return (
    <View style={styles.container}>
      <Image
        // source={require("")}
        style={styles.profilePicture}
      />
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleInstagramLink}>
          <FontAwesome name="instagram" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFacebookLink}>
          <FontAwesome name="facebook-square" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.name}>
        {ClientData.First_name + " " + ClientData.Last_name}
      </Text>
      <Text style={styles.address}>
        {ClientData.AddressStreet +
          " " +
          ClientData.AddressHouseNumber +
          ", " +
          ClientData.AddressCity}
      </Text>
      <Button
        title="עריכת פרופיל"
        onPress={() => navigation.navigate("Update_ClientDetailes")}
      />
      <Button title="מחיקת חשבון" onPress={handleDeleteSection} buttonStyle={{backgroundColor:'red'}}/>
      {deleteSection &&
       <View>
        <Text>כדי למחוק את החשבון יש לכתוב DELETE</Text>
        <TextInput placeholder="כתוב DELETE" value={confirmID} onChangeText={(value)=>SetConfirmID(value)}/>
      <TouchableOpacity onPress={deleteAccount}>
      <AntDesign name="delete" size={24} color="black" />
      </TouchableOpacity>
      </View>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 10,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "50%",
    marginTop: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  address: {
    fontSize: 14,
    textAlign: "center",
  },
});
export default ClientProfile;
