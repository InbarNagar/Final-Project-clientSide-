import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function Search(){
  const [textInputValue, setTextInputValue] = useState('');
  const [radio1Selected, setRadio1Selected] = useState(true);
  const [radio2Selected, setRadio2Selected] = useState(false);
  const [radio3Selected, setRadio3Selected] = useState(true);
  const [radio4Selected, setRadio4Selected] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter a search term..."
        onChangeText={(value) => setTextInputValue(value)}
        value={textInputValue}
      />
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[styles.radio, radio1Selected && styles.selected]}
          onPress={() => {
            setRadio1Selected(true);
            setRadio2Selected(false);
          }}
        >
          <Text style={styles.radioText}>Option 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radio, radio2Selected && styles.selected]}
          onPress={() => {
            setRadio1Selected(false);
            setRadio2Selected(true);
          }}
        >
          <Text style={styles.radioText}>Option 2</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[styles.radio, radio3Selected && styles.selected]}
          onPress={() => {
            setRadio3Selected(true);
            setRadio4Selected(false);
          }}
        >
          <Text style={styles.radioText}>Option 3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radio, radio4Selected && styles.selected]}
          onPress={() => {
            setRadio3Selected(false);
            setRadio4Selected(true);
          }}
        >
          <Text style={styles.radioText}>Option 4</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textInput: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  radio: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  selected: {
    backgroundColor: '#4CAF50',
  }});

  
