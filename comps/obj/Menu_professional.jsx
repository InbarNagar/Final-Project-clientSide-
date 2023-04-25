import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Calendar_professional from '../Calendar_professional'; 
import NewAppointment from '../NewAppointment';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';


const Menu_professional = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.menu}>
    
    <TouchableOpacity style={styles.menuItem} >
        <Ionicons name="person-outline" size={24} color="black" />
        <Text style={styles.menuText}>Profile</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('NewAppointment')}>
        <Ionicons name="add-circle-outline" size={24} color="black" />
        <Text style={styles.menuText}>Add</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Calendar_professional')}>
        <Ionicons name="calendar-outline" size={24} color="black" />
        <Text style={styles.menuText}>Calendar</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: '#f2f2f2',
    height: 60,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    fontSize: 12,
    paddingTop: 5,
  },
});

export default Menu_professional










