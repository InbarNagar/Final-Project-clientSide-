import { React, useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
  Linking
} from "react-native";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import {
  AllApointemtDetailesForClient
} from "./obj/FunctionAPICode";
import moment from "moment";
import { NavigationActions } from "react-navigation";
import { UserContext } from "../comps/UserDietails";
import { Button } from "react-native-elements";
import Geocoder from 'react-native-geocoding';
import searchOnMap from "../comps/UserDietails";
import AppointmentCard_forClient from "./obj/AppointmentCard_forClient";
import ClientProfile from "./ClientProfile";
import SearchFiltersMenu from "./SearchFiltersMenu";


export default function Search3(props) {
  const { navigation } = props;
  Geocoder.init('AIzaSyBMwN0NknaPibHnpv8laiFYUKmQFz1FHZY');

  const [AddressCity, setAddressCity] = useState("");
  const [NameTreatment, setNameTreatment] = useState("");
  const [gender, setGender] = useState("");
  const [Is_client_house, setIs_client_house] = useState("");
  const [response, SetResponse] = useState([]);
  const [categories, setCategories] = useState(["קטגוריה"]);
  const [chosenTreratmentNum, setChosenTreratmentNum] = useState(0);
  const [selectedTreatment, setSelectedTreatment] = useState({});
  const [token, settoken] = useState();// ענבר
  const sorts = ["דירוג גבוהה תחילה", "דירוג נמוך תחילה"];
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [apo, setapo] = useState();//inbar
  const [allAppointment, setallAppointment] = useState([]); //תורים שמחכים לאישור
  const [allAppointmentEnd, setallAppointmentEnd] = useState([]); // תורים שעשיתי
  const [FutureAppointment, setFutureAppointment] = useState([]); //תורים עתידיים
  const ClientData = userDetails;
  
  useEffect(() => {
    if (token) {
      const body = {
        "to": token,
        "title": "BeautyMe",
        "body": `${userDetails.First_name} הזמינה תור חדש `,
        "badge": "0",
        "ttl": "1",// מספר שניות לשליחה
        "data": {
          "to": token
        }
      }
      Post_SendPushNotification(body).then
        (() => {
          console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%", token)
        }
        )
    }

  }, [token]);
  // אזור טיפול בהצגה והעלמת אזורים
  const [showSearchSection, setShowSearchSection] = useState(true); //להפעיל תצוגת חיפוש תור
  const handleSearchToggleSection = () => {
    console.log("מסך חיפוש : " + showSearchSection);
    setShowSAppointmenthSectionn(false);
    setShowProfileSection(false);
    setShowSearchSection(!showSearchSection);
  };
  const [showSAppointmenthSection, setShowSAppointmenthSectionn] =
    useState(false); //להפעיל תצוגת תורים
  const handleAppointmentToggleSection = () => {
    setShowSearchSection(false);
    setShowProfileSection(false);
    console.log("התורים שלי: " + showSAppointmenthSection);
    setShowSAppointmenthSectionn(!showSAppointmenthSection);

    AllApointemtDetailesForClient(userDetails).then((result) => {
      if (result.data) {
        setallAppointment(result.data)
        console.log(result.data);
      }
    }, (error) => {
      console.log('error', error)
    })
    console.log(JSON.stringify(allAppointment));
  };
  const [showProfileSection, setShowProfileSection] = useState(false); //להפעיל תצוגת פרופיל לקוח
  const handleProfileToggleSection = () => {
    setShowSearchSection(false);
    setShowSAppointmenthSectionn(false);
    console.log("פרופיל: " + showProfileSection);
    setShowProfileSection(!showProfileSection);
  };
  // סוף אזורים
  // אזור ניהול תורים לתצוגת התורים

 


  return (
    <View style={styles.container}>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleProfileToggleSection}
        >
          <Ionicons name="person" size={24} color="black" />
          <Text style={styles.menuText}>פרופיל</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleSearchToggleSection}
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
      {showSearchSection &&
        !showProfileSection &&
        !showSAppointmenthSection && (
          <ScrollView>
            <SearchFiltersMenu
            ClientIDnumber={userDetails.ID_number}
            />
          </ScrollView>
        )}
      {/* סוף קומפוננטת חיפוש (מסך בית) */}
      {/* קוממפוננטת מסך פרופיל */}
      {showProfileSection &&
        !showSAppointmenthSection &&
        !showSearchSection && (
          <ClientProfile/>
        )}
      {/* סוף קומפוננטת מסך פרופיל */}
      {/* קומפוננטת תורים */}
      {showSAppointmenthSection &&
        !showProfileSection &&
        !showSearchSection && (
          <View style={styles.view1}>
            {allAppointment.map((appointment) => {
              console.log("key: "+appointment.Number_appointment);
              return (
                <AppointmentCard_forClient
                  Number_appointment={appointment.Number_appointment}
                  backgroundColor={"grey"}
                  status={appointment.Appointment_status}
                  Date={appointment.Date}
                  Start_time={appointment.Start_time}
                  End_time={appointment.End_time}
                  AddressStreet={appointment.AddressStreet}
                  AddressHouseNumber={appointment.AddressHouseNumber}
                  AddressCity={appointment.AddressCity}
                  BusinessName={appointment.BusinessName}
                
                />
              );
            })}
          </View>
        )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
  },
  view1: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: 10,
    //  borderColor:'#9acd32'
  },
  resultsView: {
    flex: 1,
  },
  radioButtonsView: {
    flex: 1,
    flexDirection: "row-reverse",
    margin: 10,
    justifyContent: "space-between",
  },
  radio: {
    flexDirection: "column",
    flex: 1,
  },
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
