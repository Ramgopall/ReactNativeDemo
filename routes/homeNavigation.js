import 'react-native-gesture-handler';
import * as React from 'react';
import { Image } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from '../layouts/home';
import Profile from '../layouts/profile';
import Icon from 'react-native-vector-icons/Ionicons';


const Tab = createMaterialBottomTabNavigator();

const homeNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#FFFFFF"
      shifting={true}
    >
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }} />
      <Tab.Screen name="Profile" component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#694fad',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }} />
    </Tab.Navigator>
  );
}

export default homeNavigation;