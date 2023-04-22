import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';

import ScreenOne from './comps/GenralComps/ScreenOne';
import LogIn from './comps/GenralComps/LogIn';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgetPas from './comps/GenralComps/ForgetPas';
import Professional_registration from './comps/Professional_registration';
// import NewAppointment from './comps/NewAppointment';
import Menu_treatment_registration from './comps/Menu_treatment_registration';
import Calendar_professional from './comps/Calendar_professional';


// import TabbedPageNavigator from './comps/GenralComps/TabbedPage';
// import MaterialTabbedPage from './comps/GenralComps/MaterialTabbedPage';




const Stack = createNativeStackNavigator();

function App() {
  return (

    

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calendar_professional" component={Calendar_professional} />
      </Stack.Navigator>
    </NavigationContainer>
  
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="NewAppointment" component={NewAppointment} />
    //   </Stack.Navigator>
    // </NavigationContainer>

      // <NavigationContainer>
      //   <Stack.Navigator>
      //     <Stack.Screen name="Menu_treatment_registration" component={Menu_treatment_registration} />
      //   </Stack.Navigator>
      // </NavigationContainer> 


 
  );
}

export default App;

   //   <NavigationContainer>
    //   <Stack.Navigator initialRouteName="ScreenOne" >
    //     <Stack.Screen name="ScreenOne" component={ScreenOne} />
    //     <Stack.Screen name="LogIn" component={LogIn} />
    //     <Stack.Screen name="ForgetPas" component={ForgetPas} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  //  <Professional_registration></Professional_registration>

  // /* <NavigationContainer>
  // <Stack.Navigator>
    //<Stack.Screen name="Menu_treatment_registration" component={Menu_treatment_registration} />
  //</Stack.Navigator>
//</NavigationContainer> */}