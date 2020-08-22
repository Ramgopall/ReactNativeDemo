import 'react-native-gesture-handler';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import DrawerContent from '../component/DrawerContent';
import HomeNavigation from './HomeNavigation';

const Drawer = createDrawerNavigator();
const DrawerNavigation = (props) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="homeNavigator" component={HomeNavigation} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigation;
