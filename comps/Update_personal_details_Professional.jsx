import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import Menu_professional from './obj/Menu_professional';
import { UserContext } from './UserDietails';
import { useState, useEffect, useContext } from 'react';
import Header from './obj/Header';
import Alert from './Alert';

export default function Update_personal_details_Professional(Props) {
    const userDetails = {
        "ID_number": "123455555 ",
        "First_name": "nira",
        "Last_name": "cohen",
        "birth_date": "1965-10-12T00:00:00",
        "gender": "F",
        "phone": "521212121",
        "Email": "nira@gmail.com",
        "AddressStreet": "ehud",
        "AddressHouseNumber": "5         ",
        "AddressCity": "haifa",
        "password": "12333",
        "Business_Number": 4,
        "userType": null
    };
    // const { userDetails, setUserDetails } = useContext(UserContext);

    const [ID_number, setid] = useState(userDetails.ID_number);
    const [First_name, setFirstName] = useState(userDetails.First_name);
    const [Last_name, setLastName] = useState(userDetails.Last_name);
    const [birth_date, setDateOfBirth] = useState(userDetails.birth_date);
    const [gender, setGender] = useState(userDetails.gender);
    const [phone, setPhone] = useState(userDetails.phone);
    const [Email, setEmail] = useState(userDetails.Email);
    const [AddressStreet, setStreet] = useState(userDetails.AddressStreet);
    const [AddressHouseNumber, setHouseNumber] = useState(userDetails.AddressHouseNumber);
    const [AddressCity, setCity] = useState(userDetails.AddressCity);
    const [password, setPassword] = useState(userDetails.password);
    const Business_Number = userDetails.Business_Number;

    const [alert, setAlert] = useState()
    // useEffect(() => {
    //     if (userDetails)
    //     setid(userDetails.ID_number)
    //     setFirstName(userDetails.First_name)
    //     setLastName(userDetails.Last_name)
    //     setDateOfBirth(userDetails.birth_date)
    //     setGender(userDetails.gender)
    // })

    const CheckInput = (name, value) => {
        console.log((!value.includes('@')))
        switch (name) {
            case "Email":
                if (!value.includes('@')) return false;
                if (!value.endsWith(".com") && !value.endsWith(".co.il")) return false;
                break;

            default:
                break;

        }return true;
    }

    const Update_Diteails = () => {

        // if (!First_name || !Last_name || !birth_date || !phone || !Email || !AddressStreet || !AddressHouseNumber ||
        //     !AddressCity || !password || !Business_Number) {
        //     return
        // }
        if (!CheckInput("Email", Email)) {
            setAlert(<Alert
                text='האיימיל אינו תקין'
                type='worng'
                time={3000}
                bottom={100}
            />)
            return
        }
        const data = {
            "ID_number": ID_number,
            "First_name": First_name,
            "Last_name": Last_name,
            "birth_date": birth_date,
            "gender": gender,
            "phone": phone,
            "Email": Email,
            "AddressStreet": AddressStreet,
            "AddressHouseNumber": AddressHouseNumber,
            "AddressCity": AddressCity,
            "password": password,
            "Business_Number": Business_Number,
            // "userType": 
        }

        console.log(data)
        UpdateProffesional(data).then(
            (res) => {
                if (res.status == 200) {
                    //setUserDetails(data)
                    setAlert(<Alert
                        text="השינוים נשמרו"
                        type='succes'
                        time={3000}
                        bottom={100}
                    />)
                } else {
                    setAlert(<Alert
                        text='  השינוים לא נשמרו, נסו שוב'
                        type='worng'
                        time={3000}
                        bottom={100}
                    />)
                }
            }
        )


        // console.log({ data });
        // console.log("**********************************");
        // alert("העדכון עבר בהצלחה");
    }

    return (

        <>
            {alert && alert}
            <ScrollView>
                <View style={styles.container}>
                    <Header text="עריכת פרטים אישים " color='#9acd32' fontSize={35} />
                    <Text>  שלום {First_name} {Last_name} </Text>




                    <View style={styles.inp}>
                        <TextInput style={styles.textInputS(CheckInput('Email', Email))}
                            placeholder={userDetails.Email}
                            placeholderTextColor="#92a2bd"
                            value={Email}
                            onChangeText={(text) => { setEmail(text) }}
                        />
                    </View>


                    <View style={styles.inp}>
                        <TextInput style={styles.textInputS(false)}
                            placeholder="פלאפון"
                            placeholderTextColor="#92a2bd"
                            value={phone}
                            onChangeText={(text) => setPhone(text)}
                        />

                    </View>


                    <View style={styles.inp}>
                        <TextInput style={styles.textInputS(false)}
                            placeholder="רחוב"
                            placeholderTextColor="#92a2bd"
                            value={AddressStreet}
                            onChangeText={(text) => setStreet(text)}
                        />
                    </View>

                    <View style={styles.inp}>
                        <TextInput style={styles.textInputS(false)}
                            placeholder="עיר"
                            placeholderTextColor="#92a2bd"
                            value={AddressCity}
                            onChangeText={(text) => setCity(text)}
                        />

                    </View>


                    <View style={styles.inp}>
                        <TextInput style={styles.textInputS(false)}
                            placeholder="מספר בית"
                            placeholderTextColor="#92a2bd"
                            value={AddressHouseNumber}
                            onChangeText={(text) => setHouseNumber(text)}
                        />

                    </View>


                    <View style={styles.inp}>
                        <TextInput style={styles.textInputS(false)}
                            placeholder="סיסמא"
                            placeholderTextColor="#92a2bd"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                        />

                    </View>


                    <View>
                        <TouchableOpacity style={styles.but} onPress={Update_Diteails}>
                            <View>
                                <Text style={styles.thachtext}>עדכן</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                </View>
            </ScrollView>
            <Menu_professional />
        </>
    )
}

const styles = StyleSheet.create({
    inp: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'center',
        width: '80%',
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        backgroundColor: '#fffaf0',


    },
    textInputS: (borderColor) => {
        return {
            // height: 40,
            // width: "80%",
            // margin: 10,
            borderWidth: 1,
            // padding: 10,
            color: '#808080',
            borderColor: borderColor ? 'green' : 'red',
            // height: 50,
            fontSize: 25,
            textAlign: 'right',
            fontWeight: 'bold',
            opacity: 0.5,
        }

    },
    title: {
        padding: 10,
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 25,
        color: '#fff',
        fontWeight: 'bold',

    },

    titp: {
        textAlign: 'center',
        color: '#fffaf0',
        fontSize: 17,
    },

    container: {
        flex: 12,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9acd32',
        padding: 50
    },

    text: {


        textAlign: 'right',
        paddingBottom: 10,

    },
    but: {
        textAlign: 'center',
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        backgroundColor: '#ff69b4',
        padding: 15,
        margin: 10,
        marginTop: 10,

    },
    thachtext: {
        textAlign: 'center',
        color: '#fffaf0',
        fontSize: 25,
        fontWeight: 'bold',
        //borderRadius: 10,
        height: 50,
        // marginBottom: 20,
        // backgroundColor: '#fffaf0',
        // padding: 15,
        // margin: 10,
        // marginTop: 20,
    },

});