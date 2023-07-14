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
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
        console.log("yes", "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh", result);
        SetBusinessRankArr(result);
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
          console.log(i + ": " + JSON.stringify(result.diary[i].time));
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
        for (let i = 0; i < ranges.length - 1; i++) {
          const currentRangeEnd = ranges[i][1];
          const nextRangeStart = ranges[i + 1][0];

          if (hour > currentRangeEnd && hour < nextRangeStart) {
            return true;
          }
        }
        return false;
      });

      return missingHours;
    }
    const betweenHours = getMissingHours(result.diary[0].time);
    console.log("betweenHours: " + betweenHours); // [11,12,13]
    // firstHour.push(betweenHours)
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
    console.log("firstHour: " + firstHour);
    console.log("endHour: " + endHour);
    let str = "";
    console.log("result.diary[i].time)" + result.diary[0].time + " - " + result.diary[0].time.length);
    if (result.diary[0].time.length == 1) { //בודק האם מערך השעות מפוצל (גדול מ-1)
      console.log("if " + result.id);
      for (let i = 0; i < hours.length; i++) {
        if (!firstHour.includes(hours[i])) {
          if (str === "") {
            str = `${hours[i]}`
          }
        }
        else {
          if (str !== "") {
            str += `-${hours[i]}`
            tempArr.push(str);
            str = "";
          }
        }
      }
    }
    else {
      // console.log("else " + result.id);
      // for (let i = 0; i < hours.length; i++) {
      //   console.log(i + " " + hours[i] + "str= " + str);
      //   if (!firstHour.includes(hours[i])) {
      //     if (!endHour.includes(hours[i])) {
      //       if (!betweenHours.includes(hours[i])) {
      //         if (str === "") {
      //           console.log(i + " :" + hours[i]);
      //           str = `${hours[i]}`;
      //         }
      //       }
      //     }
      //   }
      //   else if (str !== "" || betweenHours.includes(hours[i] + duration)) {
      //     console.log("else if : " + hours[i]);
      //     str += `-${hours[i]}`;
      //     tempArr.push(str);
      //     str = "";
      //   }
      //   if (str === "" && hours[i] === hours[hours.length - 1] && !endHour.includes(hours[hours.length - 1])) {
      //     console.log("else if 3: " + hours[i]);
      //     str = `${hours[i]}-${hours[hours.length - 1] + duration}`
      //     tempArr.push(str);
      //   }
      //   if ((endHour.includes(hours[i]) && str === "") &&
      //     !betweenHours.includes(hours[i] + duration) && !firstHour.includes(hours[i])) {
      //     console.log("last if");
      //     console.log(i + " :" + hours[i]);
      //     str = `${hours[i]}`;
      //   }
      // }

      // if (str !== "") {
      //   console.log(str + " = last hour to add" + hours[hours.length - 1] + duration);
      //   str += `-${hours[hours.length - 1] + duration}`;
      //   tempArr.push(str);
      // }
      let newArray = hours.filter((num) => !betweenHours.includes(num)); // filter out numbers present in temp array}
      // let newArray = hours; // filter out numbers present in temp array}
  console.log("hours after filter between numbers: "+ newArray);
  let finalArray = [];
  
  for (let i = 0; i < newArray.length; i++) {
    if (firstHour.includes(newArray[i])){
      const o = occupiedHoursWithGap.find(x => x.time === newArray[i]);
      if(o && newArray[i+1] && newArray[i]+o.gap === newArray[i+1]){
        //don't include this number in the finalArray
      }
      else if(o && newArray[i+1]){
        tempArr.push(newArray[i]+o.gap);
      }
      else{
        tempArr.push(newArray[i]);
      }
    } 
    else{
      tempArr.push(newArray[i]);
    }
  }

    }


    console.log("final str= " + str);
    console.log(
      `Diary of ${result.id}: ` + tempArr + " length: " + tempArr.length
    );

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

  function formatDuration(duration) {
    const hours = Math.floor(duration);
    const minutes = (duration - hours) * 60;
    let hoursText = 'שעה';
    if (hours > 1) {
      hoursText = hours === 2 ? 'שעתיים' : hours + ' שעות';
    }
    return `${hoursText} ${minutes > 0 ? `ו-${minutes} דקות` : ''}`;
  }
  return (
    <View style={styles.container} key={result.id}>
      
      <Text style={styles.titleText}>
        {result.businessName},{result.city}
      </Text>

      {/* <Text style={styles.text}> {result.Is_client_house === "YES" ? "טיפול בבית הלקוח" : "טיפול בבית העסק"} </Text> */}

      {result.Is_client_house === "YES" || "YES       " ? (
        <View style={styles.iconContainer}>
          <Icon name="home" size={25} color="rgb(92, 71, 205)" style={styles.icon}/>
          <Text style={styles.text}>טיפול בבית הלקוח</Text>
        </View>
      ) : (
        <>
          <Icon name="briefcase" size={25} color="rgb(92, 71, 205)" style={styles.icon} />
          טיפול בבית העסק
        </>
      )}
   {result.typeTritment.map((t, i) => (
  <View key={i}>
    <View style={styles.iconContainer}>
      <MaterialCommunityIcons name="cash-multiple" size={25} color="rgb(92, 71, 205)" style={styles.icon}/>
      <Text style={styles.text}>מחיר: {t.price} ₪</Text>
    </View>
    <View style={styles.iconContainer}>
      <MaterialCommunityIcons name="clock-outline" size={25} color="rgb(92, 71, 205)" style={styles.icon}/>
      <Text style={styles.text}>זמן הטיפול: {formatDuration(t.duration)}</Text>
    </View>
  </View>
))}
      <Text style={styles.titleText}>שעות פנויות: </Text>
      {newArr.map((d, index) => (
        <Text style={styles.text} key={index}>
          {d}
        </Text>
      ))}
      {/* <Text style={styles.titleText}>טיפול:</Text> */}

      <View style={styles.buttonContainer}>
  <View style={styles.buttonContent}>
    <MaterialCommunityIcons name="store" size={25} color="rgb(92, 71, 205)" />
    <Button
    color={"rgb(92, 71, 205)"}
      title="צפה בפרופיל העסק"
      buttonStyle={styles.buttonStyle}
      titleStyle={styles.buttonTitle}
      onPress={handleBusinessProfilePOPUP}
    />
  </View>
  <View style={styles.buttonContent}>
    <MaterialCommunityIcons name="calendar-clock" size={24} color="rgb(92, 71, 205)" />
    <Button
    color={"rgb(92, 71, 205)"}
      title="הזמן תור"
      buttonStyle={styles.buttonStyle}
      titleStyle={styles.buttonTitle}
      onPress={() => handleBusinessSchedulePOPUP()}
    />
  </View>
</View>
      {businessSchedulePOPUP && !businessProfilePOPUP && (
        <BusinessSchedule
          businessNumber={result.id}
          hours={newArr}
          duration={duration}
          Type_Treatment_Number={treatmentNumber}
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
    textAlign: "left",
    backgroundColor: "#F5FCFF",
    padding: 20,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    margin: 10,
  },
  titleText: {
    textAlign: "left",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  text: {
    textAlign: "left",
    fontSize: 16,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10, // Adjust the margin as needed
  },
  buttonStyle: {
    fontSize: 18, // שינוי הגודל
    color: 'white', // שינוי הצבע
    fontWeight: 'bold', // הופך את הטקסט לבולט
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // צללה שחורה
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  buttonTitle: {
    fontSize: 18, // שינוי הגודל
    color: 'white', // שינוי הצבע
    fontWeight: 'bold', // הופך את הטקסט לבולט
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // צללה שחורה
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  iconContainer: {
    flexDirection: "row",
  },
  icon: {
    marginRight: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
