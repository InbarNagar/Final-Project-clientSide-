import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { UserContext } from './UserDietails';
import { UpdateClient } from './obj/FunctionAPICode';
import { Akira } from 'react-native-textinput-effects';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Alert from './Alert';

export default function Update_ClientDetailes() {

  const { userDetails, setUserDetails } = useContext(UserContext);

  const navigation = useNavigation();

  const [ID_number, setIDNumber] = useState(userDetails.ID_number);
  const [firstName, setFirstName] = useState(userDetails.First_name);
  const [lastName, setLastName] = useState(userDetails.Last_name);
  const [birthDate, setBirthDate] = useState(userDetails.birth_date);
  const [gender, setGender] = useState(userDetails.gender);
  const [phone, setPhone] = useState(userDetails.phone);
  const [email, setEmail] = useState(userDetails.Email);
  const [addressStreet, setAddressStreet] = useState(userDetails.AddressStreet);
  const [addressHouseNumber, setAddressHouseNumber] = useState(userDetails.AddressHouseNumber);
  const [addressCity, setAddressCity] = useState(userDetails.AddressCity);
  const [password, setPassword] = useState(userDetails.password);
  const [Instagram_link, setInstagram_link] = useState(userDetails.Instagram_link);
  const [Facebook_link, setFacebook_link] = useState(userDetails.Facebook_link)

  const handle = () => {
    const data = {
      "ID_number": ID_number,
      "First_name": firstName,
      "Last_name": lastName,
      "phone": phone,
      "Email": email,
      "AddressStreet": addressStreet,
      "AddressHouseNumber": addressHouseNumber,
      "AddressCity": addressCity,
      "gender": gender,
      "birth_date": birthDate,
      "Instagram_link": Instagram_link,
      "Facebook_link": Facebook_link
    };

    UpdateClient(data).then(
      (res) => {
        console.log('yes', res.data)
        // navigation.goBack();

      }, (error) => {
        console.log('error', error)
      });

  };

  return (

    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>עריכת פרטים אישים</Text>

          <Akira
            label={'    תעודת זהות'}
            // this is used as active and passive border color
            borderColor={"rgb(204, 204, 255)"}
            inputPadding={16}
            labelHeight={24}
            labelStyle={{ color: '#ac83c4' }}
            placeholder="תעודת זהות"
            value={ID_number}
            onChangeText={setIDNumber}
            style={styles.akira}
          />

          <Akira
            label={'    שם פרטי'}
            // this is used as active and passive border color
            borderColor={"rgb(204, 204, 255)"}
            inputPadding={16}
            labelHeight={24}
            labelStyle={{ color: '#ac83c4' }}
            placeholder="שם פרטי"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.akira}
          />

          <Akira
            label={'    שם משפחה'}
            // this is used as active and passive border color
            borderColor={"rgb(204, 204, 255)"}
            inputPadding={16}
            labelHeight={24}
            labelStyle={{ color: '#ac83c4' }}
            placeholder="שם משפחה"
            value={lastName}
            onChangeText={setLastName}
            style={styles.akira}
          />

          <Akira
            label={'    פלאפון'}
            // this is used as active and passive border color
            borderColor={"rgb(204, 204, 255)"}
            inputPadding={16}
            labelHeight={24}
            labelStyle={{ color: '#ac83c4' }}
            placeholder="פלאפון"
            value={phone}
            onChangeText={setPhone}
            style={styles.akira}
          />

          <Akira
            label={'    Email'}
            // this is used as active and passive border color
            borderColor={"rgb(204, 204, 255)"}
            inputPadding={16}
            labelHeight={24}
            labelStyle={{ color: '#ac83c4' }}
            placeholder="אימייל" value={email}
            onChangeText={setEmail}
            style={styles.akira}
          />

          <Akira
            label={'    רחוב'}
            // this is used as active and passive border color
            borderColor={"rgb(204, 204, 255)"}
            inputPadding={16}
            labelHeight={24}
            labelStyle={{ color: '#ac83c4' }}
            placeholder="רחוב"
            value={addressStreet}
            onChangeText={setAddressStreet}
            style={styles.akira}
          />

          <Akira
            label={'    מספר בית'}
            // this is used as active and passive border color
            borderColor={"rgb(204, 204, 255)"}
            inputPadding={16}
            labelHeight={24}
            labelStyle={{ color: '#ac83c4' }}
            placeholder="מספר בית"
            value={addressHouseNumber}
            onChangeText={setAddressHouseNumber}
            style={styles.akira}
          />

          <Akira
            label={'    עיר'}
            // this is used as active and passive border color
            borderColor={"rgb(204, 204, 255)"}
            inputPadding={16}
            labelHeight={24}
            labelStyle={{ color: '#ac83c4' }}
            placeholder="עיר"
            value={addressCity}
            onChangeText={setAddressCity}
            style={styles.akira}
          />

          <Akira
            label={'    סיסמה'}
            // this is used as active and passive border color
            borderColor={"rgb(204, 204, 255)"}
            inputPadding={16}
            labelHeight={24}
            labelStyle={{ color: '#ac83c4' }}
            placeholder="סיסמא"
            value={password}
            onChangeText={setPassword}
            style={styles.akira}
          />




          <View>
            <TouchableOpacity onPress={handle()}>
              <View style={styles.but}>
                <Text style={styles.thachtext}>עדכן שינויים</Text>
              </View>

            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',

    backgroundColor: '#e6e6fa', // Material Design purple 200
    padding: 10,
    paddingBottom: 150,
  },
  wrapper: {
    backgroundColor: '#f8f8ff',
    padding: 20,
    width: '80%',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
    textAlign: 'right',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 5,
    textAlign: 'right',
  },
  but: {
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 25,
    height: 50,
    // marginBottom: 20,
    backgroundColor: "rgb(92, 71, 205)", // Material Design purple 100
    padding: 15,
    margin: 10,
    marginTop: 50,
    width: "90%",
  },
  thachtext: {
    textAlign: 'center',
    alignItems: 'center',
    color: '#f3e5f5', // Material Design light purple 100
    fontSize: 25,
    fontWeight: 'bold',
    height: 50,
  },
});


















///////////////////////////////////////// גרסה עובדת לפני עיצוב
// import React, { useContext, useState } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     Button,
//     Keyboard,
//     TextInput,
// } from 'react-native';

// import { UserContext } from './UserDietails';
// import { UpdateClient } from './obj/FunctionAPICode';
// export default function Update_ClientDetailes() {
//     const { userDetails, setUserDetails } = useContext(UserContext);

//     const [ID_number, setIDNumber] = useState(userDetails.ID_number);
//     const [firstName, setFirstName] = useState(userDetails.First_name);
//     const [lastName, setLastName] = useState(userDetails.Last_name);
//     const [birthDate, setBirthDate] = useState(userDetails.birth_date);
//     const [gender, setGender] = useState(userDetails.gender);
//     const [phone, setPhone] = useState(userDetails.phone);
//     const [email, setEmail] = useState(userDetails.Email);
//     const [addressStreet, setAddressStreet] = useState(userDetails.AddressStreet);
//     const [addressHouseNumber, setAddressHouseNumber] = useState(userDetails.AddressHouseNumber);
//     const [addressCity, setAddressCity] = useState(userDetails.AddressCity);
//     const [password, setPassword] = useState(userDetails.password);
//     const [Instagram_link, setInstagram_link] = useState(userDetails.Instagram_link);
//     const [Facebook_link, setFacebook_link] = useState(userDetails.Facebook_link)

//     const handleUpdateDetails = () => {
//         const data = {
//             "ID_number": ID_number,
//             "First_name": firstName,
//             "Last_name": lastName,
//             "phone": phone,
//             "Email": email,
//             "AddressStreet": addressStreet,
//             "AddressHouseNumber": addressHouseNumber,
//             "AddressCity": addressCity,
//             "gender": gender,
//             "birth_date": birthDate,
//             "Instagram_link": Instagram_link,
//             "Facebook_link": Facebook_link
//         };

//         UpdateClient(data).then(
//             (res) => {
//                 console.log('yes', res)
//                 setUserDetails(data)

//             }, (error) => {
//                 console.log('error', error)
//             });

//         // Perform update logic here
//     };

//     return (
//         <TouchableOpacity style={styles.container} onPress={Keyboard.dismiss}>
//             <View style={styles.wrapper}>
//                 <Text style={styles.title}>עריכת פרטים אישים</Text>

//                 <View style={styles.inputContainer}>
//                     <TextInput
//                         style={styles.textInput}
//                         placeholder="תעודת זהות"
//                         value={ID_number}
//                         onChangeText={setIDNumber}
//                     />
//                     <Text style={styles.label}>תעודת זהות</Text>
//                 </View>

//                 <View style={styles.inputContainer}>
//                     <TextInput
//                         style={styles.textInput}
//                         placeholder="שם פרטי"
//                         value={firstName}
//                         onChangeText={setFirstName}
//                     />
//                     <Text style={styles.label}>שם פרטי</Text>
//                 </View>

//                 <View style={styles.inputContainer}>
//                     <TextInput
//                         style={styles.textInput}
//                         placeholder="שם משפחה"
//                         value={lastName}
//                         onChangeText={setLastName}
//                     />
//                     <Text style={styles.label}>שם משפחה</Text>
//                 </View>

//                 <View style={styles.inputContainer}>
//                     <TextInput
//                         style={styles.textInput}
//                         placeholder="פלאפון"
//                         value={phone}
//                         onChangeText={setPhone}
//                     />
//                     <Text style={styles.label}>פלאפון</Text>
//                 </View>

//                 <View style={styles.inputContainer}>
//                     <TextInput
//                         style={styles.textInput}
//                         placeholder="אימייל" value={email}
//                         onChangeText={setEmail}
//                     />
//                     <Text style={styles.label}>אימייל</Text>
//                 </View>
//                 <View style={styles.inputContainer}>
//                     <TextInput
//                         style={styles.textInput}
//                         placeholder="רחוב"
//                         value={addressStreet}
//                         onChangeText={setAddressStreet}
//                     />
//                     <Text style={styles.label}>רחוב</Text>
//                 </View>

//                 <View style={styles.inputContainer}>
//                     <TextInput
//                         style={styles.textInput}
//                         placeholder="מספר בית"
//                         value={addressHouseNumber}
//                         onChangeText={setAddressHouseNumber}
//                     />
//                     <Text style={styles.label}>מספר בית</Text>
//                 </View>

//                 <View style={styles.inputContainer}>
//                     <TextInput
//                         style={styles.textInput}
//                         placeholder="עיר"
//                         value={addressCity}
//                         onChangeText={setAddressCity}
//                     />
//                     <Text style={styles.label}>עיר</Text>
//                 </View>

//                 <View style={styles.inputContainer}>
//                     <TextInput
//                         style={styles.textInput}
//                         placeholder="סיסמא"
//                         value={password}
//                         onChangeText={setPassword}
//                         secureTextEntry={true}
//                     />
//                     <Text style={styles.label}>סיסמא</Text>
//                 </View>

//                 <Button
//                     color="#9acd32"
//                     title="עדכן שינוים"
//                     onPress={handleUpdateDetails}
//                 />
//             </View>
//         </TouchableOpacity>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     wrapper: {
//         backgroundColor: '#f8f8ff',
//         padding: 20,
//         width: '80%',
//         borderRadius: 10,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginBottom: 30,
//     },
//     inputContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 15,
//     },
//     label: {
//         fontSize: 16,
//         marginRight: 10,
//         textAlign: 'right',
//     },
//     textInput: {
//         flex: 1,
//         borderWidth: 1,
//         borderColor: '#cccccc',
//         paddingHorizontal: 10,
//         height: 40,
//         borderRadius: 5,
//         textAlign: 'right',
//     },
// });













///////////////////////////////////////////////////////////
// import { View, Text ,StyleSheet,TouchableOpacity, Button, Keyboard,TextInput} from 'react-native'
// import React from 'react'
// import { useState,useContext } from 'react';
// import { UserContext } from './UserDietails';
// export default function Update_ClientDetailes() {

//      const { userDetails, setUserDetails } = useContext(UserContext);


//     const [ID_number, setid] = useState(userDetails.ID_number);
//     const [First_name, setFirstName] = useState(userDetails.First_name);
//     const [Last_name, setLastName] = useState(userDetails.Last_name);
//     const [birth_date, setDateOfBirth] = useState(userDetails.birth_date);
//     const [gender, setGender] = useState(userDetails.gender);
//     const [phone, setPhone] = useState(userDetails.phone);
//     const [Email, setEmail] = useState(userDetails.Email);
//     const [AddressStreet, setStreet] = useState(userDetails.AddressStreet);
//     const [AddressHouseNumber, setHouseNumber] = useState(userDetails.AddressHouseNumber);
//     const [AddressCity, setCity] = useState(userDetails.AddressCity);
//     const [password, setPassword] = useState(userDetails.password);

//     const Update_Diteails = () => {

//         const data = {
//             "ID_number": ID_number,
//             "First_name": First_name,
//             "Last_name": Last_name,
//             "birth_date": birth_date,
//             "gender": gender,
//             "phone": phone,
//             "Email": Email,
//             "AddressStreet": AddressStreet,
//             "AddressHouseNumber": AddressHouseNumber,
//             "AddressCity": AddressCity,
//             "password": password,
//             "Business_Number": Business_Number,
//             // "userType":
//         }

// }

//   return (
//     <TouchableOpacity style={styles.container} onPress={Keyboard.dismiss}>
//     <View style={{backgroundColor:'#f8f8ff' }}>
//       <Text style={styles.title}>עריכת פרטים אישים</Text>


//       <View style={styles.inp}>
//          <TextInput style={styles.textInputS}
//            placeholder="תעודת זהות"
//            value={ID_number}
//            onChangeText={(text) => setid(text)}
//          />
//          <Text>תעודת זהות:</Text>
//       </View>

//       <View style={styles.inp}>
//         <TextInput style={styles.textInputS}
//           placeholder="שם פרטי"
//           value={First_name}
//           onChangeText={(text) => setFirstName(text)}
//         />
//         <Text>שם פרטי</Text>
//       </View>

//       <View style={styles.inp}>
//         <TextInput style={styles.textInputS}
//           placeholder="שם משפחה"
//           value={Last_name}
//           onChangeText={(text) => setLastName(text)}
//         />
//         <Text>שם משפחה</Text>
//       </View>

//       <View style={styles.inp}>
//         <TextInput style={styles.textInputS}
//           placeholder="פלאפון"
//           value={phone}
//           onChangeText={(text) => setPhone(text)}
//         />
//         <Text>פלאפון</Text>
//       </View>
//       <View style={styles.inp}>
//         <TextInput style={styles.textInputS}
//           placeholder="אימייל"
//           value={Email}
//           onChangeText={(text) => setEmail(text)}
//         />
//         <Text>איימיל</Text>
//       </View>


//       <View style={styles.inp}>
//         <TextInput style={styles.textInputS}
//           placeholder="רחוב"
//           value={AddressStreet}
//           onChangeText={(text) => setStreet(text)}
//         />
//         <Text>רחוב</Text>
//       </View>


//       <View style={styles.inp}>
//         <TextInput style={styles.textInputS}
//           placeholder="מספר בית"
//           value={AddressHouseNumber}
//           onChangeText={(text) => setHouseNumber(text)}
//         />
//         <Text>מספר בית</Text>
//       </View>

//       <View style={styles.inp}>
//         <TextInput style={styles.textInputS}
//           placeholder="עיר"
//           value={AddressCity}
//           onChangeText={(text) => setCity(text)}
//         />
//         <Text>עיר</Text>
//       </View>

//       <View style={styles.inp}>
//         <TextInput style={styles.textInputS}
//           placeholder="סיסמא"
//           value={password}
//           onChangeText={(text) => setPassword(text)}
//           secureTextEntry={true}
//         />
//         <Text>סיסמא</Text>
//       </View>

//       <Button color='#9acd32' title="סיום הרשמה" onPress={Update_Diteails} />
//     </View>
//     </TouchableOpacity>
//   )
// }

// const styles = StyleSheet.create({
//   inp: {
//     flexDirection: 'row',
//     padding: 15,
//     justifyContent: 'space-between',
//     color: 'red',
//   },
//   textInputS: {
//     borderWidth: 1,
//     borderColor: '#cccccc',
//     width: "80%",
//     marginRight: 8,
//   },
//   title: {
//     padding: 60,
//     justifyContent: 'center',
//     textAlign: 'center'
//   },
//   titp: {
//     textAlign: 'center',
//     Color: '#9acd32'
//   }
// });


// const handleUpdateDetails = () => {
//     const data = {
//       ID_number:ID_number,
//       First_name: firstName,
//       Last_name: lastName,
//       birth_date: birthDate,
//       gender:gender,
//       phone:phone,
//       Email: email,
//       AddressStreet: addressStreet,
//       AddressHouseNumber: addressHouseNumber,
//       AddressCity: addressCity,
//       password:password,
//     };

//     UpdateClient(data).then(
//         (res) => {
//             console.log('yes', res)
//             setUserDetails(data)

//         }, (error) => {
//             console.log('error', error)
//         });

//     // Perform update logic here
//   };