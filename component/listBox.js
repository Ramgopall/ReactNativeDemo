import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image'
import {
    Title,
} from 'react-native-paper';
const ListBox = (props) => {
    const { item, index } = props
    return (
        <View style={{ backgroundColor: "#efefef", width: 150, height: 120, flexDirection: 'column', marginStart: 8, marginEnd: 8, borderRadius: 8, overflow: 'hidden' }}>
            <FastImage
                style={{ width: 150, height: 80 }}
                source={{
                    uri: item.image,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.stretch}
            />

            <Title style={{ fontSize: 14, textAlign: 'center' }}>{item.name}</Title>
        </View>
    )
}
export default ListBox;