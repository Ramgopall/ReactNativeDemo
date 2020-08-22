import React from 'react';
import {View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Searchbar, Title} from 'react-native-paper';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Entypo';

import HomeList from '../component/HomeList';
import {
  animatedBox,
  discountAnimatedStyle,
  newlyAnimatedStyle,
  brandsAnimatedStyle,
  popularAnimatedStyle,
} from '../helper/HomeAnimation';
import {
  discountList,
  newList,
  popularList,
  brandList,
} from '../helper/Constant';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 8,
  },
  header: {
    flexDirection: 'row',
  },
  menu: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efefef',
  },
  search: {
    margin: 16,
    borderRadius: 24,
    opacity: 0.9,
  },
  title: {
    margin: 8,
    fontSize: 22,
  },
  subTitle: {
    margin: 16,
    fontSize: 16,
  },
});

const Home = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await AsyncStorage.getItem('name');
        setName(user);
      } catch (error) {
        console.log('error log', error);
      }
    };
    animatedBox();
    checkUser();
  }, []);

  return (
    <ScrollView style={styles.root}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.menu}
            onPress={() => navigation.openDrawer()}>
            <Icon name="menu" size={25} />
          </TouchableOpacity>
          <Title style={styles.title}>Welcome, {name}</Title>
        </View>
        <Searchbar
          style={styles.search}
          iconColor="#10a6fb"
          placeholder="Search"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        <Animated.View style={discountAnimatedStyle}>
          <HomeList title="50% Discount" data={discountList} />
        </Animated.View>
        <Animated.View style={newlyAnimatedStyle}>
          <HomeList title="Newly Added" data={newList} />
        </Animated.View>
        <Animated.View style={popularAnimatedStyle}>
          <HomeList title="Most Popular" data={popularList} />
        </Animated.View>
        <Animated.View style={brandsAnimatedStyle}>
          <HomeList title="Brands" data={brandList} />
        </Animated.View>
      </View>
    </ScrollView>
  );
};

export default Home;
