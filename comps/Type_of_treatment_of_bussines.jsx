import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet} from "react-native";

function Type_of_treatment_of_bussines() {
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    fetch("http://proj.ruppin.ac.il/cgroup93/prod/api/Business_can_give_treatmentController/All_the_treatments_appointment_can_give")
      .then((res) => res.json())
      .then((data) => setTreatments(data))
      .catch((err) => console.log(err));
  }, []);

  const handleSelect = (index) => {
    // handle selecting treatment at index
  };
  

  const renderTreatment = ({ item, index }) => {
    return (
      <View style={styles.row}>
        <Text style={styles.label}>{item.type}</Text>
        <Text style={styles.label}>{item.price}</Text>
        <Text style={styles.label}>{item.duration}</Text>
        <Switch value={canGoToClient} onValueChange={() => handleSelect(index)} />
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={treatments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderTreatment}
      />
    
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Appointment</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: '#2196F3',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });


export default Type_of_treatment_of_bussines;


 {/* <Type_of_treatment_of_bussines businessNumber={businessNumber} /> */}