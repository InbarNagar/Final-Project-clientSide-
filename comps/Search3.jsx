import { React, useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import {
  Search_post,
  Treatment_type_GET,
  New_Future_Apointment,
} from "./obj/FunctionAPICode";
import moment from "moment";
import { NavigationActions } from "react-navigation";
import { UserContext } from "../comps/UserDietails";
import { Button } from "react-native-elements";
import searchOnMap from '../comps/UserDietails'

export default function Search3(props) {
  const [showSection, setShowSection] = useState(false); //להסתיר את הכפתור של תצוגת מפה
  const handleToggleSection = () => {
    setShowSection(!showSection);
  };
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
  const IdNumber = userDetails.ID_number;
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
      const obj =  {
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

  function NavigateToBusiness(b_number) {
    // לעבור כאן לדף בעל העסק על ידי שליחת המספר מזהה של העסק
  }

  function btnBookApiontment(x) {
    //לקבוע תור
    setSelectedTreatment(x);
    // const pickedApointment = {
    //   Appointment_status: "available",
    //   Client_ID_number: IdNumber,
    //   Type_treatment_Number: chosenTreratmentNum,
    //   Number_appointment: x.Number_appointment,
    // };
    const pickedApointment = {
      AddressStreet:"ehud",
      AddressHouseNumber:5,
      AddressCity:"haifa",
      Appointment_status: "Available",
      Client_ID_number: IdNumber,
      Type_treatment_Number: chosenTreratmentNum,
      Number_appointment: x.Number_appointment,
    };
    console.log(pickedApointment);
    New_Future_Apointment(pickedApointment).then(
      (result) => {
        console.log("yes", result.data);
        if (result.data) {
          alert("result.data");
        }
      },
      (error) => {
        console.log("error", error);
      }
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.filtersView}>
        <View style={styles.pickerView}>
          <Picker
            selectedValue={NameTreatment}
            onValueChange={(value) => setNameTreatment(value)}
          >
            {categories.map((category,i) => (
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
        <TextInput style={{fontSize:25,borderColor:'black',borderWidth:2}}            
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
          {showSection && response.length>0 && (
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
                props.navigation.navigate("SearchOnMap", { results: response });
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
                <Text>תאריך: {moment(x.Date).format("DD-MM-YYYY")}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  filtersView: {},
  resultsView: {
    flex: 1,
  },
  pickerView: {},
  cityView: {},
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
});
