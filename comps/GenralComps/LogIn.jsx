import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPassword from './ForgotPassword';
import Professional_registration from '../Professional_registration';
import GenralReg from '../GenralReg';
import { LogInF } from '../obj/FunctionAPICode';
import Input from '../Input';
import Search from '../Search';
import AsyncStorage from '@react-native-community/async-storage';



export default function LogIn(props) {
  const [ID_number, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { navigation, route } = props
  const [idNumber_client, setidNumber_client] = useState('');
  const [idNumber_professional, setidNumber_professional] = useState('');


  let userType = route.params.userType
  console.log({ userType })

  const handleidNumber = (text) => {
    if (userType == "Cli"){
      setidNumber_client(text);
    }
    else{
      setidNumber_professional(text);
    }
  };
  // const handleidNumber_client = (text) => {
  //   setidNumber_client(text);
  // };

  // const handleidNumber_professional = (text) => {
  //   setidNumber_professional(text);
  // };

  const handleLogin =  async () => {
    if (userType == 'Cli') {
      await AsyncStorage.setItem('idNumber_client', idNumber_client);
      console.log('cli')
      LogInF(ID_number, password).then((result) => {
        console.log('yes', result);
        navigation.navigate('Search')

      }, (error) => {
        console.log('error', error)
      })
    }
    else {
      await AsyncStorage.setItem('idNumber_professional', idNumber_professional);
      console.log('professional')
      LogInPro(ID_number, password).then((result) => {
        console.log('yes', result)
       navigation.navigate('Search')
        console.log('i am here')
      }, (error) => {
        console.log('error', error)
      })

    }

    // const response = await  fetch('http://localhost:53758/api/Client/OneClient', {
    //   method: 'POST',
    //   headers:({
    //     "Content-type": "application/json",
    //     'Accept': "application/json"
    //   }),
    //   body: JSON.stringify({ "ID_number":ID_number,"password": password }),
    // })

    // const data = await response.json();

    // if (data.success) {
    //   Alert.alert('Login successful');
    //   // navigate to the next screen
    //   props.navigation.navigate('Search')
    // } 

    // else {
    //   Alert.alert('Login failed', data.message);
    // }


  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.inp}>

        <TextInput
          style={styles.input}
          placeholder="תעודת זהות"
          value={ID_number}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoCompleteType="email"
        />
        <Text style={styles.title}>תעודת זהות</Text>
      </View> */}
      <Input
        styleContainer={styles.inp}
        style={styles.input}
        placeholder="תעודת זהות"
        value={ID_number}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        autoCompleteType="email"
        onBlur={handleidNumber}
      />
      <View style={styles.inp}>
        <TextInput
          style={styles.input}
          placeholder="סיסמא"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCompleteType="password"
        />
        <Text style={styles.title}>סיסמא</Text>

      </View>

      <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate(ForgotPassword) }}>
        <View >
          <Text style={styles.buttonText}>שכחתי סיסמא</Text>
        </View>
      </TouchableOpacity>


      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>התחברות</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate(GenralReg) }}>
        <Text style={styles.buttonText}>עדיין לא נרשמתם? לחצו כאן</Text>
      </TouchableOpacity>

    </View>



  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8ff'

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#9acd32',
    width: "80%",
    marginRight: 8,
  },
  button: {
    borderRadius: 4,
    marginTop: 10,
    alignItems: 'center',
    width: "30%",
    backgroundColor: '#9acd32',
    color: '#fff',
  },
  buttonText: {
    paddingBottom: 20,
    color: '#f0f8ff',
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center'
  },

  inp: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    width: "100%",
  },
});


