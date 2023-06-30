import React, { useState, useContext } from "react";
import { useEffect } from "react";
import {
  AllApointemtDetailes,
  NewAppointmentToClient,
  Post_SendPushNotification,
} from "../obj/FunctionAPICode";
import {
  Alert,
  Modal,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { UserContext } from "../UserDietails";

const BusinessSchedule = (props) => {
  const [apo, setapo] = useState();
  const { userDetails, setUserDetails } = useContext(UserContext);
  const ClientData = userDetails;
  const {
    min,
    max,
    businessNumber,
    booked,
    isVisible,
    date,
    onClose,
    duration,
  } = props;
  const minNumber = min;
  const maxNumber = max;
  const booked1 = ["8-10", "16-18"];
  const startTimes = booked.map((time) => parseInt(time.toString().split("-")[0])); //שומר את השעה הראשונה 
  const [token, settoken] = useState(); // ענבר

  const hours = Array.from(
    { length: Math.ceil((maxNumber - minNumber) / duration) },
    (v, i) => minNumber + i * duration
  ); 
  
  const [pressedHour, setPressedHour] = useState(null);
  useEffect(() => {
    console.log("booked: " + booked);
    console.log("const book: " + booked1);
    // const startTimes = booked.map((time) => {
    //     console.log('time=' + parseInt(time.toString().split('-')[0]) );
    //     parseInt(time.split("-")[0]);
    // });
    console.log(startTimes);
    console.log("userDetails: " + userDetails);
    console.log("business number: " + businessNumber);
    console.log("startTimes: " + startTimes);
    console.log("min: " + min + " max: " + max);
    console.log("duration: " + duration);
    // AllApointemtDetailes().then((res) => {

    //     console.log("&&&&&&&&&&&&&&&&&&&&&&", res.data)
    //     setapo(res.data)

    //   })
  }, []);
  useEffect(() => {
    if (token) {
      const body = {
        to: token,
        title: "BeautyMe",
        body: `אשר תור חדש`,
        badge: "0",
        ttl: "1", // מספר שניות לשליחה
        data: {
          to: token,
        },
      };
      Post_SendPushNotification(body).then(() => {
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%", token);
      });
    }
  }, [token]);

  function handlePressedHour(item) {
    setPressedHour((prevHour) => (prevHour === item ? null : item));
  }

  function btnBookApiontment(item) {
    console.log(`Button clicked for item: ${item}`);
    console.log(`appointment from ${item} to ${item + duration} 
    for cusinessNumber ${businessNumber} from client ${ClientData.ID_number}`);

    //לקבוע תור
    const pickedApointment = {
      Date: date,
      ID_Client: ClientData.ID_number,
      Start_Hour: item,
      End_Hour: item + duration,
      Business_Number: businessNumber,
      Is_client_house: "YES",
    };
    console.log("**", pickedApointment);
    NewAppointmentToClient(pickedApointment).then(
      (result) => {
        console.log("yes", result.data);
        AllApointemtDetailes().then((res) => {
          console.log("&&&&&&&&&&&&&&&&&&&&&&", res.data);
          // setapo(res.data)

          res.data.forEach((apointment) => {
            if (Number(result.data) === apointment.Number_appointment) {
              console.log(
                "apointment.Number_appointment: " +
                  apointment.Number_appointment
              );
              settoken(apointment.token);
              console.log(apointment.token);
              return;
            }
          });
        });
        //  settoken("ExponentPushToken[sCfqv9F-xkfthnmyMFXsDX]")
        if (result.data) {
          console.log(result.data);
          alert(`${result.data}`);
        }

        Alert.alert(`${result.data} מחכה לאישור מבעל העסק }`);
      },
      (error) => {
        console.log("error", error);
      }
    );
    //     // btnSearch();
    //   }
  }

  function renderItem({ item }) {
    if (startTimes.includes(item)) {
      return (
        <View key={item} style={styles.itemContainer1}>
          <Text style={styles.text}>{`${item}:00 - ${
            item + duration
          }:00`}</Text>
        </View>
      );
    }
    return (
      <TouchableOpacity
        key={item}
        style={[
          styles.touchable,
          { backgroundColor: item === pressedHour ? "green" : "white" },
        ]}
        onPress={() => handlePressedHour(item)}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.text}>{`${item}:00 - ${
            item + duration
          }:00`}</Text>
          {item === pressedHour && (
            <Button title="הזמן תור" onPress={() => btnBookApiontment(item)} />
          )}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <FlatList
            data={hours}
            keyExtractor={(item) => item.toString()}
            renderItem={renderItem}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="סגור" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10, // optional, to round the edges
  },
  itemContainer1: {
    backgroundColor: "#ffcccc",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  touchable: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 10, // Adjust the margin as needed
  },
});

export default BusinessSchedule;
