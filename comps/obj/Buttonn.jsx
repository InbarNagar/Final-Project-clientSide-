import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { View } from 'react-native-web';

const Button = ({ onPress, title }) => {
  return (
    <View>
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    </View>

  );
};

const styles = {
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export default Button;
