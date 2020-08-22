import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 245,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lable: {
    fontSize: 14,
  },
});
const Button = ({lable, variant, onPress}) => {
  const backgroundColor =
    variant === 'primary' ? '#2CB9B0' : 'rgba(12,13,52,0.05)';
  const color = variant === 'primary' ? 'white' : 'black';
  return (
    <RectButton style={[styles.container, {backgroundColor}]} onPress={onPress}>
      <Text style={[styles.lable, {color}]}>{lable}</Text>
    </RectButton>
  );
};
export default Button;
