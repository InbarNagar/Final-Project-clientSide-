import React, { useContext, useEffect,useState } from 'react';
import { StyleSheet, View, Text,TouchableOpacity, Image, Linking} from 'react-native';
import Menu_professional from './obj/Menu_professional';
import { UserContext } from './UserDietails';
import Header from './obj/Header';
import Button from './obj/Button';
import { useNavigation} from "@react-navigation/core";
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { openURL, canOpenURL } from "expo-linking";

    



const Profil_pro = (Props) => {

    const [src, setsrc] = useState('');
    useFocusEffect(
        React.useCallback(() => {
       setsrc(`http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil${userDetails.ID_number}.jpg`)
      },[]))
      
    const { userDetails, setUserDetails } = useContext(UserContext);
const navigation=useNavigation();
useEffect(()=>{
    console.log("profile pro = "+JSON.stringify(userDetails));
},[])


  const handleInstagramLink = async () => {
    try {
      // const url = 'https://www.instagram.com/your_instagram_account';
      const url = `https://www.instagram.com/${userDetails.Instagram_link}`;
      await Linking.openURL(url);
      console.log(Linking.openURL(url))
    } catch (error) {
      console.error('שגיאה בפתיחת האינסטגרם:', error);
    }
  };

  const dialNumber = (number) => { //לא עובד כי בתחלה לא אישרתי להשתמש בטלפון בהגדרות אפליקציה
    console.log(number);
    let phoneNumber = "";

    if (Platform.OS === "android") {
      console.log(Platform.OS);
      phoneNumber = `tel:${number}`;
    } else {
      console.log(Platform.OS);
      phoneNumber = `telprompt:${number}`;
    }
    canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          alert("Phone number is not available");
        } else {
          return openURL(phoneNumber);
        }
      })
      .catch((err) => console.error("error!", err));
  };

    return (
        <View style={styles.view}>

                <View style={styles.view1}>
                       <Text style={styles.tit}> שלום {userDetails.First_name}</Text>
                       {/* <Header text={`שלום ${userDetails.First_name}`} fontSize={25} color={"rgb(92, 71, 205)"} /> */}
                 {/* <Image style={styles.img}  onError={({ currentTarget }) => {
                    setsrc('http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profilUser.jpeg');
                }} source={{ uri: src }} /> */}
          
       <Image style={styles.img} onError={({ currentTarget }) => setsrc('http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profilUser.jpeg')} source={{ uri: src }} />


{/*לא עובד כי בתחלה לא אישרתי להשתמש בטלפון בהגדרות אפליקציה*/}
  <View style={styles.iconContainer}> 
        <TouchableOpacity onPress={handleInstagramLink}>
          <FontAwesome name="instagram" size={24} color="black" style={{ marginRight: 100 }} />
        </TouchableOpacity>
        <TouchableOpacity
              style={styles.link}
              onPress={() => dialNumber(userDetails.phone)}
            >
              <AntDesign name="phone" size={24} color="black" />
            </TouchableOpacity>
      </View>

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

                <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate('Update_MenuTreatment',{BusinessNumber:JSON.stringify(userDetails.Business_Number)})}>
                    <Text style={styles.buttonText}>הוספת טיפול לתפריט הטיפולים</Text>
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
        // backgroundColor: '#f8f8ff',
        opacity: 0.9,
        // borderColor: '#800080',
        // borderWidth: 2,
        // borderRadius: 10,
        width: '90%',
        height: '40%',
        
    },
    view: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6e6fa',
        paddingTop:20,
        marginTop:0,
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
        fontSize: 20,
    },
    img: {
        borderRadius: 150,
        marginBottom: 20,
        width: 250,
        height: 250,
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
    tit:{
    "fontSize": 40,
    "fontWeight": "500",
    "letterSpacing": 0.15,
    "lineHeight": 50,
    textShadowColor: 'rgb(92, 71, 205)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    opacity:0.7
    },
    iconContainer: {
        flexDirection: "row",
        // justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        // width: "50%",
        marginTop: 10,
        marginBottom: 10,
      },
});

export default Profil_pro; 