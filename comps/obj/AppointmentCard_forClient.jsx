import { View, Text, StyleSheet } from "react-native";
import moment from "moment";
import { Button } from "react-native-elements";
import {CancelAppointmentByClient} from './FunctionAPICode'

const AppointmentCard_forClient = (props) => {
  const {Number_appointment, AddressCity,AddressHouseNumber,AddressStreet,backgroundColor, Treatment_Type, Client_Name, Start_time, End_time, status, Date, BusinessName, } = props;

  function cancelAppointment(Number_appointment){
    CancelAppointmentByClient(Number_appointment).then(
    (result) => {
      console.log(`appointment ${Number_appointment} canceled!! `);
    },
    (error) => {
      console.log("error", error);
      // Handle error, including finding a way to display to the user that deletion failed.
    }
  );
}
  const styles = StyleSheet.create({
    card: {
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#d3d3d3',
      padding: 10,
      marginVertical: 5,
      backgroundColor: backgroundColor,
    },
    title: {
      fontWeight: 'bold',
      marginBottom: 5,
      textAlign: "center",
    },
    text: {

      fontSize: 20,
    }
  });

  const massage = () => {
    if (status == "Appointment_ended") {
      return (<Text style={styles.title}>{Treatment_Type} תור שהסתיים </Text>)
    }
    if (status == "Awaiting_approval") // if status =
      return (<>
      <Text style={styles.title}>ממתין לאישור בעל עסק</Text>
      <Button title="ביטול תור" onPress={() => cancelAppointment(Number_appointment)} /></>
      )

    else { // if status =
      return (<>
      <Text style={styles.title}>{Treatment_Type} תור מאושר</Text>
      </>
      )
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{moment(Date).format('DD/MM/YYYY')}</Text>
      {massage()}
      <Text>{BusinessName} כתובת: {AddressStreet} {AddressHouseNumber}, {AddressCity}</Text>
      {/* <Text style={styles.title}>{Treatment_Type} - {Client_Name}</Text> */}
      <Text style={styles.title}>{Start_time} - {End_time}</Text>
    </View>
  );
};


export default AppointmentCard_forClient;