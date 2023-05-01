import { React, useEffect, useState,useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { Search_post, Treatment_type_GET,New_Future_Apointment } from "./obj/FunctionAPICode";
import moment from "moment";
import Maps_test from "./Maps_test";
import { NavigationActions } from "react-navigation";
// import LocationPicker from './LocationHandler/LocationPicker';
import { UserContext } from "./UserDietails"; 

export default function Search3(props) {
  const { navigation } = props
  const [AddressCity, setAddressCity] = useState("");
  const [NameTreatment, setNameTreatment] = useState("");
  const [gender, setGender] = useState("");
  const [Is_client_house, setIs_client_house] = useState("");
  const [response, SetResponse] = useState([]);
  const [categories, setCategories] = useState([]);
  const [chosenTreratmentNum,setChosenTreratmentNum]=useState(0);

  const sorts = ["דירוג גבוהה תחילה", "דירוג נמוך תחילה"];
  const { ID_number } = useContext(UserContext);

  useEffect(() => {
    console.log(ID_number);
    Treatment_type_GET().then(
      (result) => {
        console.log("yes", result);
        if (result) {
          let temp = result.map((x) => x.Name);
          setCategories(temp);
        }
      },
      (error) => {
        console.log("error", error);
      }
    );
  }, []);

  function btnSearch() {
    let count=0;
    {categories.map((z)=>{ //שומר את מספר ההטיפול בשביל הקריאה לשמירת תור עתידי 
      count++;
      if(z===NameTreatment){
        setChosenTreratmentNum(count)
        console.log(chosenTreratmentNum);
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
        }
      },
      (error) => {
        console.log("error", error);
      }
    );
  }};
  
  function NavigateToBusiness(b_number) {
    // לעבור כאן לדף בעל העסק על ידי שליחת המספר מזהה של העסק
  }
  function bookApiontment(x) {
    //לקבוע תור
    const pickedApointment = {
      // Future_appointment_number:, אמור להיות מספר רץ שיינתן ברגע שהלקוח ירצה את התור
      Appointment_status:x.Appointment_status,
      Client_ID_number:ID_number,
      Type_treatment_Number:chosenTreratmentNum,
      // sort: "דירוג גבוהה תחילה",
      Number_appointment:x.Number_appointment,
    };

    New_Future_Apointment(pickedApointment).then(
      (result) => {
        console.log("yes", result.data);
        if (result.data) {
          alert(result.data);
        }
      },
      (error) => {
        console.log("error", error);
      }
    );
  }
  return (
    <View>
      <View style={styles.filtersView}>
        <View>
          <Text>קטגוריה:</Text>
          <Picker
            selectedValue={NameTreatment}
            onValueChange={(value) => setNameTreatment(value)}
          >
            {categories.map((category) => (
              <Picker.Item label={category} value={category} key={category} />
            ))}
          </Picker>
          <TextInput
            placeholder="עיר"
            value={AddressCity}
            onChangeText={(value) => setAddressCity(value)}
          />
        </View>
        <View>
          <Text>מיון לפי:</Text>
          <Picker
            selectedValue={sorts}
            onValueChange={(value) => handleInputChange("sort", value)}
          >
            {sorts.map((s) => (
              <Picker.Item label={s} value={s} key={s} />
            ))}
          </Picker>
        </View>
        <View>
          <Text>מין בעל המקצוע:</Text>

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
        <View>
          <Text>טיפול בביתהלקוח ?</Text>

          <View>
            <Text>כן</Text>
            <RadioButton
              value="YES"
              status={Is_client_house === "YES" ? "checked" : "unchecked"}
              onPress={() => setIs_client_house("YES")}
            />
          </View>
          <View>
            <Text>לא</Text>
            <RadioButton
              value="NO"
              status={Is_client_house === "NO" ? "checked" : "unchecked"}
              onPress={() => setIs_client_house("NO")}
            />
          </View>
        </View>
        <Button title="חפש" onPress={btnSearch} />
        <Button title="תצוגת מפה" onPress={()=>{props.navigation.navigate('SearchOnMap',{results:response})}}/>
      </View>
      <View style={styles.resultsView}>
        <ScrollView>
          {response &&
            response.length > 0 &&
            response.map((x, i) => {
              return (
                <View key={i}>
                  <Text>מספר תור: {x.Number_appointment}</Text>
                  <Text>תאריך: {moment(x.Date).format("DD-MM-YYYY")}</Text>
                  <Text>שעת התחלה: {x.Start_time}</Text>
                  <Text>שעת סיום: {x.End_time}</Text>
                  <Text>האם מגיע לבית הלקוח? {x.Is_client_house}</Text>
                  <Text>סטטוס תור: {x.Appointment_status}</Text>
                  <Button
                    title="צפה בפרופיל העסק"
                    onPress={NavigateToBusiness(x.Business_Number)}
                  />
                  <Button title="הזמן תור" onPress={bookApiontment} />
                  <Text>
                    -----------------------------------------------------------
                  </Text>
                </View>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
//   resultsView: {
//     flex: 4,
//   },
//   filtersView:{
// flex:3
//   },
  // sortView: {
  //   flexDirection: "row-reverse",
  //   justifyContent: "space-between",
  // },
  // inp: {
  //   flexDirection: "row",
  //   padding: 10,
  //   justifyContent: "space-between",
  //   color: "red",
  // },
  // resultsView: {
  //   flexDirection: "column",
  //   width: "100%",
  // },
  // fixToText: {
  //   flexDirection: "row-reverse",
  //   justifyContent: "space-end",
  // },
});
