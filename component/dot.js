import * as React from 'react';
import { StyleSheet,Text } from 'react-native';
import Animated, { interpolate, Extrapolate } from 'react-native-reanimated';
import { interpolateColor } from 'react-native-redash';

const styles = StyleSheet.create({
    container:{
        height: 40,
        width: 245,
        borderRadius: 20,
        justifyContent: "center",
        alignItems:"center",
    },
    lable:{
        fontSize: 14,
    }
});
const dot = (props) => {
    const {currentIndex, index} = props
    const opacity = interpolate(currentIndex,{
        inputRange: [index-1, index, index+1],
        outputRange: [0.5,1,0.5],
        extrapolate: Extrapolate.CLAMP,
    });
    const scale = interpolate(currentIndex,{
        inputRange: [index-1, index, index+1],
        outputRange: [1,1.25,1],
        extrapolate: Extrapolate.CLAMP,
    });
    return (
        <Animated.View
        style={{
            opacity,
            backgroundColor: "#2CB9B0",
            height: 8,
            width: 8,
            borderRadius: 4,
            margin: 4,
            transform: [{ scale }]
        }}
        >

        </Animated.View>
    );
}

export default dot;
