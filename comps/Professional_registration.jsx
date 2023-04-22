import React, { useState } from 'react';
import {StyleSheet, View, TextInput, Button,Text,marginRight } from 'react-native';
// http://proj.ruppin.ac.il/cgroup93/prod/api/
const Professional_registration = () => {
  
  const [ID_number, setid] = useState('');
  const [First_name, setFirstName] = useState('');
  const [Last_name, setLastName] = useState('');

  const [birth_date, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [Email, setEmail] = useState('');
  const [AddressStreet, setStreet] = useState('');
  const [AddressHouseNumber, setHouseNumber] = useState('');
  const [AddressCity, setCity] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = () => {
    fetch('http://proj.ruppin.ac.il/cgroup93/prod/api/Professional/NewProfessional', {
      method: 'POST',
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", 
        'Accept': "application/json; charset=UTF-8",
    }),
      body: JSON.stringify({
        ID_number,
        First_name,
        Last_name,
        birth_date,
        gender,
         phone,
         Email,
         AddressStreet,
         AddressHouseNumber,
         AddressCity,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <View style={{padding:50, backgroundColor:`#ffefd5`}}>
      <Text  style={styles.title}>איזה כיף שהחלטת להצטרף לקהילת בעלי העסקים שלנו!</Text>
      <Text style={styles.titp}> אנא מלא/י את הפרטים הבאים:</Text>
       
      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
        placeholder="תעודת זהות"
        value={ID_number}
        onChangeText={(text) => setid(text)}
      />
         </View>

 <View style={styles.inp}>
       <TextInput style={styles.textInputS}
        placeholder="שם פרטי"
        value={First_name}
        onChangeText={(text) => setFirstName(text)}
      />
   <Text>שם פרטי</Text> 
      </View>

      <View style={styles.inp}>
      <TextInput style={styles.textInputS}
        placeholder="שם משפחה"
        value={Last_name}
        onChangeText={(text) => setLastName(text)}
      />
         <Text>שם משפחה</Text> 
      </View>

      <View style={styles.inp}>
      <TextInput style={styles.textInputS}
        placeholder="מין"
        value={gender}
        onChangeText={(text) => setGender(text)}
      />
      <Text>מין</Text>
</View>

<View style={styles.inp}>
      <TextInput style={styles.textInputS}
        placeholder="תאריך לידה"
        value={birth_date}
        onChangeText={(text) => setDateOfBirth(text)}
      />
      <Text>שם משפחה</Text>
      </View>

      <View style={styles.inp}>
      <TextInput style={styles.textInputS}
        placeholder="פלאפון"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <Text>פלאפון</Text>
</View>
      <View style={styles.inp}>
      <TextInput style={styles.textInputS}
        placeholder="אימייל"
        value={Email}
        onChangeText={(text) => setEmail(text)}
      />
      <Text>איימיל</Text>
</View>


<View style={styles.inp}>
      <TextInput style={styles.textInputS}
        placeholder="רחוב"
        value={AddressStreet}
        onChangeText={(text) => setStreet(text)}
      />
      <Text>רחוב</Text>
</View>


<View style={styles.inp}>
      <TextInput style={styles.textInputS}
        placeholder="מספר בית"
        value={AddressHouseNumber}
        onChangeText={(text) => setHouseNumber(text)}
      />
  <Text>מספר בית</Text>
</View>

<View style={styles.inp}>
      <TextInput style={styles.textInputS}
        placeholder="עיר"
        value={AddressCity}
        onChangeText={(text) => setCity(text)}
      />
        <Text>עיר</Text>
</View>

<View style={styles.inp}>
      <TextInput style={styles.textInputS}
        placeholder="סיסמא"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
        <Text>סיסמא</Text>
</View>

      <Button color="#a0522d" title="המשך" onPress={handleRegistration}/>
    </View>
    )
}

const styles= StyleSheet.create({
inp:{
  flexDirection: 'row',
  padding: 15,
  justifyContent:'space-between',
  color:'red',
},
textInputS:{
  borderWidth:1,
  borderColor:'#cccccc',
  width: "80%",
  marginRight: 8,
},
title:{
  padding: 60,
  justifyContent:'center',
  textAlign: 'center'
},
titp:{
  textAlign: 'center'
}
});

export default Professional_registration;

