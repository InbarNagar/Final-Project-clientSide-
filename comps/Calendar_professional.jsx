import { View, ScrollView, StyleSheet, Text } from "react-native";
import Header from "./obj/Header";
import Button from "./obj/Button";
import Menu_professional from "./obj/Menu_professional";
import moment from "moment";
import { FutureAppointmentB, allApoB } from "./obj/FunctionAPICode";
import { useState } from "react";
import { UserContext } from '../comps/UserDietails';
import React, { useContext } from "react";
import { FutureAppointmenB } from "./obj/FunctionAPICode";
//מסך ראשי בעל עסק
export default function Calendar_professional() {


  const { userDetails, setUserDetails } = useContext(UserContext);
  const BussinesNumber = userDetails.Business_Number;

  const [allAppointment, setallAppointment] = useState([])
  const [allAppointmentAvilable, setallAppointmentAvilable] = useState([])
  const [allAppointmentEnd, setallAppointmentEnd] = useState([])
  const [FutureAppointment, setFutureAppointment] = useState([])

  const [showText, setShowText] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [showText3, setShowText3] = useState(false);
  const [showText4, setShowText4] = useState(false);

  const handleSubmit = () => {
    console.log(allAppointment, allAppointment.length)

    allApoB(BussinesNumber).then((result) => {

      if (result.data)
        setallAppointment(result.data)

    }, (error) => {
      console.log('error', error)
    })

    setShowText2(!showText2);

  }

  // const handleSubmit2 = () => {

  //     allApoB(BussinesNumber).then((result) => {
  //       if (result.data)

  //       setallAppointment(result.data)

  //   const filteredNumbers = allAppointment.filter((x) =>
  //       x.Appointment_status =="Available"  
  // );
  //    setallAppointmentAvilable(filteredNumbers)
  // console.log(allAppointmentAvilable.length,"************************")
  //     }, (error) => {
  //       console.log('error', error)
  //     })
  //   }


  const handleSubmit2 = () => {

    allApoB(BussinesNumber).then((result) => {

      if (result.data) {
        setallAppointmentAvilable(result.data)
      }
      console.log(allAppointmentAvilable.length, "***********")

    }, (error) => {
      console.log('error', error)
    })

    setShowText(!showText);
  }

  const handleSubmit4 = () => {

    allApoB(BussinesNumber).then((result) => {

      if (result.data)
        setallAppointmentEnd(result.data)

    }, (error) => {
      console.log('error', error)
    })

    setShowText4(!showText4);
  }

  const handleSubmit3 = () => {

    FutureAppointmenB(BussinesNumber).then((result) => {

      if (result.data)
        console.log(result.data)
      setFutureAppointment(result.data)
      console.log("********",FutureAppointment.length)
    }, (error) => {
      console.log('error', error)
    })

    setShowText3(!showText3);
  }

  return (
    <ScrollView>
      <View style={styles.view}>
        <ScrollView horizontal={true}>
          <View style={styles.container}>
            <Button title={showText2 ? 'Hide Text' : 'Show Text'} onPress={handleSubmit} text="כל התורים" color="#ffffff" />
            <Button title={showText ? 'Hide Text' : 'Show Text'} onPress={handleSubmit2} text="תורים פנויים" color="#98FB98" />
            <Button title={showText3 ? 'Hide Text' : 'Show Text'} onPress={handleSubmit3} text="תורים שנקבעו" color="#FF6961" />
            <Button title={showText4 ? 'Hide Text' : 'Show Text'} onPress={handleSubmit4} text="תורים שנגמרו" color="#87CEFA" />
          </View>
        </ScrollView>


        <View style={styles.view1}>
          {allAppointment && allAppointment.length > 0 &&
            allAppointment.map(x => {
              console.log(x.Date)
              return (
                <View> 
                  {showText2 &&
                  <Text>
                    {moment(x.Date).format('DD/MM/YYYY')}
                  </Text>}

                  {showText2 && <Text>
                    {x.Start_time}
                  </Text>}

                  {showText2 && <Text>
                  
                    {x.End_time}
                  </Text>}

                  {showText2 && <Text>
                    {x.Is_client_house == "NO" ? "בבית העסק" : "בבית הלקוח"}
                  </Text>}

                  {showText2 && <Text>
                    {x.Appointment_status == "available" ? "זמין" : "לא זמין"}
                  </Text>}
                </View>
           )})}
        </View>

        <View style={styles.view1}>
          {allAppointmentAvilable &&
            allAppointmentAvilable.map(x => {
              if (x.Appointment_status == "available"||x.Appointment_status=="available")
                return (
                  <View>
                  {showText3 &&  <Text>
                      תאריך
                      {moment(x.Date).format('DD/MM/YYYY')}
                    </Text>}

                    {showText && <Text>
                      שעת התחלה
                      {x.Start_time}
                     </Text>}

                     {showText &&  <Text>
                      שעת סיום
                      {x.End_time}
                    </Text>}


                    {showText &&  <Text>

                      {x.Is_client_house == "NO" ? "בבית העסק" : "בבית הלקוח"}
                    </Text> }


                    {showText && <Text>
                      {x.Appointment_status == "Available" ? "זמין" : ""}
                    </Text>}
                  </View>
                )
            })}
        </View>


        <View style={styles.view1}>
          {allAppointmentEnd && allAppointmentEnd.length > 0 &&
            allAppointmentEnd.map(x => {
              if (x.Appointment_status == "Appointment_ended")
                return (
                  <View>
                    {showText4 && <Text>
                      תאריך
                      {moment(x.Date).format('DD/MM/YYYY')}
                    </Text>}

                    {showText4 &&<Text>
                      שעת התחלה
                      {x.Start_time}
                    </Text>}

                    {showText4 &&   <Text>
                      שעת סיום
                      {x.End_time}
                    </Text>}


                    {showText4 &&    <Text>

                      {x.Is_client_house == "NO" ? "בבית העסק" : "בבית הלקוח"}
                    </Text>}


                    {showText4 &&  <Text>

                      {x.Appointment_status == "Appointment_ended" ? "תור שנגמר" : ""}
                    </Text>}
                  </View>
                )
            })}
        </View>


        <View style={styles.view1}>
          {FutureAppointment && FutureAppointment.length > 0 &&
            FutureAppointment.map(x => {
              return (
                <View>
                 {showText3 &&  <Text>
                    עיר:
                    {x.AddressCity}
                  </Text>}

                  {showText3  &&  <Text>
                    רחוב:
                    {x.AddressStreet}
                  </Text>}

                  {showText3  &&  <Text>
                    מספר בית:
                    {x.AddressHouseNumber}
                  </Text>}

                  {showText3  &&   <Text>
                    תעודת זהות לקוח:
                    {x.Client_ID_number}
                  </Text>}


                  {showText3 &&    <Text>
                    תאריך:
                    {moment(x.Date).format('DD/MM/YYYY')}
                  </Text>}

                  {showText3  &&  <Text>
                    שעת התחלה:
                    {x.Start_time}
                  </Text>}

                  {showText3  &&  <Text>
                    שעת סיום:
                    {x.End_time}
                  </Text>}


                  {showText3  &&   <Text>
                    שם פרטי:
                    {x.First_name_client}
                  </Text>}


                  {showText3  &&  <Text>
                    שם משפחה:
                    {x.Last_name_client}
                  </Text>}

                </View>
              )
            })}
        </View>
      </View>

    </ScrollView>
  );
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
    borderColor:"black",
    borderWidth:2,
  },
  view: {
    flex: 1,
    flexDirection: 'column',
  }


});
