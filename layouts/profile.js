import React from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Title, Avatar, Caption} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';

import {userProfileUrl} from '../helper/Constant';

const buildingImage = require('../assets/building.jpg');
const mailImage = require('../assets/mail_round.png');
const phoneImage = require('../assets/phone.png');
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    width,
    height,
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 70,
    marginBottom: 20,
    marginStart: 24,
    marginEnd: 24,
    borderRadius: 16,
    alignItems: 'center',
    padding: 16,
    overflow: 'hidden',
  },
  profileAvatarWrapper: {
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    marginTop: 16,
  },
  subTitle: {
    fontSize: 14,
  },
  avatarWrapper: {
    flexDirection: 'row',
    marginTop: 8,
  },
  avatarMargin: {
    margin: 8,
  },
  user: {
    fontSize: 14,
    marginTop: 16,
  },
  detailWrapper: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  detail: {
    fontSize: 14,
    marginStart: 8,
  },
  devider: {
    width,
    backgroundColor: '#808080',
    height: 1,
  },
});

const Profile = () => {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    const checkUser = async () => {
      try {
        const userEmail = await AsyncStorage.getItem('email');
        const userName = await AsyncStorage.getItem('name');
        setEmail(userEmail);
        setName(userName);
      } catch (error) {
        console.log('error log', error);
      }
    };
    checkUser();
  }, []);

  return (
    <View style={styles.root}>
      <Image source={buildingImage} style={styles.backgroundImage} />
      <View style={styles.container}>
        <View style={styles.card}>
          <Avatar.Image
            source={{
              uri: userProfileUrl,
            }}
            size={100}
            style={styles.profileAvatarWrapper}
          />
          <Title style={styles.title}>{name}</Title>
          <Caption style={styles.subTitle}>Co-Founder at Own Company</Caption>
          <View style={styles.avatarWrapper}>
            <Avatar.Image
              source={mailImage}
              size={40}
              style={styles.avatarMargin}
            />
            <Avatar.Image
              source={phoneImage}
              size={40}
              style={styles.avatarMargin}
            />
          </View>
          <Title style={styles.devider} />
          <Caption style={styles.user}>User Detail</Caption>
          <View style={styles.detailWrapper}>
            <Icon name="phone" size={20} color="#f42855" />
            <Title style={styles.detail}>12345-67890</Title>
          </View>
          <View style={styles.detailWrapper}>
            <Icon name="mail" size={20} color="#f42855" />
            <Title style={styles.detail}>{email}</Title>
          </View>

          <View style={styles.detailWrapper}>
            <Icon name="location-pin" size={20} color="#f42855" />
            <Title style={styles.detail}>85, Near Plant Expo, NY</Title>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;
