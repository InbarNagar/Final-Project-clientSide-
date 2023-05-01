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
  const handleSubmit = () => {
    console.log(allAppointment, allAppointment.length)
    allApoB(BussinesNumber).then((result) => {

      if (result.data)
        setallAppointment(result.data)

    }, (error) => {
      console.log('error', error)
    })
  }

  const handleSubmit2 = () => {
    console.log(allAppointmentAvilable, allAppointmentAvilable.length)
    allApoB(BussinesNumber).then((result) => {

      if (result.data)
        setallAppointmentAvilable(result.data)

    }, (error) => {
      console.log('error', error)
    })
  }

  const handleSubmit4 = () => {

    allApoB(BussinesNumber).then((result) => {

      if (result.data)
        setallAppointmentEnd(result.data)

    }, (error) => {
      console.log('error', error)
    })
  }

  const handleSubmit3 = () => {

    FutureAppointmenB(BussinesNumber).then((result) => {

      if (result.data)
        console.log(result.data)
      setFutureAppointment(result.data)
      console.log("****")
    }, (error) => {
      console.log('error', error)
    })
  }

  return (
    <>
    <ScrollView>
      <View style={styles.view}>
        <ScrollView horizontal={true}>
          <View style={styles.container}>
            <Button onPress={handleSubmit} text="כל התורים" color="#ffffff" />
            <Button onPress={handleSubmit2} text="תורים פנויים" color="#98FB98" />
            <Button onPress={handleSubmit3} text="תורים שנקבעו" color="#FF6961" />
            <Button onPress={handleSubmit4} text="תורים שנגמרו" color="#87CEFA" />
          </View>
        </ScrollView>


        <View >
          {allAppointment && allAppointment.length > 0 &&
            allAppointment.map(x => {
              console.log(x.Date)
              return (
                <View>
                  <Text>
                    תאריך
                    {moment(x.Date).format('DD/MM/YYYY')}
                  </Text>

                  <Text>
                    שעת התחלה
                    {x.Start_time}
                  </Text>

                  <Text>
                    שעת סיום
                    {x.End_time}
                  </Text>


                  <Text>

                    {x.Is_client_house == "NO" ? "בבית העסק" : "בבית הלקוח"}
                  </Text>


                  <Text>

                    {x.Appointment_status == "available" ? "זמין" : "לא זמין"}
                  </Text>
                </View>
              )
            })}
        </View>

        <View >
          {allAppointmentAvilable && allAppointmentAvilable.length > 0 &&
            allAppointmentAvilable.map(x => {
              console.log(x.Date)
              return (
                <View>
                  <Text>
                    תאריך
                    {moment(x.Date).format('DD/MM/YYYY')}
                  </Text>

                  <Text>
                    שעת התחלה
                    {x.Start_time}
                  </Text>

                  <Text>
                    שעת סיום
                    {x.End_time}
                  </Text>


                  <Text>

                    {x.Is_client_house == "NO" ? "בבית העסק" : "בבית הלקוח"}
                  </Text>


                  <Text>

                    {x.Appointment_status == "available" ? "זמין" : ""}
                  </Text>
                </View>
              )
            })}
        </View>


        <View >
          {allAppointmentEnd && allAppointmentEnd.length > 0 &&
            allAppointmentEnd.map(x => {
              console.log(x.Date)
              return (
                <View>
                  <Text>
                    תאריך
                    {moment(x.Date).format('DD/MM/YYYY')}
                  </Text>

                  <Text>
                    שעת התחלה
                    {x.Start_time}
                  </Text>

                  <Text>
                    שעת סיום
                    {x.End_time}
                  </Text>


                  <Text>

                    {x.Is_client_house == "NO" ? "בבית העסק" : "בבית הלקוח"}
                  </Text>


                  <Text>

                    {x.Appointment_status == "Appointment_ended" ? "תור שנגמר" : ""}
                  </Text>
                </View>
              )
            })}
        </View>


        <View >
          {FutureAppointment && FutureAppointment.length > 0 &&
            FutureAppointment.map(x => {

              return (
                <View>
                  <Text>
                    עיר:
                    {x.AddressCity}
                  </Text>

                  <Text>
                    רחוב:
                    {x.AddressStreet}
                  </Text>

                  <Text>
                    מספר בית:
                    {x.AddressHouseNumber}
                  </Text>

                  <Text>
                    תעודת זהות לקוח:
                    {x.Client_ID_number}
                  </Text>


                  <Text>
                    תאריך:
                    {moment(x.Date).format('DD/MM/YYYY')}
                  </Text>

                  <Text>
                    שעת התחלה:
                    {x.Start_time}
                  </Text>

                  <Text>
                    שעת סיום:
                    {x.End_time}
                  </Text>


                  <Text>
                    שם פרטי:
                    {x.First_name_client}
                  </Text>


                  <Text>
                    שם משפחה:
                    {x.Last_name_client}
                  </Text>

                </View>
              )
            })}
        </View>




      </View>

    </ScrollView>
    <Menu_professional/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center'

  },

  view: {
    flex: 1,
    flexDirection: 'column',
  }

});