import { View, Text ,StyleSheet,ScrollView,TouchableOpacity,Keyboard,TextInput} from 'react-native'
import Alert from './Alert';
import { RadioButton } from "react-native-paper";
import { UserContext} from './UserDietails';
import React, { useState, useEffect, useContext } from 'react';
import { BusinessDetails } from './obj/FunctionAPICode';
import { UpdateapiBusiness } from './obj/FunctionAPICode';
export default function Update_personal_details_Bussines() {

    const { userDetails, setUserDetails } = useContext(UserContext);
    const [Name, setName] = useState(DataDetails.Name);
    const [AddressStreet, setStreet] = useState('');
    const [AddressHouseNumber, setHouseNumber] = useState('');
    const [AddressCity, setCity] = useState('');
    const [Is_client_house, setLocation] = useState('');
    const [Professional_ID_number, setIdPro] = useState('');
    const BussinesNumber = userDetails.Business_Number;
   
  const [DataDetails,setDetailsBus]=useState(null);

    useEffect(()=>{
    BusinessDetails(BussinesNumber).then((result) => {
    setDetailsBus(result.data);
    setName(DataDetails.Name);
    setStreet(DataDetails.AddressStreet);
    setHouseNumber(DataDetails.AddressHouseNumber);
    setCity(DataDetails.AddressCity);
    setLocation(DataDetails.Is_client_house);
    setIdPro(DataDetails.Professional_ID_number);

    }, (error) => {
      console.log('error', error)
    })}

   );
   
    const Update_Bussines = () => {
        
        const data = {
            Name: Name,
            Is_client_house: Is_client_house,
            AddressStreet: AddressStreet,
            AddressHouseNumber: AddressHouseNumber,
            AddressCity: AddressCity,
            Professional_ID_number: Professional_ID_number,
            Business_Number:BussinesNumber 
        }
        console.log("%%%%%%%%%%%%%%%%%%%%%",data)
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
              <Text style={styles.titp}> שלום </Text>
        
              <View style={styles.inp}>
                <TextInput style={styles.textInputS}
                  placeholder="שם"
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
        padding: 20,
    },

    container: {
        flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#9acd32',
        padding: 50,
        paddingBottom: 60,
        width: "100%",
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
        backgroundColor: '#ff69b4',
        padding: 15,
        margin: 10,
        marginTop: 10,
        width: "90%",

    },
    thachtext: {
        textAlign: 'center',
        color: '#fffaf0',
        fontSize: 25,
        fontWeight: 'bold',
        //borderRadius: 10,
        height: 50,
        // marginBottom: 20,
        // backgroundColor: '#fffaf0',
        // padding: 15,
        // margin: 10,
        // marginTop: 20,

    },

});
