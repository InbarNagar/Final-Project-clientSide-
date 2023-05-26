import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Input } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import {Treatment_type_GET} from './obj/FunctionAPICode';
import {Category_GET} from './obj/FunctionAPICode';
import {NewTreatmentForBussines} from './obj/FunctionAPICode';
import Calendar_professional from './Calendar_professional';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import LogIn from './GenralComps/LogIn'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './obj/Header';


const Menu_treatment_registration = (props) =>{

    const [treatments, setTreatments] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedTreatment, setSelectedTreatment] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [price, setPrice] = useState(null);
    const [durationn, setDurationn] = useState(null);
    const [duration, setduration] = useState(false);
    const [durationTime, setdurationTime] = useState(new Date());
    const [durationTimePicker, setdurationTimePicker] = useState(false);
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const [idNumberbusiness, setIdNumber] = useState(''); // ללוקאלסטורג

    // const [duration, setDuration] = useState(null);

    const [openC, setOpenC] = useState(false);
    const [openT, setOpenT] = useState(false);

    const navigation = useNavigation();

    // const { navigation, route } = props
    //  let businessID = route.params.businessId
    //  navigation = useNavigation();

const bus = 1;


const handelLocalstorage = async () => { //קבלת הנתונים הרצויים מהלוקאלסטורג
  try {
    console.log("qq")
    const idbusiness = await AsyncStorage.getItem('businessId');
    console.log("bb")
    console.log(idbusiness)
    console.log('idNumber loaded successfully', idbusiness);
    setIdNumber(idbusiness || '');
    console.log(idNumberbusiness)
  } catch (error) {
    console.log('Failed to load idNumber from AsyncStorage', error);
  }
}

const printAsyncStorageKeys = async () => { // פונקציה שכל מטרתה הוא לבדוק איזה מפתחות יש בלוקאלסטורג ואיך קוראים להם
  const keys = await AsyncStorage.getAllKeys();
  console.log("AsyncStorage keys: ", keys);
}

async function loadData() {
  await handelLocalstorage();
  printAsyncStorageKeys();
  await fetchTreatments();
  await fetchCategories();
  console.log("dddd" + idNumberbusiness)
}
    useEffect(() => {
      loadData();
      // handelLocalstorage();
      // printAsyncStorageKeys();
      //   fetchTreatments();
      //   fetchCategories();
      //   console.log("dddd" + idbusiness)
      //   // PushNotificationIOS.localNotification({
      //   //     alertTitle: "New message",
      //   //     alertBody: "You have a new message!",
      //   //     userInfo: { messageId: "123" },
      //   //   });
      }, []);

      const fetchTreatments = async () => {
        try {
            console.log("222")
          const response = await Treatment_type_GET();
          console.log(response);
        //   const data = await response.json();
        //   console.log(data);
          console.log("111");
          setTreatments(response);
          console.log("333");
          console.log(treatments);
        } catch (error) {
          console.error(error);
        }
      };
    
      const fetchCategories = async () => {
        try {
            console.log("444")
         const responseCategory = await Category_GET();
          console.log("777");
          console.log(responseCategory);
        //   const data = await response.json();
        //   console.log(data);
          console.log("555");
          setCategories(responseCategory);
          console.log("666");
          console.log(categories);
        } catch (error) {
          console.error(error);
        }
      };
    
      const addTreatment = () => {
        if (!selectedTreatment || !selectedCategory || !price || !duration) {
          return;
        }
        const newTreatment = {
            Type_treatment_Number: selectedTreatment,
            Category_Number: selectedCategory,
            Business_Number: idNumberbusiness,
            Price: Number(price),
            Treatment_duration: durationTime.toLocaleTimeString(),
          };
          console.log(newTreatment);
          NewTreatmentForBussines(newTreatment).then(result => {
            console.log(result.data)
            console.log(result.status)
          if(result.status==200){
            // Notificationss("OK", "התור נוסף בהצלחה") 
            Alert.alert(
               'העסק נוסף בהצלחה',
              'שמחים שהצטרפתם למשפחת Beauty Me',
              [
                { text: 'ייאאלה בואו נתחיל', onPress: () => {props.navigation.navigate('LogIn',{userType:'Pro'})
              } },
              ],
              { cancelable: false }
            );
          }
        }).catch(error => {
            console.log(error);
        });
        };

        const handledurationTime = (event, selectedTime) => {
            const currentTime = selectedTime || startTime;
            setdurationTimePicker(false);
            setdurationTime(currentTime);
          };

        // const handleConfirm = (selectedDate) => {
        //     setDuration(selectedDate.getMinutes());
        //     setIsPickerVisible(false);
        //   };
      
        //   setTreatments([...treatments, newTreatment]);
        //   setSelectedTreatment('');
        //   setSelectedCategory('');
        //   setPrice('');
        //   setDuration('');
        


        return (
            <TouchableOpacity style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              {/* <Text style={styles.title}>צור תפריט טיפולים</Text> */}
              <Header text="צור את תפריט הטיפולים שלך" fontSize={50} height={200}/>
        
              <DropDownPicker
                open={openT}
                items={treatments.map(treatment => ({ label: treatment.Name, value: treatment.Type_treatment_Number }))}
                setOpen={setOpenT}
                setValue={setSelectedTreatment}
                placeholder="בחר טיפול"
                value={selectedTreatment}
                containerStyle={{ height: 40}}
                onChangeItem={item => setSelectedTreatment(item.value)}
                searchable={true} // ניתן לחפש באמצעות טקסט
                style={{ zIndex: 9999 }} // סגנון נוסף לרשימה הנגללת
                dropDownContainerStyle={{backgroundColor: '#FFFFFF'}}
                listMode="SCROLLVIEW"
                positionFixed={true}
                />

              <Text>{'\n'}</Text>

              <DropDownPicker
                open={openC}
                items={categories.map(category => ({ label: category.Name, value: category.Category_Number }))}
                setOpen={setOpenC}
                setValue={setSelectedCategory}
                placeholder="בחר קטגוריה"
                value={selectedCategory}
                containerStyle={{ height: 40 }}
                onChangeItem={item => setSelectedCategory(item.value)}
                searchable={true} // ניתן לחפש באמצעות טקסט
                style={{ zIndex: 9999 }} // סגנון נוסף לרשימה הנגללת
                dropDownContainerStyle={{backgroundColor: '#FFFFFF'}}
                listMode="SCROLLVIEW"
                positionFixed={true}
              />
                              <Text>{'\n'}</Text>

              {/* <Text
                placeholder="מחיר"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
                /> */}

            <Text style={styles.title}>מחיר</Text>
                  <View style={styles.inp}>
                    {/* <Text style={styles.label}>סיסמה </Text> */}
                    <TextInput
                      style={styles.input}
                      placeholder="מחיר"
                      value={price}
                      onChangeText={setPrice}
                    />

      </View>

{/* // דקות.... עובד אבל הוא נותן רק עד 59 דקות... כלומר אי אפשר לעשות שעה וחצי נגיד... */}
                {/* <TouchableOpacity onPress={() => setIsPickerVisible(true)}>
                        <Text style={styles.label}>Treatment Duration: {duration} minutes</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isPickerVisible}
                        mode="time"
                        onConfirm={handleConfirm}
                        onCancel={() => setIsPickerVisible(false)}
                    /> */}


              <Text>{'\n'}</Text>

                <TouchableOpacity onPress={() => setduration(true)}>
                        <Text style={styles.label}>משך הטיפול:</Text>
                        {/* <Text style={styles.label}>משך הטיפול: {durationTime.toLocaleTimeString()}</Text> */}
                    </TouchableOpacity>
                    <Text>{'\n'}</Text>
                    {duration && (
                        <DateTimePicker
                        value={durationTime}
                        mode="time"
                        display="default"
                        onChange={handledurationTime}
                        />
                    )}
              <Text>{'\n'}</Text>

                <Button
                title="צור תפריט טיפולים"
                onPress={addTreatment}
                disabled={!selectedTreatment || !selectedCategory || !price || !duration}
                />

                {/* <Button
                title="+"
                type="clear"
                onPress={() => }
                /> */}

                </View>
                </TouchableOpacity>

                );
                };

                const styles = StyleSheet.create({
                container: {
                padding: 20,
                backgroundColor: '#fff',
                alignItems: 'center',
        // justifyContent: 'center'
                },
                title: {
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 10,
                },
                label: {
                  fontSize: 20,
                  fontWeight: 'bold',
                },
                input: {
                  borderWidth: 1,
                  borderColor: '#9acd32',
                  width: "100%",
                  marginRight: 8,
                  borderRadius: 20,
                  height: 50,
              
                },
                inp: {
                  flexDirection: 'row',
                  padding: 2,
                  justifyContent: 'space-between',
                  width: "100%",
                },
                });


                export default Menu_treatment_registration;


// import React, { useState, useEffect} from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { Button, Input } from 'react-native-elements';
// import DropDownPicker from 'react-native-dropdown-picker';
// import {Treatment_type_GET} from './obj/FunctionAPICode';
// import {Category_GET} from './obj/FunctionAPICode';
// import {NewTreatmentForBussines} from './obj/FunctionAPICode';
// import Calendar_professional from './Calendar_professional';
// import { useNavigation } from '@react-navigation/native';
// import { Alert } from 'react-native';
// import { Keyboard, TouchableWithoutFeedback } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import LogIn from './GenralComps/LogIn'
// import AsyncStorage from '@react-native-async-storage/async-storage';





// const Menu_treatment_registration = (props) =>{

//     const [treatments, setTreatments] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [selectedTreatment, setSelectedTreatment] = useState(null);
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [price, setPrice] = useState(null);
//     const [durationn, setDurationn] = useState(null);
//     const [duration, setduration] = useState(false);
//     const [durationTime, setdurationTime] = useState(new Date());
//     const [durationTimePicker, setdurationTimePicker] = useState(false);
//     const [isPickerVisible, setIsPickerVisible] = useState(false);
//     const [idNumberbusiness, setIdNumber] = useState(''); // ללוקאלסטורג

//     // const [duration, setDuration] = useState(null);

//     const [openC, setOpenC] = useState(false);
//     const [openT, setOpenT] = useState(false);

//     const navigation = useNavigation();

//     // const { navigation, route } = props
//     //  let businessID = route.params.businessId
//     //  navigation = useNavigation();

// const bus = 1;


// const handelLocalstorage = async () => { //קבלת הנתונים הרצויים מהלוקאלסטורג
//   try {
//     console.log("qq")
//     const idbusiness = await AsyncStorage.getItem('businessId');
//     console.log("bb")
//     console.log(idbusiness)
//     console.log('idNumber loaded successfully', idbusiness);
//     setIdNumber(idbusiness || '');
//     console.log(idNumberbusiness)
//   } catch (error) {
//     console.log('Failed to load idNumber from AsyncStorage', error);
//   }
// }

// const printAsyncStorageKeys = async () => { // פונקציה שכל מטרתה הוא לבדוק איזה מפתחות יש בלוקאלסטורג ואיך קוראים להם
//   const keys = await AsyncStorage.getAllKeys();
//   console.log("AsyncStorage keys: ", keys);
// }

// async function loadData() {
//   await handelLocalstorage();
//   printAsyncStorageKeys();
//   await fetchTreatments();
//   await fetchCategories();
//   console.log("dddd" + idNumberbusiness)
// }
//     useEffect(() => {
//       loadData();
//       // handelLocalstorage();
//       // printAsyncStorageKeys();
//       //   fetchTreatments();
//       //   fetchCategories();
//       //   console.log("dddd" + idbusiness)
//       //   // PushNotificationIOS.localNotification({
//       //   //     alertTitle: "New message",
//       //   //     alertBody: "You have a new message!",
//       //   //     userInfo: { messageId: "123" },
//       //   //   });
//       }, []);

//       const fetchTreatments = async () => {
//         try {
//             console.log("222")
//           const response = await Treatment_type_GET();
//           console.log(response);
//         //   const data = await response.json();
//         //   console.log(data);
//           console.log("111");
//           setTreatments(response);
//           console.log("333");
//           console.log(treatments);
//         } catch (error) {
//           console.error(error);
//         }
//       };
    
//       const fetchCategories = async () => {
//         try {
//             console.log("444")
//          const responseCategory = await Category_GET();
//           console.log("777");
//           console.log(responseCategory);
//         //   const data = await response.json();
//         //   console.log(data);
//           console.log("555");
//           setCategories(responseCategory);
//           console.log("666");
//           console.log(categories);
//         } catch (error) {
//           console.error(error);
//         }
//       };
    
//       const addTreatment = () => {
//         if (!selectedTreatment || !selectedCategory || !price || !duration) {
//           return;
//         }
//         const newTreatment = {
//             Type_treatment_Number: selectedTreatment,
//             Category_Number: selectedCategory,
//             Business_Number: idNumberbusiness,
//             Price: Number(price),
//             Treatment_duration: durationTime.toLocaleTimeString(),
//           };
//           console.log(newTreatment);
//           NewTreatmentForBussines(newTreatment).then(result => {
//             console.log(result.data)
//             console.log(result.status)
//           if(result.status==200){
//             // Notificationss("OK", "התור נוסף בהצלחה") 
//             Alert.alert(
//                'העסק נוסף בהצלחה',
//               'שמחים שהצטרפתם למשפחת Beauty Me',
//               [
//                 { text: 'ייאאלה בואו נתחיל', onPress: () => navigation.navigate('LogIn') },
//               ],
//               { cancelable: false }
//             );
//           }
//         }).catch(error => {
//             console.log(error);
//         });
//         };

//         const handledurationTime = (event, selectedTime) => {
//             const currentTime = selectedTime || startTime;
//             setdurationTimePicker(false);
//             setdurationTime(currentTime);
//           };

//         // const handleConfirm = (selectedDate) => {
//         //     setDuration(selectedDate.getMinutes());
//         //     setIsPickerVisible(false);
//         //   };
      
//         //   setTreatments([...treatments, newTreatment]);
//         //   setSelectedTreatment('');
//         //   setSelectedCategory('');
//         //   setPrice('');
//         //   setDuration('');
        


//         return (
//             <TouchableOpacity style={styles.container} onPress={Keyboard.dismiss}>
//             <View style={styles.container}>
//               <Text style={styles.title}>צור תפריט טיפולים</Text>
        
//               <DropDownPicker
//                 open={openT}
//                 items={treatments.map(treatment => ({ label: treatment.Name, value: treatment.Type_treatment_Number }))}
//                 setOpen={setOpenT}
//                 setValue={setSelectedTreatment}
//                 placeholder="בחר טיפול"
//                 value={selectedTreatment}
//                 containerStyle={{ height: 40 }}
//                 onChangeItem={item => setSelectedTreatment(item.value)}
//                 searchable={true} // ניתן לחפש באמצעות טקסט
//                 style={{ zIndex: 9999 }} // סגנון נוסף לרשימה הנגללת
//                 />
//                 <Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text>
//                 <Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text>

//               <DropDownPicker
//                 open={openC}
//                 items={categories.map(category => ({ label: category.Name, value: category.Category_Number }))}
//                 setOpen={setOpenC}
//                 setValue={setSelectedCategory}
//                 placeholder="בחר קטגוריה"
//                 value={selectedCategory}
//                 containerStyle={{ height: 40 }}
//                 onChangeItem={item => setSelectedCategory(item.value)}
//                 searchable={true} // ניתן לחפש באמצעות טקסט
//                 style={{ zIndex: 9999 }} // סגנון נוסף לרשימה הנגללת
//               />
                
//               <Input
//                 placeholder="מחיר"
//                 keyboardType="numeric"
//                 value={price}
//                 onChangeText={setPrice}
//                 />

// {/* // דקות.... עובד אבל הוא נותן רק עד 59 דקות... כלומר אי אפשר לעשות שעה וחצי נגיד... */}
//                 {/* <TouchableOpacity onPress={() => setIsPickerVisible(true)}>
//                         <Text style={styles.label}>Treatment Duration: {duration} minutes</Text>
//                     </TouchableOpacity>
//                     <DateTimePickerModal
//                         isVisible={isPickerVisible}
//                         mode="time"
//                         onConfirm={handleConfirm}
//                         onCancel={() => setIsPickerVisible(false)}
//                     /> */}


//                 <TouchableOpacity onPress={() => setduration(true)}>
//                         <Text style={styles.label}>משך הטיפול: {durationTime.toLocaleTimeString()}</Text>
//                     </TouchableOpacity>
//                     {duration && (
//                         <DateTimePicker
//                         value={durationTime}
//                         mode="time"
//                         display="default"
//                         onChange={handledurationTime}
//                         />
//                     )}

//                 <Button
//                 title="צור תפריט טיפולים"
//                 onPress={addTreatment}
//                 disabled={!selectedTreatment || !selectedCategory || !price || !duration}
//                 />

//                 {/* <Button
//                 title="+"
//                 type="clear"
//                 onPress={() => }
//                 /> */}

//                 </View>
//                 </TouchableOpacity>

//                 );
//                 };

//                 const styles = StyleSheet.create({
//                 container: {
//                 padding: 20,
//                 backgroundColor: '#fff',
//                 },
//                 title: {
//                 fontSize: 20,
//                 fontWeight: 'bold',
//                 marginBottom: 10,
//                 },
//                 });


//                 export default Menu_treatment_registration