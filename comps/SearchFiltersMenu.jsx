import { React, useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import { Button } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import ClientSearchReasultCard from './ClientSearchReasultCard';
import { Search_post, GetAllAvailableAppointments, Treatment_type_GET, AllApointemtDetailes } from './obj/FunctionAPICode'
import { Value } from "react-native-reanimated";
export default function SearchFiltersMenu(props) {
  const {
    ClientIDnumber,
    ClientFirstName
  } = props

const [filter_catgories,set_filter_catgories]=useState([]);

const [ShowFilter,SethowFilter]=useState(false);
  const navigation = useNavigation();
  const [chosenTreratmentNum, setChosenTreratmentNum] = useState(0);
  const [NameTreatment, setNameTreatment] = useState("");
  const [gender, setGender] = useState("");
  const [AddressCity, setAddressCity] = useState("");
  const [Is_client_house, setIs_client_house] = useState("");
  const [categories, setCategories] = useState(["קטגוריה"]);
  const [response, SetResponse] = useState([]);//מערך תוצאות החיפוש
  const sorts = ["דירוג גבוהה תחילה", "דירוג נמוך תחילה"];
  //const [apo, setapo] = useState();//inbar
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
    // AllApointemtDetailes().then((res) => {

    //   console.log("&&&&&&&&&&&&&&&&&&&&&&", res.data)
    //   setapo(res.data)
    //   console.log(ClientIDnumber.toString())
    // });
    GetAllAvailableAppointments().then(
      (result) => {
        console.log("available appointments amount: ", result.length);
        if (result) {
          // let temp = result.map((x) => x.Name);
          SetResponse(result);
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
            //מפעיל את הכפתור תצוגת מפה
          }
        },
        (error) => {
          console.log("error", error);
        }
      );

    }
  }

  const FilterTreatment = (text) => {
    console.log("&&&&&&&&&&&&&&&&&&",filter_catgories&&filter_catgories.length>0)
    
   const filterSearch= categories.filter((value) => value.Name.includes(text))
   set_filter_catgories(filterSearch)
    console.log("&&&&&&&&%%%%%%%",filterSearch)
    console.log(text)
  }


  return (
    <View >
      <View>
        <View>
        <TextInput style={styles.inp} onChangeText={(text)=>FilterTreatment(text)}> </TextInput>
        <Button onPress={()=>SethowFilter(!ShowFilter)}>סינון</Button>
        </View>
        <Picker
          selectedValue={NameTreatment}
          onValueChange={(value) => setNameTreatment(value)}
        >
          {filter_catgories&&filter_catgories.length>0?
          filter_catgories.map((category, i) => (
            <Picker.Item
              label={category.Name}
              value={category.Name}
              key={i}
            />)):
            <Picker.Item
              label={"אין תוצאות"}
            // value={"אין תוצאות"}
              key={0}
            />
          // categories.map((category, i) => (
          //   <Picker.Item
          //     label={category.Name}
          //     value={category.Name}
          //     key={i}
          //   />
          // ))
          }
        </Picker> </View>

{ShowFilter&&<View>
        <Picker
          selectedValue={sorts}
        // onValueChange={(value) => handleInputChange("sort", value)}
        >
          {sorts.map((s) => (
            <Picker.Item label={s} value={s} key={s} />
          ))}
        </Picker>
     
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
            <Text>מין מטפל:</Text>
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
      </View>}

      <View>
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
        {response.length > 0 && (
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
      <ScrollView>
        {response &&
          response.length > 0 &&
          response.map((x, i) => {
            return (
              <View key={i}>
                <ClientSearchReasultCard
                  Is_client_house={x.Is_client_house}
                  End_time={x.End_time}
                  Start_time={x.Start_time}
                  Date={x.Date}
                  Number_appointment={x.Number_appointment}
                  Business_Number={x.Business_Number}
                  AddressStreet={x.AddressStreet}
                  AddressHouseNumber={x.AddressHouseNumber}
                  AddressCity={x.AddressCity}
                  ClientIDnumber={ClientIDnumber}
                  Appointment_status={x.Appointment_status}
                //apo={apo}
                />
              </View>
            );
          })}
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  inp: {
      flexDirection: 'row',
      padding: 15,
      justifyContent: 'center',
      width: '80%',
      borderRadius: 25,
      height: 50,
      marginBottom: 20,
      backgroundColor: '#fffaf0',


  },
  textInputS: (borderColor) => {
      return {
          // height: 40,
          // width: "80%",
          // margin: 10,
          borderWidth: 1,
          // padding: 10,
          color: '#808080',
          borderColor: borderColor ? 'green' : 'red',
          // height: 50,
          fontSize: 25,
          textAlign: 'right',
          fontWeight: 'bold',
          opacity: 0.5,
      }

  },
  title: {
      padding: 10,
      justifyContent: 'center',
      textAlign: 'center',
      fontSize: 25,
      color: '#fff',
      fontWeight: 'bold',

  },

  titp: {
      textAlign: 'center',
      color: 'red',
      fontSize: 17,
  },

  container: {
      flex: 12,
      // backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#9acd32',
      padding: 50
  },

  text: {


      textAlign: 'right',
      paddingBottom: 10,

  },
  but: {
      textAlign: 'center',
      borderRadius: 25,
      height: 50,
      marginBottom: 20,
      backgroundColor: '#ff69b4',
      padding: 15,
      margin: 10,
      marginTop: 10,

  },
  thachtext: {
      textAlign: 'center',
      color: '#fffaf0',
      fontSize: 25,
      fontWeight: 'bold',
      //borderRadius: 10,
      height: 50,
      // marginBottom: 20,
      // backgroundColor: '#fffaf0',
      // padding: 15,
      // margin: 10,
      // marginTop: 20,
  },

});


