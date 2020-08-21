import React from 'react';
import { Dimensions, StyleSheet, View, Image, Text, Animated, LogBox, ToastAndroid } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useMutation } from '@apollo/react-hooks';
import TextInput from '../component/textInput';
import Button from "../component/loginButton";
import { CREATE_USER } from '../graphql/Queries';
import AsyncStorage from '@react-native-community/async-storage'
import { ProgressBar } from '@react-native-community/progress-bar-android';
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
const signUp = ({ navigation }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');

    const emailTrans = new Animated.Value(0);
    const passwordTrans = new Animated.Value(0);
    const nameTrans = new Animated.Value(0);
    const buttonFade = new Animated.Value(1);
    const progressFade = new Animated.Value(0);

    const showToast = () => {
        ToastAndroid.show("User Already Exists", ToastAndroid.SHORT);
    };

    const [addUser, { data: mutationData, error: mutationError, loading }] = useMutation(CREATE_USER, {
        onCompleted: (data) => {
            _saveEmail()
            navigation.replace('homeNavigator');
        }, onError: (error) => false
    });
    //const { insert_Users } = mutationData || {};

    React.useEffect(() => {
        if (mutationError) {
            resetAnimation();
        }
    }, [mutationError, resetAnimation])


    _saveEmail = async () => {
        try {
            await AsyncStorage.setItem('email', email);
            await AsyncStorage.setItem('name', name);
        } catch (error) {
            // Error saveing data
        }
    };


    const animatedBox = () => {
        Animated.timing(nameTrans, {
            toValue: -400,
            duration: 800,
            useNativeDriver: false
        }).start()
        Animated.timing(emailTrans, {
            toValue: 400,
            duration: 800,
            useNativeDriver: false
        }).start()
        Animated.timing(passwordTrans, {
            toValue: -400,
            duration: 800,
            useNativeDriver: false
        }).start()
        Animated.timing(buttonFade, {
            toValue: 0,
            duration: 800,
            useNativeDriver: false
        }).start()
        Animated.timing(progressFade, {
            toValue: 1,
            duration: 800,
            delay: 300,
            useNativeDriver: false
        }).start(() => {
            addUser({
                variables: { email, password, name }
            })
        }
        )
    }


    const resetAnimation = () => {
        Animated.timing(nameTrans, {
            toValue: 0,
            duration: 1,
            useNativeDriver: false
        }).start()
        Animated.timing(emailTrans, {
            toValue: 0,
            duration: 1,
            useNativeDriver: false
        }).start()
        Animated.timing(passwordTrans, {
            toValue: 0,
            duration: 1,
            useNativeDriver: false
        }).start()
        Animated.timing(buttonFade, {
            toValue: 1,
            duration: 1,
            useNativeDriver: false
        }).start()
        Animated.timing(progressFade, {
            toValue: 0,
            duration: 1,
            useNativeDriver: false
        }).start()
    }


    const emailAnimatedStyle = {
        transform: [{
            translateX: emailTrans
        }]
    }
    const nameAnimatedStyle = {
        transform: [{
            translateX: nameTrans
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
                    }}>Create Account</Text>
                    <Text style={{
                        paddingLeft: 30,
                        paddingRight: 30,
                        textAlign: "center",
                        fontSize: 18,
                        color: "black"
                    }}>Enter your credentials below and register to a new account</Text>
                    <Animated.View style={[{ marginTop: 40 }, nameAnimatedStyle]}>
                        <TextInput
                            icon={require('../assets/user_border.png')}
                            placeholder="User Name"
                            isPassword={false}
                            text={name}
                            setText={setName} />
                    </Animated.View>
                    <Animated.View style={emailAnimatedStyle}>
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
                        <Button lable={"SignUp"}
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
                        navigation.replace('login');
                    }}>
                        <Text style={{ color: "white" }}>Have an account? </Text>
                        <Text style={{ color: "#2CB9B0" }}>Sign In here</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    );
}

export default signUp;
