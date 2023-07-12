import React, {useContext, useEffect, useState} from "react";
import {Modal, View, Button, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Platform, Linking} from "react-native";
import {  GetOneBusiness } from "../obj/FunctionAPICode";
import { FontAwesome5, AntDesign, FontAwesome } from "@expo/vector-icons";
import { openURL, canOpenURL } from "expo-linking";
import { useFocusEffect } from '@react-navigation/native';
import { UserContext } from "../UserDietails";
import { useNavigation} from "@react-navigation/core";
import Header from "../obj/Header";




const BusinessProfilePOPUP = (props) => {

  const { isVisible, onClose, Business_Number,businessRankArr } = props;
  const [businessDetails, SetBusinessDetails] = useState({});
  // const [businessRankArr, SetBusinessRankArr] = useState();
  const [Overall_rating,SetOverall_rating]=useState();
  const [Professionalism,SetProfessionalism]=useState();
  const [Cleanliness,SetCleanliness]=useState();
  const [On_time,SetOn_time]=useState();
const[ShowReviewsSection,SetShowReviewsSection]=useState(false);

const [src, setsrc] = useState()
// useFocusEffect(
//     React.useCallback(() => {
//    setsrc(`http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil${businessDetails.Professional_ID_number}.jpg`)
//    console.log(src, "111111111111111")
//   },[]))

// useFocusEffect(

//   },[]))


const handleInstagramLink = async () => {
  try {
    // const url = 'https://www.instagram.com/your_instagram_account';
    const url = `https://www.instagram.com/${businessDetails.Instagram_link}`;
    await Linking.openURL(url);
    console.log(Linking.openURL(url))
  } catch (error) {
    console.error('שגיאה בפתיחת האינסטגרם:', error);
  }
};



  // const image =
  //   "https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedias.timeout.co.il%2Fwww%2Fuploads%2F2017%2F03%2F%25D7%259E%25D7%25A8%25D7%259E%25D7%2595%25D7%25A8%25D7%25A7_17_T-1140x641.jpg&tbnid=uEfqyzHNmhL4UM&vet=12ahUKEwi1qeq93aH_AhVDmycCHYoMB54QMygFegUIARDMAQ..i&imgrefurl=https%3A%2F%2Ftimeout.co.il%2F%25D7%2594%25D7%259E%25D7%25A1%25D7%25A4%25D7%25A8%25D7%2595%25D7%25AA-%25D7%2594%25D7%259B%25D7%2599-%25D7%2598%25D7%2595%25D7%2591%25D7%2595%25D7%25AA%2F&docid=BMiIRS3jiJIo_M&w=1140&h=641&q=%D7%9E%D7%A1%D7%A4%D7%A8%D7%94&ved=2ahUKEwi1qeq93aH_AhVDmycCHYoMB54QMygFegUIARDMAQ";
    useEffect(() => {
      console.log(businessRankArr);
      GetOneBusiness(Business_Number).then(
        (result) => {
          console.log("yes", result.data);
          SetBusinessDetails( result.data);
          console.log(`http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil${result.data.Professional_ID_number}.jpg`)
          setsrc(`http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil${result.data.Professional_ID_number}.jpg`);
        },
        (error) => {
          console.log("error", error);
        }
      );
        let onTimeSum = 0;
        let professionalismSum = 0;
        let cleanlinessSum = 0;
        let overallRatingSum = 0;
        // businessRankArr.forEach(bus => {
        //   onTimeSum += bus.On_time;
        //   professionalismSum += bus.Professionalism;
        //   cleanlinessSum += bus.Cleanliness;
        //   overallRatingSum += bus.Overall_rating;
        // });
  
        // SetOn_time(onTimeSum / businessRankArr.length);
        // console.log(On_time);
        // SetProfessionalism(professionalismSum / businessRankArr.length);
        // console.log(Professionalism);
        // SetCleanliness(cleanlinessSum / businessRankArr.length);
        // console.log(Cleanliness);
        // SetOverall_rating(overallRatingSum / businessRankArr.length);
        // console.log(Overall_rating);
      
    }, [businessRankArr]);
  
  // function handleInstagramLink() {
  //   // openURL(businessDetails.Instagram_link); //לשים משתנה של כתובת אינסטגרם שהמשתמש יזין
  //   openURL('https://www.instagram.com');}

    function handleFacebookLink() {
    // openURL(businessDetails.Facebook_link); // לשים משתנה של כתובת פייסבוק שהמשתמש יזין
    openURL('https://www.facebook.com');
  
}

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
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>


        <View style={styles.view1}>
  <Image style={styles.img} onError={({ currentTarget }) => setsrc('http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profilUser.jpeg')} source={{ uri: src }} />


{/* <TouchableOpacity onPress={() => navigation.navigate('CameraUse', { imageName: "profil" + userDetails.ID_number })}>
  <Image style={styles.img} onError={({ currentTarget }) => setsrc('http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profilUser.jpeg')} source={{ uri: src }} />
</TouchableOpacity> */}

{/* <View style={styles.iconContainer}> 
<TouchableOpacity onPress={handleInstagramLink}>
<FontAwesome name="instagram" size={24} color="black" style={{ marginRight: 100 }} />
</TouchableOpacity>
<TouchableOpacity
  style={styles.link}
  onPress={() => dialNumber(userDetails.phone)}
>
  <AntDesign name="phone" size={24} color="black" />
</TouchableOpacity>
</View> */}

    </View>
          {/* <Image
            style={styles.profileImage}
            source={{ uri: "https://example.com/your-image.jpg" }} // replace with your image url
          /> */}
          <Header text={businessDetails.Name} paddingTop={0} fontSize={25} color={"rgb(92, 71, 205)"} />

          {/* <Text style={styles.textBox}>{businessDetails.Name}</Text> */}
          <Text style={styles.textBox}>
            {businessDetails.AddressStreet +
              " " +
              businessDetails.AddressHouseNumber +
              ", " +
              businessDetails.AddressCity}
          </Text>
          <Text>{businessDetails.about}</Text> 

          <View style={styles.linksContainer}>
  <View style={styles.iconContainer}>
    <TouchableOpacity   onPress={() => Linking.openURL(`https://www.instagram.com/${businessDetails.Instagram_link}`)}>
      <FontAwesome name="instagram" size={24} color="rgb(92, 71, 205)" style={{ marginRight: 50 }} />
    </TouchableOpacity>
  </View>
  <View style={styles.iconContainer}>
    <TouchableOpacity style={styles.link} onPress={() =>
                        Linking.openURL(`tel:${businessDetails.phoneNumber}`)
                      }>
      <AntDesign name="phone" size={24} color="rgb(92, 71, 205)" />
    </TouchableOpacity>
  </View>
</View>
          {/* האייקונים של אופיר */}
            {/* <TouchableOpacity
              style={styles.link}
              onPress={() => Linking.openURL("https://waze.com/ul")}
            >
              <FontAwesome5 name="waze" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.link} onPress={handleInstagramLink}>
              <FontAwesome name="instagram" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.link} onPress={handleFacebookLink}>
              <FontAwesome name="facebook-square" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.link}
              onPress={() => dialNumber("0523124500")}
            >
              <AntDesign name="phone" size={24} color="black" />
            </TouchableOpacity> */}
{/* 
          <ScrollView horizontal>
             <Image
            style={styles.imageInScrollView}
            source={{ uri:{image}}}
          />
          <Image
            style={styles.imageInScrollView}
            source={{ uri:{image}}}          />
          <Image
            style={styles.imageInScrollView}
            source={{ uri:{image}}}          /> 
            Add more images as needed 
          </ScrollView> */}
<View style={styles.rankingContainer}>
  <Text style={styles.rankingTitle}>ציון עסק: {Overall_rating}</Text>
  <Text style={styles.rankingItem}>ניקיון: {Cleanliness}</Text>
  <Text style={styles.rankingItem}>מקצועיות: {Professionalism}</Text>
  <Text style={styles.rankingItem}>זמנים: {On_time}</Text>
  <TouchableOpacity onPress={()=>{SetShowReviewsSection(!ShowReviewsSection)}}>
  <AntDesign name="downcircleo" size={24} color="black" />
     </TouchableOpacity>
  {ShowReviewsSection&&businessRankArr.length>0&&
  <ScrollView>
  {businessRankArr.map((bus) => {
              console.log("key: "+bus.Number_appointment);
              return (
                <View style={styles.card}>
        <Text style={styles.title}>ציון כלללי: {bus.Overall_rating}</Text>
        <Text style={styles.title}>ניקיון: {bus.Cleanliness}     זמנים: {bus.On_time}     מקצועיות: {bus.Professionalism}</Text>
        <Text style={styles.title}>תגובת לקוח: </Text><Text style={styles.title}>{bus.Comment}</Text>
      </View>
              );
            })}
  </ScrollView>}
</View>
          </ScrollView>
          <Button title="סגור" onPress={onClose} />

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // This will create a semi-transparent dark background
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    // height: "80%",
    // maxWidth: 500,
    },
  // scrollContent: {
  //   // flexGrow: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   width: "90%",
  // },
  scrollView: {
    width: '100%', // קביעת רוחב התוכן ל-100% של הכרטיסייה
  },
  scrollViewContainer: {
    // flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // overflow: "scroll",
    width: "10%",
    marginBottom: 20,
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
    // backgroundColor: 'fff',
    
},
  card: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#d3d3d3',
    padding: 10,
    marginVertical: 5,
    backgroundColor: "grey",
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'right',
    },
  
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  textBox: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    width: "100%",
    textAlign: "center",
  },
  linksContainer: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    // width: '80%', 
    marginBottom: 20,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
  },
  link: {
    padding: 10, // Add padding to increase touchable area
  },
  
  imageInScrollView: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  rankingContainer: {
    width: '100%',
    padding: 20,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'right',
  },
  rankingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'right', 
  },
  rankingItem: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'right',
  },
  reviewItem: {
    marginBottom: 10,
  },
});

export default BusinessProfilePOPUP;
