import { React, useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import {
  AllApointemtDetailesForClient_With_BusinessReview
} from "../obj/FunctionAPICode";
import { UserContext } from "../UserDietails";
import Geocoder from 'react-native-geocoding';
import AppointmentCard_forClient from "./AppointmentCard_forClient";
import ClientProfile from "./ClientProfile";
import SearchFiltersMenu from "./SearchFiltersMenu";
import NewSearch3 from "./NewSearch3";


export default function Search3(props) {
  const { navigation } = props;
  Geocoder.init('AIzaSyBMwN0NknaPibHnpv8laiFYUKmQFz1FHZY');

  const [token, settoken] = useState();// ענבר
  const sorts = ["דירוג גבוהה תחילה", "דירוג נמוך תחילה"];
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [apo, setapo] = useState();//inbar
  const [allAppointment, setallAppointment] = useState([]); //תורים שמחכים לאישור
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

// const data={
//   "AddressCity":userDetails.AddressCity ,
//   "AddressHouseNumber":userDetails.AddressHouseNumber ,
//   "AddressStreet": userDetails.AddressStreet,
//   "Email":userDetails.Email,
//   "Facebook_link":userDetails.Facebook_link,
//   "First_name": userDetails.First_name,
//   "ID_number":userDetails.ID_number,
//   "Instagram_link": userDetails.Instagram_link,
//   "Last_name": userDetails.Last_name,
//   "Token": userDetails.token,
//   "birth_date": userDetails.birth_date,
//   "gender": userDetails.gender,
//   "password": userDetails.password,
//   "phone": userDetails.phone,
//   "userType": "Cli"
// }



    console.log("התורים שלי: " + showSAppointmenthSection);
    setShowSAppointmenthSectionn(!showSAppointmenthSection);
    console.log("התורים שלי: " + showSAppointmenthSection);
console.log(userDetails,"&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
console.log(userDetails.ID_number);
  AllApointemtDetailesForClient_With_BusinessReview(userDetails.ID_number).then((result) => {

       console.log(result.data,"**************************************************************************************");
        setallAppointment(result.data)
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
    <>
   
    <View style={styles.container}>
     <ScrollView>
      {showSearchSection &&
        !showProfileSection &&
        !showSAppointmenthSection && (
          <NewSearch3/>
          // <ScrollView>
          //   <SearchFiltersMenu
          //   ClientIDnumber={userDetails.ID_number}
          //   ClientFirstName={userDetails.First_name}
          //   />
          // </ScrollView>
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
                  key={appointment.Number_appointment}
                  Review_Number={appointment.Review_Number}
                  Number_appointment={appointment.Number_appointment}
                  backgroundColor={"rgb(229, 222, 255)"}
                  status={appointment.Appointment_status}
                  Date={appointment.Date}
                  Start_time={appointment.Start_time}
                  End_time={appointment.End_time}
                  AddressStreet={appointment.AddressStreet}
                  AddressHouseNumber={appointment.AddressHouseNumber}
                  AddressCity={appointment.AddressCity}
                  BusinessName={appointment.Name}
                  Business_Number={appointment.Business_Number}
                  ClientIDnumber={userDetails.ID_number}
                />
              );
            })}
          </View>
        )}
  </ScrollView>
<View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleProfileToggleSection}
        >
          <Ionicons name="person" size={24} color="white" />
          <Text style={styles.menuText}>פרופיל</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleSearchToggleSection}
        >
          <AntDesign name="home" size={24} color="white" />
          <Text style={styles.menuText}>מסך בית</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleAppointmentToggleSection}
        >
          <AntDesign name="calendar" size={24} color="white" />
          <Text style={styles.menuText}>התורים שלי</Text>
        </TouchableOpacity>
      </View>
    </View>

    </>
  );
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
  },
  // view1: {
  //   flex: 3,
  //   flexDirection: 'column',
  //   alignItems:'center',
  //   padding: 10,
  //   //  borderColor:'#9acd32'
  // },
  // scrollContent: {
  //   alignItems: 'center',
  //   paddingVertical: 16,
  // },
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
    backgroundColor:"rgb(92, 71, 205)"
  },
  menuItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  menuText: {
    fontSize: 12,
    paddingTop: 5,
    color:"white"
  },
});
