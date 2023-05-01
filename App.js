import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

import ScreenOne from './comps/GenralComps/ScreenOne';
import LogIn from './comps/GenralComps/LogIn';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPassword from './comps/GenralComps/ForgotPassword';
import Professional_registration from './comps/Professional_registration';
import Client_registration from './comps/Client_registration';
import Create_Business_Pro from './comps/Create_Business_Pro';
// import SearchTest from './comps/SearchTest';
import Search3 from './comps/Search3';
import AddTratment from './comps/AddTratment';
import Menu_treatment_forAppointment from './comps/Menu_treatment_forAppointment';
import NewAppointment from './comps/NewAppointment';
import Calendar_professional from './comps/Calendar_professional';
import Menu_professional from './comps/obj/Menu_professional';
// import TabbedPageNavigator from './comps/GenralComps/TabbedPage';
// import MaterialTabbedPage from './comps/GenralComps/MaterialTabbedP
import Maps_test from './comps/Maps_test'; 
import { loginHook ,UserContext} from './comps/UserDietails';
import React from 'react';
import SearchOnMap from './comps/SearchOnMap';
import Menu_treatment_registration from './comps/Menu_treatment_registration';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';

// PushNotificationIOS.requestPermissions();

// PushNotificationIOS.addEventListener('register', (token) => {
//   console.log('Device registered for push notifications: ', token);
// });

// PushNotificationIOS.addEventListener('registrationError', (error) => {
//   console.error('Error registering for push notifications: ', error);
// });

// PushNotificationIOS.addEventListener('notification', (notification) => {
//   console.log('Received push notification: ', notification);
// });


const Stack = createNativeStackNavigator();

function App() {
   const { userDetails, setUserDetails } = loginHook();
  return (

    //   <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Search" >
    //     <Stack.Screen name="Search" component={Search} />
    //   </Stack.Navigator>
    // </NavigationContainer>
// בשביל לשמור את כל המידע על המשתמשים
   <UserContext.Provider value={{ userDetails, setUserDetails }}>
      <NavigationContainer>
<<<<<<< HEAD
        {/* <Stack.Navigator initialRouteName="ScreenOne" >
        <Stack.Screen name="Menu_professional" component={Menu_professional} />
        <Stack.Screen name="NewAppointment" component={NewAppointment} />
        <Stack.Screen name="Calendar_professional" component={Calendar_professional} /> */}
=======
       <Stack.Navigator initialRouteName="ScreenOne" >
       {/* <Stack.Screen name="ScreenOne" component={ScreenOne} /> 
        <Stack.Screen name="LogIn" component={LogIn} /> */}
                <Stack.Screen name="NewAppointment" component={NewAppointment} /> 
                <Stack.Screen name="Menu_treatment_forAppointment" component={Menu_treatment_forAppointment} /> 
                <Stack.Screen name="Calendar_professional" component={Calendar_professional} /> 
                <Stack.Screen name="Menu_treatment_registration" component={Menu_treatment_registration} />


          {/* <Stack.Screen name="ScreenOne" component={ScreenOne} />
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="Calendar_professional" component={Calendar_professional} /> */}


          {/* <Stack.Screen name="Search" component={Search} /> */}
          {/* 
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name='Professional_registration' component={Professional_registration} />
        <Stack.Screen name='Client_registration' component={Client_registration} />
        <Stack.Screen name='Create_Business_Pro' component={Create_Business_Pro} />
        </Stack.Navigator>
      </NavigationContainer>
     </UserContext.Provider>

  );
}

export default App;

 {/* <Stack.Screen name="ForgotPassword" component={ForgotPassword} /> */}
  {/* <Stack.Screen name='AddTratment' component={AddTratment} />  */}