import React, { useState, useEffect } from 'react';
import { View, Text,StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
//import { GetBusinessDiary } from './obj/FunctionAPICode';
import Data from "./ClientScreen/Data.json";
import moment from 'moment';

const New_Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [arr, setArr] = useState([]);
  const [showDetails, setShowDetails] = useState(true);
  useEffect(() => {
    const data = Data; // Replace with API call to fetch data

    const appointments = data.map(appointment => ({
      Number_appointment: appointment.Number_appointment,
      Date: appointment.Date,
      Appointment_status: appointment.Appointment_status,
      Start_Hour: appointment.Start_Hour,
      End_Hour: appointment.End_Hour,
      Client: {
        ID_Client: appointment.ID_Client,
        First_name: appointment.First_name,
        Last_name: appointment.Last_name,
        ClientPhone: appointment.phone,
        AddressStreet: appointment.AddressStreet,
        AddressCity: appointment.AddressCity,
        AddressHouseNumber: appointment.AddressHouseNumber,
        Facebook_link: appointment.Facebook_link,
        Instagram_link: appointment.Instagram_link,
        ProfilPic: appointment.ProfilPic,
        token: appointment.token,
      },
    }));

    setArr(appointments);

    console.log(
      `Business ${data[0].Business_Number} has ${appointments.length} appointments on ${data[0].Date}:` +
        JSON.stringify(appointments)
    );
  }, []);

  const handleDayPress = (day) => {
  
    const selectedDate = day.dateString;
    arr.map(arr=>{
         console.log(moment(arr.Date).format(), moment(selectedDate).format()) 
       
    })
  
    const selectedAppointments = arr.filter(
      appointment =>moment(appointment.Date).format()==moment(selectedDate).format()
    );

    setSelectedDate(selectedDate);
    setSelectedAppointments(selectedAppointments);
    setShowDetails(true);
  };

  const markedDates = arr.reduce((acc, appointment) => {
    acc[appointment.Date] = {
      marked: true,
      dotColor: 'blue',
      activeOpacity: 0,
      customStyles: {
        text: {
          color: 'red',
        },
      },
    };
    return acc;
  }, {});

  LocaleConfig.locales['he'] = {
    monthNames: [
      'ינואר',
      'פברואר',
      'מרץ',
      'אפריל',
      'מאי',
      'יוני',
      'יולי',
      'אוגוסט',
      'ספטמבר',
      'אוקטובר',
      'נובמבר',
      'דצמבר',
    ],
    monthNamesShort: [
      'ינו',
      'פבר',
      'מרץ',
      'אפר',
      'מאי',
      'יוני',
      'יולי',
      'אוג',
      'ספט',
      'אוק',
      'נוב',
      'דצמ',
    ],
    dayNames: [
      'ראשון',
      'שני',
      'שלישי',
      'רביעי',
      'חמישי',
      'שישי',
      'שבת',
    ],
    dayNamesShort: ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'],
  };

  LocaleConfig.defaultLocale = 'he';

  return (
    <ScrollView>
      <View>
        <Calendar markedDates={markedDates} onDayPress={handleDayPress} />
        {selectedAppointments.map(appointment => (
          <TouchableOpacity
            style={styles.card}
            key={appointment.Number_appointment}
            onPress={() => setShowDetails(!showDetails)} // מעבר בין הצגה להסתרה של הטקסט
          >
            {showDetails && (
              <>
                <Text style={styles.title}>{appointment.Start_Hour} - {appointment.End_Hour}</Text>
                <Text style={styles.text}>{appointment.Client.First_name} {appointment.Client.Last_name}</Text>
              </>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
    card: {
      borderWidth: 2,
      borderRadius: 20,
      borderColor: "rgb(92, 71, 205)",
      padding: 10,
      marginVertical: 5,
      backgroundColor:"white",
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

export default New_Calendar;
