import React from 'react';
import { View, Image } from 'react-native';
import {
    Title,
} from 'react-native-paper';
const ListBox = (props) => {
    const { item, index } = props
    return (
        <View style={{ flexDirection: 'column', marginStart: 8, marginEnd: 8, borderRadius: 8, overflow: 'hidden' }}>
            <Image
                style={{ width: 150, height: 80 }}
                source={{ uri: item.image }}
            />
            <Title style={{ fontSize: 14, textAlign: 'center' }}>{item.name}</Title>
        </View>
    )
}
export default ListBox;