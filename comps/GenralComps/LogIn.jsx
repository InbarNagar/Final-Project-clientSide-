import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPassword from './ForgotPassword';
import Professional_registration from '../Professional_registration';
import { LogInF } from '../obj/FunctionAPICode';
import Input from '../Input';
import Client_registration from '../Client_registration';
import Button from '../obj/Button';
import { Title } from 'react-native-paper';
import { LogInPro } from '../obj/FunctionAPICode';
import Maps_test from '../Maps_test';


export default function LogIn(props) {
  const [ID_number, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { navigation, route } = props
  let userType = route.params.userType
  console.log({ userType })
  useEffect(()=>{
          navigation.navigate('Maps_test')
  },[])
  const handleLogin = () => {

    if (userType == 'Cli') {
      console.log('cli')
      LogInF(ID_number, password).then((result) => {
        console.log('yes', result)
        navigation.navigate('Search3')

      }, (error) => {
        console.log('error', error)
      })
    }
    else {
      //option 1 - less
      const userData = { ID_number: ID_number, password: password }
      let url = 'http://proj.ruppin.ac.il/cgroup93/prod/api/Professional/GetProfessional'
      const response = fetch(url, {
        method: 'POST',
        headers: ({
          "Content-type": "application/json",
          'Accept': "application/json"
        }),
        body: JSON.stringify(userData),
      })
        .then((response) => {
          if (response.status === 200)
            return response.json()
          else return null
        })
        .then((json) => {
          if (json === null)
            alert('login faild')
          else
            alert('login ok')
          navigation.navigate('Search3', { user: json })
        }).catch((error) => {
          Alert.alert('Login Failed');
          console.log(error);


        }
        );

      //option 2 - fav
      // console.log('professional')
      // LogInPro(ID_number, password).then((result) => {
      //   console.log('yes', result)
      //   navigation.navigate('Search3')
      //   console.log('i am here')
      // }, (error) => {
      //   console.log('error', error)
      // })
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

  }

  const Registration = () => {
    console.log(userType)
    if (userType === 'Cli') {
      navigation.navigate(Client_registration)
    }
    else {
      navigation.navigate(Professional_registration)
    }

  };

  return (
    <View style={styles.container}>
      <View style={styles.inp}>

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
      </View>
      {/* <Input
        styleContainer={styles.inp}
        style={styles.input}
        placeholder="תעודת זהות"
        value={ID_number}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        autoCompleteType="email"
      /> */}
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


      {/* <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>התחברות</Text>
      </TouchableOpacity> */}


      <Button color='#9acd32' text="התחברות" onPress={handleLogin} />


      {/* <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate(GenralReg) }}>
        <Text style={styles.buttonText}>עדיין לא נרשמתם? לחצו כאן</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.button} onPress={Registration}>
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


