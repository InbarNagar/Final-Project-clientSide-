
import { View, ScrollView, StyleSheet, Text } from "react-native";
import Header from "../obj/Header";
import Button from "../obj/Button";
import Menu_professional from "../obj/Menu_professional";
import { FutureAppointmentB, allApoB } from "../obj/FunctionAPICode";
import { useState } from "react";
import { UserContext } from '../UserDietails';
import React, { useContext } from "react";
import { FutureAppointmenB, AllAppointmentForClientt } from "../obj/FunctionAPICode";
import { Post_SendPushNotification } from "../obj/FunctionAPICode";
import AppointmentCard_forProfessional_Calendar from "../obj/AppointmentCard_forProfessional_Calendar";
import { ClientDetailes } from "../obj/FunctionAPICode";
import ShowReviews from "../ShowReviews";
import New_Calendar from "../New_Calender";
import { AllApointemtDetailesForClient_With_BusinessReview } from "../obj/FunctionAPICode";
import Menu_Client from "../obj/Menu_Client";
import {DDD } from "../obj/FunctionAPICode";
import AppointmentCard_forClient from "./AppointmentCard_forClient";



// const all = [
//   {
//     "Number_appointment": 1128,
//     "Date": "2023-05-22",
//     "Is_client_house": "NO",
//     "Business_Number": 4,
//     "Appointment_status": "Appointment_ended",
//     "ID_Client": 123456789,
//     "Start_Hour": 10,
//     "End_Hour": 10,
//     "Type_Treatment_Number": null,
//     "Review_Number": 5,
//     "Cleanliness": 3,
//     "Professionalism": 3,
//     "On_time": 3,
//     "Overall_rating": 3,
//     "Comment": "היה מקצועי מאוד ואחזור אליה!",
//     "Client_ID_number": 123456789,
//     "Business_Name": "עולם היופי",
//     "AddressStreet": "פנחס לבון",
//     "AddressCity": "נתניה",
//     "Professional_ID_number": 123455555,
//     "About": "עולם היופי של נתניה",
//     "phone": "0528710098",
//     "Facebook_link": "https://www.facebook.com/ofir.bidani/",
//     "Instagram_link": "https://www.instagram.com/ofir_bidani1/",
//     "AddressHouseNumber": 16,
//     "LetCordinate": 32.2838812,
//     "LongCordinate": 34.8540928
//   },
//   {
//     "Number_appointment": 1135,
//     "Date": "2023-05-24",
//     "Is_client_house": "YES",
//     "Business_Number": 4,
//     "Appointment_status": "Appointment_ended",
//     "ID_Client": 123456789,
//     "Start_Hour": 17.033333,
//     "End_Hour": 17.033333,
//     "Type_Treatment_Number": null,
//     "Review_Number": null,
//     "Cleanliness": null,
//     "Professionalism": null,
//     "On_time": null,
//     "Overall_rating": null,
//     "Comment": null,
//     "Client_ID_number": 123456789,
//     "Business_Name": "עולם היופי",
//     "AddressStreet": "פנחס לבון",
//     "AddressCity": "נתניה",
//     "Professional_ID_number": 123455555,
//     "About": "עולם היופי של נתניה",
//     "phone": "0528710098",
//     "Facebook_link": "https://www.facebook.com/ofir.bidani/",
//     "Instagram_link": "https://www.instagram.com/ofir_bidani1/",
//     "AddressHouseNumber": 16,
//     "LetCordinate": 32.2838812,
//     "LongCordinate": 34.8540928
//   },
//   {
//     "Number_appointment": 1136,
//     "Date": "2023-05-30",
//     "Is_client_house": "YES",
//     "Business_Number": 4,
//     "Appointment_status": "Appointment_ended",
//     "ID_Client": 123456789,
//     "Start_Hour": 10.5,
//     "End_Hour": 10.5,
//     "Type_Treatment_Number": null,
//     "Review_Number": null,
//     "Cleanliness": null,
//     "Professionalism": null,
//     "On_time": null,
//     "Overall_rating": null,
//     "Comment": null,
//     "Comment": "כיף חיים",
//     "Client_ID_number": 123456789,
//     "Business_Name": "עולם היופי",
//     "AddressStreet": "פנחס לבון",
//     "AddressCity": "נתניה",
//     "Professional_ID_number": 123455555,
//     "About": "עולם היופי של נתניה",
//     "phone": "0528710098",
//     "Facebook_link": "https://www.facebook.com/ofir.bidani/",
//     "Instagram_link": "https://www.instagram.com/ofir_bidani1/",
//     "AddressHouseNumber": 16,
//     "LetCordinate": 32.2838812,
//     "LongCordinate": 34.8540928
//   },
//   {
//     "Number_appointment": 1137,
//     "Date": "2023-06-08",
//     "Is_client_house": "YES",
//     "Business_Number": 1049,
//     "Appointment_status": "Awaiting_approval",
//     "ID_Client": 123456789,
//     "Start_Hour": 16,
//     "End_Hour": 16,
//     "Type_Treatment_Number": null,
//     "Review_Number": 10,
//     "Cleanliness": 7,
//     "Professionalism": 7,
//     "On_time": 5,
//     "Overall_rating": 5,
//     "Comment": "מעולה",
//     "Client_ID_number": 123456789,
//     "Business_Name": "By Neta",
//     "AddressStreet": "פרישמן",
//     "AddressCity": "תל אביב",
//     "Professional_ID_number": 308547631,
//     "About": null,
//     "phone": null,
//     "Facebook_link": null,
//     "Instagram_link": null,
//     "AddressHouseNumber": 39,
//     "LetCordinate": 32.0798131,
//     "LongCordinate": 34.773688
//   },
//   {
//     "Number_appointment": 1130,
//     "Date": "2023-05-22",
//     "Is_client_house": "NO",
//     "Business_Number": 4,
//     "Appointment_status": "Confirmed",
//     "ID_Client": 123456789,
//     "Start_Hour": 13,
//     "End_Hour": 13,
//     "Type_Treatment_Number": null,
//     "Review_Number": 11,
//     "Cleanliness": null,
//     "Professionalism": 7,
//     "On_time": 7,
//     "Overall_rating": 7,
//     "Comment": "כן נחמד מאוד",
//     "Client_ID_number": 123456789,
//     "Business_Name": "עולם היופי",
//     "AddressStreet": "פנחס לבון",
//     "AddressCity": "נתניה",
//     "Professional_ID_number": 123455555,
//     "About": "עולם היופי של נתניה",
//     "phone": "0528710098",
//     "Facebook_link": "https://www.facebook.com/ofir.bidani/",
//     "Instagram_link": "https://www.instagram.com/ofir_bidani1/",
//     "AddressHouseNumber": 16,
//     "LetCordinate": 32.2838812,
//     "LongCordinate": 34.8540928
//   }
// ]



//מסך ראשי בעל עסק
export default function My_Appintments() {


  const { userDetails, setUserDetails } = useContext(UserContext);
  const IDNumber = userDetails.ID_number;

//   BussinesNumber

  const [allAppointment, setallAppointment] = useState([])
  const [allAppointmentAvilable, setallAppointmentAvilable] = useState([])
  const [allAppointmentEnd, setallAppointmentEnd] = useState([])
  const [FutureAppointment, setFutureAppointment] = useState([])
  const [Client, setclient] = useState([])

  const [showText, setShowText] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [showText3, setShowText3] = useState(false);
  const [showText4, setShowText4] = useState(false);

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
   
    AllAppointmentForClientt(userDetails.ID_number).then((result) => {

      if (result)
        setallAppointment(result)
        console.log(result, "1111")
        console.log(result.data, "2222")

    }, (error) => {
      console.log('error', error)
    })

    setShowText2(!showText2);

  }

  // const handleSubmit2 = () => {
  //   let filterresult1=""
  //   AllAppointmentForClientt(userDetails.ID_number).then((result) => {

  //     if (result) {
  //       filterresult1= result.filter(apo=> apo.Appointment_status =="Awaiting_approval")
  //       //console.log(filterresult1,"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
  //       setallAppointmentAvilable(filterresult1)
  //     }
  //     console.log(allAppointmentAvilable.length, "*****")

  //   }, (error) => {
  //     console.log('error', error)
  //   })

  //   setShowText(!showText);
  // }

  const handleSubmit4 = () => {

    AllAppointmentForClientt(userDetails.ID_number).then((result) => {
        let filterresult=""
      if(result)
     filterresult = result.filter(apo=> apo.Appointment_status =="Appointment_ended")
    // console.log(filterresult,"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    setallAppointmentEnd(result)


    }, (error) => {
      console.log('error', error)
    })

    setShowText4(!showText4);
  }

  const handleSubmit3 = () => {

    AllAppointmentForClientt(userDetails.ID_number).then((result) => {
        let filterresult3=""
      if(result)
     filterresult3= result.filter(apo=> apo.Appointment_status =="confirmed")
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

           <ScrollView horizontal={true}>
            <View style={styles.container}>

              <Button title={showText2 ? 'Hide Text' : 'Show Text'} onPress={handleSubmit} text="כל התורים" color="rgb(92, 71, 205)" colortext="white"/>
              {/* <Button title={showText ? 'Hide Text' : 'Show Text'} onPress={handleSubmit2} text="תורים שמחכים לאישור" color="rgb(92, 71, 205)" colortext="white"/> */}
              <Button title={showText3 ? 'Hide Text' : 'Show Text'} onPress={handleSubmit3} text="תורים שנקבעו" color="rgb(92, 71, 205)" colortext="white"/>
              <Button title={showText4 ? 'Hide Text' : 'Show Text'} onPress={handleSubmit4} text="תורים שנגמרו" color="rgb(92, 71, 205)" colortext="white"  />
              {/* <Button title={showText4 ? 'Hide Text' : 'Show Text'} onPress={test} text=" cshev" color="#87CEFA" /> */}
             </View>
          </ScrollView> 

          

          {showText2 && <View style={styles.view1}>
            {allAppointment && allAppointment.length > 0 &&
              allAppointment.map((appointment) => {
              console.log("key: "+appointment.Number_appointment);
              return (
                <AppointmentCard_forClient
                  key={appointment.Number_appointment}
                  Review_Number={appointment.Review_Number}
                  Number_appointment={appointment.Number_appointment}
                  backgroundColor={"rgb(229, 222, 255)"}
                  Date1={appointment.Date}
                  Start_time={appointment.Start_time}
                  End_time={appointment.End_time}
                  AddressStreet={appointment.AddressStreet}
                  AddressHouseNumber={appointment.AddressHouseNumber}
                  AddressCity={appointment.AddressCity}
                  BusinessName={appointment.Business_Name}
                  Business_Number={appointment.Business_Number}
                  ClientIDnumber={userDetails.ID_number}
                  Appointment_status={appointment.Appointment_status}
                />
              );
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
          {/* <New_Calendar/> */}
        </View>

      </ScrollView>
      <Menu_Client />
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




//  {/* allAppointment.map(x => {
               
//                 console.log(x.Date)
//                 return (
//                   <AppointmentCard_forProfessional_Calendar
//                     key={x.Number_appointment}
//                     Number_appointment={x.Number_appointment}
//                     backgroundColor={"rgb(92, 71, 205)"}
//                     // Treatment_Type= 
//                     status={x.Appointment_status}
//                     Date={x.Date}
//                     Start_time={x.Start_Hour}
//                     End_time={x.End_Hour}
//                     Client_Name={x.First_name}
//                     Client_Last_Name={x.Last_name}
//                   />
//                 )}) */}