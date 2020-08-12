import * as React from 'react';
import { StyleSheet, View,Text } from 'react-native';
import Button from "./button";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 44,
    },
    title:{
        fontSize:24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 12,
    },
    desc:{
        marginBottom: 40,
        fontSize:14,
        textAlign: "center",
    },
});
const subslide = (props) => {
    const {lable, desc,last,onPress} = props
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{lable}</Text>
            <Text style={styles.desc}>{desc}</Text>
            <Button lable={ last ? "Let's get started" : "Next"} 
                variant={last? "primary" : "default"}
                {...{onPress}}
            />
        </View>
    );
}

export default subslide;
