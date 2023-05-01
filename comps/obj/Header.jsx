import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = (props) => {
    const {text, color, fontSize, backgroundColor} = props

    Header.defaultProps = {
      backgroundColor: 'transparent',
      fontSize: 30,
      color: 'black',
    };
    
    const styles = StyleSheet.create({
      header: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundColor,
        height: 80,
        paddingTop: 38,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
      },
      headerText: {
        fontSize:fontSize,
        fontWeight: 'bold',
        color: color,
        textAlign: 'center',
      }
    });

  return (
    <View style={styles.header}>
        <Text style={styles.headerText}>{text}</Text>
        {/* <Text style={[styles.headerText, { color, fontSize }]}>{text}</Text> */}
    </View>
  );
};



export default Header;

