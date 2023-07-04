import React, { useContext, useEffect, useState } from "react";
import { Alert, View, Button, Text, StyleSheet } from "react-native";
import { UserContext } from "../UserDietails";
import BusinessProfilePOPUP from "./BusinessProfilePOPUP";
import {
  AllApointemtDetailes,
  AllBusinessReviews,
  AppointmentToClient,
} from "../obj/FunctionAPICode";
import BusinessSchedule from "./BusinessSchedule";
import moment from "moment";
const AvailableAppointmentToBook = (props) => {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const { result, treatmentNumber } = props;
  const [businessProfilePOPUP, SetBusinessProfilePOPUP] = useState(false);
  const [modalVisible, SetModalVisible] = useState(false);
  const [bookModalVisible, SetBookModalVisible] = useState(false);
  const [businessSchedulePOPUP, SetBusinessSchedulePOPUP] = useState(false);
  const [bookedAppointment, SetBookedAppointment] = useState([]);
  const [diary, SetDiary] = useState([]);
  const [businessRankArr, SetBusinessRankArr] = useState();
  const [minNumber, SetMinNumber] = useState();
  const [maxNumber, SetMaxNumber] = useState();
  const duration = result.typeTritment[0].duration; //משך זמן תור
  const [newArr, SetNewArr] = useState([]);
  // const newArr = [];
  console.log("duration: " + duration);
  // חדש לפי הצגת שעות פנויות בלבד
  const [openHours, SetOpenHours] = useState();
  const [date, SetDate] = useState(
    moment(result.diary[0].date).format("YYYY-MM-DD")
  );
  useEffect(() => {
    console.log("result: " + JSON.stringify(result));
    console.log("result.diary[0].date: " + result.diary[0].date);
    console.log("treatment: " + treatmentNumber);
    let appArr = [result.apointemnt[0].time]; //תורים תפוסים
    let firstHour = [
      parseInt(result.apointemnt[0].time.toString().split("-")[0]),
    ];
    let endHour = [
      parseInt(result.apointemnt[0].time.toString().split("-")[1]),
    ];
    console.log("firstHour: " + firstHour);
    console.log("endHour: " + endHour);
    console.log("result.apointemnt[0].time" + result.apointemnt[0].time);
    for (let i = 1; i < result.apointemnt.length; i++) {
      console.log("loop number: " + i);
      if (!appArr.includes(result.apointemnt[i].time)) {
        firstHour.push(
          parseInt(result.apointemnt[i].time.toString().split("-")[0])
        );
        endHour.push(
          parseInt(result.apointemnt[i].time.toString().split("-")[1])
        );
        appArr.push(result.apointemnt[i].time);
        console.log(result.apointemnt[i].time);
      }
    }
    console.log("appArr after the loop: " + appArr);
    console.log("firstHour after the loop: " + firstHour);
    console.log("endHour after the loop: " + endHour);
    /// סוף אזור חדש
    SetBookedAppointment(appArr);
    console.log("appArr: " + appArr);
    AllBusinessReviews(result.id).then(
      (result) => {
        console.log("yes", result.data);
        SetBusinessRankArr(result.data);
      },
      (error) => {
        console.log("error", error);
      }
    );
    console.log("rendering: " + result.id);
    let today1 = "2023-06-02T00:00:00"; //הגדרת תאריך של היום
    let minNumber = 24;
    let maxNumber = 0;
    let diaryArr = [];
    for (let i = 0; i < result.diary.length; i++) {
      //רץ על היומן
      if (result.diary[i].date === today1) {
        // אם התאריך במקום שווה לתאריך של היום
        if (!diaryArr.includes(JSON.stringify(result.diary[i].time))) {
          // אם הזמן לא קיים במערך
          for (let j = 0; j < result.diary[i].time.length; j++) {
            //לולאה שבודקת מינימום מקסימום
            const [start, end] = result.diary[i].time[j].split("-");
            const startNumber = parseInt(start);
            const endNumber = parseInt(end);
            if (startNumber < minNumber) {
              // במידה והתנאי מתקיים המינימום יהיה המספר
              minNumber = startNumber;
            }
            if (endNumber > maxNumber) {
              // אם התנאי מתקיים המקסימום יהיה המספר
              maxNumber = endNumber;
            }
          }
          diaryArr.push(JSON.stringify(result.diary[i].time)); //דוחף למערך החדש את השעות
          console.log(i+ ": "+JSON.stringify(result.diary[i].time));
        }
      }
    }
    function getMissingHours(times) {
      // Split each string into start and end times
      const ranges = times.map(time => time.split('-').map(Number));
    
      // Create an array of all hours
      const allHours = Array.from({ length: 24 }, (_, i) => i);
    
      // Filter out hours that are within the ranges
      const missingHours = allHours.filter(hour => {
        for(let i = 0; i < ranges.length - 1; i++) {
          const currentRangeEnd = ranges[i][1];
          const nextRangeStart = ranges[i+1][0];
    
          if(hour > currentRangeEnd && hour < nextRangeStart) {
            return true;
          }
        }
        return false;
      });
    
      return missingHours;
    }
    const betweenHours=getMissingHours(result.diary[0].time);
    console.log("betweenHours: "+betweenHours); // [11,12,13]
    firstHour.push(betweenHours)
    console.log("Minimum number:", minNumber);
    console.log("Maximum number:", maxNumber);
    const hours = Array.from(
      { length: Math.ceil((maxNumber - minNumber) / duration) },
      (v, i) => minNumber + i * duration
    );
    console.log("hours (" + hours.length + ") : " + hours);
    
    const HoursAndGap = [];
    function getOccupiedHoursWithGap(firstHour, endHour) {
      let occupiedHoursWithGap = [];

      for (let i = 0; i < firstHour.length; i++) {
        let obj = {
          startHour: firstHour[i],
          gap: endHour[i] - firstHour[i],
        };

        occupiedHoursWithGap.push(obj);
      }

      HoursAndGap.push(...occupiedHoursWithGap); // Add the occupiedHoursWithGap to the HoursAndGap array

      return occupiedHoursWithGap;
    }
    const occupiedHoursWithGap = getOccupiedHoursWithGap(firstHour, endHour);
    console.log(
      "occupiedHoursWithGap :" + JSON.stringify(occupiedHoursWithGap)
    );

    let tempArr = [...newArr]; // make a copy of newArr
    // ...
    console.log("hours : " + hours);
    console.log("firstHour: "+firstHour);
    let str="";
    console.log("result.diary[i].time)" + result.diary[0].time +" - "+result.diary[0].time.length);
    if(result.diary[0].time.length==1){ //בודק האם מערך השעות מפוצל (גדול מ-1)
      console.log("if "+result.id);
    for (let i = 0; i < hours.length; i++) {
     if(!firstHour.includes(hours[i])) {
      if(str===""){
        str=`${hours[i]}`
      }}
      else{
        if(str!==""){
          str+=`-${hours[i]}`
          tempArr.push(str);
          str="";
        }
     }
    }}
    else{
      console.log("else "+result.id);
     tempArr= getUnusedIntervals(hours,firstHour,endHour,betweenHours)
    }
    console.log(
      `Diary of ${result.id}: ` + tempArr + " length: " + tempArr.length
    );

    function getUnusedIntervals(hours, start, end, between) {
      let intervals = [];
      let usedHours = new Set();
  
      for (let i = 0; i < start.length; i++) {
          for (let j = start[i]; j <= end[i]; j++) {
              usedHours.add(j);
          }
      }
  
      for (let hour of between) {
          usedHours.add(hour);
      }
  
      for (let i = 0; i < hours.length; i++) {
          if (!usedHours.has(hours[i])) {
              let intervalStart = hours[i];
  
              while (i < hours.length && !usedHours.has(hours[i])) {
                  i++;
              }
              
              let intervalEnd = i === hours.length ? 20 : hours[i];
  
              intervals.push(`${intervalStart}-${intervalEnd}`);
          }
      }
  
      return intervals;
  }
    // update newArr state variable with new values
    SetNewArr(tempArr);
    console.log("array of diary to print: " + typeof newArr[1]);
    SetDiary(diaryArr);
  }, [result]);

  //הצגה של פרופיל עסק
  function handleBusinessProfilePOPUP() {
    console.log("open pop-up window");
    SetModalVisible(!modalVisible);
    console.log("modalVisible - ", modalVisible);
    SetBusinessProfilePOPUP(!businessProfilePOPUP);
    console.log("businessProfilePOPUP - ", businessProfilePOPUP);
    console.log("business number: " + JSON.stringify(result.id));
  }
  //הצגה של יומן עסק
  function handleBusinessSchedulePOPUP() {
    console.log("book appointment POPUP");
    SetBookModalVisible(!bookModalVisible);
    console.log("modalVisible - ", bookModalVisible);
    SetBusinessSchedulePOPUP(!businessSchedulePOPUP);
    console.log("businessProfilePOPUP - ", businessSchedulePOPUP);
    console.log("business number: " + JSON.stringify(result.id));
  }
  let today = "2023-06-02T00:00:00";
  let prevNumber = null;
  return (
    <View style={styles.container} key={result.id}>
      <Text style={styles.titleText}>
        פרטי עסק: {result.businessName}, {result.city}
      </Text>
      <Text> {result.Is_client_house === "YES" ? "טיפול ביתי" : ""} </Text>
      <Text style={styles.titleText}>שעות פנויות: </Text>
      {newArr.map((d, index) => (
        <Text style={styles.text} key={index}>
          {d}
        </Text>
      ))}
      <Text style={styles.titleText}>טיפול:</Text>
      {result.typeTritment.map((t, i) => (
        <Text style={styles.text} key={i}>
          מחיר: {t.price} זמן: {t.duration}
        </Text>
      ))}
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
          onPress={() => handleBusinessSchedulePOPUP()}
        />
      </View>
      {businessSchedulePOPUP && !businessProfilePOPUP && (
        <BusinessSchedule
          businessNumber={result.id}
          hours={newArr}
          typeTreatmentNumber={treatmentNumber}
          // duration={result.typeTritment[0].duration}
          // min={minNumber}
          // max={maxNumber}
          // booked={bookedAppointment}
          date={date}
          Is_client_house={result.Is_client_house}
          isVisible={bookModalVisible}
          onClose={handleBusinessSchedulePOPUP}
        />
      )}
      {businessProfilePOPUP && !businessSchedulePOPUP && (
        <BusinessProfilePOPUP
          businessRankArr={businessRankArr}
          isVisible={modalVisible}
          onClose={handleBusinessProfilePOPUP}
          Business_Number={JSON.stringify(result.id)}
        />
      )}
    </View>
  );
};
export default AvailableAppointmentToBook;

const styles = StyleSheet.create({
  container: {
    textAlign: "right",
    backgroundColor: "#F5FCFF",
    padding: 20,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    margin: 10,
  },
  titleText: {
    textAlign: "right",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
    marginVertical: 10,
  },
  text: {
    textAlign: "right",
    fontSize: 16,
    textAlign: "right",
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10, // Adjust the margin as needed
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
