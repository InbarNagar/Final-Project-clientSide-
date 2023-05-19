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
import { AntDesign, Ionicons,Feather } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import {
  AppointmentToClient,
  Search_post,
  Treatment_type_GET,
  New_Future_Apointment,
  allApoC,
} from "./obj/FunctionAPICode";
import moment from "moment";
import { NavigationActions } from "react-navigation";
import { UserContext } from "../comps/UserDietails";
import { Button } from "react-native-elements";


import searchOnMap from "../comps/UserDietails";
import AppointmentCard_forClient from "./obj/AppointmentCard_forClient";

export default function Search3(props) {
  const { navigation } = props;
  const [AddressCity, setAddressCity] = useState("");
  const [NameTreatment, setNameTreatment] = useState("");
  const [gender, setGender] = useState("");
  const [Is_client_house, setIs_client_house] = useState("");
  const [response, SetResponse] = useState([]);
  const [categories, setCategories] = useState(["קטגוריה"]);
  const [chosenTreratmentNum, setChosenTreratmentNum] = useState(0);
  const [selectedTreatment, setSelectedTreatment] = useState({});

  const sorts = ["דירוג גבוהה תחילה", "דירוג נמוך תחילה"];
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [allAppointment, setallAppointment] = useState([
    {
      Number_appointment: 122,
      Date: "2023-05-30T00:00:00",
      Start_time: "21:49:56",
      End_time: "21:49:56",
      Is_client_house: "NO        ",
      Business_Number: 4,
      Appointment_status: "confirmed",
      AddressStreet: "אהוד",
      AddressCity: "חיפה",
      AddressHouseNumber: "5         ",
      BusinessName: "nirabeauty",
      ID_Client: null,
    },
    {
      Number_appointment: 1122,
      Date: "2023-05-10T00:00:00",
      Start_time: "15:13:20",
      End_time: "15:13:20",
      Is_client_house: "YES       ",
      Business_Number: 4,
      Appointment_status: "Appointment_ended",
      AddressStreet: "אהוד",
      AddressCity: "חיפה",
      AddressHouseNumber: "5         ",
      BusinessName: "nirabeauty",
      ID_Client: null,
    },
  ]); //תורים שמחכים לאישור
  const [allAppointmentEnd, setallAppointmentEnd] = useState([]); // תורים שעשיתי
  const [FutureAppointment, setFutureAppointment] = useState([]); //תורים עתידיים
  const ClientData = userDetails;
  // const IdNumber = "123456789";
  useEffect(() => {
    Treatment_type_GET().then(
      (result) => {
        console.log("categories: ", result);
        if (result) {
          // let temp = result.map((x) => x.Name);
          setCategories(result);
        }
      },
      (error) => {
        console.log("error", error);
      }
    );
  }, []);
  // אזור טיפול בהצגה והעלמת אזורים
  const [showSearchSection, setShowSearchSection] = useState(false); //להפעיל תצוגת חיפוש תור
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
    // allApoC(IdNumber).then((result) => {
    //   if (result.data){
    //     setallAppointment(result.data)
    //     console.log(result.data.length);
    //   }
    // }, (error) => {
    //   console.log('error', error)
    // })
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


  const handleFacebookLink = () => {
    Linking.openURL(ClientData.Facebook_link); // לשים משתנה של כתובת פייסבוק שהמשתמש יזין
  };

  const handleInstagramLink = () => {
    Linking.openURL(ClientData.Instagram_link); //לשים משתנה של כתובת אינסטגרם שהמשתמש יזין
  };
  const [showSection, setShowSection] = useState(false); //להסתיר את הכפתור של תצוגת מפה
  const handleToggleSection = () => {
    setShowSection(!showSection);
  };


  function btnSearch() {
    let num = 0;
    {
      categories.map((z) => {
        //שומר את מספר ההטיפול בשביל הקריאה לשמירת תור עתידי
        if (z.Name == NameTreatment) {
          num = z.Type_treatment_Number;
          setChosenTreratmentNum(num);
          console.log(
            "treatment number: " + chosenTreratmentNum,
            "treatment name: " + NameTreatment
          );
        }
      });
      const obj = {
        AddressCity: AddressCity,
        NameTreatment: NameTreatment,
        // sort: "דירוג גבוהה תחילה",
        gender: gender,
        Is_client_house: Is_client_house,
      };
      // SetResponse([{"Appointment_status": null, "Business_Number": 1, "Date": "2023-04-09T00:00:00", "End_time": "12:30:00", "Is_client_house": "YES       ", "Number_appointment": 4, "Start_time": "12:00:00"}, {"Appointment_status": null, "Business_Number": 2, "Date": "2023-04-10T00:00:00", "End_time": "13:30:00", "Is_client_house": "YES       ", "Number_appointment": 6, "Start_time": "13:00:00"}])
      Search_post(obj).then(
        (result) => {
          console.log("yes", result.data);
          if (result.data) {
            SetResponse(result.data);
            console.log("amount of results: " + result.data.length);
            handleToggleSection(); //מפעיל את הכפתור תצוגת מפה
          }
        },
        (error) => {
          console.log("error", error);
        }
      );
    }
  }

  function btnBookApiontment(x) {
    //לקבוע תור
    const pickedApointment = {

      AddressStreet: "ehud",
      AddressHouseNumber: 5,
      AddressCity: "haifa",
      Appointment_status: "Available",
      Client_ID_number: IdNumber,
      Type_treatment_Number: chosenTreratmentNum,

      Appointment_status: x.Appointment_status,
      ID_Client: IdNumber,

      Number_appointment: x.Number_appointment,
    };
    console.log(pickedApointment);
    AppointmentToClient(pickedApointment).then(
      (result) => {
        console.log("yes", result.data);
   
        if (result.data) {
          alert("result.data");
        }
        Alert.alert(`${x.Number_appointment} מחכה לאישור מבעל העסק }`);
      },
      (error) => {
        console.log("error", error);
      }
    );
    btnSearch();
  }
  function NavigateToBusiness(x){
     console.log(x);
  }

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
            <View style={styles.filtersView}>
              <View style={styles.pickerView}>
                <Picker
                  selectedValue={NameTreatment}
                  onValueChange={(value) => setNameTreatment(value)}
                >
                  {categories.map((category, i) => (
                    <Picker.Item
                      label={category.Name}
                      value={category.Name}
                      key={i}
                    />
                  ))}
                </Picker>
                <Picker
                  selectedValue={sorts}
                  // onValueChange={(value) => handleInputChange("sort", value)}
                >
                  {sorts.map((s) => (
                    <Picker.Item label={s} value={s} key={s} />
                  ))}
                </Picker>
              </View>
              <View>
                <TextInput
                  style={{ fontSize: 25, borderColor: "black", borderWidth: 2 }}
                  placeholder="עיר"
                  value={AddressCity}
                  onChangeText={(value) => setAddressCity(value)}
                />
              </View>
              <View>
                <View>
                  <View>
                    <Text>מין מטפל :</Text>
                  </View>
                  <View>
                    <View>
                      <Text>זכר</Text>
                      <RadioButton
                        value="M"
                        status={gender === "M" ? "checked" : "unchecked"}
                        onPress={() => setGender("M")}
                      />
                    </View>
                    <View>
                      <Text>נקבה</Text>
                      <RadioButton
                        value="F"
                        status={gender === "F" ? "checked" : "unchecked"}
                        onPress={() => setGender("F")}
                      />
                    </View>
                  </View>
                </View>
                <View>
                  <View>
                    <Text>טיפול ביתי: </Text>
                  </View>
                  <View>
                    <View>
                      <Text>כן</Text>
                      <RadioButton
                        value="YES"
                        status={
                          Is_client_house === "YES" ? "checked" : "unchecked"
                        }
                        onPress={() => setIs_client_house("YES")}
                      />
                    </View>
                    <View>
                      <Text>לא</Text>
                      <RadioButton
                        value="NO"
                        status={
                          Is_client_house === "NO" ? "checked" : "unchecked"
                        }
                        onPress={() => setIs_client_house("NO")}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.buttons}>
                <Button
                  title="חפש"
                  buttonStyle={{
                    backgroundColor: "blue",
                    borderWidth: 2,
                    borderColor: "white",
                    borderRadius: 30,
                  }}
                  containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
                  }}
                  titleStyle={{ fontWeight: "bold" }}
                  onPress={btnSearch}
                />
                {showSection && response.length > 0 && (
                  <Button
                    title="תצוגת מפה"
                    buttonStyle={{
                      backgroundColor: "blue",
                      borderWidth: 2,
                      borderColor: "white",
                      borderRadius: 30,
                    }}
                    containerStyle={{
                      width: 200,
                      marginHorizontal: 50,
                      marginVertical: 10,
                    }}
                    titleStyle={{ fontWeight: "bold" }}
                    onPress={() => {
                      props.navigation.navigate("SearchOnMap", {
                        results: response,
                      });
                    }}
                  />
                )}
              </View>
            </View>
            <View style={styles.resultsView}>
              <ScrollView>
                {response &&
                  response.length > 0 &&
                  response.map((x, i) => {
                    return (
                      <View key={i}>
                        <Text>מספר עסק: {x.Business_Number}</Text>
                        <Text>מספר תור: {x.Number_appointment}</Text>
                        <Text>
                          תאריך: {moment(x.Date).format("DD-MM-YYYY")}
                        </Text>
                        <Text>שעת התחלה: {x.Start_time}</Text>
                        <Text>שעת סיום: {x.End_time}</Text>
                        <Text>האם מגיע לבית הלקוח? {x.Is_client_house}</Text>
                        <Button
                          title="צפה בפרופיל העסק"
                          buttonStyle={{
                            backgroundColor: "black",
                            borderWidth: 2,
                            borderColor: "white",
                            borderRadius: 30,
                          }}
                          containerStyle={{
                            width: 200,
                            marginHorizontal: 50,
                            marginVertical: 10,
                          }}
                          titleStyle={{ fontWeight: "bold" }}
                          onPress={NavigateToBusiness(x.Business_Number)} //יועבר לדף העסק שגם שם אפשר להזמין את התור
                        />
                        <Button
                          title="הזמן תור"
                          buttonStyle={{
                            backgroundColor: "black",
                            borderWidth: 2,
                            borderColor: "white",
                            borderRadius: 30,
                          }}
                          containerStyle={{
                            width: 200,
                            marginHorizontal: 50,
                            marginVertical: 10,
                          }}
                          titleStyle={{ fontWeight: "bold" }}
                          onPress={() => btnBookApiontment(x)} //יועבר לדף העסק שגם שם אפשר להזמין את התור
                        />
                        <Text>
                          -----------------------------------------------------------
                        </Text>
                      </View>
                    );
                  })}
              </ScrollView>
            </View>
          </ScrollView>
        )}
      {/* סוף קומפוננטת חיפוש (מסך בית) */}
      {/* קוממפוננטת מסך פרופיל */}
      {showProfileSection &&
        !showSAppointmenthSection &&
        !showSearchSection && (
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
        )}
      {/* סוף קומפוננטת מסך פרופיל */}
      {/* קומפוננטת תורים */}
      {showSAppointmenthSection &&
        !showProfileSection &&
        !showSearchSection &&(
          <View style={styles.view1}>
            {allAppointment.map((appointment) => {
              return (
                <AppointmentCard_forClient
                key={appointment.Number_appointment}
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
    alignItems:'stretch',
    padding:10,
  //  borderColor:'#9acd32'
   

  },
  filtersView: {},
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
  buttons: {},
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
