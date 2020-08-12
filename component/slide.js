import * as React from 'react';
import { Dimensions,StyleSheet, View,Text } from 'react-native';

const {width, height} = Dimensions.get('window');
export const SLIDER_HEIGHT = 0.61 * height;
const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: width
    },
    titleContainer:{
        height: 100,
        justifyContent:"center",
    },
    title:{
        fontWeight:"bold",
        fontSize:50,
        color:"white",
        alignSelf:"center",
    },
});
const slider = (props) => {
    const {lable, right} = props
    const transform = [
        { translateY: (SLIDER_HEIGHT - 100)/2},
        { translateX: right? (width/2-50) : -width/2+50 },
        { rotate: right?"-90deg":"90deg"}
    ];
    return (
        <View style={styles.container}>
            <View style={[styles.titleContainer,{transform}]}>
            <Text style={styles.title}>{lable}</Text>
            </View>
        </View>
    );
}

export default slider;
