import React from 'react';
import { View, Image, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { UserContext } from './UserDietails';
import { useContext, useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/core";

const Photos_BUS = () => {
    const { userDetails, setUserDetails } = useContext(UserContext);
    const navigation = useNavigation();

    // מערך של תמונות
    const images = ['2001', '20', 'url3', 'url4', 'url5', 'url6', 'url7', 'url8', 'url9'];

    const SquareButton = ({ id }) => {
        return (
          <TouchableOpacity style={styles.square}>
            <Text style={styles.text}>{`Button ${id}`}</Text>
          </TouchableOpacity>
        );
      };
    return (
        <ScrollView>
            <View style={styles.container}>

                <TouchableOpacity onPress={() => navigation.navigate('CameraUse', { imageName: "album" + userDetails.Business_Number })}>
                    <Text style={styles.buttonText}>כפתור</Text>
                </TouchableOpacity>


                {images.map((url, index) => (
                    <Image key={index} source={{ uri: `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil${userDetails.ID_number}.jpg` }} style={styles.image} />
                ))}


                <View style={styles.container}>
                    {[...Array(9)].map((_, i) => (
                        <SquareButton key={i + 1} id={i + 1} />
                    ))}
                </View>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderWidth: 2,
        borderColor: 'black',
        padding: 10,
    },
    square: {
        width: '30%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        margin: 5,
        backgroundColor: '#ddd',
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
    },
});

export default Photos_BUS;