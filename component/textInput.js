import * as React from 'react';
import { StyleSheet, TextInput, View, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        height: 40,
        borderColor: '#2CB9B0',
        borderWidth: 1,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 24,
        borderRadius: 4,
        paddingStart: 8,
        paddingEnd: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    pic: {
        width: 20,
        height: 20,
    },
    text: {
        width: (width - 120),
        height: 40,
        marginStart: 8,
    },
});
const textInput = (props) => {
    const { icon, text, setText, placeholder, isPassword } = props
    return (
        <View style={styles.container}>
            <Image source={icon} style={styles.pic} />
            <TextInput
                secureTextEntry={isPassword}
                placeholder={placeholder}
                style={styles.text}
                onChangeText={(searchString) => { setText(searchString) }}
                value={text}
            />
        </View>
    );
}

export default textInput;
