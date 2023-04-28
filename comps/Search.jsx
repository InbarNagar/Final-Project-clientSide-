import { React, useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { RadioButton } from "react-native-paper";
// import { Picker } from '@react-native-picker/picker';
// import LocationPicker from './LocationHandler/LocationPicker';

export default function Search() {
  const [cityText, setCityText] = useState("");
  const [obj, setObj] = useState({
    city: "",
    category: "הכל",
    sort: "דירוג גבוהה תחילה",
    sex: "",
    house: "",
  });

  // const[categories,setCategories]=useState(['']);
  const categories = [
    "הכל",
    "ציפורניים",
    "מספרה",
    "קוסמטיקה",
    "איפור",
    "טיפול פנים",
  ];
  const sorts = ["דירוג גבוהה תחילה", "דירוג נמוך תחילה"];

  const handleInputChange = (key, value) => {
    setObj({ ...obj, [key]: value });
  };
  function btnSearch() {
    console.log(obj);
  }
  return (
    <View style={styles.body}>
      <View>
        <View>
          <Text>קטגוריה:</Text>
          {/* <Picker
                selectedValue={obj.category}
                onValueChange={(value) => handleInputChange('category', value)}>
                {categories.map((category) => (
                  <Picker.Item label={category} value={category} key={category} />
                ))}
              </Picker> */}
          <TextInput
            placeholder="עיר"
            value={obj.name}
            onChangeText={(value) => handleInputChange("city", value)}
          />
        </View>
        <View>
          <Text>מיון לפי:</Text>
          {/* <Picker
                selectedValue={obj.sort}
                onValueChange={(value) => handleInputChange('sort', value)}
              >
                {sorts.map((s) => (
                  <Picker.Item label={s} value={s} key={s} />
                ))}
              </Picker> */}
        </View>
        <View style={styles.sortView}>
          <Text>מין בעל המקצוע:</Text>
          <View style={styles.fixToText}>
            <View>
              <Text>זכר</Text>
              <RadioButton
                value="זכר"
                status={obj.sex === "זכר" ? "checked" : "unchecked"}
                onPress={() => handleInputChange("sex", "זכר")}
              />
            </View>
            <View>
              <Text>נקבה</Text>
              <RadioButton
                value="נקבה"
                status={obj.sex === "נקבה" ? "checked" : "unchecked"}
                onPress={() => handleInputChange("sex", "נקבה")}
              />
            </View>
          </View>
          <Text>טיפול בביתהלקוח ?</Text>
          <View style={styles.fixToText}>
            <View>
              <Text>כן</Text>
              <RadioButton
                value="כן"
                status={obj.house === "כן" ? "checked" : "unchecked"}
                onPress={() => handleInputChange("house", "כן")}
              />
            </View>
            <View>
              <Text>לא</Text>
              <RadioButton
                value="לא"
                status={obj.house === "לא" ? "checked" : "unchecked"}
                onPress={() => handleInputChange("house", "לא")}
              />
            </View>
          </View>
          <Button title="חפש" onPress={btnSearch} />
        </View>
        {/* <LocationPicker/> */}
      </View>
      <View style={styles.resultsView}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  sortView: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  inp: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    color: "red",
  },
  resultsView: {
    flexDirection: "column",
    width: "100%",
  },
  fixToText: {
    flexDirection: "row-reverse",
    justifyContent: "space-end",
  },
});
