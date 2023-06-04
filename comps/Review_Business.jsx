// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet, Button } from "react-native";
// import { Rating } from "react-native-ratings";

// export default function Review_Business() {
 
//   const [cleanliness, setCleanliness] = useState(3);
//   const [service, setService] = useState(3);
//   const [comments, setComments] = useState("");
//   const [product, setProduct] = useState(3); 

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>דרג את העסק</Text>

//       <Text style={styles.subtitle}>ניקיון:</Text>
//       <Rating
//         imageSize={20}
//         onFinishRating={setCleanliness}
//         style={styles.rating}
//         startingValue={cleanliness}
//       />

//       <Text style={styles.subtitle}>שירות:</Text>
//       <Rating
//         imageSize={20}
//         onFinishRating={setService}
//         style={styles.rating}
//         startingValue={service}
//       />

//       <Text style={styles.subtitle}>מוצר:</Text> 
//       <Rating
//         imageSize={20}
//         onFinishRating={setProduct}
//         style={styles.rating}
//         startingValue={product}
//       />

//       <Text style={styles.subtitle}>הערות:</Text>
//       <TextInput
//         style={styles.input}
//         onChangeText={setComments}
//         value={comments}
//         multiline
//       />

//       <Button
//         title="שלח דירוג"
//         // בעת לחיצה על הכפתור, אנחנו מדפיסים את כל הדירוגים וההערות לקונסולה.
//         // במקום זאת, אתה תרצה לשלוח את הדירוגים ל
//         onPress={() => {
//             console.log(`ניקיון: ${cleanliness}`);
//             console.log(`שירות: ${service}`);
//             console.log(`מוצר: ${product}`);
//             console.log(`הערות: ${comments}`);
//           }}
//         />
//       </View>
//     );
//   }
  
//   // זהו העיצוב של הרכיב. ניתן לשנות את הערכים האלה כדי לשנות את המראה והתחושה של הרכיב.
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: "center",
//       padding: 20,
//       backgroundColor: "#f5f5f5"
//     },
//     title: {
//       fontSize: 24,
//       marginBottom: 20,
//       textAlign: "center"
//     },
//     subtitle: {
//       fontSize: 18,
//       marginTop: 20
//     },
//     rating: {
//       alignSelf: "center",
//       marginBottom: 20
//     },
//     input: {
//       height: 100,
//       borderColor: "gray",
//       borderWidth: 1,
//       marginTop: 10,
//       marginBottom: 20,
//       padding: 10
//     }
//   });
  

import React, { useState,useEffect } from 'react';
import { Alert,View, StyleSheet } from 'react-native';
import { Text, Button, TextInput, Provider as PaperProvider, Card, Title, Paragraph } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';
import { ReviewBusiness } from './obj/FunctionAPICode';

const Review_Business = ({ route }) => {
  const navigation = useNavigation();

  const{Number_appointment,ClientIDnumber,BusinessName,Business_Number}=route.params;
  const [cleanliness, SetCleanliness] = useState(0);
  const [Professionalism, SetProfessionalism] = useState(0);
  const [On_time, SetOn_time] = useState(0);
  const [Comment, SetComment] = useState('');

  useEffect(() => {
    console.log(Business_Number+' '+BusinessName+' '+Number_appointment+' '+ClientIDnumber);
  }, []);

  function publishReview(){
    try{
     // Check if appointmentDetails is not undefined
        let Overall=(cleanliness+Professionalism+On_time)/3;
        const reviewDetails={
          Number_appointment: Number_appointment,
          Client_ID_number: ClientIDnumber,
          cleanliness: cleanliness,
          Professionalism: Professionalism,
          On_time: On_time,
          Comment: Comment,
          Overall_rating: Overall,
          Business_Number: Business_Number//appointmentDetails.Business_Number
        }
        ReviewBusiness(reviewDetails).then(
      (result) => {
        if (result) {
          console.log(result.data);
          Alert.alert("תודה על הדירוג! חכמת ההמונים תמיד מנצחת!")
          navigation.goBack();
        }
      },
      (error) => {
        console.log("error", error);
      }
    );
      }
      catch{
        console.log(`error when trying to post Review of appointment ${Number_appointment}`);
      }
}

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>דרג את {BusinessName}</Title>

            <Paragraph style={styles.subtitle}>ניקיון</Paragraph>
            <Rating
              type='star'
              ratingCount={5}
              imageSize={30}
              onFinishRating={(rating) => SetCleanliness(rating)}
            />

            <Paragraph style={styles.subtitle}>שירות</Paragraph>
            <Rating
              type='star'
              ratingCount={5}
              imageSize={30}
              onFinishRating={(rating) => SetProfessionalism(rating)}
            />

            <Paragraph style={styles.subtitle}>מוצר</Paragraph>
            <Rating
              type='star'
              ratingCount={5}
              imageSize={30}
              onFinishRating={(rating) => SetOn_time(rating)}
            />

            <Paragraph style={styles.subtitle}>הערות</Paragraph>
            <TextInput
              style={styles.input}
              mode='outlined'
              multiline
              numberOfLines={4}
              value={Comment}
              onChangeText={(value) => SetComment(value)}
            />

            <Button
              style={styles.button}
              icon='check'
              mode='contained'
              onPress={() => {
                console.log(`ניקיון: ${cleanliness}`);
                console.log(`שירות: ${On_time}`);
                console.log(`מוצר: ${Professionalism}`);
                console.log(`הערות: ${Comment}`);
                publishReview();
              }}
            >
              שלח דירוג
            </Button>
          </Card.Content>
        </Card>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFEBEE'
  },
  card: {
    borderRadius: 12,
    backgroundColor: '#FCE4EC',
  },
  title: {
    color: '#AD1457',
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 20,
    marginBottom: 10,
    color: '#AD1457',
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#AD1457',
  },
});

export default Review_Business;
  