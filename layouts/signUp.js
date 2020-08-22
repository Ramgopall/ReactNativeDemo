import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Text,
  Animated,
  LogBox,
  ToastAndroid,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {useMutation} from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import {ProgressBar} from '@react-native-community/progress-bar-android';

import TextInput from '../component/TextInput';
import Button from '../component/LoginButton';
import {CREATE_USER} from '../graphql/Queries';

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
  progressWrapper: {
    position: 'absolute',
  },
  progressBar: {
    width: 60,
    height: 60,
  },
  button: {
    flexDirection: 'row',
  },
  fieldName: {
    marginTop: 40,
  },
  bottomTextAccount: {
    color: 'white',
  },
  bottomTextSignIn: {
    color: '#2CB9B0',
  },
});
const SignUp = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  const emailTrans = new Animated.Value(0);
  const passwordTrans = new Animated.Value(0);
  const nameTrans = new Animated.Value(0);
  const buttonFade = new Animated.Value(1);
  const progressFade = new Animated.Value(0);

  const [addUser, {data, error: mutationError}] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      _saveEmail();
      navigation.replace('homeDrawer');
    },
    onError: (error) => false,
  });

  const _saveEmail = async () => {
    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('name', name);
    } catch (error) {
      // Error saveing data
    }
  };

  React.useEffect(() => {
    if (mutationError) {
      showToast();
      resetAnimation();
    }
  }, [mutationError, resetAnimation, showToast]);

  const showToast = React.useCallback(() => {
    ToastAndroid.show('User Already Exists', ToastAndroid.SHORT);
  }, []);

  const animatedBox = () => {
    Animated.timing(nameTrans, {
      toValue: -400,
      duration: 800,
      useNativeDriver: false,
    }).start();
    Animated.timing(emailTrans, {
      toValue: 400,
      duration: 800,
      useNativeDriver: false,
    }).start();
    Animated.timing(passwordTrans, {
      toValue: -400,
      duration: 800,
      useNativeDriver: false,
    }).start();
    Animated.timing(buttonFade, {
      toValue: 0,
      duration: 800,
      useNativeDriver: false,
    }).start();
    Animated.timing(progressFade, {
      toValue: 1,
      duration: 800,
      delay: 300,
      useNativeDriver: false,
    }).start(() => {
      addUser({
        variables: {email, password, name},
      });
    });
  };

  const resetAnimation = () => {
    Animated.timing(nameTrans, {
      toValue: 0,
      duration: 1,
      useNativeDriver: false,
    }).start();
    Animated.timing(emailTrans, {
      toValue: 0,
      duration: 1,
      useNativeDriver: false,
    }).start();
    Animated.timing(passwordTrans, {
      toValue: 0,
      duration: 1,
      useNativeDriver: false,
    }).start();
    Animated.timing(buttonFade, {
      toValue: 1,
      duration: 1,
      useNativeDriver: false,
    }).start();
    Animated.timing(progressFade, {
      toValue: 0,
      duration: 1,
      useNativeDriver: false,
    }).start();
  };

  const emailAnimatedStyle = {
    transform: [
      {
        translateX: emailTrans,
      },
    ],
  };
  const nameAnimatedStyle = {
    transform: [
      {
        translateX: nameTrans,
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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subTitle}>
            Enter your credentials below and register to a new account
          </Text>
          <Animated.View style={[styles.fieldName, nameAnimatedStyle]}>
            <TextInput
              icon={require('../assets/user_border.png')}
              placeholder="User Name"
              isPassword={false}
              text={name}
              setText={setName}
            />
          </Animated.View>
          <Animated.View style={emailAnimatedStyle}>
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
              lable={'SignUp'}
              variant={'primary'}
              onPress={animatedBox}
            />
          </Animated.View>
          <Animated.View
            style={[styles.progressWrapper, progressAnimatedStyle]}>
            <ProgressBar styleAttr="Small" style={styles.progressBar} />
          </Animated.View>
        </View>
        <View style={styles.footer}>
          <RectButton
            style={styles.button}
            onPress={() => {
              navigation.replace('login');
            }}>
            <Text style={styles.bottomTextAccount}>Have an account? </Text>
            <Text style={styles.bottomTextSignIn}>Sign In here</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
