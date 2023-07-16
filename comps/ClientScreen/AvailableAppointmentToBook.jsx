import React, { useContext, useEffect, useState } from "react";
import { Alert, View, Button, Text, StyleSheet,TouchableOpacity } from "react-native";
import { UserContext } from "../UserDietails";
import BusinessProfilePOPUP from "./BusinessProfilePOPUP";
import {
  AllApointemtDetailes,
  AllBusinessReviews,
  AppointmentToClient,
  NewAppointmentToClient,
  Post_SendPushNotification,
} from "../obj/FunctionAPICode";
import BusinessSchedule from "./BusinessSchedule";
import moment from "moment";
const AvailableAppointmentToBook = (props) => {
  const [finalHours, setFinalHours] = useState([]); // שומר את המערך הסופי

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

  function getMissingHours(times) {
    // Split each string into start and end times
    const ranges = times.map((time) => time.split("-").map(Number));

    // Create an array of all hours
    const allHours = Array.from({ length: 24 }, (_, i) => i);

    // Filter out hours that are within the ranges
    const missingHours =
      allHours &&
      allHours.filter((hour) => {
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
  useEffect(() => {
    console.log(
      `date check=  ${moment(result.apointemnt[0].date).format(
        "yyyy-MM-DD"
      )} == ${moment(new Date()).format("yyyy-MM-DD")} : ${
        moment(result.apointemnt[0].date).format("yyyy-MM-DD") ==
        moment(new Date()).format("yyyy-MM-DD")
      }`
    );
    let appArr = result.apointemnt[0].number ? result.apointemnt[0].time : []; //תורים תפוסים
    let firstHour = [];
    let endHour = [];
    if (appArr.length > 0) {
      //התחלת תורים תפוסים

      firstHour = [
        parseInt(result.apointemnt[0].time[0].toString().split("-")[0]),
      ];
      //סוף תורים תפוסים
      endHour = [
        parseInt(result.apointemnt[0].time[0].toString().split("-")[1]),
      ];
      console.log("firstHour before:" + firstHour);
      for (let i = 1; i < result.apointemnt[0].time.length; i++) {
        const split_time = result.apointemnt[0].time[i].split("-");
        console.log("");
        !firstHour.includes(split_time[0]) &&
          firstHour.push(parseFloat(split_time[0]));
        !endHour.includes(split_time[1]) &&
          endHour.push(parseFloat(split_time[1]));
      }
      console.log("appointments (" + result.apointemnt[0].time.length + ")");
      // for (let i = 1; i < result.apointemnt.length; i++) {
      //   console.log("loop number: " + i);
      //   if (result.apointemnt[i].number) {
      //     for (let j = 0; j < result.apointemnt[0].time.length; j++) {
      //       const split_time=result.apointemnt[0].time[j].split("-")
      //       console.log("");
      //       firstHour.includes(split_time[0])&&firstHour.push(
      //         parseInt(split_time[0])
      //       );
      //       endHour.includes(split_time[1])&&endHour.push(
      //         parseInt(split_time[1])
      //       );
      //     }

      //     appArr.push(result.apointemnt[i].time);
      //     console.log(result.apointemnt[i].time);
      //   }
      // }
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
    let today1 = moment(new Date()).format("yyyy-MM-DD"); //הגדרת תאריך של היום
    console.log("^^^^^^", today1);
    let minNumber = 24;
    let maxNumber = 0;
    let diaryArr = [];
    if (result.diary && result.diary.length > 0) {
      for (let i = 0; i < result.diary.length; i++) {
        //רץ על היומן
        console.log(result.diary[i].date);
        // if (result.diary[i].date === today1) {
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
        // }
      }
    }

    const betweenHours = getMissingHours(result.diary[0].time);
    console.log("betweenHours: " + betweenHours); // [11,12,13]
    if (betweenHours) {
      hours = hours && hours.filter((x) => !betweenHours.includes(x));
    }
    // firstHour.push(betweenHours)
    console.log("Minimum number:", minNumber);
    console.log("Maximum number:", maxNumber);
    var hours = Array.from(
      { length: Math.ceil((maxNumber - minNumber) / duration) },
      (v, i) => minNumber + i * duration
    );

    const HoursAndGap = [];
    function getOccupiedHoursWithGap(firstHour, endHour) {
      let occupiedHoursWithGap = [];
      // console.log(JSON.stringify(firstHour)+", "+JSON.stringify(endHour));

      console.log(" ==== ", firstHour);
      if (firstHour && firstHour.length > 0) {
        for (let i = 0; i < firstHour.length; i++) {
          let obj = null;
          if (firstHour[i] != null && endHour[i] != null) {
            // console.log(" ==== ",firstHour);
            obj = {
              startHour: firstHour[i],
              gap: endHour[i] - firstHour[i],
            };
            obj && occupiedHoursWithGap.push(obj);
          }
        }

        HoursAndGap.push(...occupiedHoursWithGap); // Add the occupiedHoursWithGap to the HoursAndGap array
      }
      return occupiedHoursWithGap;
    }
    var occupiedHoursWithGap;
    console.log("appArr: " + appArr);
    if (appArr.length > 0) {
      occupiedHoursWithGap = getOccupiedHoursWithGap(firstHour, endHour);
      console.log(JSON.stringify(occupiedHoursWithGap));
    }

    console.log(
      "occupiedHoursWithGap :" + JSON.stringify(occupiedHoursWithGap)
    );

    let tempArr = [...newArr]; // make a copy of newArr
    // ...
    console.log("hours : " + hours);
    let numberArray = hours.map((x) => parseFloat(x));
    let newArray = numberArray;
    // if(result.diary[0].time.length==1){ //בודק האם מערך השעות מפוצל (גדול מ-1)
    if (occupiedHoursWithGap && occupiedHoursWithGap.length > 0) {
      //   let finalArray = newArray;

      let finalArray = hours.filter((x) => {
        x = parseFloat(x);
        let need_to_delete = false;
        for (let i = 0; i < occupiedHoursWithGap.length; i++) {
          const o = occupiedHoursWithGap[i];
          console.log("calc", o.startHour + o.gap);
          console.log("x", x);
          console.log("o", JSON.stringify(o));
          if (x + duration <= o.startHour) {
            continue;
          } else {
            if (o.startHour + o.gap <= x) {
              continue;
            }
          }
          need_to_delete = true;
        }
        if (!need_to_delete) {
          return x;
        }
      });
      console.log("final Hours: "+finalArray);
       setFinalHours(finalArray);
    }
    // return;

    // let numberArray = hours.map((x) => ({
    //   value: parseInt(x),
    //   origin_number: x,
    // }));
    // let newArray = numberArray;
    // for (let i = 0; i < newArray.length; i++) {
    //   console.log("newArray[i]" + newArray[i].value);
    //   if (firstHour.includes(newArray[i].value)) {
    //     console.log(
    //       "occupiedHoursWithGap" + JSON.stringify(occupiedHoursWithGap)
    //     );
    //     console.log(
    //       `in first hour: ${JSON.stringify(
    //         newArray[i].value
    //       )} ${JSON.stringify(newArray[i].origin_number)}`
    //     );
    //     const o = occupiedHoursWithGap.find(
    //       (x) => x.time == newArray[i].value
    //     );
    //     console.log(`o = ${JSON.stringify(o)}`);
    //     //o= 10,1 ***** o=18,1
    //     if (o && newArray[i].origin_number + o.gap == newArray[i + 1].value) {
    //       finalArray = finalArray.filter(
    //         (item) => item.value != newArray[i].value
    //       );
    //       console.log("finalArray" + JSON.stringify(finalArray));

    //       console.log(`${newArray[i].value} is deleted from finalArray`);
    //     } else if (
    //       o &&
    //       newArray[i + 1].value < newArray[i].origin_number + o.gap
    //     ) {
    //       let j = 0;
    //       console.log("****");
    //       console.log("newArray" + JSON.stringify(newArray));
    //       console.log("finalArray" + JSON.stringify(finalArray));

    //       // for(; j <=o.gap/duration; j++){

    //       // finalArray = finalArray.filter((item) => item.value != newArray[i+j].value);
    //       // }
    //       // i=i+j;
    //     }
    //   } else {
    //     //   finalArray.push(newArray[i]);
    //     //   console.log("pushing to finalArray = "+ newArray[i])
    //   }
    // }
    // finalArray = [...new Set(finalArray)];
    // finalArray = finalArray.filter((item) => !lastHours.includes(item));
    // console.log("finalArray" + JSON.stringify(finalArray));

    // setFinalHours(finalArray); // set finalHours instead of hours
    else {
      console.log("no occupied appointments.");
      setFinalHours(hours);
    }

    // else{
    //   console.log("entered to 2 opened hours");
    //   if (occupiedHoursWithGap.length > 0) {
    //   let finalArray = [];

    //   for (let i = 0; i < newArray.length; i++) {
    //     if (firstHour.includes(newArray[i])) {
    //       const o = occupiedHoursWithGap.find((x) => x.time === newArray[i]);

    //       if (o&&hours[i] + o.gap === newArray[i + 1]) {
    //         newArray = newArray.filter((num) => num !== newArray[i]);
    //       }
    //        else if(o&&!mergedArray.includes(newArray[i] + o.gap) &&  newArray[i+1]<newArray[i] + o.gap) {
    //         newArray[i + 1] = newArray[i] + o.gap;
    //       }
    //     }
    //      else {
    //       finalArray.push(newArray[i]);
    //     }
    //   }
    //   SetNewArr(finalArray); // set finalHours instead of hours
    // }
    // else{
    //   SetNewArr(newArray)
    // }
    // console.log("else "+result.id);
    // for (let i = 0; i < hours.length; i++) {
    //   console.log(i+ " "+ hours[i] + "str= "+str);
    //   if(!firstHour.includes(hours[i])){
    //   if(!endHour.includes(hours[i])){
    //     if(!betweenHours.includes(hours[i])){
    //   if(str===""){
    //     console.log(i+" :"+hours[i]);
    //     str=`${hours[i]}`;
    //   }}}}
    //   else if(str!=="" || betweenHours.includes(hours[i]+duration)){
    //     console.log("else if : "+hours[i]);
    //     str+=`-${hours[i]}`;
    //     tempArr.push(str);
    //     str="";
    //   }
    //    if(str==="" && hours[i]===hours[hours.length-1] && !endHour.includes(hours[hours.length-1])){
    //     console.log("else if 3: "+hours[i]);
    //     str=`${hours[i]}-${hours[hours.length-1]+duration}`
    //     tempArr.push(str);
    //   }
    //   if((endHour.includes(hours[i]) && str==="" )&&
    //   !betweenHours.includes(hours[i]+duration)&&!firstHour.includes(hours[i])){
    //     console.log("last if");
    //     console.log(i+" :"+hours[i]);
    //     str=`${hours[i]}`;
    //   }
    // }

    // if(str!==""){
    //   console.log(str+" = last hour to add"+hours[hours.length-1]+duration);
    // str+=`-${hours[hours.length-1]+duration}`;
    // tempArr.push(str);
    // }
    // }

    // update newArr state variable with new values
    // SetNewArr(tempArr);
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
  const [selected, setSelected] = useState([]);
  const [token, settoken] = useState(null);
  useEffect(() => {
    if (token) {
      const body = {
        to: token,
        title: "BeautyMe",
        body: `תור חדש הוזמן ע"י ${userDetails.First_name} ${userDetails.Last_name} `,
        badge: "0",
        ttl: "1",
        data: {
          to: token,
        },
      };
      Post_SendPushNotification(body).then(() => {
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%", token);
      });
    }
  }, [token]);
  const handlePress = (index) => {
    setSelected(prev => prev === index ? null : index);
  };

  const btnBookApiontment = (d) => {
    console.log(`book Appointment: start- ${d} end- ${d+duration} ${date} ${treatmentNumber} `);
    const pickedApointment = {
      Date: date,
      ID_Client: userDetails.ID_number,
      Start_Hour: d,
      End_Hour: d+duration,
      Business_Number: result.id,
      Is_client_house: result.Is_client_house,
      Type_Treatment_Number:treatmentNumber
    };
    NewAppointmentToClient(pickedApointment).then(
      (result) => {
        if (result.data) {
          AllApointemtDetailes().then((res) => {
            const appointment = res.data.find(ap => Number(result.data) === ap.Number_appointment);
            if (appointment) settoken(appointment.token);
          });
          // alert(`${result.data}`);
        }
        Alert.alert(`${result.data}    התור נקבע!  `);
        // חוזר לעמוד הבא
      },
      (error) => {
        console.log("error", error);
      }
    );
}
  return (
    <View style={styles.container} key={result.id}>
      <Text style={styles.titleText}>
        פרטי עסק: {result.businessName}, {result.city}
      </Text>
      <Text> {result.Is_client_house === "YES" ? "טיפול ביתי" : ""} </Text>
      <Text style={styles.titleText}>שעות פנויות: </Text>
      <View style={styles.container1}>
      {finalHours.map((d, index) => (
  <View key={index}>
    <TouchableOpacity 
      style={[styles.cube, selected === index && styles.selectedCube]} 
      onPress={() => handlePress(index)}
    >
      <Text style={styles.text}>
        {d}
      </Text>
    </TouchableOpacity>
    {selected === index && 
      <Button title="הזמן תור" onPress={() => btnBookApiontment(d)} />}
  </View>
))}
    </View>

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
          hours={finalHours}
          duration={duration}
          typeTreatmentNumber={treatmentNumber}
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
  container1: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
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
  cube: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  selectedCube: {
    backgroundColor: 'green',
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
