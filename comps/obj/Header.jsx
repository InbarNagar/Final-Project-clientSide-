import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header(props) {
    const{color, fontSize, titleText} = props

  return (
    <View style={styles.header}>
      <Text style={[styles.headerText, { color, fontSize }]}>
        {titleText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: 80,
    paddingTop: 38,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  headerText: {
    fontWeight: 'bold'
  }
});

