import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, marginRight, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogIn from './LogIn';
import { TouchableOpacity } from 'react-native';




const ScreenOne = (props) => {

    return (
        <View >
            <Text style={style.wel} color='#fff8dc'>ברוכים הבאים </Text>

            <View >
          
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate('LogIn');
                }}>
                <View style={style.viewS}>
                    <Text style={style.titleText} color="#a0522d">בעלי עסקים</Text>
               </View>

                </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{props.navigation.navigate('LogIn')}}> 
               <View style={style.viewS}>
                <Text style={style.titleText} >לקוחות</Text>
                </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
   
    wel:{
        textAlign:"center",
        fontSize:70,
       color:'#b8860b',
        paddingTop:50,
       
    },

    titleText: {
        padding: 20,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius:40,
        backgroundColor:'burlywood',
       color:'#f0f8ff',
    
    },
    viewS:{
        borderRadius:62,
        flexDirection: 'column',
        textAlign: 'center',
        padding:15,
        
        

    }
})

export default ScreenOne;