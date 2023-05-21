import React, { useEffect, useState } from 'react';
import { Alert,StyleSheet, Text, View,Button } from 'react-native';
import  {useForegroundPermissions,PermissionStatus,getCurrentPositionAsync} from 'expo-location'

export default function Map(){
  const[locationPermissionInformaion,requestPermission]=useForegroundPermissions();

 async function verifyPermission(){
if(locationPermissionInformaion.status==PermissionStatus.GRANTED){
const permissionResponse=await requestPermission();
return permissionResponse.granted;
}
if(locationPermissionInformaion.status==PermissionStatus.DENIED){
  Alert.alert("permission denied!");
  return false;
}
  }
  function locationHandler(){
    
    const hasPermission= verifyPermission();
    console.log(hasPermission);
const location = getCurrentPositionAsync();
console.log(location);
  }
  

  return (
    <View >
     <Text>מפה</Text>
     <Button title="מיקום" onPress={locationHandler}/>
    </View>
  );
};



  
