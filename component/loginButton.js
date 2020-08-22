import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  root: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: 40,
    width: 245,
    borderRadius: 20,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2CB9B0',
  },
  lable: {
    fontSize: 14,
    color: 'white',
  },
});
const LoginButton = ({lable, onPress}) => {
  return (
    <View style={styles.root}>
      <RectButton style={styles.container} onPress={onPress}>
        <Text style={styles.lable}>{lable}</Text>
      </RectButton>
    </View>
  );
};
export default LoginButton;
