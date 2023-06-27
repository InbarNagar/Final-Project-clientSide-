import React, { useContext, useEffect,useState } from 'react';
import { StyleSheet, View, Text,TouchableOpacity, Image} from 'react-native';
import Menu_professional from './obj/Menu_professional';
import { UserContext } from './UserDietails';
import Header from './obj/Header';
import Button from './obj/Button';
import { useNavigation} from "@react-navigation/core";
import { useFocusEffect } from '@react-navigation/native';

    



const Profil_pro = (Props) => {

    const [src, setsrc] = useState()
    useFocusEffect(
        React.useCallback(() => {
       setsrc(`http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil${userDetails.ID_number}.jpg`)
      },[]))
      
    const { userDetails, setUserDetails } = useContext(UserContext);
const navigation=useNavigation();
useEffect(()=>{
    console.log("profile pro = "+JSON.stringify(userDetails));
},[])

    return (
        <View style={styles.view}>

                <View style={styles.view1}>
                       <Text style={styles.greeting}> שלום {userDetails.First_name}</Text>
                 <Image style={styles.img} onError={({ currentTarget }) => {
                    setsrc('http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profilUser.jpeg');
                }} source={{ uri: src }} />
             
                </View>

            <View style={styles.container}>
   

                <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate('Update_personal_details_Professional')} >

                    <Text style={styles.buttonText}>עריכת פרטים אישים </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate('Update_personal_details_Bussines')}>
                    <Text style={styles.buttonText}> עריכת פרטי העסק  </Text>
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate('Set_notifications')}>
                    <Text style={styles.buttonText}> הגדרת התראות </Text>
                </TouchableOpacity> */}

                <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate('ShowReviews',{BusinessNumber:JSON.stringify(userDetails.Business_Number)})}>
                    <Text style={styles.buttonText}> צפייה בביקורות על העסק </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>הוספת  טיפול  </Text>
                </TouchableOpacity>

               
            <TouchableOpacity style={styles.button} onPress={()=>Props.navigation.navigate('CameraUse',{imageName:"profil"+userDetails.ID_number})}>
             
                <Text style={styles.buttonText}>החלף תמונת פרופיל</Text>
              

            </TouchableOpacity>
       
            </View>
            <Menu_professional />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8ff',
        opacity: 0.9,
        borderColor: '#800080',
        borderWidth: 2,
        borderRadius: 10,
        width: '80%',
        height: '40%',
        
    },
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6e6fa',
        padding:0,
    },
    button: {
        alignItems: 'center',
        backgroundColor: "rgb(92, 71, 205)",
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    img: {
        width: 150,
        height: 150,
        borderRadius: 50,
        marginBottom: 20,
    },
    view1:{
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6e6fa',
        
    },
    greeting: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
      },
});

export default Profil_pro; 