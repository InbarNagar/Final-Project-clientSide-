import { View, Text ,TextInput} from 'react-native'
import React,{useState} from 'react'

export default function Input(props) {
    const { style,styleContainer, placeholder, value, onChangeText, autoCapitalize, keyboardType, autoCompleteType
    } = props

    const [inputValue, setInputValue] = useState(value);

    return (
        <View style={styleContainer}>

            <TextInput
        
                style={style}
                placeholder={placeholder}
                value={inputValue}
                onChangeText={onChangeText}
                autoCapitalize={autoCapitalize}
                keyboardType={keyboardType}
                autoCompleteType={autoCompleteType}
            />
            <Text style={style}>תעודת זהות</Text>
        </View>
    )
}