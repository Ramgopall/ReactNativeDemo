import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Text,
  LogBox,
  ToastAndroid,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {useLazyQuery} from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import Animated, {Easing} from 'react-native-reanimated';

import TextInput from '../component/TextInput';
import Button from '../component/LoginButton';
import {CHECK_USER} from '../graphql/Queries';

LogBox.ignoreAllLogs();
const {width} = Dimensions.get('window');
const aspectRation = 450 / 1084;
const height = width * aspectRation;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#0C0D34',
  },
  headerImage: {
    ...StyleSheet.absoluteFillObject,
    height,
  },
  pic: {
    height,
    borderBottomLeftRadius: 75,
    borderTopLeftRadius: 75,
    overflow: 'hidden',
  },
  centerContainer: {
    flex: 6,
    borderRadius: 75,
    borderTopLeftRadius: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#0C0D34',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 16,
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  subTitle: {
    paddingLeft: 30,
    paddingRight: 30,
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
  },
  emailWrapper: {
    marginTop: 40,
  },
  progressWrapper: {
    position: 'absolute',
  },
  progress: {
    width: 60,
    height: 60,
  },
  button: {
    flexDirection: 'row',
  },
  bottomTextAccount: {
    color: 'white',
  },
  bottomTextSignIn: {
    color: '#2CB9B0',
  },
});
const Login = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const emailTrans = new Animated.Value(0);
  const passwordTrans = new Animated.Value(0);
  const buttonFade = new Animated.Value(1);
  const progressFade = new Animated.Value(0);

  const showToast = () => {
    ToastAndroid.show('User not found', ToastAndroid.SHORT);
  };

  const [getData, {loading, data, called}] = useLazyQuery(CHECK_USER, {
    onCompleted: (data) => {
      if (data !== undefined && loading === false && called) {
        if (data.Users.length === 0) {
          showToast();
          resetAnimation();
        } else {
          let namee = data.Users[0].name;
          _saveEmail(namee);
        }
      }
    },
  });

  const _saveEmail = async (namee) => {
    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('name', namee);
      navigation.replace('homeDrawer');
    } catch (error) {
      // Error saveing data
    }
  };

  const animatedBox = () => {
    Animated.timing(emailTrans, {
      toValue: 400,
      duration: 1000,
      easing: Easing.linear,
    }).start();
    Animated.timing(passwordTrans, {
      toValue: -400,
      duration: 1000,
      easing: Easing.linear,
    }).start();
    Animated.timing(buttonFade, {
      toValue: 0,
      duration: 1000,
      easing: Easing.linear,
    }).start();
    Animated.timing(progressFade, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
    }).start(() => {
      getData({variables: {email, password}});
    });
  };

  const resetAnimation = () => {
    Animated.timing(emailTrans, {
      toValue: 0,
      duration: 100,
      easing: Easing.inOut(Easing.ease),
    }).start();
    Animated.timing(passwordTrans, {
      toValue: 0,
      duration: 100,
      easing: Easing.inOut(Easing.ease),
    }).start();
    Animated.timing(buttonFade, {
      toValue: 1,
      duration: 100,
      easing: Easing.inOut(Easing.ease),
    }).start();
    Animated.timing(progressFade, {
      toValue: 0,
      duration: 100,
      easing: Easing.inOut(Easing.ease),
    }).start(() => {});
  };

  const emailAnimatedStyle = {
    transform: [
      {
        translateX: emailTrans,
      },
    ],
  };
  const passowrdAnimatedStyle = {
    transform: [
      {
        translateX: passwordTrans,
      },
    ],
  };
  const buttonAnimatedStyle = {
    opacity: buttonFade,
  };
  const progressAnimatedStyle = {
    opacity: progressFade,
  };
  return (
    <View style={styles.container}>
      <View style={styles.pic}>
        <Image source={require('../assets/bg.jpg')} />
      </View>

      <View style={styles.header}>
        <Image
          source={require('../assets/bg.jpg')}
          style={styles.headerImage}
        />

        <View style={styles.centerContainer}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subTitle}>
            Use your credentials below and login to your account
          </Text>
          <Animated.View style={[styles.emailWrapper, emailAnimatedStyle]}>
            <TextInput
              icon={require('../assets/mail.png')}
              placeholder="Email"
              isPassword={false}
              text={email}
              setText={setEmail}
            />
          </Animated.View>
          <Animated.View style={passowrdAnimatedStyle}>
            <TextInput
              icon={require('../assets/lock.png')}
              placeholder="Password"
              isPassword={true}
              text={password}
              setText={setPassword}
            />
          </Animated.View>
          <Animated.View style={buttonAnimatedStyle}>
            <Button
              lable={'Login'}
              variant={'primary'}
              onPress={() => {
                animatedBox();
              }}
            />
          </Animated.View>
          <Animated.View
            style={[styles.progressWrapper, progressAnimatedStyle]}>
            <ProgressBar styleAttr="Small" style={styles.progress} />
          </Animated.View>
        </View>
        <View style={styles.footer}>
          <RectButton
            style={styles.button}
            onPress={() => {
              navigation.replace('signUp');
            }}>
            <Text style={styles.bottomTextAccount}>
              Don't have an account?{' '}
            </Text>
            <Text style={styles.bottomTextSignIn}>Sign Up here</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default Login;
