import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useValue, interpolateColor, onScrollEvent} from 'react-native-redash';
import Animated, {multiply, divide} from 'react-native-reanimated';

import Slide, {SLIDER_HEIGHT} from '../component/Slide';
import Subslide from '../component/Subslide';
import Dot from '../component/Dot';
import {slides} from '../helper/Constant';

const BORDER_RADIUS = 75;
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  slider: {
    height: SLIDER_HEIGHT,
    borderBottomRightRadius: BORDER_RADIUS,
    backgroundColor: 'cyan',
  },
  subSlider: {
    flex: 1,
    flexDirection: 'row',
    width: width * slides.length,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: 'white',
    borderTopStartRadius: BORDER_RADIUS,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: BORDER_RADIUS,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Intro = ({navigation}) => {
  const scroll = React.useRef();
  const x = useValue(0);
  const onScroll = onScrollEvent({x});
  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((slide) => slide.color),
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, {backgroundColor}]}>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          onScroll={onScroll}>
          {slides.map(({lable}, index) => (
            <Slide key={index} right={index % 2} lable={lable} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={{...StyleSheet.absoluteFillObject, backgroundColor}}
        />
        <View style={styles.footerContent}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <Dot key={index} currentIndex={divide(x, width)} index={index} />
            ))}
          </View>
          <Animated.View
            style={[
              styles.subSlider,
              {
                transform: [{translateX: multiply(x, -1)}],
              },
            ]}>
            {slides.map(({lable, desc}, index) => {
              const last = index === slides.length - 1;
              return (
                <Subslide
                  key={index}
                  onPress={() => {
                    if (last) {
                      navigation.replace('login');
                    } else {
                      scroll.current
                        ?.getNode()
                        .scrollTo({x: width * (index + 1), animated: true});
                    }
                  }}
                  {...{lable, desc, last}}
                />
              );
            })}
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default Intro;
