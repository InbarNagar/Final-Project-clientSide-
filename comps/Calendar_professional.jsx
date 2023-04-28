import { View, ScrollView, StyleSheet, Text } from "react-native";
import Header from "./obj/Header";
import Button from "./obj/Button";
import Menu_professional from "./obj/Menu_professional";
import moment from "moment";
import { allApoB } from "./obj/FunctionAPICode";
import { useState } from "react";
import { UserContext } from '../comps/UserDietails';
import React ,{useContext} from "react";

//מסך ראשי בעל עסק
export default function Calendar_professional() {

  const { userDetails, setUserDetails } = useContext(UserContext);
  const BussinesNumber = userDetails.Business_Number;

  const [allAppointment, setallAppointment] = useState([])
console.log('########',userDetails)
  const handleSubmit = () => {
    console.log(allAppointment, allAppointment.length)
    allApoB(BussinesNumber).then((result) => {

      if (result.data)
        setallAppointment(result.data)

    }, (error) => {
      console.log('error', error)
    })
  }
 
  return (
    <ScrollView>
      <View style={styles.view}>
        <ScrollView horizontal={true}>
          <View style={styles.container}>
            <Button onPress={handleSubmit} text="כל התורים" color="#ffffff" />
            <Button onPress={handleSubmit} text="תורים פנויים" color="#98FB98" />
            <Button onPress={handleSubmit} text="תורים שנקבעו" color="#FF6961" />
            <Button onPress={handleSubmit} text="תורים שנגמרו" color="#87CEFA" />
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

                    {x.Is_client_house=="NO"?"בבית העסק":"בבית הלקוח"}
                  </Text>


                  <Text>

                    {x.Appointment_status=="available"}
                  </Text>
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
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center'

  },

  view: {
    flex: 1,
    flexDirection: 'column',
  }

});
