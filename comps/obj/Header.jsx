import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = (props) => {
    const{text, color, fontSize} = props

  return (
    <View style={styles.header}>
        <Text style={styles.headerText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "red",
    height: 80,
    paddingTop: 38,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  headerText: {
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  }
});

export default Header;

