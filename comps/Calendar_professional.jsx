// import CalendarStrip from 'react-native-calendar-strip';
// import { View, ScrollView, StyleSheet, Text } from "react-native";
// import Header from "./obj/Header";
// import Button from "./obj/Button";
// import Menu_professional from "./obj/Menu_professional";
// import moment from "moment";
// import { FutureAppointmentB, allApoB } from "./obj/FunctionAPICode";
// import { useState,useEffect } from "react";
// import { UserContext } from '../comps/UserDietails';
// import React, { useContext } from "react";
// import { FutureAppointmenB } from "./obj/FunctionAPICode";
// import { Post_SendPushNotification } from "./obj/FunctionAPICode";
// import AppointmentCard_forProfessional_Calendar from "./obj/AppointmentCard_forProfessional_Calendar";
// import { ClientDetailes } from "./obj/FunctionAPICode";
// import ShowReviews from "./ShowReviews";

// export default function Calendar_professional() {
//   const { userDetails, setUserDetails } = useContext(UserContext);
//   const BussinesNumber = userDetails.Business_Number;

//   const [allAppointment, setallAppointment] = useState([])
//   const [allAppointmentAvilable, setallAppointmentAvilable] = useState([])
//   const [allAppointmentEnd, setallAppointmentEnd] = useState([])
//   const [FutureAppointment, setFutureAppointment] = useState([])

//   const [showText, setShowText] = useState(false);
//   const [showText2, setShowText2] = useState(false);
//   const [showText3, setShowText3] = useState(false);
//   const [showText4, setShowText4] = useState(false);

//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [appointments, setAppointments] = useState([]); // מערך הפגישות לתצוגה
// const namecli = "";

// const test = () => {

//   const body = {
//     "to": userDetails.Token,
//     "title": "BeautyMe",
//     "body": `${userDetails.First_name} הוספת תור חדש`,
//     "badge": "0",
//     "ttl": "1",// מספר שניות לשליחה
//     "data": {
//       "to": userDetails.Token
//     }
//   }
//   console.log({ userDetails })
//   Post_SendPushNotification(body).then(() => {

//   }).catch((error) => {
//     console.log("error", error);
//   })

// }

//   useEffect(() => {
//     console.log("11111")
//     console.log(allAppointment, allAppointment.length);

//     allApoB(BussinesNumber)
//       .then((result) => {
//         console.log("11113")
//         console.log(result)
//         if (result.data) {
//           console.log("111122")
//           console.log(result.data)
//           setallAppointment(result.data);
//           // setAppointments(result.data);
//           console.log("11112")

//           console.log(allAppointment)
//           // console.log(appointments)
//         }
//       })
//       .catch((error) => {
//         console.log('error', error);
//       });

//     // setShowText2(!showText2);
//   }, []); 


//   const handleDateSelected = (date) => {
//     console.log("3344")
//     console.log(allAppointment)
//     setSelectedDate(date);
//     // כאן תוכל לבצע פעולות נוספות לאחר בחירת תאריך מסוים
//     // לדוגמה, קריאה לפונקציה שמביאה את הפגישות לתאריך הנבחר
//     fetchAppointments(date);
//   };

//   const fetchAppointments = (date) => {
//     console.log("3322")
//     // כאן תוכל לקרוא ל-API או לבצע פעולות נוספות על מנת לקבל את הפגישות לתאריך הנבחר
//     // לדוגמה, קריאה לפונקציה שמחזירה מערך של פגישות לתאריך ספציפי
//     const fetchedAppointments = fetchAppointmentsFromAPI(date);
//     setAppointments(fetchedAppointments);
//   };

//   const fetchAppointmentsFromAPI = (date) => {
//     // כאן תוכל לממש את הלוגיקה לקבלת הפגישות מה-API לתאריך ספציפי
//     // ולהחזיר מערך של פגישות
//     // לדוגמה, החזרת מערך פגישות דמוי
//     console.log("3333")
//     const filteredAppointments = allAppointment.filter(appointment => {
//       return allAppointment.date === date.toDateString();
//     });
//     // מחזירים את הפגישות המסוננות
//     return filteredAppointments;
//   };

//   const renderAppointmentItem = ({ item }) => (
//     <View style={styles.appointmentItem}>
//       <Text style={styles.appointmentTitle}>{item.title}</Text>
//       <Text style={styles.appointmentTime}>{item.time}</Text>
//     </View>
//   );
  


//   return (
//     <>
//       <View style={styles.container}>
//         <CalendarStrip
//           style={styles.calendar}
//           selectedDate={selectedDate}
//           onDateSelected={handleDateSelected}
//         />
//         <ScrollView contentContainerStyle={styles.appointmentsContainer}>
//           {appointments.map((appointment) => (
//             <View key={appointment.id} style={styles.appointmentContainer}>
//               <Text style={styles.appointmentDate}>{selectedDate.toDateString()}</Text>
//               <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
//                 <View style={styles.appointmentList}>
//                   {appointments.map(renderAppointmentItem)}
//                 </View>
//               </ScrollView>
//             </View>
//           ))}
//         </ScrollView>
//         <Menu_professional/>
//       </View>
  
     
//     </>
//   );
  
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   calendar: {
//     height: 100,
//     paddingTop: 20,
//     paddingBottom: 10,
//     backgroundColor: 'white',
//   },
//   appointmentsContainer: {
//     flex: 1,
//     padding: 10,
//   },
//   appointmentContainer: {
//     marginBottom: 20,
//   },
//   appointmentDate: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   appointmentList: {
//     flexDirection: 'row',
//   },
//   appointmentItem: {
//     backgroundColor: 'rgb(92, 71, 205)',
//     borderRadius: 10,
//     padding: 10,
//     marginRight: 10,
//     alignItems: 'center',
//   },
//   appointmentTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   appointmentTime: {
//     fontSize: 14,
//     color: 'white',
//   },
// });










//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { View, ScrollView, StyleSheet, Text } from "react-native";
import Header from "./obj/Header";
import Button from "./obj/Button";
import Menu_professional from "./obj/Menu_professional";
import moment from "moment";
import { FutureAppointmentB, allApoB } from "./obj/FunctionAPICode";
import { useState,useEffect } from "react";
import { UserContext } from '../comps/UserDietails';
import React, { useContext } from "react";
import { FutureAppointmenB } from "./obj/FunctionAPICode";
import { Post_SendPushNotification } from "./obj/FunctionAPICode";
import AppointmentCard_forProfessional_Calendar from "./obj/AppointmentCard_forProfessional_Calendar";
import { ClientDetailes } from "./obj/FunctionAPICode";
import ShowReviews from "./ShowReviews";
import New_Calendar from "./New_Calender";

//מסך ראשי בעל עסק
export default function Calendar_professional() {

 
  const { userDetails, setUserDetails } = useContext(UserContext);
  const BussinesNumber = userDetails.Business_Number;

  // const [showLoading,setshowLoading]=useState(true)
  const [allAppointment, setallAppointment] = useState([])
  const [allAppointmentAvilable, setallAppointmentAvilable] = useState([])
  const [allAppointmentEnd, setallAppointmentEnd] = useState([])
  const [FutureAppointment, setFutureAppointment] = useState([])
  const [Client, setclient] = useState([])

  const [showText, setShowText] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [showText3, setShowText3] = useState(false);
  const [showText4, setShowText4] = useState(false);


//   useEffect(()=>{
// setInterval(() => {
//   showLoading&&setshowLoading(false)
// }, 4000);
//   },[]
//   )

  const namecli = "";

  const test = () => {

    const body = {
      "to": userDetails.Token,
      "title": "BeautyMe",
      "body": `${userDetails.First_name} הוספת תור חדש`,
      "badge": "0",
      "ttl": "1",// מספר שניות לשליחה
      "data": {
        "to": userDetails.Token
      }
    }
    console.log({ userDetails })
    Post_SendPushNotification(body).then(() => {

    }).catch((error) => {
      console.log("error", error);
    })

  }

  const handleSubmit = () => {
    console.log(allAppointment, allAppointment.length)

    allApoB(BussinesNumber).then((result) => {

      if (result.data)
        setallAppointment(result.data)
        console.log(result.data)

    }, (error) => {
      console.log('error', error)
    })

    setShowText2(!showText2);

  }


  const handleSubmit2 = () => {
    const filterresult1=""
    allApoB(BussinesNumber).then((result) => {

      if (result.data) {
        filterresult1= result.data.filter(apo=> apo.Appointment_status =="Awaiting_approval")
        //console.log(filterresult1,"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        setallAppointmentAvilable(filterresult1)
      }
      console.log(allAppointmentAvilable.length, "*****")

    }, (error) => {
      console.log('error', error)
    })

    setShowText(!showText);
  }

  const handleSubmit4 = () => {

    allApoB(BussinesNumber).then((result) => {
      const filterresult=""
      if(result.data)
     filterresult = result.data.filter(apo=> apo.Appointment_status =="Appointment_ended")
    // console.log(filterresult,"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    setallAppointmentEnd(filterresult)


    }, (error) => {
      console.log('error', error)
    })

    setShowText4(!showText4);
  }

  const handleSubmit3 = () => {

    allApoB(BussinesNumber).then((result) => {
      const filterresult3=""
      if(result.data)
     filterresult3= result.data.filter(apo=> apo.Appointment_status =="confirmed")
     console.log(filterresult3,"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
     setFutureAppointment(filterresult3)


    }, (error) => {
      console.log('error', error)
    })

    // FutureAppointmenB(BussinesNumber).then((result) => {

    //   if (result.data)
    //     console.log(result.data)
    //   setFutureAppointment(result.data)
    //   console.log("****", FutureAppointment.length)
    // }, (error) => {
    //   console.log('error', error)
    // })
    
    setShowText3(!showText3);
  }



  return (
    <>

      <ScrollView>
        <View style={styles.view}>

          {/* <ScrollView horizontal={true}>
            <View style={styles.container}>

              <Button title={showText2 ? 'Hide Text' : 'Show Text'} onPress={handleSubmit} text="כל התורים" color="rgb(92, 71, 205)" colortext="white"/>
              <Button title={showText ? 'Hide Text' : 'Show Text'} onPress={handleSubmit2} text="תורים שמחכים לאישור" color="rgb(92, 71, 205)" colortext="white"/>
              <Button title={showText3 ? 'Hide Text' : 'Show Text'} onPress={handleSubmit3} text="תורים שנקבעו" color="rgb(92, 71, 205)" colortext="white"/>
              <Button title={showText4 ? 'Hide Text' : 'Show Text'} onPress={handleSubmit4} text="תורים שנגמרו" color="rgb(92, 71, 205)" colortext="white"  />
              {/* <Button title={showText4 ? 'Hide Text' : 'Show Text'} onPress={test} text=" cshev" color="#87CEFA" /> */}
            {/* </View>
          </ScrollView> */} 


          {showText2 && <View style={styles.view1}>
            {allAppointment && allAppointment.length > 0 &&
              allAppointment.map(x => {
               
                console.log(x.Date)
                return (
                  <AppointmentCard_forProfessional_Calendar
                    key={x.Number_appointment}
                    Number_appointment={x.Number_appointment}
                    backgroundColor={"rgb(92, 71, 205)"}
                    // Treatment_Type= 
                    status={x.Appointment_status}
                    Date={x.Date}
                    Start_time={x.Start_Hour}
                    End_time={x.End_Hour}
                    Client_Name={x.First_name}
                    Client_Last_Name={x.Last_name}
                  />
                )
              })}
          </View>}

          {showText && <View style={styles.view1}>
            {allAppointmentAvilable &&
              allAppointmentAvilable.map(x => {
                
                  return (
                    <AppointmentCard_forProfessional_Calendar
                    key={x.Number_appointment}
                    Number_appointment={x.Number_appointment}  
                      status={x.Appointment_status}
                      Date={x.Date}
                      Start_time={x.Start_Hour}
                      End_time={x.End_Hour}
                      Is_client_house1={x.Is_client_house1=="YES"?"טיפול בבית הלקוח":"טיפול בבית העסק"}
                    />
                  )
              })}
          </View>}


          {showText4 && <View>
            {allAppointmentEnd && allAppointmentEnd.length > 0 &&
              allAppointmentEnd.map(x => {
                if (x.Appointment_status == "Appointment_ended")
                  return (
                    <AppointmentCard_forProfessional_Calendar
                    key={x.Number_appointment}
                    Number_appointment={x.Number_appointment} 
                    backgroundColor={"rgb(92, 71, 205)"}
                      status={x.Appointment_status}
                      Date={x.Date}
                      Start_time={x.Start_Hour}
                      End_time={x.End_Hour}
                      Is_client_house1={x.Is_client_house1=="YES"?"טיפול בבית הלקוח":"טיפול בבית העסק"}
                    />
                  )
              })}
          </View>}


          {showText3 && <View style={styles.view1}>
            {FutureAppointment && FutureAppointment.length > 0 &&
              FutureAppointment.map(x => {
                return (
                  <AppointmentCard_forProfessional_Calendar
                  key={x.Number_appointment}
                    Number_appointment={x.Number_appointment} 
                  backgroundColor={"rgb(92, 71, 205)"}
                    status={x.Appointment_status}
                    Date={x.Date}
                    Start_time={x.Start_Hour}
                    End_time={x.End_Hour}
                    Client_Name={x.First_name_client}
                    Client_Last_Name={x.Last_name_client}

                    
                  />
                )
              })}
          </View>}    
          <New_Calendar/>
        </View>

      </ScrollView>
     {/* {showLoading&&<Loading text='מביא את נתוני הלקוח'/>}  */}
      <Menu_professional />
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 12,
    flexDirection: 'row',
    // alignItems: 'center'

  },

  view1: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: 10,
    //  borderColor:'#9acd32'

  },
  view: {
    flex: 1,
    flexDirection: 'column',

  },
  wel: {
    textAlign: "center",
    fontSize: 30,
    color: '#9acd32',
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    color:"white"
  }


});