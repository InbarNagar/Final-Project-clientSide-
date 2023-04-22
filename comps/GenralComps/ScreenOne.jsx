import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, marginRight, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TouchableOpacity } from 'react-native';
import LogIn from './LogIn';
import LogIn_Client from '../LogIn_Client';




const ScreenOne = (props) => {

    return (

        <View style={{flex: 1}}>
           
            <Text style={style.wel} >Beuaty Me</Text>

            <View >

                <TouchableOpacity onPress={() => {props.navigation.navigate('LogIn',{userType:'Pro',})
                }}>
                    <View style={style.viewS}>
                        <Text style={style.titleText}>בעלי עסקים</Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity onPress={() => { props.navigation.navigate('LogIn',{userType:'Cli',})
             }}>
                    <View style={style.viewS}>
                        <Text style={style.titleText} >לקוחות</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({

    wel: {
        textAlign: "center",
        fontSize: 70,
        paddingTop: 50,
        color:'#9acd32',
    },

    titleText: {
        padding: 20,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: 40,
        backgroundColor:'#9acd32',
         color: '#f0f8ff',
        opacity: 0.5,
        

    },
    viewS: {
        borderRadius: 62,
        flexDirection: 'column',
        textAlign: 'center',
        padding: 15,
        
    }
})

export default ScreenOne;