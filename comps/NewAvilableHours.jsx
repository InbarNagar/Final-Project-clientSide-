import React, { useState,useContext } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import { Picker } from '@react-native-picker/picker';
import Button from './CTools/Button';
import { AddNewAvailableHours } from './obj/FunctionAPICode';
import { Alert } from 'react-native';
import { UserContext } from './UserDietails';
import { useNavigation} from "@react-navigation/core";
import Menu_professional from './obj/Menu_professional';
import moment from "moment";

const NewAvailableHours = (Props) => {


    const navigation = useNavigation();

    const [End_time, setSelectedTimeEnd] = useState('00:00');
    const [Start_time, setSelectedTimeStart] = useState('00:00');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [Date, setSelectedDate] = useState('');
    const [Date2, setSelectedDate2] = useState('');
    const { userDetails, setUserDetails } = useContext(UserContext);
    const BussinesNumber = userDetails.Business_Number;
    
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
         setSelectedDate(moment(date).format('DD/MM/YYYY'));
         setSelectedDate2(moment(date).format('YYYY-MM-DD'))
        hideDatePicker();
        
    };

    const handleTimeChange = (time) => {
        setSelectedTimeStart(time);
    };

    const handleTimeChange2 = (time) =>{
        setSelectedTimeEnd(time);
    };

    const hourOptions = [];
    for (let i = 6; i < 24; i++) {
        for (let j = 0; j < 60; j += 15) {
            let hour = i.toString().padStart(2, '0');
            let minute = j.toString().padStart(2, '0');
            hourOptions.push({ label: `${hour}:${minute}`, value: `${hour}:${minute}` });
        }
    }

    const handleSendData = () => {
        
        const [hours, minutes] = Start_time.split(':'); 
        const numericTime = parseInt(hours, 10) + parseInt(minutes, 10) / 60;
        
        const [hour, minute] = End_time.split(':'); 
        const numericTime2 = parseInt(hour, 10) + parseInt(minute, 10) / 60;
        const data = {
            "Business_id":parseInt(BussinesNumber),
            "Date":Date2,
            "Start_time":numericTime,
            "End_time": numericTime2 
        }
        AddNewAvailableHours(data).then((result) => {
            console.log('yes^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', result)
            alert("השינוים נשמרו בהצלחה")
            navigation.navigate('Calendar_professional')

        }, (error) => {
            console.log('error', error)
        });

    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.dateContainer}>
                    <Button text="בחר תאריך" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        confirmTextIOS="אישור"
                        cancelTextIOS="ביטול"
                        locale="he"
                    />
                    <Text style={styles.selectedDate}>{Date}</Text>
                </View>
                <View style={styles.pickerContainer}>
                    <View style={styles.pickerWrapper}>
                        <Text style={styles.pickerLabel}>שעת התחלה</Text>
                        <Picker
                            style={styles.picker}
                            selectedValue={Start_time}
                            onValueChange={handleTimeChange}
                        >
                            {hourOptions.map((option) => (
                                <Picker.Item key={option.value} label={option.label} value={option.value} />
                            ))}
                        </Picker>
                        {/* <Text style={styles.selectedTime}>{selectedTimeStart}</Text> */}
                    </View>
                    <View style={styles.pickerWrapper}>
                        <Text style={styles.pickerLabel}>שעת סיום</Text>
                        <Picker
                            style={styles.picker}
                            selectedValue={End_time}
                            onValueChange={handleTimeChange2}
                        >
                            {hourOptions.map((option) => (
                                <Picker.Item key={option.value} label={option.label} value={option.value} />
                            ))}
                        </Picker>
                        {/* <Text style={styles.selectedTime}>{selectedTimeEnd}</Text> */}
                    </View>
                </View>



            </ScrollView>

            <View style={styles.buttonContainer}>
                <Button text="שלח" onPress={handleSendData} />
            </View>

            <Menu_professional/>
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    selectedDate: {
        fontSize: 26,
        marginTop: 16,
        textAlign: 'center',
        color: 'rgb(92, 71, 205)',
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    pickerWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    pickerLabel: {
        fontSize: 16,
        marginBottom: 8,
    },
    picker: {
        height: 50,
        width: '80%',
        alignSelf: 'center',
    },
    selectedTime: {
        fontSize: 16,
        marginTop: 8,
    },
    buttonContainer: {
        paddingHorizontal: 20,
        marginBottom: 50,
        height: 150,
        width: 150,
        alignItems: 'center'
    },
});

export default NewAvailableHours;