import React, { useContext, useEffect, useState } from "react";
import { Alert,View, Button, Text, StyleSheet } from "react-native";
import { UserContext } from "../UserDietails";
import BusinessProfilePOPUP from "./BusinessProfilePOPUP";
import { AllApointemtDetailes,AllBusinessReviews, AppointmentToClient } from "../obj/FunctionAPICode";
import BusinessSchedule from "./BusinessSchedule";
const AvailableAppointmentToBook = (props) => {

  const { userDetails, setUserDetails } = useContext(UserContext);
  const { result } = props;
  const [businessProfilePOPUP, SetBusinessProfilePOPUP] = useState(false);
  const [modalVisible, SetModalVisible] = useState(false);
  const [bookModalVisible, SetBookModalVisible] = useState(false);
  const [businessSchedulePOPUP, SetBusinessSchedulePOPUP] = useState(false);
  const [bookedAppointment, SetBookedAppointment] = useState([]);
  const [diary, SetDiary] = useState([]);
  const [businessRankArr, SetBusinessRankArr] = useState();
  const [minNumber, SetMinNumber] = useState();
  const [maxNumber, SetMaxNumber] = useState();
const date= result.diary[0].date;
  useEffect(() => {
    let appArr = [result.apointemnt[0].time];
    console.log("result.apointemnt[0].time" + result.apointemnt[0].time);
    for (let i = 1; i < result.apointemnt.length; i++) {
      console.log("loop number: " + i);
      if (!appArr.includes(result.apointemnt[i].time)) {
        appArr.push(result.apointemnt[i].time);
        console.log(result.apointemnt[i].time);
      }
    }
//     let newArr = [];
// appArr.forEach(time => {
//   newArr.push(parseInt(time.split("-")[0]));
// });
// console.log(newArr);
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
    console.log(result.diary);
    let diaryArr = [result.diary[0].time];
    for (let i = 1; i < result.diary.length; i++) {
      if (result.diary[i].date ===JSON.stringify(result.diary[i - 1].date)) {
        if (!diaryArr.includes(JSON.stringify(result.diary[i].time))) {
          diaryArr.push(JSON.stringify(result.diary[i].time));
          console.log(JSON.stringify(result.diary[i].time));
        }
      }
    }
    console.log("diaryArr: " + diaryArr);
    let minNumber = 24;
    let maxNumber = 0;
    //מפצל את המערך שהתקבל כך שכל מספר יוצג בנפרד
    let tempArr = diaryArr.flatMap((array) =>
      array.flatMap((item) => item.split("-").map(Number))
    );
    console.log(tempArr);
    for (let i = 0; i < tempArr.length; i++) {
      console.log(i + ": " + tempArr[i]);
      if (tempArr[i] > maxNumber) {
        maxNumber = tempArr[i];
      }
      if (tempArr[i] < minNumber) {
        minNumber = tempArr[i];
      }
    }
    console.log("min: " + minNumber + "max: " + maxNumber);
    SetMaxNumber(maxNumber);
    SetMinNumber(minNumber);
    SetDiary(diaryArr);
  }, []);

  
  function extractBeforeHyphen(str) {
    console.log("extractBeforeHyphen " + str);
    let result = "";
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "-") {
        console.log("result: " + result);
        return result;
      }
      result += str[i];
    }
  }

  function handleBusinessProfilePOPUP() {
    console.log("open pop-up window");
    SetModalVisible(!modalVisible);
    console.log("modalVisible - ", modalVisible);
    SetBusinessProfilePOPUP(!businessProfilePOPUP);
    console.log("businessProfilePOPUP - ", businessProfilePOPUP);
    console.log("business number: " + JSON.stringify(result.id));
  }

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
      <Text style={styles.titleText}>שעות פנויות: </Text>
      {result.diary.map((d, index) => {
        console.log(
          "booked appointment: " + bookedAppointment,
          "Diary: " + diary
        );
        if (d.date === today && prevNumber !== JSON.stringify(d.time)) {
          prevNumber = JSON.stringify(d.time);
          return (
            <Text style={styles.text} key={index}>
              {d.time.join(", ")}
            </Text>
          );
        }
        return null;
      })}
      <Text style={styles.titleText}>טיפול:</Text>
      {result.typeTritment.map((t, i) => (
        <Text style={styles.text} key={i}>
          מחיר: {t.price} סוג טיפול: {t.type} זמן: {t.duration}
        </Text>
      ))}
      <Text style={styles.titleText}>תורים תפוסים:</Text>
      {result.apointemnt.map((a, i) => {
        console.log(a.date + " " + today);
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
          onPress={() => handleBusinessSchedulePOPUP()}
        />
      </View>
      {businessSchedulePOPUP && !businessProfilePOPUP && (
        <BusinessSchedule
          businessNumber={result.id}
          duration={result.typeTritment[0].duration}
          min={minNumber}
          max={maxNumber}
          booked={bookedAppointment}
          date={date}
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
    backgroundColor: "#F5FCFF",
    padding: 20,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    margin: 10,
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
