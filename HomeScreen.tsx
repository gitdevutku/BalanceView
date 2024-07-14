import {Alert} from 'react-native';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text
        style={styles.homeScreen}
        onPress={() => Alert.alert('This is the "Home" screen.')}>
        Home Screen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
