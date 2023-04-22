import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native';
import Client_registration from './Client_registration';
import Professional_registration from './Professional_registration';

const GenralReg = (props) => {
    
        return (
            <View>
                
                <View>
                    <TouchableOpacity  onPress={() => { props.navigation.navigate(Professional_registration) }}>
                        <Text >הרשמת בעל עסק</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity  onPress={() => { props.navigation.navigate(Client_registration) }}>
                        <Text >הרשמת לקוח</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

}

export default GenralReg;