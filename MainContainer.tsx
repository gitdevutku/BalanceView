import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './HomeScreen';
import SettingsScreen from './Settings';
import DetailsScreen from './Details';

const homeName = 'Home';
const detailName = 'Details';
const setName = 'Settings';
const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === detailName) {
              iconName = focused ? 'list' : 'list-outline';
            } else if (rn === setName) {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={detailName} component={DetailsScreen} />
        <Tab.Screen name={setName} component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
