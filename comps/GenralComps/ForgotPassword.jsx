import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import {PropsWithChildren} from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = React.useState('');

  const handleResetPassword = () => {
    // Handle reset password logic here
  };

  return (
    <View style={styles.container}>
    
    <View  styles={styles.input}>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="תעודת זהות"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      </View>
      <Button title="שמור" onPress={handleResetPassword} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
     padding:40,
    textAlign:'right',
    // backgroundColor: '#f8f8ff',
    flex:1,
    
   
  },
  input:{
    padding:20,
    textAlign:'right',
    flexDirection: 'space-around',
    backgroundColor: 'red',
    alignSelf: 'flex-start',
    

  },

});
export default ForgotPassword;