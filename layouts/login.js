import React from 'react';
import { Dimensions, StyleSheet, View, Image, Text, LogBox, ToastAndroid } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useLazyQuery } from '@apollo/react-hooks';
import TextInput from '../component/textInput';
import Button from "../component/loginButton";
import { CHECK_USER } from '../graphql/Queries';
import AsyncStorage from '@react-native-community/async-storage'
import { ProgressBar } from '@react-native-community/progress-bar-android';
import Animated, { Easing } from 'react-native-reanimated';
LogBox.ignoreAllLogs()
const { width } = Dimensions.get('window');
const aspectRation = 450 / 1084;
const height = width * aspectRation;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    pic: {
        height,
        borderBottomLeftRadius: 75,
        borderTopLeftRadius: 75,
        overflow: "hidden",
    },
    centerContainer: {
        flex: 6,
        borderRadius: 75,
        borderTopLeftRadius: 0,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    footer: {
        flex: 1,
        backgroundColor: "#0C0D34",
        justifyContent: "center",
        alignItems: "center",
    },
});
const login = ({ navigation }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const emailTrans = new Animated.Value(0);
    const passwordTrans = new Animated.Value(0);
    const buttonFade = new Animated.Value(1);
    const progressFade = new Animated.Value(0);

    const showToast = () => {
        ToastAndroid.show("User not found", ToastAndroid.SHORT);
    };

    const [getData, { loading, data, called }] = useLazyQuery(CHECK_USER);
    if (data != undefined && loading === false && called) {
        if (data.Users.length === 0) {
            showToast();
            resetAnimation();
        } else {
            let namee = data.Users[0].name
            _saveEmail(namee);
        }
    }
    _saveEmail = async (namee) => {
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
            duration: 800,
            easing: Easing.inOut(Easing.ease),
        }).start()
        Animated.timing(passwordTrans, {
            toValue: -400,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
        }).start()
        Animated.timing(buttonFade, {
            toValue: 0,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
        }).start()
        Animated.timing(progressFade, {
            toValue: 1,
            duration: 800,
            delay: 300,
            easing: Easing.inOut(Easing.ease),
        }).start(() => getData({ variables: { email, password } }))
    }


    function resetAnimation() {
        Animated.timing(emailTrans, {
            toValue: 0,
            duration: 1,
            easing: Easing.inOut(Easing.ease),
        }).start()
        Animated.timing(passwordTrans, {
            toValue: 0,
            duration: 1,
            easing: Easing.inOut(Easing.ease),
        }).start()
        Animated.timing(buttonFade, {
            toValue: 1,
            duration: 1,
            easing: Easing.inOut(Easing.ease),
        }).start()
        Animated.timing(progressFade, {
            toValue: 0,
            duration: 1,
            easing: Easing.inOut(Easing.ease),
        }).start(() => {

        })
    }


    const emailAnimatedStyle = {
        transform: [{
            translateX: emailTrans
        }]
    }
    const passowrdAnimatedStyle = {
        transform: [{
            translateX: passwordTrans
        }]
    }
    const buttonAnimatedStyle = {
        opacity: buttonFade
    }
    const progressAnimatedStyle = {
        opacity: progressFade
    }
    return (
        <View style={styles.container}>
            <View style={styles.pic}>
                <Image source={require("../assets/bg.jpg")} />
            </View>

            <View style={{ flex: 1, overflow: "hidden", backgroundColor: "#0C0D34" }}>
                <Image
                    source={require("../assets/bg.jpg")}
                    style={{
                        ...StyleSheet.absoluteFillObject,
                        height,
                    }} />

                <View style={styles.centerContainer}>
                    <Text style={{
                        marginTop: 16,
                        marginBottom: 16,
                        textAlign: "center",
                        fontSize: 30,
                        fontWeight: "bold",
                        color: "black"
                    }}>Welcome back</Text>
                    <Text style={{
                        paddingLeft: 30,
                        paddingRight: 30,
                        textAlign: "center",
                        fontSize: 18,
                        color: "black"
                    }}>Use your credentials below and login to your account</Text>
                    <Animated.View style={[{ marginTop: 40 }, emailAnimatedStyle]}>
                        <TextInput
                            icon={require('../assets/mail.png')}
                            placeholder="Email"
                            isPassword={false}
                            text={email}
                            setText={setEmail} />
                    </Animated.View>
                    <Animated.View style={passowrdAnimatedStyle}>
                        <TextInput
                            icon={require('../assets/lock.png')}
                            placeholder="Password"
                            isPassword={true}
                            text={password}
                            setText={setPassword} />
                    </Animated.View>
                    <Animated.View style={buttonAnimatedStyle}>
                        <Button lable={"Login"}
                            variant={"primary"}
                            onPress={() => {
                                animatedBox()
                            }}
                        />
                    </Animated.View>
                    <Animated.View style={[{ position: "absolute", }, progressAnimatedStyle]}>
                        <ProgressBar
                            styleAttr="Small"
                            style={
                                {
                                    width: 60,
                                    height: 60,
                                }
                            }
                        />
                    </Animated.View>
                </View>
                <View style={styles.footer}>
                    <RectButton style={{ flexDirection: "row" }} onPress={() => {
                        navigation.replace('signUp');
                    }}>
                        <Text style={{ color: "white" }}>Don't have an account? </Text>
                        <Text style={{ color: "#2CB9B0" }}>Sign Up here</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    );
}

export default login;
