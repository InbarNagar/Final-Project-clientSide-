import React, { useState ,useContext} from 'react';
import { Button, StyleSheet, Text, TextInput, View, Keyboard ,ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import Professional_registration from './Professional_registration';
// import Menu_treatment_registration from './Menu_treatment_forAppointment';
import { Professional_Business } from './obj/FunctionAPICode';
import Menu_treatment_registration from './Menu_treatment_registration';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { BussinessContext } from './UserDietails';

const Create_Business_Pro = (props) => {
  const [Name, setName] = useState('');
  const [AddressStreet, setStreet] = useState('');
  const [AddressHouseNumber, setHouseNumber] = useState('');
  const [AddressCity, setCity] = useState('');
  const [Is_client_house, setLocation] = useState('');
  const [Professional_ID_number, setIdPro] = useState('');

  // const {BussinessDetails , setBussinessDetails} = useContext(BussinessContext);**********

  const { navigation, route } = props
  let Id_Pro = route.params.ID
  // navigation = useNavigation();
  // let Id_Pro = 123455555
  // const idpro=123455555

  const handleRegistrationB = async () => {

    { setIdPro(Id_Pro) }
    const data = {
      Name: Name,
      Is_client_house: Is_client_house,
      AddressStreet: AddressStreet,
      AddressHouseNumber: AddressHouseNumber,
      AddressCity: AddressCity,
      Professional_ID_number: Id_Pro
      // Professional_ID_number: Professional_ID_number

    }

    Professional_Business(data).then((result) => {
      console.log('yes', result)
      console.log(result.data)
      console.log(result.data.businessId + "ppppp")
      const businessId = result.data.businessId.toString();
      console.log(businessId + "oooooo")
      AsyncStorage.setItem('businessId', businessId);
      navigation.navigate('Menu_treatment_registration')
      // setBussinessDetails(result.data)****************************
      // navigation.navigate('Menu_treatment_registration', {businessId:result.data.businessId})

    }, (error) => {
      console.log('error', error)
    });
    // fetch('http://proj.ruppin.ac.il/cgroup93/prod/api/Business/NewBusiness', {
    //   method: 'POST',
    //   headers: new Headers({
    //     "Content-type": "application/json; charset=UTF-8",
    //     'Accept': "application/json; charset=UTF-8",
    //   }),
    //   body: JSON.stringify({

    //     Name,
    //     AddressStreet,
    //     AddressHouseNumber,
    //     AddressCity,
    //     Is_client_house,
    //     Professional_ID_number,

    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))

    //   .catch((error) => console.error(error));

    // props.navigation.navigate('AddTratment')

  };


  return (
    <ScrollView>
<TouchableOpacity onPress={Keyboard.dismiss}>
    <View style={styles.container}>

      <Text style={styles.title}>בניית פרופיל עסקי</Text>
      <Text style={styles.titp}> רק עוד כמה פרטים קטנים והעמוד שלך מוכן</Text>

      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="שם העסק"
          placeholderTextColor="#92a2bd"
          value={Name}
          onChangeText={(text) => setName(text)}
        />
      
      </View>

      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="רחוב"
          placeholderTextColor="#92a2bd"
          value={AddressStreet}
          onChangeText={(text) => setStreet(text)}
        />
          
      </View>

      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="מספר בית"
          placeholderTextColor="#92a2bd"
          value={AddressHouseNumber}
          onChangeText={(text) => setHouseNumber(text)}
        />
         
      </View>

      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="עיר"
          placeholderTextColor="#92a2bd"
          value={AddressCity}
          onChangeText={(text) => setCity(text)}
        />
  
      </View>

      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="נותן שירות בבית הלקוח ?"
          placeholderTextColor="#92a2bd"
          value={Is_client_house}
          onChangeText={(text) => setLocation(text)}
        />
        
      </View>


      {/* <View>
        <Text>{Id_Pro}</Text>
      </View> */}
      {/* <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="תעודת זהות בעל עסק"
          value={Professional_ID_number}
          onChangeText={(text) => setIdPro(text)}
        />
      </View> */}

      
<View>
        <TouchableOpacity onPress={handleRegistrationB}

        >
          <View style={styles.but}>  
            <Text style={styles.thachtext}>המשך</Text>
          </View>

        </TouchableOpacity></View>
      
    </View>
    </TouchableOpacity>
    
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  inp: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    width: '90%',
    borderRadius: 25,
    height: 50,
    marginBottom: 30,
    backgroundColor: '#fffaf0'

  },
  textInputS: {
    // height: 40,
    // width: "80%",
    // margin: 10,
    // borderWidth: 1,
    // padding: 10,
    color: '#808080',
    // height: 50,
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
    color: '#fff',
    fontWeight: 'bold',

  },

  titp: {
    textAlign: 'center',
    color: '#fffaf0',
    fontSize: 17,
  padding:20,
  },

  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#9acd32',
    padding:50,
    paddingBottom:60,
    width:"100%",
    height:"100%"
    
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
    backgroundColor: '#ff69b4',
    padding: 15,
    margin: 10,
    marginTop: 10,
    width:"90%",
    
  },
  thachtext: {
    textAlign: 'center',
    color: '#fffaf0',
    fontSize:25,
    fontWeight:'bold',
    //borderRadius: 10,
     height: 50,
    // marginBottom: 20,
    // backgroundColor: '#fffaf0',
    // padding: 15,
    // margin: 10,
    // marginTop: 20,

  },

});

export default Create_Business_Pro;


// import React, { useState } from 'react';
// import { Button, StyleSheet, Text, TextInput, View, Keyboard } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { TouchableOpacity } from 'react-native';
// import Professional_registration from './Professional_registration';
// // import Menu_treatment_registration from './Menu_treatment_forAppointment';
// import { Professional_Business } from './obj/FunctionAPICode';
// import Menu_treatment_registration from './Menu_treatment_registration';
// import AsyncStorage from '@react-native-async-storage/async-storage';


// const Create_Business_Pro = (props) => {
//   const [Name, setName] = useState('');
//   const [AddressStreet, setStreet] = useState('');
//   const [AddressHouseNumber, setHouseNumber] = useState('');
//   const [AddressCity, setCity] = useState('');
//   const [Is_client_house, setLocation] = useState('');
//   const [Professional_ID_number, setIdPro] = useState('');

//   const { navigation, route } = props
//   let Id_Pro = route.params.ID
//   // navigation = useNavigation();
//   // let Id_Pro = 123455555
//   // const idpro=123455555

//   const handleRegistrationB = async () => {

//     { setIdPro(Id_Pro) }
//     const data = {

//       Name: Name,
//       Is_client_house: Is_client_house,
//       AddressStreet: AddressStreet,
//       AddressHouseNumber: AddressHouseNumber,
//       AddressCity: AddressCity,
//       Professional_ID_number: Id_Pro
//       // Professional_ID_number: Professional_ID_number

//     }

//     Professional_Business(data).then((result) => {
//       console.log('yes', result)
//       console.log(result.data)
//       console.log(result.data.businessId + "ppppp")
//       const businessId = result.data.businessId.toString();
//       console.log(businessId + "oooooo")
//       AsyncStorage.setItem('businessId', businessId);
//       navigation.navigate('Menu_treatment_registration')

//       // navigation.navigate('Menu_treatment_registration', {businessId:result.data.businessId})

//     }, (error) => {
//       console.log('error', error)
//     });
//     // fetch('http://proj.ruppin.ac.il/cgroup93/prod/api/Business/NewBusiness', {
//     //   method: 'POST',
//     //   headers: new Headers({
//     //     "Content-type": "application/json; charset=UTF-8",
//     //     'Accept': "application/json; charset=UTF-8",
//     //   }),
//     //   body: JSON.stringify({

//     //     Name,
//     //     AddressStreet,
//     //     AddressHouseNumber,
//     //     AddressCity,
//     //     Is_client_house,
//     //     Professional_ID_number,

//     //   }),
//     // })
//     //   .then((response) => response.json())
//     //   .then((data) => console.log(data))

//     //   .catch((error) => console.error(error));

//     // props.navigation.navigate('AddTratment')

//   };


//   return (
// <TouchableOpacity onPress={Keyboard.dismiss}>
//     <View>

//       <Text>Create_Business_Pro</Text>

//       <Text style={styles.title}>בניית פרופיל עסקי</Text>
//       <Text style={styles.titp}> רק עוד כמה פרטים קטנים והעמוד שלך מוכן</Text>

//       <View style={styles.inp}>
//         <TextInput style={styles.textInputS}
//           placeholder="שם העסק"
//           value={Name}
//           onChangeText={(text) => setName(text)}
//         />
//         <Text>שם העסק</Text>
//       </View>

//       <View style={styles.inp}>
//         <TextInput style={styles.textInputS}
//           placeholder="רחוב"
//           value={AddressStreet}
//           onChangeText={(text) => setStreet(text)}
//         />
//           <Text>רחוב</Text>
//       </View>

//       <View style={styles.inp}>
//         <TextInput style={styles.textInputS}
//           placeholder="מספר בית"
//           value={AddressHouseNumber}
//           onChangeText={(text) => setHouseNumber(text)}
//         />
//           <Text>מספר בית</Text>
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
//           placeholder="נותן שירות בבית הלקוח ?"
//           value={Is_client_house}
//           onChangeText={(text) => setLocation(text)}
//         />
//         <Text>האם נותן שירות בבית הלקוח?</Text>
//       </View>


//       {/* <View>
//         <Text>{Id_Pro}</Text>
//       </View> */}
//       {/* <View style={styles.inp}>
//         <TextInput style={styles.textInputS}
//           placeholder="תעודת זהות בעל עסק"
//           value={Professional_ID_number}
//           onChangeText={(text) => setIdPro(text)}
//         />
//       </View> */}

//       <View>

//         <TouchableOpacity onPress={handleRegistrationB}

//         >
//           <View>
//             <Text style={styles.titp}>המשך</Text>
//           </View>

//         </TouchableOpacity>
//       </View>
//     </View>
//     </TouchableOpacity>
//   )
// }

// const styles = StyleSheet.create({
//   inp: {
//     flexDirection: 'row',
//     padding: 10,
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
//     borderColor: '#cccccc'
//   }
// });

// export default Create_Business_Pro;