import React from 'react';
import {View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Title} from 'react-native-paper';

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#efefef',
    width: 150,
    height: 120,
    flexDirection: 'column',
    marginStart: 8,
    marginEnd: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  fastImage: {
    width: 150,
    height: 80,
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
  },
});

const ListBox = ({item}) => {
  return (
    <View style={styles.root}>
      <FastImage
        style={styles.fastImage}
        source={{
          uri: item.image,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.stretch}
      />
      <Title style={styles.title}>{item.name}</Title>
    </View>
  );
};
export default ListBox;
