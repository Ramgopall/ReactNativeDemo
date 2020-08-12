import React from 'react';
import { Dimensions, StyleSheet, View, Image, Text } from 'react-native';
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
        justifyContent: "center",
        borderRadius: 75,
        borderTopLeftRadius: 0,
        backgroundColor: "white",
    },
    footer: {
        flex: 1,
        backgroundColor: "#0C0D34",
        justifyContent: "center",
        alignItems: "center",
    },
});
const loginSuccessfull = () => {

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
                    <Image
                        source={require("../assets/checked.png")}
                        style={{
                            alignSelf: "center"
                        }}
                    />
                    <Text style={{
                        marginTop: 16,
                        marginBottom: 16,
                        textAlign: "center",
                        fontSize: 30,
                        fontWeight: "bold",
                        color: "#2CB9B0"
                    }}>Login Successfully</Text>

                </View>
                <View style={styles.footer}>

                </View>
            </View>
        </View>
    );
}

export default loginSuccessfull;
