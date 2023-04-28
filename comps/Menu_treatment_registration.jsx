import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native';




const Menu_treatment_registration = () => {
  const [treatments, setTreatments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedTreatments, setSelectedTreatments] = useState([]);

  useEffect(() => {
    // Fetch treatments and categories from the database
    Promise.all([
      fetch('http://proj.ruppin.ac.il/cgroup93/prod/api/Type_Treatment/AllCategory'),
      fetch('http://proj.ruppin.ac.il/cgroup93/prod/api/Category/AllCategory')
    ])
      .then(([treatmentsResponse, categoriesResponse]) => Promise.all([treatmentsResponse.json(), categoriesResponse.json()]))
      .then(([treatmentsData, categoriesData]) => {
        setTreatments(treatmentsData);
        setCategories(categoriesData);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSelectTreatment = (treatment) => {
    const isTreatmentSelected = selectedTreatments.some((selectedTreatment) => selectedTreatment.treatment_id === treatment.treatment_id);
    if (isTreatmentSelected) {
      setSelectedTreatments(selectedTreatments.filter((selectedTreatment) => selectedTreatment.treatment_id !== treatment.treatment_id));
    } else {
      setSelectedTreatments([...selectedTreatments, treatment]);
    }
  };

  const handleSubmit = () => {
    // Send selected treatments to the server
    selectedTreatments.forEach((treatment) => {
      fetch('http://proj.ruppin.ac.il/cgroup93/prod/api/Appointment_can_give_treatment/NewAppointment_can_give_treatment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8', 'Accept': 'application/json'
        },
        body: JSON.stringify({
          category_id: treatment.category_id,
          treatment_id: treatment.treatment_id,
          price: treatment.price,
          duration: treatment.duration,
        }),
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    });
  };

  return (
    
      console.table(treatments),
    
    <View style={styles.container}>
      <Text style={styles.heading}>Treatment Form</Text>
      <ScrollView>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Treatment Name</Text>
          <Text style={styles.tableHeader}>Price</Text>
          <Text style={styles.tableHeader}>Duration</Text>
          <Text style={styles.tableHeader}>Select</Text>
        </View>
        {treatments.map(treatment => (
          <View style={styles.tableRow} key={treatment.id}>
            <Text style={styles.tableCell}>{treatment.treatment_name}</Text>
            <Text style={styles.tableCell}>{treatment.price}</Text>
            <Text style={styles.tableCell}>{treatment.duration}</Text>
            <CheckBox
              value={formData.some(form => form.treatment === treatment.id)}
              onValueChange={value =>
                value
                  ? setFormData([
                      ...formData,
                      {
                        treatment: treatment.id,
                        category: '',
                        price: treatment.price,
                        duration: treatment.duration,
                      },
                    ])
                  : setFormData(formData.filter(form => form.treatment !== treatment.id))
              }
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
    padding: '20px 40px',
    margin: 20,
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    padding: 20,
    margin: 20,
    maxWidth: 500,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: 'bold',
    padding: '10px 20px',
    borderRadius: 5,
    cursor: 'pointer',
  },
});



export default Menu_treatment_registration;










































// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

// const Menu_treatment_registration = () => {
//   const [treatments, setTreatments] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [formData, setFormData] = useState([{ treatment: '', category: '', price: '', duration: '' }]);

//   useEffect(() => {
//     // Fetch treatments from the database
//     fetch('https://localhost:53758/api/Type_Treatment/AllCategory')
//       .then(response => response.json())
//       .then(data => setTreatments(data))
//       .catch(error => console.error(error));
//     // Fetch categories from the database
//     fetch('https://localhost:53758/api/Category/AllCategory')
//       .then(response => response.json())
//       .then(data => setCategories(data))
//       .catch(error => console.error(error));
//   }, []);

//   const handleAddForm = () => {
//     setFormData([...formData, { treatment: '', category: '', price: '', duration: '' }]);
//   };

//   const handleFormChange = (index, field, value) => {
//     const newFormData = [...formData];
//     newFormData[index][field] = value;
//     setFormData(newFormData);
//   };

//   const handleSubmit = () => {
//     // Send form data to the server
//     formData.forEach(form => {
//       const { category, treatment, price, duration } = form;
//       fetch('https://localhost:53758/api/treatments', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json; charset=UTF-8', 'Accept': 'application/json'
//         },
//         body: JSON.stringify({
//           category_id: category,
//           treatment_id: treatment,
//           price: price,
//           duration: duration,
//         }),
//       })
//         .then(response => response.json())
//         .then(data => console.log(data))
//         .catch(error => console.error(error));
//     });
//   };

//   return (
//     <ScrollView >
//       <Text >Treatment Form</Text>
//       {formData.map((form, index) => (
//         <View key={index}>
//           <Text >סוג טיפול {index + 1}</Text>
//           <View >
//             <Text>Treatment:</Text>
//             <TextInput

//               value={form.treatment}
//               onChangeText={value => handleFormChange(index, 'treatment', value)}
//               placeholder="הזן סוג טיפול "
//             />
//             <Button title="Choose" onPress={() => console.log('Choose treatment')} />
//           </View>
//           <View >
//             <Text>Category:</Text>
//             <TextInput

//               value={form.category}
//               onChangeText={value => handleFormChange(index, 'category', value)}
//               placeholder="Select a category"
//             />
//             <Button title="Choose" onPress={() => console.log('Choose category')} />
//           </View>
//         </View>
//       )
//       )
//       }</ScrollView>)
// }

// export default Menu_treatment_registration;


