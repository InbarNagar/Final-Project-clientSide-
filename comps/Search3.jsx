import { React, useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { Search_post, Treatment_type_GET } from "./obj/FunctionAPICode";
import moment from "moment";
// import LocationPicker from './LocationHandler/LocationPicker';

export default function Search3() {
 const[AddressCity,setAddressCity]=useState('')
 const [NameTreatment,setNameTreatment]=useState('')
 const [gender,setGender]=useState('')
 const [Is_client_house,setIs_client_house]=useState('')
const [response,SetResponse]=useState([])
  const[categories,setCategories]=useState([]);
  const sorts = ["דירוג גבוהה תחילה", "דירוג נמוך תחילה"];
  
  function btnSearch() {
    const obj={
      AddressCity:AddressCity,
      NameTreatment: NameTreatment,
      // sort: "דירוג גבוהה תחילה",
      gender: gender,
      Is_client_house: Is_client_house,
    }
    // SetResponse([{"Appointment_status": null, "Business_Number": 1, "Date": "2023-04-09T00:00:00", "End_time": "12:30:00", "Is_client_house": "YES       ", "Number_appointment": 4, "Start_time": "12:00:00"}, {"Appointment_status": null, "Business_Number": 2, "Date": "2023-04-10T00:00:00", "End_time": "13:30:00", "Is_client_house": "YES       ", "Number_appointment": 6, "Start_time": "13:00:00"}])
    Search_post(obj).then(
      (result) => {
        console.log("yes", result.data);
        if(result.data){
          SetResponse(result.data)
        }
      },
      (error) => {
        console.log("error", error);
      }
    );
  }
  useEffect(()=>{
    Treatment_type_GET().then((result) => {
    console.log('yes', result)
   if(result){
    let temp=result.map(x=>x.Name)
    setCategories(temp)
   }
  

  }, (error) => {
    console.log('error', error)
  })
},[])
  
  return (
    <View>
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
            onPress={() => setGender( "M")}
          />
        </View>
        <View>
          <Text>נקבה</Text>
          <RadioButton
            value="F"
            status={gender === "F" ? "checked" : "unchecked"}
            onPress={() => setGender( "F")}
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
            onPress={() => setIs_client_house( "YES")}
          />
        </View>
        <View>
          <Text>לא</Text>
          <RadioButton
            value="NO"
            status={Is_client_house === "NO" ? "checked" : "unchecked"}
            onPress={() => setIs_client_house( "NO")}
          />
        </View>
      </View>
      <Button title="חפש" onPress={btnSearch} />
      <View>
        {response&&response.length>0&&
        response.map((x,i)=>{
          return(<View key={i}>
<Text>{x.Start_time}</Text>
<Text>{x.Number_appointment}</Text>
<Text>{x.Is_client_house}</Text>
<Text>{x.Is_client_house}</Text>
<Text>{moment(x.End_time).format('DD-MM-YYYY')}</Text>
<Text>{x.Date}</Text>
</View>
          )
        })}
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({
//   sortView: {
//     flexDirection: "row-reverse",
//     justifyContent: "space-between",
//   },
//   inp: {
//     flexDirection: "row",
//     padding: 10,
//     justifyContent: "space-between",
//     color: "red",
//   },
//   resultsView: {
//     flexDirection: "column",
//     width: "100%",
//   },
//   fixToText: {
//     flexDirection: "row-reverse",
//     justifyContent: "space-end",
//   },
// });
