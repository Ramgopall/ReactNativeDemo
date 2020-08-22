import Animated, {Easing} from 'react-native-reanimated';

const discount = new Animated.Value(600);
const newly = new Animated.Value(600);
const brands = new Animated.Value(600);
const popular = new Animated.Value(600);

export const animatedBox = () => {
  Animated.timing(discount, {
    toValue: 0,
    duration: 800,
    easing: Easing.inOut(Easing.ease),
  }).start();
  Animated.timing(newly, {
    toValue: 0,
    duration: 800,
    easing: Easing.inOut(Easing.ease),
  }).start();
  Animated.timing(brands, {
    toValue: 0,
    duration: 800,
    easing: Easing.inOut(Easing.ease),
  }).start();
  Animated.timing(popular, {
    toValue: 0,
    duration: 800,
    easing: Easing.inOut(Easing.ease),
  }).start();
};

export const discountAnimatedStyle = {
  transform: [
    {
      translateX: discount,
    },
  ],
};
export const newlyAnimatedStyle = {
  transform: [
    {
      translateX: newly,
    },
  ],
};
export const brandsAnimatedStyle = {
  transform: [
    {
      translateX: brands,
    },
  ],
};
export const popularAnimatedStyle = {
  transform: [
    {
      translateX: popular,
    },
  ],
};
