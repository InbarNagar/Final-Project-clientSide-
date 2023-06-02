import {React,useState,useEffect,useContext} from "react";
import {Text,View,Alert} from 'react-native';
import { useNavigation } from "@react-navigation/core";
import moment from "moment";
import { Button } from "react-native-elements";
import {AppointmentToClient,Post_SendPushNotification} from '../obj/FunctionAPICode';
import { UserContext } from "../UserDietails";
import BusinessProfilePOPUP from './BusinessProfilePOPUP'
const ClientSearchReasultCard = (props) => {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const ClientData = userDetails;
  const [apo,setapo]=useState();
  const  {
    ClientIDnumber,
    Is_client_house,
    End_time,
    Start_time,
    Date,
    Number_appointment,
    Business_Number,
    AddressStreet,
    AddressHouseNumber,
    AddressCity,
    //apo,
    Appointment_status
  } = props;
  const [token, settoken] = useState();// ענבר
  const [modalVisible, setModalVisible] = useState(false);
  const [businessProfilePOPUP,SetBusinessProfilePOPUP]=useState(false);

  function handleBusinessProfilePOPUP(){
    console.log("open pop-up window"); setModalVisible(!modalVisible);
    console.log("modalVisible - ",modalVisible);
    SetBusinessProfilePOPUP(!businessProfilePOPUP);
    console.log("businessProfilePOPUP - " ,businessProfilePOPUP);
    console.log("business number: "+JSON.stringify(Business_Number));
  }
  useEffect(()=>{
    
    AllApointemtDetailes().then((res) => {
        
      console.log("&&&&&&&&&&&&&&&&&&&&&&", res.data)
      setapo(res.data)
      
    });
  },[]) 
  useEffect(() => {
    
    if (token) {
      const body = {
        "to": token,
        "title": "BeautyMe",
        "body": `${ClientData.First_Name} הזמינה תור חדש `,
        "badge": "0",
        "ttl": "1",// מספר שניות לשליחה
        "data": {
          "to": token
        }
      }
      Post_SendPushNotification(body).then
        (() => {
          console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%", token)
        }
        )
    }

  }, [token]);
  const navigation = useNavigation();
  function btnBookApiontment(Appointment_status,Number_appointment,) {
        
    //לקבוע תור
    const pickedApointment = {

      Appointment_status:Appointment_status,
      ID_Client:ClientIDnumber,
      Number_appointment:Number_appointment,
    };
    console.log("****", pickedApointment);
    console.log("*************"+ Appointment_status+ Number_appointment);
    AppointmentToClient(pickedApointment).then(
      (result) => {
        console.log("yes", result.data);

        apo.forEach((apointment) => {
          if (pickedApointment.Number_appointment == apointment.Number_appointment) {
            settoken(apointment.token)
            console.log(apointment.token)
            return
          }
        })
        //  settoken("ExponentPushToken[sCfqv9F-xkfthnmyMFXsDX]")
        if (result.data) {
          alert("result.data");
        }

        Alert.alert(`${Number_appointment} מחכה לאישור מבעל העסק }`);

      },
      (error) => {
        console.log("error", error);
      }
    );
    // btnSearch();
  }
  return (
    <View>
      <Text>מספר עסק: {Business_Number}</Text>
      <Text>מספר תור: {Number_appointment} </Text>
      <Text>תאריך: {moment(Date).format("DD-MM-YYYY")}</Text>
      <Text>שעת התחלה: {Start_time}</Text>
      <Text>שעת סיום: {End_time}</Text>
      <Text>האם מגיע לבית הלקוח? {Is_client_house}</Text>
      <Text>
        כתובת:
        {AddressStreet + " " + AddressHouseNumber + ", " + AddressCity}
      </Text>
      <Button
        title="צפה בפרופיל העסק"
        buttonStyle={{
          backgroundColor: "black",
          borderWidth: 2,
          borderColor: "white",
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        titleStyle={{ fontWeight: "bold" }}
        onPress={() => handleBusinessProfilePOPUP()} //יועבר לדף העסק שגם שם אפשר להזמין את התור
      />
      <Button
        title="הזמן תור"
        buttonStyle={{
          backgroundColor: "black",
          borderWidth: 2,
          borderColor: "white",
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        titleStyle={{ fontWeight: "bold" }}
        onPress={() => btnBookApiontment(Appointment_status,Number_appointment)} //יועבר לדף העסק שגם שם אפשר להזמין את התור
      />
      {businessProfilePOPUP&&(
        <BusinessProfilePOPUP 
        isVisible={modalVisible}
        onClose={() => handleBusinessProfilePOPUP()}
        Business_Number = {JSON.stringify(Business_Number)}
      />
      )}
      <Text>-----------------------------------------------------------</Text>
    </View>
  );
};

export default ClientSearchReasultCard;
