import React from 'react';
import {StyleSheet, View, Dimensions, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const backImage = require('../assets/splash.jpg');
const logo = require('../assets/cart.png');
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    width,
    height,
  },
  centerImage: {
    width: 130,
    height: 130,
    alignSelf: 'center',
  },
});
const Splash = ({navigation}) => {
  React.useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await AsyncStorage.getItem('email');
        if (user) {
          navigation.replace('homeDrawer');
        } else {
          navigation.replace('intro');
        }
      } catch (error) {
        console.log('error log', error);
      }
    };

    let timer = setInterval(() => {
      clearInterval(timer);
      checkUser();
    }, 2000);
  }, []);

  return (
    <View style={styles.root}>
      <Image source={backImage} style={styles.backgroundImage} />
      <View style={styles.container}>
        <Image source={logo} style={styles.centerImage} />
      </View>
    </View>
  );
};
export default Splash;
