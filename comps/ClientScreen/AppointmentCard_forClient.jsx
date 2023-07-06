import { View, Text, StyleSheet } from "react-native";
import moment from "moment";
import Button from "../obj/Button";
import {CancelAppointmentByClient} from '../obj/FunctionAPICode'
import Review_Business from "../Review_Business";
import { useNavigation } from '@react-navigation/native';
import { toDate } from "date-fns";

const AppointmentCard_forClient = (props) => {
  const {Review_Number,Business_Number,ClientIDnumber,Number_appointment, AddressCity,AddressHouseNumber,AddressStreet,backgroundColor, Treatment_Type, Client_Name, Start_time, End_time, status, Date1, BusinessName } = props;
  const navigation = useNavigation();

  function cancelAppointment(Number_appointment){
    console.log("appoinment: "+ Number_appointment);
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
    if ((status == "Appointment_ended" && Review_Number == null)) {
      return (
      <><Text style={styles.title}>{Treatment_Type} תור שהסתיים </Text>
     <Button

     color="rgb(92, 71, 205)" width={300} fontSize={20} borderRadius={20} colortext="#f0f8ff" 
      text="דרג עסק" 

      onPress={() => 
        navigation.navigate('Review_Business', {
          Number_appointment,
          ClientIDnumber,
          BusinessName,
          Business_Number
        })
      }
    />
      </>)
    }
    // if (status == "Appointment_ended" && Review_Number != null ) {
      if ( Date1 < new Date() && Review_Number != null ) {
      return (
      <><Text style={styles.title}>{Treatment_Type} תור שהסתיים </Text>
      <Text>העסק דורג!</Text>
      </>)
    }
    if (status == "Awaiting_approval") // if status =
  {return (<>
      <Text style={styles.title}>ממתין לאישור בעל עסק</Text>
      <Button color="rgb(92, 71, 205)" width={300} fontSize={20} borderRadius={20} colortext="#f0f8ff"  text="ביטול תור" onPress={() => cancelAppointment(Number_appointment)} />
      </>)}

    else
     { 
      return (<>
      <Text style={styles.title}>{Treatment_Type} תור מאושר</Text>
      <Button color="rgb(92, 71, 205)" width={300} fontSize={20} borderRadius={20} colortext="#f0f8ff" text="ביטול תור" onPress={() => cancelAppointment(Number_appointment)} />
      </>
      )
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{moment(Date1).format('DD/MM/YYYY')}</Text>
      <Text style={styles.title}>שם העסק: {BusinessName}, כתובת: {AddressStreet} {AddressHouseNumber},{AddressCity}</Text>
      <Text style={styles.title}>{Start_time} - {End_time}</Text>
      {massage()}
    </View>
  );
};


export default AppointmentCard_forClient;