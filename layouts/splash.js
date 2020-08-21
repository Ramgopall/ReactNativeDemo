import React from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        width,
        height
    },
    centerImage: {
        width: 130,
        height: 130,
        alignSelf: "center",
    },
});
const splash = ({ navigation }) => {

    React.useEffect(() => {
        let timer = setInterval(() => {
            clearInterval(timer)
            checkUser()
        }, 2000);

    }, [checkUser])

    const checkUser = async () => {
        try {
            const user = await AsyncStorage.getItem('email');
            if (user) {
                navigation.replace('homeDrawer');
            }
            else {
                navigation.replace('intro');
            }
        } catch (error) {
            console.log('error log', error);
        }
    }

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/splash.jpg")}
                style={styles.backgroundImage} />
            <View style={{ ...StyleSheet.absoluteFillObject, flex: 1, justifyContent: "center" }}>
                <Image
                    source={require("../assets/cart.png")}
                    style={styles.centerImage} />
            </View>
        </View>

    );
}

export default splash;
