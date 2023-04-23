import { View, Text, StyleSheet } from "react-native";


const AppointmentCard_forProfessional_Calendar = ({appointment}) => {
    const { Treatment_Type, Client_Name, Start_time, End_time } = appointment;

    return (
        <View style={styles.card}>
          <Text style={styles.title}>{Treatment_Type} - {Client_Name}</Text>
          <Text>{Start_time} - {End_time}</Text>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      card: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#d3d3d3',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#fff',
      },
      title: {
        fontWeight: 'bold',
        marginBottom: 5,
      },
    });
    
export default AppointmentCard_forProfessional_Calendar;

