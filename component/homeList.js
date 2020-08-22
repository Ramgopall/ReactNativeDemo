import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';

import ListBox from './ListBox';
const styles = StyleSheet.create({
  subTitle: {
    margin: 16,
    fontSize: 16,
  },
});
const HomeList = ({title, data}) => {
  return (
    <View>
      <Title style={styles.subTitle}>{title}</Title>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={(item) => ListBox(item)}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
export default HomeList;
