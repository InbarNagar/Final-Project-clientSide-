import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menu_professional from './obj/Menu_professional';
import { UserContext } from './UserDietails';
import Header from './obj/Header';
import Button from './obj/Button';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Profil_pro = (Props) => {
    const { userDetails, setUserDetails } = useContext(UserContext);

    return (
        <View style={styles.view}>
        
            <View style={styles.container}>
                
                <TouchableOpacity style={styles.button} onPress={() => Props.navigation.navigate('Update_personal_details_Professional')} >
                    <Text style={styles.buttonText}>עריכת פרטים אישים </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => Props.navigation.navigate('Update_personal_details_Bussines')}>
                    <Text style={styles.buttonText}> עריכת פרטי העסק  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => Props.navigation.navigate('Set_notifications')}>
                    <Text style={styles.buttonText}> הגדרת התראות </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}> ביקורות על העסק </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>הוספת סוג טיפול נוסף </Text>
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
        height: '50%'
    },
    view: {
        flex: 1,
        backgroundColor: '#f8f8ff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#9370DB',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Profil_pro; 