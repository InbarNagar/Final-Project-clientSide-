import React, { useContext, useEffect, useState } from 'react';
import { View, Image, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { UserContext } from './UserDietails';
import { useNavigation } from "@react-navigation/core";
import Header from './obj/Header';
import Swiper from 'react-native-swiper';

const Photos_BUS = (Props) => {
    const { userDetails, setUserDetails } = useContext(UserContext);
    const [userType, setUserType] = useState(userDetails.userType);
    const navigation = useNavigation();
    const {Business_Number} = Props;
    const [imagesExist, setImagesExist] = useState([]);
    let imageUrls =[]
    // const imageUrls = [
    //     `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil1${userDetails.Business_Number}.jpg`,
    //     `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil2${userDetails.Business_Number}.jpg`,
    //     `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil3${userDetails.Business_Number}.jpg`,
    //     `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil4${userDetails.Business_Number}.jpg`,
    //     `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil5${userDetails.Business_Number}.jpg`,
    //     `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil6${userDetails.Business_Number}.jpg`,
    //     `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil7${userDetails.Business_Number}.jpg`,
    //     `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil8${userDetails.Business_Number}.jpg`,
    //     `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil9${userDetails.Business_Number}.jpg`,
    //     `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil10${userDetails.Business_Number}.jpg`,
    // ];

    useEffect(() => {
        if(userType === 'Pro'){
        imageUrls = [
            `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil1${userDetails.Business_Number}.jpg`,
            `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil2${userDetails.Business_Number}.jpg`,
            `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil3${userDetails.Business_Number}.jpg`,
            `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil4${userDetails.Business_Number}.jpg`,
            `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil5${userDetails.Business_Number}.jpg`,
            `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil6${userDetails.Business_Number}.jpg`,
            `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil7${userDetails.Business_Number}.jpg`,
            `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil8${userDetails.Business_Number}.jpg`,
            `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil9${userDetails.Business_Number}.jpg`,
            `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil10${userDetails.Business_Number}.jpg`,
        ]}

        if(userType === 'Cli'){
             imageUrls = [
                `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil1${Business_Number}.jpg`,
                `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil2${Business_Number}.jpg`,
                `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil3${Business_Number}.jpg`,
                `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil4${Business_Number}.jpg`,
                `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil5${Business_Number}.jpg`,
                `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil6${Business_Number}.jpg`,
                `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil7${Business_Number}.jpg`,
                `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil8${Business_Number}.jpg`,
                `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil9${Business_Number}.jpg`,
                `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil10${Business_Number}.jpg`,
            ];
            console.log(imageUrls)
        }

        console.log(userType)
        Promise.all(
            imageUrls.map((url) =>
                Image.prefetch(url)
                    .then(() => true)
                    .catch(() => false)
            )
        ).then(setImagesExist);
    }, []);

    return (
        <ScrollView style={styles.container}>
        {userType === 'Pro' && <Header text="הוספת תמונות" fontSize={20} height={200} color={"rgb(92, 71, 205)"} />}
        <Swiper style={styles.wrapper} showsButtons={true} height={300} 
            autoplay={true}
            autoplayTimeout={2}
            activeDotColor="rgb(92, 71, 205)"
            paginationStyle={{ bottom: 0 }}
            removeClippedSubviews={false}>
            {imageUrls.map((url, index) => (
                <View key={index} style={styles.slide}>
                    {imagesExist[index] ? (
                        <Image
                            style={styles.img}
                            source={{ uri: url }}
                            onError={(error) => {
                                console.log('Failed to load image', url, error);
                                const updatedImagesExist = [...imagesExist];
                                updatedImagesExist[index] = false;
                                setImagesExist(updatedImagesExist);
                            }}
                        />
                    ) : (
                        userType === 'Pro' ? (
                            <TouchableOpacity onPress={() => {
                                console.log(`button${index + 1}`);
                                Props.navigation.navigate('CameraUse', { imageName: `profil${index + 1}` + userDetails.Business_Number });
                            }}>
                                <Text style={styles.text}>הוסף תמונה</Text>
                            </TouchableOpacity>
                        ) : null
                    )}
                </View>
            ))}
        </Swiper>
    </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lavender',
    },
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    img: {
        width: '100%',
        height: '100%',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
});

export default Photos_BUS;


       
   