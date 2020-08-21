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
const discountList = [
    {
        id: '1',
        image: 'https://o.aolcdn.com/images/dims?quality=95&image_uri=https%3A%2F%2Fs.yimg.com%2Fuu%2Fapi%2Fres%2F1.2%2FHE0bU38fxdV9i9EzIcl0Mw--%7EB%2FaD0xMDU0O3c9MTU4MjthcHBpZD15dGFjaHlvbg--%2Fhttps%3A%2F%2Fo.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2F7d7f52e7a7ab3d7bac0bc480e734690a%2F206547300%2Feng-razer-edJT.jpg&client=amp-blogside-v2&signature=0d68060ebcf3f93c41e0516318ebb879f2252c56',
        name: 'Gaming Laptop',
    },
    {
        id: '2',
        image: 'https://bgr.com/wp-content/uploads/2017/01/tv-backlight-bias-light.jpg?quality=70&strip=all',
        name: "Sharp Full HD LED TV",
    },
    {
        id: '3',
        image: 'https://i.insider.com/5e625eccfee23d0c3b666de8?width=1136&format=jpeg',
        name: 'Samsung Galaxy S20 Plus',
    },
    {
        id: '4',
        image: 'https://5.imimg.com/data5/AV/QI/GLADMIN-166331/pixma-e3170-500x500.png',
        name: 'Pixma E3170 Canon',
    },
    {
        id: '5',
        image: 'https://cdn.mos.cms.futurecdn.net/swCWwSAQgn49gUt2ZyjmEG.jpg',
        name: 'The best Bluetooth speakers',
    }
]
const newList = [
    {
        id: '1',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS_kKDUv6Lrrm0FujHAyhihoMkiTUGHXY5Epg&usqp=CAU',
        name: 'AORUS 101',
    },
    {
        id: '2',
        image: 'https://9to5toys.com/wp-content/uploads/sites/5/2019/12/Headphone-Stand-1.jpg?quality=82&strip=all',
        name: 'Headphone Stand',
    },
    {
        id: '3',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSJpyTMgovNhNDxNLOq_3BLQT9smExttrubDA&usqp=CAU',
        name: 'JBL Quantum One Gaming Headset',
    },
    {
        id: '4',
        image: 'https://uerc.in/wp-content/uploads/2019/03/Best-WiFi-Routers-in-India.jpg',
        name: 'Best WiFi Routers in 2020',
    },
    {
        id: '5',
        image: 'https://images-na.ssl-images-amazon.com/images/I/61JgEYh19JL._SL1024_.jpg',
        name: 'Polk Audio 5.1 Channel',
    },
]
const popularList = [
    {
        id: '1',
        image: 'https://ksassets.timeincuk.net/wp/uploads/sites/54/2019/03/Razer-BlackWidow-2019-Close-Up.png',
        name: 'Corsair Machenical Keyboard',
    },
    {
        id: '2',
        image: 'https://cdn.mos.cms.futurecdn.net/HS24vGToNWce9bHB9soSgi.jpg',
        name: 'Best gaming mouse 2020',
    },
    {
        id: '3',
        image: 'https://cdn.wccftech.com/wp-content/uploads/2018/10/DSC_0572-Custom.jpg',
        name: 'AORUS GeForce RTX 2080 Xtreme 8 GB ',
    },
    {
        id: '4',
        image: 'https://www.whirlpoolindia.com/media/wysiwyg/Grill-banner-mobile.png',
        name: 'Microwave Grill',
    },
    {
        id: '5',
        image: 'https://www.energyvanguard.com/sites/default/files/styles/sc_940x470_mc/public/blog/ceiling-fan-short-blade-length-low-efficacy.jpg?itok=R55C-LMM',
        name: 'Ceiling Fan',
    },
]
const brandList = [
    {
        id: '1',
        image: 'https://i.pinimg.com/600x315/2c/56/ce/2c56cea4b9eca36df60714443c1f812e.jpg',
        name: 'Acer',
    },
    {
        id: '2',
        image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/c912aa42-301c-4141-a624-745ab5702e03/dc8p94p-77e3393b-d77a-4887-b001-fda61f65211f.jpg',
        name: 'CoolerMaster',
    },
    {
        id: '3',
        image: 'https://www.logolynx.com/images/logolynx/23/23fad7c2b19145e17324fcc85a3042e1.jpeg',
        name: 'Gigabyte',
    },
    {
        id: '4',
        image: 'https://forum.level1techs.com/uploads/default/6414/40695a8fd41accaa.jpg',
        name: 'Corsair',
    },
    {
        id: '5',
        image: 'https://filestore.community.support.microsoft.com/api/images/1a533a87-1275-432d-8df3-01adc95bb6b7?upload=true',
        name: 'Asus',
    },
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
                    <HomeList title="50% Discount" data={discountList} />
                </Animated.View>
                <Animated.View style={newlyAnimatedStyle}>
                    <HomeList title="Newly Added" data={newList} />
                </Animated.View>
                <Animated.View style={popularAnimatedStyle}>
                    <HomeList title="Most Popular" data={popularList} />
                </Animated.View>
                <Animated.View style={brandsAnimatedStyle}>
                    <HomeList title="Brands" data={brandList} />
                </Animated.View>
            </View>
        </ScrollView>
    );
}

export default Home;