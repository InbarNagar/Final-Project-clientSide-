import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = (props) => {
    const { onPress, text, color } = props
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={styles.button(color)}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: (color) => ({
    alignItems: 'center',
    backgroundColor: color,
    padding: 15,
    borderRadius: 10,
    margin: 10,
    marginTop: 20,
  }),
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});

export default Button;

