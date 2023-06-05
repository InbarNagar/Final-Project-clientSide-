import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Keyboard, TextInput } from 'react-native'
import Alert from './Alert';
import { RadioButton } from "react-native-paper";
import { UserContext } from './UserDietails';
import React, { useState, useEffect, useContext } from 'react';
import { BusinessDetails } from './obj/FunctionAPICode';
import { UpdateapiBusiness } from './obj/FunctionAPICode';
import Menu_professional from './obj/Menu_professional';
export default function Update_personal_details_Bussines() {

  const { userDetails, setUserDetails } = useContext(UserContext);
  const [Name, setName] = useState('');
  const [AddressStreet, setStreet] = useState('');
  const [AddressHouseNumber, setHouseNumber] = useState('');
  const [AddressCity, setCity] = useState('');
  const [Is_client_house, setLocation] = useState('');
  const [Professional_ID_number, setIdPro] = useState('');
  const BussinesNumber = userDetails.Business_Number;

  const [DataDetails, setDetailsBus] = useState(null);

  useEffect(() => {
    BusinessDetails(BussinesNumber).then((result) => {
      setDetailsBus(result.data);
      setName(result.data.Name);
      setStreet(result.data.AddressStreet);
      setHouseNumber(result.data.AddressHouseNumber);
      setCity(result.data.AddressCity);
      setLocation(result.data.Is_client_house);
      setIdPro(result.data.Professional_ID_number);

    }, (error) => {
      console.log('error', error)
    })
  }

  );

  const Update_Bussines = () => {

    const data = {
      Name: Name,
      Is_client_house: Is_client_house,
      AddressStreet: AddressStreet,
      AddressHouseNumber: AddressHouseNumber,
      AddressCity: AddressCity,
      Professional_ID_number: Professional_ID_number,
      Business_Number: BussinesNumber
    }
    console.log("%%%%%%%%%%%%%%%%%%%%%", data)
    UpdateapiBusiness(data).then(
      (res) => {

        console.log('yes', res.data)


      }, (error) => {
        console.log('error', error)


      });
  }

  return (

    <ScrollView>
      <TouchableOpacity onPress={Keyboard.dismiss}>
        <View style={styles.container}>

          <Text style={styles.title}>  עריכת פרופיל עסקי</Text>
       

          <View style={styles.inp}>
            <TextInput style={styles.textInputS}
              placeholder={Name}
              placeholderTextColor="#92a2bd"
             // value={Name}
              onChangeText={(text) => setName(text)}
            />

          </View>

          <View style={styles.inp}>
            <TextInput style={styles.textInputS}
              placeholder={AddressStreet}
              placeholderTextColor="#92a2bd"
             // value={AddressStreet}
              onChangeText={(text) => setStreet(text)}
            />

          </View>

          <View style={styles.inp}>
            <TextInput style={styles.textInputS}
              placeholder={AddressHouseNumber}
              placeholderTextColor="#92a2bd"
             // value={AddressHouseNumber}
              onChangeText={(text) => setHouseNumber(text)}
            />

          </View>

          <View style={styles.inp}>
            <TextInput style={styles.textInputS}
              placeholder={AddressCity}
              placeholderTextColor="#92a2bd"
             // value={AddressCity}
              onChangeText={(text) => setCity(text)}
            />

          </View>

          <View style={styles.inp}>
            <TextInput style={styles.textInputS}
              placeholder={Is_client_house}
              placeholderTextColor="#92a2bd"
             // value={Is_client_house}
              onChangeText={(text) => setLocation(text)}
            />

          </View>



          <View>
            <TouchableOpacity

              onPress={Update_Bussines}
            >
              <View style={styles.but}>
                <Text style={styles.thachtext}>עדכן</Text>
              </View>

            </TouchableOpacity></View>
          
        </View>
      </TouchableOpacity>
  <Menu_professional />
    </ScrollView>
  )


}

const styles = StyleSheet.create({
  inp: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    borderRadius: 25,
    height: 50,
    marginBottom: 30,
    backgroundColor: '#f3e5f5' // Material Design light purple 100
  },
  textInputS: {
    color: '#808080',
    fontSize: 20,
    textAlign: 'right',
    fontWeight: 'bold',
    opacity: 0.5,
  },
  title: {
    padding: 10,
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 25,
    color: '#ba68c8', // Material Design purple 300
    fontWeight: 'bold',
  },
  titp: {
    textAlign: 'center',
    color: '#f3e5f5', // Material Design light purple 100
    fontSize: 17,
    padding: 20,
  },
  container: {
 
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ce93d8', // Material Design purple 200
    padding: 50,
    paddingBottom: 60,
    height: "100%"
  },
  text: {
    textAlign: 'right',
    paddingBottom: 10,
  },
  but: {
    textAlign: 'center',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    backgroundColor: '#e1bee7', // Material Design purple 100
    padding: 15,
    margin: 10,
    marginTop: 10,
    width: "90%",
  },
  thachtext: {
    textAlign: 'center',
    color: '#f3e5f5', // Material Design light purple 100
    fontSize: 25,
    fontWeight: 'bold',
    height: 50,
  },
});
