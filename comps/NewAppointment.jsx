import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Switch, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import Menu_treatment_registration from './Menu_treatment_registration';
import Button from './obj/Button';
import {NewAppointmentPost} from './obj/FunctionAPICode';
import { Header } from 'react-native-elements';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';




const Stack = createNativeStackNavigator();

const NewAppointment = () => {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [canGoToClient, setCanGoToClient] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [businessNumber, setBusinessNumber] = useState('');
  const [Appointment_status, setAppointment_status] = useState('not available');
  const [idNumber, setIdNumber] = useState(''); // ללוקאלסטורג
   
    const handelLocalstorage = async () => { //קבלת הנתונים הרצויים מהלוקאלסטורג
      try {
        const id = await AsyncStorage.getItem('idNumber_professional');
        console.log('idNumber loaded successfully', id);
        setIdNumber(id || '');
      } catch (error) {
        console.log('Failed to load idNumber from AsyncStorage', error);
      }
    }

    const printAsyncStorageKeys = async () => { // פונקציה שכל מטרתה הוא לבדוק איזה מפתחות יש בלוקאלסטורג ואיך קוראים להם
      const keys = await AsyncStorage.getAllKeys();
      console.log("AsyncStorage keys: ", keys);
    }

    useEffect(() => {
      printAsyncStorageKeys()
      handelLocalstorage()
    }, []);
     

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };
  

  const handleStartTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || startTime;
    setShowStartTimePicker(false);
    setStartTime(currentTime);
  };

  const handleEndTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || endTime;
    setShowEndTimePicker(false);
    setEndTime(currentTime);
  };

  const getYesNoFromSwitchValue = (value) => {
    return value ? 'YES' : 'NO';
  };

  const handleSubmit = async () => {
    const data = {
      Date: date,
      Start_time: startTime.toLocaleTimeString(),
      End_time: endTime.toLocaleTimeString(),
      Is_client_house: getYesNoFromSwitchValue(canGoToClient),
    //   Is_client_house: canGoToClient,
      Business_Number: businessNumber,
      Appointment_status: Appointment_status
    };

//         fetch('http://proj.ruppin.ac.il/cgroup93/prod/api/Appointment/NewAppointment', {
//       method: 'POST',
//       headers: new Headers({
//         "Content-type": "application/json; charset=UTF-8", 
//         'Accept': "application/json; charset=UTF-8",
//     }),
//       body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(result => {
//       console.log('Success:', result);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     })
//     .then(<NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Menu_treatment_registration" component={Menu_treatment_registration} />
//         </Stack.Navigator>
//       </NavigationContainer>);
       

//   };
    



//ככה עובד לי בלי להכניס ללוקאל סטורג
    // NewAppointmentPost(data).then((result) => {
    //     // console.log('yes', result)
    //     console.log('yes', result.appointmentId);
    //   }, (error) => {
    //     console.log('error', error)
    //   })
    //   .then(<NavigationContainer>
    //             <Stack.Navigator>
    //                <Stack.Screen name="Menu_treatment_registration" component={Menu_treatment_registration} />
    //             </Stack.Navigator>
    //            </NavigationContainer>);
    //            console.log(1);


    // ככה מנסה עם לשמור בלוקאל סטורג... צריל לבדוק שזה עובד!
               try {
                const result = await NewAppointmentPost(data);
                console.log(data);
                console.log(NewAppointmentPost(data));
                console.log(result);
                console.log('yes', result.appointmentId);
                await AsyncStorage.setItem('appointmentId', result.appointmentId);
                navigation.navigate('Menu_treatment_registration');
              } catch (error) {
                console.log('error', error);
              }
            
              console.log(1);
            };
            
            
         

  return (
    <View style={styles.container}>
        <Header text="הוספת תור חדש" color="red" />

    <TextInput
     style={styles.input}
     onChangeText={setBusinessNumber}
     value={businessNumber}
     placeholder="Business Number"
     keyboardType="numeric"
   />

      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.label}>Date: {date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
  
      <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
        <Text style={styles.label}>Start Time: {startTime.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {showStartTimePicker && (
        <DateTimePicker
          value={startTime}
          mode="time"
          display="default"
          onChange={handleStartTimeChange}
        />
      )}
  
      <TouchableOpacity onPress={() => setShowEndTimePicker(true)}>
        <Text style={styles.label}>End Time: {endTime.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {showEndTimePicker && (
        <DateTimePicker
          value={endTime}
          mode="time"
          display="default"
          onChange={handleEndTimeChange}
        />
      )}
  
  <View style={styles.row}>
      <Text style={styles.label}>Can go to client:</Text>
      <Switch value={canGoToClient} onValueChange={setCanGoToClient} />
    </View>

    
   
    <Button onPress={handleSubmit} text="הוספת התור" color="#98FB98" />
      {/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Appointment</Text>
      </TouchableOpacity> */}
    </View>
  );
  };

  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 3,
      width: '100%',
      marginTop: 10,
      marginBottom: 20,
      fontSize: 18,
    },
    button: {
      backgroundColor: 'blue',
      padding: 15,
      borderRadius: 10,
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
  });

export default NewAppointment ;


