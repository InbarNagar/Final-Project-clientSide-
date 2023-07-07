import React, { useState, useContext, useEffect } from "react";
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
import {
  AllApointemtDetailes,
  NewAppointmentToClient,
  Post_SendPushNotification,
} from "../obj/FunctionAPICode";
import { UserContext } from "../UserDietails";
import { useNavigation } from "@react-navigation/native";
const BusinessSchedule = (props) => {
  const [token, settoken] = useState(null);
  const { userDetails } = useContext(UserContext);
  const { duration,hours, Is_client_house,Type_Treatment_Number, businessNumber, isVisible, date, onClose } = props;
  const [pressedHour, setPressedHour] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    console.log(`props ${businessNumber} : ${date}  treatment number: ${Type_Treatment_Number} Is_client_house ${Is_client_house}`);
    if (token) {
      const body = {
        to: token,
        title: "BeautyMe",
        body: `אשר תור חדש`,
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

  const btnBookApiontment = (item) => {
    const [start, end] = item.split('-').map(Number);
    console.log(`book Appointment: start- ${start} end- ${end} ${date} ${Type_Treatment_Number} `);
    const pickedApointment = {
      Date: date,
      ID_Client: userDetails.ID_number,
      Start_Hour: start,
      End_Hour: end,
      Business_Number: businessNumber,
      Is_client_house: "YES",
      Type_Treatment_Number:Type_Treatment_Number  
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
        navigation.navigate('Search3');
        Alert.alert(`${result.data} מחכה לאישור מבעל העסק `);
        // חוזר לעמוד הבא
        onClose();
      },
      (error) => {
        console.log("error", error);
      }
    );
}

const renderItem = ({ item }) => {
  // Split the hours and convert them to numbers
  const [start, end] = item.split('-').map(Number);

  // Calculate the number of slots
  const slotsCount = (end - start) / duration;

  // Create an array of slots
  const slots = Array.from({ length: slotsCount }, (_, i) => {
    const slotStart = start + i * duration;
    const slotEnd = slotStart + duration;
    return `${slotStart}-${slotEnd}`;
  });

  // Render each slot
  return slots.map((slot) => {
    const formattedSlot = slot.split('-').map(hour => `${hour}:00`).join(' - ');
    return (
      <TouchableOpacity
        key={slot}
        style={[
          styles.touchable,
          { backgroundColor: slot === pressedHour ? "green" : "white" },
        ]}
        onPress={() => setPressedHour(prev => prev === slot ? null : slot)}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.text}>{formattedSlot}</Text>
          {slot === pressedHour && (
            <Button title="הזמן תור" onPress={() => btnBookApiontment(slot)} />
          )}
        </View>
      </TouchableOpacity>
    );
  });
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
            keyExtractor={(item) => item}
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
