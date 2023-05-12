import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, marginRight, Image, ScrollView } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menu_professional from './obj/Menu_professional';
import { UserContext } from './UserDietails';
import Header from './obj/Header';
import Button from './obj/Button';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';



const Profil_pro = (Props) => {


    const { userDetails, setUserDetails } = useContext(UserContext);

    // const [First_name, setFirstName] = useState('');
    // const [Last_name, setLastName] = useState('');

    // useEffect(() => {

    //     setFirstName(userDetails.First_name)
    //     setLastName(userDetails.Last_name)

    // }, [userDetails])

    return (

        <>
            <View style={styles.view}>
                <Header text="אזור אישי" color='#9acd32' fontSize={35} />
                {/* <Text style={styles.wel}>שלום {First_name} </Text>  */}

                <View style={styles.container}>
                    <View>
                        <TouchableOpacity onPress={() => Props.navigation.navigate('Update_personal_details_Professional')} >
                            <Text >עריכת פרטים אישים </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => Props.navigation.navigate('Update_personal_details_Bussines')}>
                            <Text> עריכת פרטי העסק  </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => Props.navigation.navigate('Set_notifications')}>
                            <Text>   הגדרת התראות </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => Props.navigation.navigate('Update_personal_details_Bussines')}>
                            <Text> ביקורות על העסק </Text>
                        </TouchableOpacity>
                    </View>
               
               
                </View>

            </View>

            <Menu_professional />
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 12,
        alignItems: 'center'

    },

    view1: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 10,
        //  borderColor:'#9acd32'

    },
    view: {
        flex: 4,
        flexDirection: 'column',

    },
    wel: {
        textAlign: "center",
        fontSize: 30,
        color: '#9acd32',
    },
    text: {
        textAlign: "center",
        fontSize: 20,
    }


});
export default Profil_pro;