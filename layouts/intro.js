import React, { useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Slide, { SLIDER_HEIGHT } from '../component/slide';
import Subslide from '../component/subslide';
import Dot from '../component/dot';
import { useValue, interpolateColor, onScrollEvent } from "react-native-redash";
import Animated, { multiply, divide } from 'react-native-reanimated';

import AsyncStorage from '@react-native-community/async-storage'
const BORDER_RADIUS = 75;
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    slider: {
        height: SLIDER_HEIGHT,
        borderBottomRightRadius: BORDER_RADIUS,
        backgroundColor: "cyan"
    },
    footer: {
        flex: 1,
    },
    footerContent: {
        flex: 1,
        backgroundColor: "white",
        borderTopStartRadius: BORDER_RADIUS
    },
    pagination: {
        ...StyleSheet.absoluteFillObject,
        height: BORDER_RADIUS,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});
const slides = [
    { lable: "FIRST", color: "#BFEAF5", desc: "Be yourself; everyone else is already taken." },
    { lable: "SECOND", color: "#BEECC4", desc: "So many books, so little time." },
    { lable: "THIRD", color: "#FFE4D9", desc: "A room without books is like a body without a soul." },
    { lable: "FOURTH", color: "#FFDDDD", desc: "You only live once, but if you do it right, once is enough." },
]
const intro = ({ navigation }) => {
    React.useEffect(() => {
        async function checkUser() {
            try {
                const user = await AsyncStorage.getItem('email');
                if (user) {
                    navigation.replace('homeDrawer');
                }
            } catch (error) {
                console.log('error log', error);
            }
        }

        checkUser()
    }, [])

    const scroll = useRef();
    const x = useValue(0);
    const onScroll = onScrollEvent({ x });
    const backgroundColor = interpolateColor(x, {
        inputRange: slides.map((_, i) => i * width),
        outputRange: slides.map(slide => slide.color),
    });
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.slider, { backgroundColor }]}>
                <Animated.ScrollView
                    ref={scroll}
                    horizontal
                    snapToInterval={width}
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    scrollEventThrottle={1}
                    {...{ onScroll }}
                >
                    {slides.map(({ lable }, index) => (
                        <Slide key={index} right={index % 2} {...{ lable }} />
                    ))}
                </Animated.ScrollView>
            </Animated.View>
            <View style={styles.footer}>
                <Animated.View style={{ ...StyleSheet.absoluteFillObject, backgroundColor }} />
                <View style={styles.footerContent}>
                    <View style={styles.pagination}>
                        {slides.map((_, index) => (
                            <Dot
                                key={index}
                                currentIndex={divide(x, width)}
                                {...{ index }} />
                        ))}
                    </View>
                    <Animated.View style={{
                        flex: 1,
                        flexDirection: "row",
                        width: width * slides.length,
                        transform: [{ translateX: multiply(x, -1) }]
                    }}>
                        {slides.map(({ lable, desc }, index) => {
                            const last = index === slides.length - 1;
                            return (
                                <Subslide
                                    key={index}
                                    onPress={() => {
                                        if (last) {
                                            navigation.replace('login');
                                        } else {
                                            scroll.current?.getNode().scrollTo({ x: width * (index + 1), animated: true })
                                        }
                                    }}
                                    {...{ lable, desc, last }} />
                            );

                        })}
                    </Animated.View>
                </View>
            </View>
        </View>

    );
}

export default intro;
