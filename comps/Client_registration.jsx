import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';

const Client_registration = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [city, setCity] = useState('');
    const [password, setPassword] = useState('');

    const handleRegistrationC = () => {
        fetch('http://localhost:53758/api/Professional/NewProfessional', {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data; charset=UTF-8', 'Accept': 'multipart/form-data' },
            body: JSON.stringify({
                firstName,
                lastName,
                gender,
                dateOfBirth,
                phone,
                email,
                street,
                houseNumber,
                city,
                password,
            }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
    };

    return (
        <View style={{ padding: 50, backgroundColor: `#ffefd5` }}>
            <Text style={styles.title}>איזה כיף שהחלטת להצטרף לקהילת הלקוחות שלנו!</Text>
            <Text style={styles.titp}> אנא מלא/י את הפרטים הבאים:</Text>
            <View style={styles.inp}>


                <TextInput style={styles.textInputS}
                    placeholder="שם פרטי"
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)}
                />
                <Text>שם פרטי</Text>
            </View>

            <View style={styles.inp}>
                <TextInput style={styles.textInputS}
                    placeholder="שם משפחה"
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                />
                <Text>שם משפחה</Text>
            </View>

            <View style={styles.inp}>
                <TextInput style={styles.textInputS}
                    placeholder="מין"
                    value={gender}
                    onChangeText={(text) => setGender(text)}
                />
                <Text>מין</Text>
            </View>

            <View style={styles.inp}>
                <TextInput style={styles.textInputS}
                    placeholder="תאריך לידה"
                    value={dateOfBirth}
                    onChangeText={(text) => setDateOfBirth(text)}
                />
                <Text>שם משפחה</Text>
            </View>

            <View style={styles.inp}>
                <TextInput style={styles.textInputS}
                    placeholder="פלאפון"
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                />
                <Text>פלאפון</Text>
            </View>
            <View style={styles.inp}>
                <TextInput style={styles.textInputS}
                    placeholder="אימייל"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Text>איימיל</Text>
            </View>


            <View style={styles.inp}>
                <TextInput style={styles.textInputS}
                    placeholder="רחוב"
                    value={street}
                    onChangeText={(text) => setStreet(text)}
                />
                <Text>רחוב</Text>
            </View>


            <View style={styles.inp}>
                <TextInput style={styles.textInputS}
                    placeholder="מספר בית"
                    value={houseNumber}
                    onChangeText={(text) => setHouseNumber(text)}
                />
                <Text>מספר בית</Text>
            </View>

            <View style={styles.inp}>
                <TextInput style={styles.textInputS}
                    placeholder="עיר"
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />
                <Text>עיר</Text>
            </View>

            <View style={styles.inp}>
                <TextInput style={styles.textInputS}
                    placeholder="סיסמא"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                />
                <Text>סיסמא</Text>
            </View>

            <Button color="#a0522d" title="סיום הרשמה" onPress={handleRegistration} />
        </View>
    )
}

const styles = StyleSheet.create({
    inp: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-between',
        color: 'red',
    },
    textInputS: {
        borderWidth: 1,
        borderColor: '#cccccc',
        width: "80%",
        marginRight: 8,
    },
    title: {
        padding: 60,
        justifyContent: 'center',
        textAlign: 'center'
    },
    titp: {
        textAlign: 'center'
    }
});

export default Professional_registration;

