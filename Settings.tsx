import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {NavigationProp, ParamListBase} from '@react-navigation/native';

type SetScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

export default function SettingsScreen({navigation}: SetScreenProps) {
  return (
    <View style={styless.container}>
      <Text style={styless.homeScreen}>Settings Screen</Text>
    </View>
  );
}
const styless = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeScreen: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'gray',
  },
});
