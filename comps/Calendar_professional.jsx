import { View } from "react-native";
import Header from "./obj/Header";
import Button from "./obj/Button";
import Menu_professional from "./obj/Menu_professional";
import { ScrollView } from 'react-native';


//מסך ראשי בעל עסק
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
  const handleSubmit1 = () => {   //להדפיס את את הרשימה בלי סינון... לעבור על כל הרשימה וכל פעם לשלוח את האיבר לקומפוננטה של הכרטיס תור
    console.log("Button pressed!");
    if (allAppointment.Appointment_status == ""){

    }
  };

  const handleSubmit2 = () => {   //להדפיס את את הרשימה בלי עם הסינון המתאים... לעבור על כל הרשימה וכל פעם לשלוח את האיבר לקומפוננטה של הכרטיס תור
    console.log("Button pressed!");
    if (allAppointment.Appointment_status == ""){

    }
  };

// בתורים שנקבעו צריך לעשות פאטץ לתור שנקבע הספיצי עם המספר תור ולהביא את מה שצריך משם להדפסה
//אולי לשנות את הסטטוס תור הראשי לפנוי/לא פנוי/ובהתליך בנייה או משהו כזה


//לעשות פונקציה איך שהדף נטען להביא את כל התורים של העסק הזה 
  return (
    <ScrollView>
      <Header titleText="יומן" />
      <View> 
        <Button onPress={handleSubmit1} text="כל התורים" color="#ffffff" />
        <Button onPress={handleSubmit2} text="תורים פנויים" color="#98FB98" />
        <Button onPress={handleSubmit3} text="תורים שנקבעו" color="#FF6961" />
        <Button onPress={handleSubmit4} text="תורים שנגמרו" color="#87CEFA" />
      </View>
      <Menu_professional/>
    </ScrollView>
  );
};

export default Calendar_professional;
