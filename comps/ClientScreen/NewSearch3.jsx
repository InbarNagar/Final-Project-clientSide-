import { React, useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { GetBusinessDiary } from "../obj/FunctionAPICode";
import Data from "./Data.json";
import BusinessProfilePOPUP from "./BusinessProfilePOPUP";
import { ScrollView } from "react-native-gesture-handler";
import NewSearchResultsCard from "./NewSearchResultsCard";

export default function NewSearch3() {
  const [businessProfilePOPUP, SetBusinessProfilePOPUP] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [businessRankArr, SetBusinessRankArr] = useState();
  const [appointment, SetAppointment] = useState([]);
  const [treatments, SetTreatments] = useState([]);
  const [hours, SetHours] = useState([]);

  const [result, SetResult] = useState([]);
  //   useEffect(() => {
  //     let prevNumber = null;
  //     let newAppointments = r.apointemnt.reduce((acc, a) => {
  //       if (a.date === today && a.number !== prevNumber) {
  //         prevNumber = a.number;
  //         acc.push(a.time);
  //       }
  //       return acc;
  //     }, []);

  //     SetAppointment(prevArray => [...prevArray, ...newAppointments]);
  //   console.log(appointment);
  //   }, [r.apointemnt, today]); // dependencies

  useEffect(() => {
    const searchObj = {
      AddressCity: "חיפה",
      TreatmentNumber: "3",
      gender: "F",
      Is_client_house: "YES",
    };
    const data = GetData(Data);
    console.log(JSON.stringify(data));
    SetResult(data);
    // NewSearchPost(searchObj).then(
    //     (result) => {
    //       console.log("yes", result.data);
    //       if (result.data) {
    //         SetResponse(result.data);
    //         console.log("amount of results: " + result.data.length);
    //         //מפעיל את הכפתור תצוגת מפה
    //       }
    //     },
    //     (error) => {
    //       console.log("error", error);
    //     }
    //   );
  }, []);
  function btnBookApiontment() {
    console.log("book appointment");
  }
  function handleBusinessProfilePOPUP() {
    console.log("open pop-up window");
    setModalVisible(!modalVisible);
    console.log("modalVisible - ", modalVisible);
    SetBusinessProfilePOPUP(!businessProfilePOPUP);
    console.log("businessProfilePOPUP - ", businessProfilePOPUP);
    console.log("business number: " + JSON.stringify(Business_Number));
  }
  function GetData(data) {
    let res = [];
    let obj = {
      id: data[0].Business_Number,
      businessName: data[0].Name,
      streetAddress: data[0].AddressStreet,
      houseNumber: data[0].AddressHouseNumber,
      city: data[0].AddressCity,
      about: data[0].about,
      phone: data[0].phone,
      facebook: data[0].Facebook_link,
      instagram: data[0].Instagram_link,
      diary: [
        {
          date: data[0].Date1,
          time: [data[0].Start_time1 + "-" + data[0].End_time1],
        },
        // {
        //     date:'2023-06-03',
        //     time:['10-14','17-21']
        // }
      ],
      typeTritment: [
        {
          duration: data[0].Treatment_duration,
          type: data[0].Type_treatment_Number,
          price: data[0].Price,
        },
        // {
        //     duration:'2',
        //     type:'hair'
        // }
      ],
      apointemnt: [
        {
          number: data[0].Number_appointment,
          status: data[0].Appointment_status,
          date: data[0].Date,
          time: [data[0].Start_Hour + "-" + data[0].End_Hour],
        },
      ],
    };
    let typeTritment = [data[0].Type_treatment_Number];
    for (let i = 1; i < data.length; i++) {
      if (data[i].Business_Number == data[i - 1].Business_Number) {
        //בודק האם העסק שווה לקודם
        if (data[i].Date1 == obj.diary[obj.diary.length - 1].date) {
          // בודק האם יש עוד טווח שעות שונה באותו תאריך
          if (
            !obj.diary[obj.diary.length - 1].time.includes(
              data[i].Start_time1 + "-" + data[i].End_time1
            )
          ) {
            obj.diary[obj.diary.length - 1].time.push(
              data[i].Start_time1 + "-" + data[i].End_time1
            );
          }
        } else {
          // פותח מיקום חדש במערך לתאריך חדש
          obj.diary.push({
            date: data[i].Date1,
            time: [data[i].Start_time1 + "-" + data[i].End_time1],
          });
        }
        if (
          data[i].Type_treatment_Number !=
            obj.typeTritment[obj.typeTritment.length - 1].type &&
          !typeTritment.includes(data[i].Type_treatment_Number)
        ) {
          //אם הסוג טיפול שונה מקודמו
          typeTritment.push(data[i].Type_treatment_Number);
          obj.typeTritment.push({
            duration: data[i].Treatment_duration,
            type: data[i].Type_treatment_Number,
            price: data[i].Price,
          });
        }
        if (
          data[i].Number_appointment !=
          obj.apointemnt[obj.apointemnt.length - 1].number
        ) {
          //אם המספר תור שונה מקודמו
          obj.apointemnt.push({
            number: data[i].Number_appointment,
            status: data[i].Appointment_status,
            date: data[i].Date,
            time: data[i].Start_Hour + "-" + data[i].End_Hour,
          });
        }
      } else {
        res.push(obj);
        typeTritment = [data[i].Type_treatment_Number];
        obj = {
          id: data[i].Business_Number,
          businessName: data[i].Name,
          streetAddress: data[i].AddressStreet,
          houseNumber: data[i].AddressHouseNumber,
          city: data[i].AddressCity,
          about: data[i].about,
          phone: data[i].phone,
          facebook: data[i].Facebook_link,
          instagram: data[i].Instagram_link,
          diary: [
            {
              date: data[i].Date1,
              time: [data[i].Start_time1 + "-" + data[i].End_time1],
            },
          ],
          typeTritment: [
            {
              duration: data[i].Treatment_duration,
              type: data[i].Type_treatment_Number,
              price: data[i].Price,
            },
          ],
          apointemnt: [
            {
              number: data[i].Number_appointment,
              status: data[i].Appointment_status,
              date: data[i].Date,
              time: [data[i].Start_Hour + "-" + data[i].End_Hour],
            },
          ],
        };
      }
    }
    res.push(obj);
    console.log(JSON.stringify(res[0].diary[2].time));
    SetResult(res);
    return res;
  }

  return (
    <ScrollView>
      {result.map((r) => {
        let today = "2023-06-02T00:00:00";
        let prevNumber=null;
        return(
        <View style={styles.container} key={r.id}>
          <Text style={styles.titleText}>
            פרטי עסק: {r.businessName}, {r.city}
          </Text>
          <Text style={styles.titleText}>שעות פנויות: </Text>
          {r.diary.map((d, index) => {
            if (d.date === today ) {
              return (
                <Text style={styles.text} key={index}>
                  {d.time.join(", ")}
                </Text>
              );
            }
            return null;
          })}
          <Text style={styles.titleText}>טיפול:</Text>
          {r.typeTritment.map((t, i) => (
            <Text style={styles.text} key={i}>
              מחיר: {t.price} סוג טיפול: {t.type} זמן: {t.duration}
            </Text>
          ))}
          <Text style={styles.titleText}>תורים תפוסים:</Text>
            {r.apointemnt.map((a, i) => {
              console.log(a.date +' '+today);
              if (a.date === today && a.number !== prevNumber) {
                prevNumber = a.number;
                return (
                  <Text style={styles.text} key={i}>
                    שעה: {a.time} 
                  </Text>
                );
              }
              console.log("returning null");
              return null;
            })}
          <View style={styles.buttonContainer}>
              <Button
                title="צפה בפרופיל העסק"
                buttonStyle={styles.buttonStyle}
                titleStyle={styles.buttonTitle}
                onPress={handleBusinessProfilePOPUP}
              />
              <Button
                title="הזמן תור"
                buttonStyle={styles.buttonStyle}
                titleStyle={styles.buttonTitle}
                onPress={() => {btnBookApiontment()}}
              />
            </View>
            {businessProfilePOPUP && (
              <BusinessProfilePOPUP
                businessRankArr={businessRankArr}
                isVisible={modalVisible}
                onClose={handleBusinessProfilePOPUP}
                Business_Number={JSON.stringify(r.id)}
              />
            )} 
        </View>)
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
    padding: 20,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    margin: 10,
    maxHeight: '80%',  // Add a maxHeight property
    overflow: 'scroll',  // If content exceeds the maxHeight, allow scrolling
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    textAlign: "right",
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonStyle: {
    backgroundColor: "rgb(92, 71, 205)",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 30,
    width: "45%",
  },
  buttonTitle: {
    fontWeight: "bold",
    color: "white",
  },
});
