import { View } from "react-native";
import Header from "./obj/Header";
import Button from "./obj/Button";
<<<<<<< HEAD
<<<<<<< HEAD
import Menu_professional from "./obj/Menu_professional";
import { ScrollView } from 'react-native';


=======
//מסך ראשי בעל עסק
>>>>>>> aca57614071ba934ef2b5813cfc7bbb2f0e8ad91
=======
//מסך ראשי בעל עסק
>>>>>>> aca57614071ba934ef2b5813cfc7bbb2f0e8ad91
const allAppointment = [
  {
    "Date": "5/5/2023",
    "Start_time": "11:00:00",
    "End_time": "12:30:00",
    "Is_client_house": "NO",
    "Business_Number": "6",
    "Appointment_status": "available"
  },
  {
    "Date": "5/5/2023",
    "Start_time": "11:00:00",
    "End_time": "12:30:00",
    "Is_client_house": "YES",
    "Business_Number": "6",
    "Appointment_status": "not available"
  }
];

const Calendar_professional = () => {
  const handleSubmit = () => {
    console.log("Button pressed!");
  };

  return (
    <ScrollView>
      <Header titleText="יומן" />
      <View>
        <Button onPress={handleSubmit} text="כל התורים" color="#ffffff" />
        <Button onPress={handleSubmit} text="תורים פנויים" color="#98FB98" />
        <Button onPress={handleSubmit} text="תורים שנקבעו" color="#FF6961" />
        <Button onPress={handleSubmit} text="תורים שנגמרו" color="#87CEFA" />
      </View>
      <Menu_professional/>
    </ScrollView>
  );
};

export default Calendar_professional;
