import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import { NewTreatmentForBussines, Treatment_type_GET, Category_GET } from './obj/FunctionAPICode';
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
 //const [durationn, setDurationn] = useState(null);
    // const [duration, setduration] = useState(false);
    // const [durationTime, setdurationTime] = useState(new Date());
    const [durationTimePicker, setdurationTimePicker] = useState(false);
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const [idNumberbusiness, setIdNumber] = useState(''); // ללוקאלסטורג
    
    // const [duration, setDuration] = useState(null);

    const [openC, setOpenC] = useState(false);
    const [openT, setOpenT] = useState(false);
    const [openD, setOpenD] = useState(false);

    const [duration, setDuration] = useState(null);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  // התחל עם זמן כלשהו, אך עם דקות שהן אפס
  const initialTime = new Date();
  initialTime.setMinutes(0);
  const [date, setDate] = useState(initialTime);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");

    // שינוי זה ימיר את התאריך לפורמט של שעות:דקות
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    setDuration(`${hours}:${minutes}`);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode("time");
  };


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

const getHoursInterface = () => {
  let data = []
  for(let i=0; i<=23; i++) {
    const temp = 15;
    for (let x=0; x<=3; x++) {
      let tempDate = new Date()
      tempDate.setSeconds(0)
      tempDate.setHours(i)
      tempDate.setMinutes(temp * x)
      data.push({
        label: (i < 10 ? '0' + i : i) + ':' + (x == 0 ? '00' : temp * x),
        value: tempDate
      })
    }
  }
  return data
}

const hoursSelected = (e) => {
  console.log(e)
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
      console.log(idNumberbusiness,"%%%%%%%%%%%%%%%%%%%%%%%%%%%")
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
        if (selectedTreatment && selectedCategory &&price && duration) {
         
        const newTreatment = {
            Type_treatment_Number: selectedTreatment,
            Category_Number: selectedCategory,
            Business_Number: idNumberbusiness,
            Price: Number(price),
            Treatment_duration: duration
            //.toLocaleTimeString(),
          };
          console.log(newTreatment,"**********************************");
          NewTreatmentForBussines(newTreatment).then(result => {
            console.log(result.data)
            console.log(result.status)
            Alert.alert(
               'העסק נוסף בהצלחה',
              'שמחים שהצטרפתם למשפחת Beauty Me. '+
              'תרצו להוסיף טיפול נוסף?',
              [
                { text: 'הוספת טיפול נוסף', onPress: () => {
                  setSelectedTreatment(null)
                  setSelectedCategory(null)
                  setPrice(null)
                  setDuration(null)
                } },
                { text: 'ייאאלה בואו נתחיל', onPress: () => {props.navigation.navigate('LogInGenral',{userType:'Pro'})} },
              ],
              { cancelable: false }
            );
        }).catch(error => {
            console.log(error);
        });
        };}

        // const handledurationTime = (event, selectedTime) => {
        //     const currentTime = selectedTime || startTime;
        //     setdurationTimePicker(false);
        //     setdurationTime(currentTime);
        //   };

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
          <ScrollView>
            <TouchableOpacity style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <Header text="צור את תפריט הטיפולים שלך" fontSize={50} height={200}/>
              <DropDownPicker
  open={openT}
  items={treatments.map(treatment => ({ label: treatment.Name, value: treatment.Type_treatment_Number }))}
  setOpen={setOpenT}
  setValue={setSelectedTreatment}
  placeholder="בחר טיפול"
  value={selectedTreatment}
  containerStyle={{ height: 40, borderColor: '#d3d3d3', borderRadius: 10 }}
  onChangeItem={item => setSelectedTreatment(item.value)}
  searchable={true}
  style={{ backgroundColor: '#fafafa', zIndex: 10000 }}
  dropDownContainerStyle={{backgroundColor: '#FFFFFF'}}
  listMode="MODAL"
  positionFixed={true}
  itemStyle={{ justifyContent: 'flex-start' }}
  placeholderStyle={{ color: 'gray' }}
  labelStyle={{ fontSize: 14, color: '#000' }}
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
  searchable={true}
  style={{ zIndex: 9999 }}
  dropDownContainerStyle={{backgroundColor: '#FFFFFF'}}
  listMode="MODAL"  // שימוש במצב מודאל
  positionFixed={true}
/>
                              <Text>{'\n'}</Text>

                     <View>
                      <Button onPress={showTimepicker} title=" בחר משך זמן טיפול" />
                    </View>
                    {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      {duration && <Text>Duration: {duration}</Text>}
                    {/* <DropDownPicker
                      open={openD}
                      items={getHoursInterface()}
                      setOpen={setOpenD}
                      setValue={setdurationTime}  // שינוי כאן
                      placeholder="זמן הטיפול"
                      value={durationTime}
                      containerStyle={{ height: 40 }}
                      onChangeItem={item => setdurationTime(item.value)}  // שינוי כאן
                      searchable={true} // ניתן לחפש באמצעות טקסט
                      style={{ zIndex: 9999 }} // סגנון נוסף לרשימה הנגללת
                      dropDownContainerStyle={{backgroundColor: '#FFFFFF'}}
                      listMode="SCROLLVIEW"
                      positionFixed={true}
                    /> */}
                    {/* { (
                        // <DateTimePicker
                        // value={durationTime}
                        // mode="time"
                        // display="default"
                        // onChange={handledurationTime}
                        // />
                        
                    )} */}
              <Text>{'\n'}</Text>
              <Text style={styles.title}>מחיר</Text>
                  <View style={styles.inp}>
                    <TextInput
                      style={styles.input}
                      placeholder="מחיר"
                      value={price}
                      onChangeText={setPrice}
                    />

      </View>

                <Button
                title="צור תפריט טיפולים"
                onPress={addTreatment}
                disabled={!selectedTreatment || !selectedCategory || !price || !duration}
                />


                </View>
                </TouchableOpacity>

</ScrollView>
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

