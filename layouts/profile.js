import * as React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Title, Avatar, Caption,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    backgroundImage: {
        width,
        height
    },
    card: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 70,
        marginBottom: 20,
        marginStart: 24,
        marginEnd: 24,
        borderRadius: 16,
        alignItems: "center",
        padding: 16,
        overflow: "hidden"
    }
});

const Profile = () => {
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');


    React.useEffect(() => {
        async function checkUser() {
            try {
                const userEmail = await AsyncStorage.getItem('email');
                const userName = await AsyncStorage.getItem('name');
                setEmail(userEmail)
                setName(userName)
            } catch (error) {
                console.log('error log', error);
            }
        }
        checkUser()
    }, [])

    return (
        <View style={styles.root}>
            <Image
                source={require("../assets/building.jpg")}
                style={styles.backgroundImage} />
            <View style={{ ...StyleSheet.absoluteFillObject }}>
                <View style={styles.card}>
                    <Icon name="circle-with-cross" size={30} style={{ alignSelf: "flex-end" }} />
                    <Avatar.Image
                        source={{
                            uri: 'https://images-na.ssl-images-amazon.com/images/I/41ONa5HOwfL.jpg'
                        }}
                        size={100}
                        style={{ marginTop: 40 }}
                    />
                    <Title style={{ fontSize: 28, marginTop: 16 }}>{name}</Title>
                    <Caption style={{ fontSize: 14 }}>Co-Founder at Own Company</Caption>
                    <View style={{ flexDirection: "row", marginTop: 8 }}>
                        <Avatar.Image
                            source={require("../assets/mail_round.png")}
                            size={40}
                            style={{ margin: 8 }}
                        />
                        <Avatar.Image
                            source={require("../assets/phone.png")}
                            size={40}
                            style={{ margin: 8 }}
                        />
                    </View>
                    <Title style={{ width, backgroundColor: "#808080", height: 1 }} />
                    <Caption style={{ fontSize: 14, marginTop: 16 }}>PHONE NUMBER</Caption>
                    <View style={{ flexDirection: "row", marginTop: 8, alignItems: "center" }}>
                        <Icon name="phone" size={20} color="#f42855" />
                        <Title style={{ fontSize: 14, marginStart: 8 }}>12345-67890</Title>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 8, alignItems: "center" }}>
                        <Icon name="mail" size={20} color="#f42855" />
                        <Title style={{ fontSize: 14, marginStart: 8 }}>{email}</Title>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 8, alignItems: "center" }}>
                        <Icon name="location-pin" size={20} color="#f42855" />
                        <Title style={{ fontSize: 14, marginStart: 8 }}>85, Near Plant Expo, NY</Title>
                    </View>

                </View>
            </View>
        </View>

    );
}

export default Profile;