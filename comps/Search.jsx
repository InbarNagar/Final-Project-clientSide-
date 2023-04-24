import {React, useState} from 'react'
import { View, Text, StyleSheet, TextInput,Button } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import LocationPicker from './GenralComps/LocationCom/LocationPicker';

export default function Search2() {
    
      const [selectedCategory, setSelectedCategory] = useState('הכל');
      const [selectedSort, setSelectedSort] = useState('דירוג גבוהה תחילה');
    
      const categories = ['הכל', 'ציפורניים', 'מספרה', 'קוסמטיקה','איפור','טיפול פנים'];
      const sorts = ['דירוג גבוהה תחילה', 'דירוג נמוך תחילה'];

      const [city,setCity]=useState();
      function cityHandler(text){
        setCity(text);
      }

      const [sexChecked, setSexChecked] = useState('');
      const [housechecked, setHouseChecked] = useState('');


    
      const handleCategoryChange = (itemValue) => {
        setSelectedCategory(itemValue);
      };
    
      const handleSortChange = (itemValue) => {
        setSelectedSort(itemValue);
      };
      function searchForAppointment(){
        console.log(city,selectedCategory,selectedSort,sexChecked,housechecked)
      }
      return (
        <View style={styles.body} >
          <View >
            <View >
              <Text >קטגוריה:</Text>
              <Picker
                
                selectedValue={selectedCategory}
                onValueChange={handleCategoryChange}>
                {categories.map((category) => (
                  <Picker.Item label={category} value={category} key={category} />
                ))}
              </Picker>
              <TextInput placeholder='עיר' onChangeText={cityHandler}/>
            </View>
            <View>
              <Text >מיון לפי:</Text>
              <Picker
                selectedValue={selectedSort}
                onValueChange={handleSortChange}
              >
                {sorts.map((sort) => (
                  <Picker.Item label={sort} value={sort} key={sort} />
                ))}
              </Picker>
            </View>
            <View style={styles.sortView}>
            <Text>מין בעל המקצוע:</Text>
            <View style={styles.fixToText}>
              <View><Text>זכר</Text>
      <RadioButton
        value="זכר"
        status={ sexChecked === 'זכר' ? 'checked' : 'unchecked' }
        onPress={() => setSexChecked('זכר')}/></View>
            <View>
        <Text>נקבה</Text>
      <RadioButton
        value="נקבה"
        status={ sexChecked === 'נקבה' ? 'checked' : 'unchecked' }
        onPress={() => setSexChecked('נקבה')}
      />
      </View>
    </View>
    <Text>טיפול בבית הלקוח?</Text>
            <View style={styles.fixToText}>
              <View><Text>כן</Text>
      <RadioButton
        value="כן"
        status={ housechecked === 'כן' ? 'checked' : 'unchecked' }
        onPress={() => setHouseChecked('כן')}/></View>
            <View>
        <Text>לא</Text>
      <RadioButton
        value="לא"
        status={ housechecked === 'לא' ? 'checked' : 'unchecked' }
        onPress={() => setHouseChecked('לא')}
      />
      </View>
    </View>
    <Button title='חפש' onPress={searchForAppointment}/>

    </View>
          </View>
          <View style={styles.resultsView}>

          </View>
        </View>
      );}

      const styles = StyleSheet.create({
        sortView:{
          flexDirection:'row-reverse',
          justifyContent:'space-between',
        },
        inp: {
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
            color: 'red',
        },
        resultsView:{
          flexDirection:"column",
          width:"100%",
        },
        fixToText: {
            flexDirection: 'row-reverse',
            justifyContent: 'space-end',
          }
    });