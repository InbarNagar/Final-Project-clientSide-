import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import Profil_pro from './comps/Profil_pro';
import ScreenOne from './comps/GenralComps/ScreenOne';
import LogIn from './comps/GenralComps/LogIn';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPassword from './comps/GenralComps/ForgotPassword';
import Professional_registration from './comps/Professional_registration';
import Client_registration from './comps/Client_registration';
import Create_Business_Pro from './comps/Create_Business_Pro';
// import SearchTest from './comps/SearchTest';
import Search from './comps/Map';
import AddTratment from './comps/AddTratment';
import Menu_treatment_forAppointment from './comps/Menu_treatment_forAppointment';
import NewAppointment from './comps/NewAppointment';
import Calendar_professional from './comps/Calendar_professional';
import Menu_professional from './comps/obj/Menu_professional';
// import TabbedPageNavigator from './comps/GenralComps/TabbedPage';
// import MaterialTabbedPage from './comps/GenralComps/MaterialTabbedP
import Maps_test from './comps/Maps_test';
import { loginHook, UserContext } from './comps/UserDietails';
import React from 'react';
import SearchOnMap from './comps/SearchOnMap';
import Menu_treatment_registration from './comps/Menu_treatment_registration';
import Update_personal_details_Professional from './comps/Update_personal_details_Professional';
import Update_personal_details_Bussines from './comps/Update_personal_details_Bussines';
import Set_notifications from './comps/Set_notifications';
import ClientProfile from './comps/ClientScreen/ClientProfile';
import Map from './comps/Map';
import Update_ClientDetailes from './comps/Update_ClientDetailes';
import LogInGenral from './comps/LogInGenral';
import Review_Business from './comps/Review_Business';
import Search3 from './comps/ClientScreen/Search3';

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


    // בשביל לשמור את כל המידע על המשתמשים
    <UserContext.Provider value={{ userDetails, setUserDetails }}>

      <NavigationContainer>

        <Stack.Navigator initialRouteName="LogInGenral">

          <Stack.Screen name="LogInGenral" component={LogInGenral} />

          <Stack.Screen name="Menu_professional" component={Menu_professional} />
          <Stack.Screen name="NewAppointment" component={NewAppointment} />
          <Stack.Screen name="Calendar_professional" component={Calendar_professional} />
          {/* <Stack.Screen name="LogIn" component={LogIn} /> */}
          <Stack.Screen name="Menu_treatment_forAppointment" component={Menu_treatment_forAppointment} />
          <Stack.Screen name="Search3" component={Search3} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name='Professional_registration' component={Professional_registration} />
          <Stack.Screen name='Client_registration' component={Client_registration} />
          <Stack.Screen name='Create_Business_Pro' component={Create_Business_Pro} />
          <Stack.Screen name="Menu_treatment_regisFtration" component={Menu_treatment_registration} />
          <Stack.Screen name="SearchOnMap" component={SearchOnMap} />
          <Stack.Screen name="Profil_pro" component={Profil_pro} />
          <Stack.Screen name="Update_personal_details_Professional" component={Update_personal_details_Professional} />
          <Stack.Screen name="Set_notifications" component={Set_notifications} />
          <Stack.Screen name="Update_personal_details_Bussines" component={Update_personal_details_Bussines} />
          <Stack.Screen name="Update_ClientDetailes" component={Update_ClientDetailes} />
         

          <Stack.Screen name="ClientProfile" component={ClientProfile} />

          <Stack.Screen name="Review_Business" component={Review_Business} />
       

        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>

  );
}

export default App;

//  {/* <Stack.Screen name="ForgotPassword" component={ForgotPassword} /> */}
//   {/* <Stack.Screen name='AddTratment' component={AddTratment} />  */}