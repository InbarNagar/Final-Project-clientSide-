import { useNavigation,useRoute } from "@react-navigation/core";
import React, { useState,useEffect } from "react";
import {View,Text,StyleSheet,ScrollView} from "react-native";
import { AllBusinessReviews } from "./obj/FunctionAPICode";

const ShowReviews =()=>{
    const route = useRoute();
    const navigation = useNavigation();
    const {BusinessNumber}=route.params;
    const [allReviews,SetAllReviews]=useState([]);
    useEffect(() => {
        console.log("business reviews= " + BusinessNumber);
        AllBusinessReviews(BusinessNumber)
          .then((result) => {
            console.log(result.data);
            SetAllReviews(result.data);
          })
          .catch((error) => {
            console.log('error', error);
          });
      }, []);
    
      useEffect(() => {
        console.log(JSON.stringify(allReviews));
      }, [allReviews]);

    return (
    <ScrollView>
        {allReviews.map((review)=>
        {
        console.log(review);
        return(
        <View style={styles.card}>
        <Text style={styles.title}>מספר תור: {review.Number_appointment}    מספר ביקורת:  {review.Review_Number}</Text>
        <Text style={styles.title}>ציון כלללי: {review.Overall_rating}</Text>
        <Text style={styles.title}>ניקיון: {review.Cleanliness}     זמנים: {review.On_time}     מקצועיות: {review.Professionalism}</Text>
        <Text style={styles.title}>תגובת לקוח: </Text><Text style={styles.title}>{review.Comment}</Text>
      </View>);
        })} 
      </ScrollView>
    );
  };

  
  const styles = StyleSheet.create({
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
      textAlign: "center",
    },
    text: {

      fontSize: 20,
    }
  });

export default ShowReviews;