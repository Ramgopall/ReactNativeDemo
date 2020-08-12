import React, { useState } from "react";
import { CheckBox, Text, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        marginTop: 12,
        marginStart: 38
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
});

const checkBox = (props) => {
    const { isSelected, setSelection } = props
    return (
        <View style={styles.container}>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkbox}
                />
                <Text style={styles.label}>Remember me</Text>
            </View>
        </View>
    );
};

export default checkBox;
