import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Splash from '../layouts/Splash';
import Intro from '../layouts/Intro';
import Login from '../layouts/Login';
import SignUp from '../layouts/SignUp';
import DrawerNavigation from './DrawerNavigation';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="splash" component={Splash} />
        <Stack.Screen name="intro" component={Intro} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signUp" component={SignUp} />
        <Stack.Screen name="homeDrawer" component={DrawerNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
