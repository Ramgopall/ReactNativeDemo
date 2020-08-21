import 'react-native-gesture-handler';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../component/drawerContent';
import homeNavigation from './homeNavigation';

const Drawer = createDrawerNavigator();
const drawerNavigation = (props) => {

    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="homeNavigator" component={homeNavigation} />
        </Drawer.Navigator>
    );
}

export default drawerNavigation;

