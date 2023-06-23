// import React from 'react';
// import { View, TextInput, Button, StyleSheet } from 'react-native';
// import { PropsWithChildren } from 'react';

// const ForgotPassword = () => {
//   const [ID_number, setid] = React.useState('');

//   const handleResetPassword = () => {
//     // Handle reset password logic here
//   };

//   return (
//     <View style={styles.container}>

//       <View styles={styles.input}>
//         <TextInput
//           value={ID_number}
//           onChangeText={setid}
//           placeholder=" מייל"
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />
//       </View>

//       <Button title="שמור" onPress={handleResetPassword} />

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 40,
//     textAlign: 'right',
//     // backgroundColor: '#f8f8ff',
//     flex: 1,
//   },
//   input: {
//     padding: 20,
//     textAlign: 'right',
//     flexDirection: 'space-around',
//     backgroundColor: 'red',
//     alignSelf: 'flex-start',
//   },

// });
// export default ForgotPassword;
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (email === '') {
      Alert.alert('שגיאה', 'אנא הזן כתובת אימייל');
      return;
    }

    // כאן אתה יכול להוסיף את הקוד שלך לשליחת בקשת איפוס סיסמא לשרת
    // לדוגמה:
    // sendResetPasswordEmail(email);

    Alert.alert('בקשת איפוס סיסמא נשלחה', `אנא בדוק את תיבת הדואר הנכנס שלך בכתובת ${email}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>שכחתי סיסמא</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="הזן את כתובת האימייל שלך"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>אפס סיסמא</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 48,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#ff6347',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ForgotPassword;