import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import Professional_registration from './Professional_registration';
import Menu_treatment_registration from './Menu_treatment_registration';

const Create_Business_Pro = (props) => {



  const [Name, setName] = useState('');
  const [AddressStreet, setStreet] = useState('');
  const [AddressHouseNumber, setHouseNumber] = useState('');
  const [AddressCity, setCity] = useState('');
  const [Is_client_house, setLocation] = useState('');
  const [Professional_ID_number, setIdPro] = useState('');


  const handleRegistrationB = () => {

    fetch('http://proj.ruppin.ac.il/cgroup93/prod/api/Business/NewBusiness', {
      method: 'POST',
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8",
        'Accept': "application/json; charset=UTF-8",
      }),
      body: JSON.stringify({

        Name,
        AddressStreet,
        AddressHouseNumber,
        AddressCity,
        Is_client_house,
        Professional_ID_number,

      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))

      .catch((error) => console.error(error));

    props.navigation.navigate('AddTratment')

  };


  return (

    <View>

      <Text>Create_Business_Pro</Text>

      <Text style={styles.title}>בניית פרופיל עסקי</Text>
      <Text style={styles.titp}> רק עוד כמה פרטים קטנים והעמוד שלך מוכן</Text>

      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="שם העסק"
          value={Name}
          onChangeText={(text) => setName(text)}
        />
      </View>

      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="רחוב"
          value={AddressStreet}
          onChangeText={(text) => setStreet(text)}
        />
      </View>

      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="מספר בית"
          value={AddressHouseNumber}
          onChangeText={(text) => setHouseNumber(text)}
        />
      </View>

      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="עיר"
          value={AddressCity}
          onChangeText={(text) => setCity(text)}
        />
      </View>

      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="נותן שירות בבית הלקוח ?"
          value={Is_client_house}
          onChangeText={(text) => setLocation(text)}
        />
      </View>

      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="תעודת זהות בעל עסק"
          value={Professional_ID_number}
          onChangeText={(text) => setIdPro(text)}
        />
      </View>

      <View>

        <TouchableOpacity onPress={handleRegistrationB}

        >
          <View>
            <Text style={styles.titp}>המשך</Text>
          </View>

        </TouchableOpacity>
      </View>




    </View>
  )
}

const styles = StyleSheet.create({
  inp: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    color: 'red',
  },
  textInputS: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: "80%",
    marginRight: 8,
  },
  title: {
    padding: 60,
    justifyContent: 'center',
    textAlign: 'center'
  },
  titp: {
    textAlign: 'center',
    borderColor: '#cccccc'
  }
});

export default Create_Business_Pro;