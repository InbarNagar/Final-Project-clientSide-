import { View, Text } from 'react-native'
import React, {useState, useEffect}from 'react'
import MapView, { Callout, Circle, Marker } from 'react-native-maps'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location'
export default function Maps_Inbar() {

 const Google_Api = "AIzaSyBuYjLYxY6iSSVfQ755luh6KPM0mD4QfrM";

 const[pickedLocation,setPickedLocation] = useState({lat:'',lng:''});
const [location,setLocation]=useState();
// const [locationPermissionInformation, requestPermission]= useForegroundPermissions();
const [pin, setPin] = useState({
    latitude: 32.34245547297243,
    longitude: 34.911549397360595
  })

  const [region, setRegion] = useState({
    latitude: '',
    longitude: '',
    latitudeDelta: 0.0125,
    longitudeDelta: 0.0121,
  })
 useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
  console.log(status,"&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          alert('Go to setting and turn on access location for using this page')
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        console.log(location,"##############################################")
        setLocation(location)
        setRegion({
          latitude: Number(location.coords.latitude),
          longitude: Number(location.coords.longitude),
          latitudeDelta: 0.0125,
          longitudeDelta: 0.0121,
        });
        setPin({
          latitude: location&&Number(location.coords.latitude),
          longitude: location&&Number(location.coords.longitude)
        })
      })
        ();
    }, []);
  
  return (
    <View style={{flex:1}}>
    <GooglePlacesAutocomplete
        placeholder='Search...'
        autoFocus={true}
        fetchDetails={true}
        // listViewDisplayed='auto'    // true/false/undefined
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'gym',//'food',
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details,"*******************************");
         setPin({
           latitude: details.geometry.location.lat,
           longitude: details.geometry.location.lng,
         })
        }}
        query={{
          key: Google_Api,
          language: 'en',
          components: "country:il",
          //	types:"establishment",
          radius: 10000,
          location: `${Number(region.latitude?region.latitude:32.34245547297243)}, ${Number(region.longitude?region.longitude:34.911549397360595)}`
        }}
        // styles={{ container: { flex: 1, position: 'absolute', top: '6.4%', width: '100%', zIndex: 1 } }}
       // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      //currentLocationLabel="Current location"
     //nearbyPlacesAPI="GooglePlacesSearch"

      /> 
    <MapView
    loadingEnabled={true}
    style={{ flex: 9,top:'1%'}}
    initialRegion={{
      latitude: Number(location && location.coords.latitude?location.coords.longitude:32.166313),//32.166313,
      longitude: Number(location && location.coords.longitude?location.coords.longitude:34.843311),//34.843311,
      latitudeDelta: 0.0125,
      longitudeDelta: 0.0121,
    }}>
         <Marker
          coordinate={region}
          title="אתה נמצא כאן" />
        <Marker
          coordinate={pin}
          pinColor='blue'
          draggable={true}
          onDragStart={(e) => { console.log("Drag start:", Number(e.nativeEvent.coordinate)); }}
          onDragEnd={(e) => {
            setPin({
              latitude: Number(e.nativeEvent.coordinate.latitude),
              longitude: Number(e.nativeEvent.coordinate.longitude)
            })
          }}>

          <Callout>
            <Text>I Want to be Here!</Text>
          </Callout>

        </Marker>
        <Circle
          center={region}
           radius={1}
        />
        
    </MapView>

    </View>
  )
}