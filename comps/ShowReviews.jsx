import { useNavigation,useRoute } from "@react-navigation/core";
import React, { useState,useEffect } from "react";
import {View,Text,StyleSheet,ScrollView} from "react-native";
import { AllBusinessReviews } from "./obj/FunctionAPICode";
import Menu_professional from './obj/Menu_professional';
import Header from "./obj/Header";


const ShowReviews =()=>{
    const route = useRoute();
    const navigation = useNavigation();
    const {BusinessNumber}=route.params;
    const [allReviews,SetAllReviews]=useState([]);
    useEffect(() => {
        console.log("business reviews= " + BusinessNumber);
        console.log(AllBusinessReviews(BusinessNumber))
        AllBusinessReviews(BusinessNumber)
          .then((result) => {
            console.log(result, "10101010101010101")
            console.log(result.data);
            SetAllReviews(result);
          })
          // .then((result) => {
          //   jjjjj = result.
          //   console.log(result.data);
          //   SetAllReviews(result.data);
          // })
          .catch((error) => {
            console.log('error', error);
          });
      }, []);
    
      useEffect(() => {
        console.log(JSON.stringify(allReviews), "5555555555555555555555555555555555");
      }, [allReviews]);

    return (
      <>
    <ScrollView>
    <View style={styles.container}>
    <Header text="ביקורות על העסק שלך" fontSize={35}  color={"rgb(92, 71, 205)"} />
      <View style={styles.cardContainer}>
        {allReviews.map((review)=>
        {
        console.log(review);
        return(
          <View style={styles.card}>
  <View style={styles.row}>
    <Text style={styles.title}>ציון כללי: {review.Overall_rating}</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.rightText}>ניקיון: {review.Cleanliness}</Text>
    <Text style={styles.rightText}>זמנים: {review.On_time}</Text>
    <Text style={styles.rightText}>מקצועיות: {review.Professionalism}</Text>
  </View>
  <View style={styles.customerCommentContainer}>
    <Text style={styles.title} >תגובת הלקוח: </Text>
    <Text style={styles.customerComment}>{review.Comment}</Text>
  </View>
</View>


          );
        })} 
        </View>
        </View>
      </ScrollView>
      <Menu_professional />
      </>

    );
  };

  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#e6e6fa',
      flex:1
      // justifyContent: 'center',
      // alignItems: 'center',
        },
      card: {
        borderWidth: 3,
        borderRadius: 10,
        borderColor: 'rgb(92, 71, 205)',
        padding: 10,
        marginVertical: 5,
        width:'100%',
        
        // backgroundColor: '#e6e6fa',
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        marginBottom: 10
      },
      rightText: {
        textAlign: 'right',
        marginBottom: 10
      },
      customerCommentContainer: {
        alignItems: 'center',
        marginTop: 10,
      },
      customerComment: {
        textAlign: 'center',
        fontSize: 20
      },
    
    
  
  
  
    // cardContainer:{
    //   backgroundColor: '#e6e6fa',

    // },
    // card: {
    //   borderWidth: 1,
    //   borderRadius: 10,
    //   borderColor: '#d3d3d3',
    //   padding: 10,
    //   marginVertical: 5,
    //   backgroundColor: 'rgb(255, 255, 255)',
    // },
    // title: {
    //   fontWeight: 'bold',
    //   marginBottom: 5,
    //   textAlign: "center",
    // },
    // text: {

    //   fontSize: 20,
    // }
  });

export default ShowReviews;



{/* <View style={styles.card}> */}
        {/* <Text style={styles.title}>מספר תור: {review.Number_appointment}    מספר ביקורת:  {review.Review_Number}</Text> */}
        {/* <Text style={styles.title}>ציון כלללי: {review.Overall_rating}</Text>
        <Text style={styles.title}>ניקיון: {review.Cleanliness}{'\n'}
                                  זמנים: {review.On_time}{'\n'}
                                  מקצועיות: {review.Professionalism}</Text>
        <Text style={styles.title}>תגובת הלקוח: {review.Comment}</Text>
      </View> */}