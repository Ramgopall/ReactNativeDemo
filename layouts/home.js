import * as React from 'react';
import { AppState, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Searchbar,
    Title,
} from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import HomeList from "../component/homeList";
import Animated, { Easing } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Entypo';

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",
        padding: 8
    },
    menu: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#efefef"
    },
    search: {
        margin: 16,
        borderRadius: 24,
        opacity: 0.9
    },
    title: {
        margin: 8,
        fontSize: 22
    },
    subTitle: {
        margin: 16,
        fontSize: 16
    }
});
const items = [
    {
        id: '1',
        image: 'https://o.aolcdn.com/images/dims?quality=95&image_uri=https%3A%2F%2Fs.yimg.com%2Fuu%2Fapi%2Fres%2F1.2%2FHE0bU38fxdV9i9EzIcl0Mw--%7EB%2FaD0xMDU0O3c9MTU4MjthcHBpZD15dGFjaHlvbg--%2Fhttps%3A%2F%2Fo.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2F7d7f52e7a7ab3d7bac0bc480e734690a%2F206547300%2Feng-razer-edJT.jpg&client=amp-blogside-v2&signature=0d68060ebcf3f93c41e0516318ebb879f2252c56',
        name: 'Gaming Laptop',
    },
    {
        id: '2',
        image: 'https://o.aolcdn.com/images/dims?quality=95&image_uri=https%3A%2F%2Fs.yimg.com%2Fuu%2Fapi%2Fres%2F1.2%2FHE0bU38fxdV9i9EzIcl0Mw--%7EB%2FaD0xMDU0O3c9MTU4MjthcHBpZD15dGFjaHlvbg--%2Fhttps%3A%2F%2Fo.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2F7d7f52e7a7ab3d7bac0bc480e734690a%2F206547300%2Feng-razer-edJT.jpg&client=amp-blogside-v2&signature=0d68060ebcf3f93c41e0516318ebb879f2252c56',
        name: 'Gaming Laptop',
    },
    {
        id: '3',
        image: 'https://o.aolcdn.com/images/dims?quality=95&image_uri=https%3A%2F%2Fs.yimg.com%2Fuu%2Fapi%2Fres%2F1.2%2FHE0bU38fxdV9i9EzIcl0Mw--%7EB%2FaD0xMDU0O3c9MTU4MjthcHBpZD15dGFjaHlvbg--%2Fhttps%3A%2F%2Fo.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2F7d7f52e7a7ab3d7bac0bc480e734690a%2F206547300%2Feng-razer-edJT.jpg&client=amp-blogside-v2&signature=0d68060ebcf3f93c41e0516318ebb879f2252c56',
        name: 'Gaming Laptop',
    },
    {
        id: '4',
        image: 'https://o.aolcdn.com/images/dims?quality=95&image_uri=https%3A%2F%2Fs.yimg.com%2Fuu%2Fapi%2Fres%2F1.2%2FHE0bU38fxdV9i9EzIcl0Mw--%7EB%2FaD0xMDU0O3c9MTU4MjthcHBpZD15dGFjaHlvbg--%2Fhttps%3A%2F%2Fo.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2F7d7f52e7a7ab3d7bac0bc480e734690a%2F206547300%2Feng-razer-edJT.jpg&client=amp-blogside-v2&signature=0d68060ebcf3f93c41e0516318ebb879f2252c56',
        name: 'Gaming Laptop',
    },
    {
        id: '5',
        image: 'https://o.aolcdn.com/images/dims?quality=95&image_uri=https%3A%2F%2Fs.yimg.com%2Fuu%2Fapi%2Fres%2F1.2%2FHE0bU38fxdV9i9EzIcl0Mw--%7EB%2FaD0xMDU0O3c9MTU4MjthcHBpZD15dGFjaHlvbg--%2Fhttps%3A%2F%2Fo.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2F7d7f52e7a7ab3d7bac0bc480e734690a%2F206547300%2Feng-razer-edJT.jpg&client=amp-blogside-v2&signature=0d68060ebcf3f93c41e0516318ebb879f2252c56',
        name: 'Gaming Laptop',
    }
]

const Home = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [name, setName] = React.useState('');
    const [appState, setAppState] = React.useState(AppState.currentState);
    const onChangeSearch = query => setSearchQuery(query);

    const discount = new Animated.Value(600);
    const newly = new Animated.Value(600);
    const brands = new Animated.Value(600);
    const popular = new Animated.Value(600);

    const animatedBox = () => {
        Animated.timing(discount, {
            toValue: 0,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
        }).start()
        Animated.timing(newly, {
            toValue: 0,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
        }).start()
        Animated.timing(brands, {
            toValue: 0,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
        }).start()
        Animated.timing(popular, {
            toValue: 0,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
        }).start()
    }

    const discountAnimatedStyle = {
        transform: [{
            translateX: discount
        }]
    }
    const newlyAnimatedStyle = {
        transform: [{
            translateX: newly
        }]
    }
    const brandsAnimatedStyle = {
        transform: [{
            translateX: brands
        }]
    }
    const popularAnimatedStyle = {
        transform: [{
            translateX: popular
        }]
    }

    React.useEffect(() => {
        animatedBox()
        checkUser()
    }, [animatedBox, checkUser])

    const checkUser = async () => {
        try {
            const user = await AsyncStorage.getItem('name');
            setName(user)
        } catch (error) {
            console.log('error log', error);
        }
    }


    return (
        <ScrollView style={styles.root}>
            <View >
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity style={styles.menu} onPress={() => navigation.openDrawer()}>
                        <Icon name="menu" size={25} />
                    </TouchableOpacity>
                    <Title style={styles.title}>Welcome, {name}</Title>
                </View>

                <Searchbar
                    style={styles.search}
                    iconColor="#10a6fb"
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
                <Animated.View style={discountAnimatedStyle}>
                    <HomeList title="50% Discount" data={items} />
                </Animated.View>
                <Animated.View style={newlyAnimatedStyle}>
                    <HomeList title="Newly Added" data={items} />
                </Animated.View>
                <Animated.View style={brandsAnimatedStyle}>
                    <HomeList title="Brands" data={items} />
                </Animated.View>
                <Animated.View style={popularAnimatedStyle}>
                    <HomeList title="Most Popular" data={items} />
                </Animated.View>



            </View>
        </ScrollView>
    );
}

export default Home;