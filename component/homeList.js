import React from 'react';
import { View, FlatList, StyleSheet, Animated } from 'react-native';
import { Title, } from 'react-native-paper';
import ListBox from '../component/listBox';
const styles = StyleSheet.create({
    subTitle: {
        margin: 16,
        fontSize: 16
    }
});

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const HomeList = (props) => {
    const { title, data } = props
    // const y = new Animated.Value(0);
    // const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    //     useNativeDriver: true,
    // });
    return (
        <View >
            <Title style={styles.subTitle}>{title}</Title>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={item => ListBox(item)}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

export default HomeList;