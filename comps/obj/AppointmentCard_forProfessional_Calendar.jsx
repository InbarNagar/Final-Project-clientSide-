import { View, Text, StyleSheet } from "react-native";
import moment from "moment";


const AppointmentCard_forProfessional_Calendar = (props) => {
  const { backgroundColor, Treatment_Type, Client_Name, Start_time, End_time, status, Date, Client_Last_Name } = props;

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
      return <Text style={styles.title}>{Treatment_Type} תור שהסתיים </Text>
    }
    if (status == "Confirmed")
      return <Text style={styles.title}>{Treatment_Type} {Client_Name} {Client_Last_Name} :שם לקוחה </Text>

    if (status == "Not available") // if status =
      return <Text style={styles.title}>תור לא זמין</Text>

    else { // if status =
      return <Text style={styles.title}>תור עדיין פנוי</Text>
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{moment(Date).format('DD/MM/YYYY')}</Text>
      {massage()}
      {/* <Text style={styles.title}>{Treatment_Type} - {Client_Name}</Text> */}
      <Text style={styles.title}>{Start_time} - {End_time}</Text>
    </View>
  );
};


export default AppointmentCard_forProfessional_Calendar;