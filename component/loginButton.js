import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        height: 40,
        width: 245,
        borderRadius: 20,
        marginTop: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    lable: {
        fontSize: 14,
    }
});
const subslide = (props) => {
    const { lable, variant, onPress } = props
    const backgroundColor = "#2CB9B0"
    const color = "white"
    return (
        <View style={{
            width,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <RectButton style={[styles.container, { backgroundColor }]} {...{ onPress }}>
                <Text style={[styles.lable, { color }]}>{lable}</Text>
            </RectButton>
        </View>
    );
}

export default subslide;
