import { View, Text ,TextInput, StyleSheet, style} from 'react-native'
import React,{useState} from 'react'

const Input = (props) => {
    const {textt, styleText, styleView, styleTextInput, placeholder, value, onBlur, autoCapitalize, keyboardType, autoCompleteType
    } = props

    const [inputValue, setInputValue] = useState(value);

    return (
        <View style={styleView}>

            <TextInput
        
                style={styleTextInput}
                placeholder={placeholder}
                value={inputValue}
                onBlur={onBlur}
                autoCapitalize={autoCapitalize}
                keyboardType={keyboardType}
                autoCompleteType={autoCompleteType}
            />
            <Text style={styleText}>{textt}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        alignItems: 'center',
      },
    input: {
      borderWidth: 1,
      borderColor: '#9acd32',
      width: "80%",
      marginRight: 8,
    },
    inp: {
      flexDirection: 'row',
      padding: 20,
      justifyContent: 'space-between',
      width: "100%",
    },
  });
  
export default Input;