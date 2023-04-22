import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Search = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginTop: 16 }}>
        <Icon name='search' type='font-awesome' />
        <TextInput
          placeholder='חפש כאן...'
          style={{ marginLeft: 8 }}
          onChangeText={text => setSearchText(text)}
          value={searchText}
        />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{searchText}</Text>
      </View>
    </View>
  );
};

export default Search;