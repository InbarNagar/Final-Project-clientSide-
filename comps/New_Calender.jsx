import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Data from "./ClientScreen/Data.json";
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Linking } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import Alert from './Alert';
import { Button } from 'react-native-paper';
import { GetAllAppointmentForProWithClient } from './obj/FunctionAPICode';
import { ConfirmAppointment } from './obj/FunctionAPICode';
const New_Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [arr, setArr] = useState([]);
  const [showDetails, setShowDetails] = useState(true);
  const [alert, setAlert] = useState();
  const [tokenClient,setToken]=useState();
  useEffect(() => {
    GetAllAppointmentForProWithClient(4).then((data) => {
      console.log(data, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!$$$$$$$$$$$$$$$")

      let arr1 = [];
      let obj = {
        Number_appointment: data[0].Number_appointment,
        Date: data[0].Date,
        Appointment_status: data[0].Appointment_status,
        Start_Hour: data[0].Start_Hour,
        End_Hour: data[0].End_Hour,
        Client: {
          ID_Client: data[0].ID_Client,
          First_name: data[0].First_name,
          Last_name: data[0].Last_name,
          ClientPhone: data[0].phone,
          AddressStreet: data[0].AddressStreet,
          AddressCity: data[0].AddressCity,
          AddressHouseNumber: data[0].AddressHouseNumber,
          Facebook_link: data[0].Facebook_link,
          Instagram_link: data[0].Instagram_link,
          ProfilPic: data[0].ProfilPic,
          token: data[0].token,
        },
      };
      arr1.push(obj);
      for (let i = 1; i < data.length; i++) {
        //רץ על המערך הכללי
        if (data[i].Number_appointment !== data[i - 1].Number_appointment) {
          //בודק אם המספר תור שווה לקודם הקיים במערך
          obj = {
            Number_appointment: data[i].Number_appointment,
            Date: data[i].Date,
            Appointment_status: data[i].Appointment_status,
            Start_Hour: data[i].Start_Hour,
            End_Hour: data[i].End_Hour,
            Client: {
              ID_Client: data[i].ID_Client,
              First_name: data[i].First_name,
              Last_name: data[i].Last_name,
              ClientPhone: data[i].phone,
              AddressStreet: data[i].AddressStreet,
              AddressCity: data[i].AddressCity,
              AddressHouseNumber: data[i].AddressHouseNumber,
              Facebook_link: data[i].Facebook_link,
              Instagram_link: data[i].Instagram_link,
              ProfilPic: data[i].ProfilPic,
              token: data[i].token,
            },
          };
          arr1.push(obj);
        }
      }
      setArr(arr1)
      console.log(arr1, "222222222222222222222222222222222")
      console.log(
        `Business ${data[0].Business_Number} has ${arr1.length} appointments on ${data[0].Date}:` +
        JSON.stringify(arr)
      );
    }).catch((error) => {
      console.log("error!!!!!!!!!!!!!!!!!!!!!!!!!!!", error);
    })
    // const data = Data; // לשים קריאה לשרת למשוך את המידע
    // let arr = [];
    // let obj = {
    //   Number_appointment: data[0].Number_appointment,
    //   Date: data[0].Date,
    //   Appointment_status: data[0].Appointment_status,
    //   Start_Hour: data[0].Start_Hour,
    //   End_Hour: data[0].End_Hour,
    //   Client: {
    //     ID_Client: data[0].ID_Client,
    //     First_name: data[0].First_name,
    //     Last_name: data[0].Last_name,
    //     ClientPhone: data[0].phone,
    //     AddressStreet: data[0].AddressStreet,
    //     AddressCity: data[0].AddressCity,
    //     AddressHouseNumber: data[0].AddressHouseNumber,
    //     Facebook_link: data[0].Facebook_link,
    //     Instagram_link: data[0].Instagram_link,
    //     ProfilPic: data[0].ProfilPic,
    //     token: data[0].token,
    //   },
    // };
    // arr.push(obj);
    // for (let i = 1; i < data.length; i++) {
    //   //רץ על המערך הכללי
    //   if (data[i].Number_appointment !== data[i - 1].Number_appointment) {
    //     //בודק אם המספר תור שווה לקודם הקיים במערך
    //     obj = {
    //       Number_appointment: data[i].Number_appointment,
    //       Date: data[i].Date,
    //       Appointment_status: data[i].Appointment_status,
    //       Start_Hour: data[i].Start_Hour,
    //       End_Hour: data[i].End_Hour,
    //       Client: {
    //         ID_Client: data[i].ID_Client,
    //         First_name: data[i].First_name,
    //         Last_name: data[i].Last_name,
    //         ClientPhone: data[i].phone,
    //         AddressStreet: data[i].AddressStreet,
    //         AddressCity: data[i].AddressCity,
    //         AddressHouseNumber: data[i].AddressHouseNumber,
    //         Facebook_link: data[i].Facebook_link,
    //         Instagram_link: data[i].Instagram_link,
    //         ProfilPic: data[i].ProfilPic,
    //         token: data[i].token,
    //       },
    //     };
    //     arr.push(obj);
    //   }
    // }
    // setArr(arr)
    // console.log(
    //   `Business ${data[0].Business_Number} has ${arr.length} appointments on ${data[0].Date}:` +
    //   JSON.stringify(arr)
    // );
  }, []);

  const handleDayPress = (day) => {

    const selectedDate = day.dateString;
    arr.map(arr => {
      console.log(moment(arr.Date).format(), moment(selectedDate).format())

    })

    const selectedAppointments = arr.filter(
      appointment => moment(appointment.Date).format() == moment(selectedDate).format()
    );

    setSelectedDate(selectedDate);
    setSelectedAppointments(selectedAppointments);
    setShowDetails(true);
  };
 

const confirmstatus = (Number_appointment,token) => {
//   ConfirmAppointment(Number_appointment).then((result) => {
//     if (result.data) {
//       console.log(result.data)
//       setAlert(<Alert
//       text='התור אושר בהצלחה, נשלחה הודעה ללקוח '
//       type='worng'
//       time={1000}
//       bottom={100}
//   />)      
//   setToken(token)
// }
//   }, (error) => {
//     console.log('error', error)
//        setAlert(<Alert
//       text='לא הצלחנו לאשר, אנא נסה שוב מאוחר יותר'
//       type='worng'
//       time={1000}
//       bottom={100}
//   />)  
//   })
}
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

// הוספת תאריך הנבחר למערך התאריכים המסומנים
if (selectedDate) {
  markedDates[selectedDate] = {
    selected: true,
    selectedColor: "rgb(92, 71, 205)",
  };
}

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
      {alert && alert}
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
                <ScrollView>
                  <Text style={styles.title}>פרטי התור:</Text>

                  <Text style={styles.text}>
                    <Icon name="clock-o" size={20} color="black" />  {moment(appointment.Start_Hour, "HH:mm").format("HH:mm")} - {moment(appointment.End_Hour, "HH:mm").format("HH:mm")}
                  </Text>


                  {
                    appointment.Appointment_status == "confirmed"
                      ? <View style={styles.iconContainer}>
                        <Text style={styles.text}>התור אושר </Text>
                        <Icon name="check-circle" size={20} color="green" />
                      </View>
                      : <View style={styles.columnContainer}>
                        <View style={styles.iconContainer}>
                          <Text style={styles.text}>התור ממתין לאישור </Text>
                          <Icon name="hourglass" size={20} color="orange" />
                        </View>
                        <TouchableOpacity onPress={confirmstatus(appointment.Number_appointment,appointment.Client.token)}>
                          <Text style={styles.linkText}>לחץ כאן לאישור התור</Text>
                        </TouchableOpacity>
                      </View>
                  }


                  <Text style={styles.text}>
                    {(appointment.Is_client_house == "YES" || "YES       ")
                      ? <><Icon name="home" size={20} color="black" /> טיפול בבית הלקוח</>
                      : <><Icon name="briefcase" size={20} color="black" />  טיפול בבית העסק</>
                    }
                  </Text>
                  <Text style={styles.title}>פרטי הלקוח:
                  </Text>
                  <Text style={styles.text}>{appointment.Client.First_name} {appointment.Client.Last_name}</Text>


                  {(appointment.Is_client_house == "YES" || "YES       ") ?
                    <View style={styles.iconContainer}>

                      <Text style={styles.text}>
                        {` ${appointment.Client.AddressCity}, ${appointment.Client.AddressStreet}, ${appointment.Client.AddressHouseNumber}`}
                      </Text>
                      <Icon name="map-marker" size={25} color="#000" style={styles.icon} />
                    </View>
                    : null
                  }
                  <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => Linking.openURL(`tel:${appointment.Client.ClientPhone}`)}>
                      <Icon name="phone" size={25} color="rgb(92, 71, 205)" style={styles.icon} />
                    </TouchableOpacity>
                    {appointment.Client.Instagram_link ? (
                      <TouchableOpacity onPress={() => Linking.openURL(appointment.Instagram_link)}>
                        <Icon name="instagram" size={25} color="rgb(92, 71, 205)" style={styles.icon} />
                      </TouchableOpacity>
                    ) : null}

                    {appointment.Client.Facebook_link ? (
                      <TouchableOpacity onPress={() => Linking.openURL(appointment.Client.Facebook_link)}>
                        <Icon name="facebook" size={25} color="rgb(92, 71, 205)" style={styles.icon} />
                      </TouchableOpacity>
                    ) : null}

                  </View>

                </ScrollView>
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
    backgroundColor: "white",
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: "left",
    fontSize: 20,
  },
  text: {
    fontSize: 15,
    textAlign: "left",
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 10,
  },
  linkText: {
    color: "rgb(92, 71, 205)",
    textDecorationLine: 'underline',
  },
  columnContainer: {
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'center',
  },
});



export default New_Calendar;
