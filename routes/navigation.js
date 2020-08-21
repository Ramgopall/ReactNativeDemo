import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import intro from '../layouts/intro';
import login from '../layouts/login';
import signUp from '../layouts/signUp';
import homeNavigation from './homeNavigation';

const Stack = createStackNavigator();

const Navigation = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="intro" component={intro} />
        <Stack.Screen name="login" component={login} />
        <Stack.Screen name="signUp" component={signUp} />
        <Stack.Screen name="homeNavigator" component={homeNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;