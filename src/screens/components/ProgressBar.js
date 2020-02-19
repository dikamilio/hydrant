import {Animated, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';


const ProgressBar = (props) => {

    let animation = useRef(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animation.current, {
            toValue: props.progress,
            duration: 200
        }).start();
    },[props.progress])

    const width = animation.current.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
        extrapolate: "clamp"
    })


    return (
        <View style={styles.container}>
            <Text>
                Dzienna dawka wody
            </Text>
            <View style={styles.progressBar}>
                <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: "#61aaff", width }]}/>
            </View>
            <Text>
                {`${Math.ceil(props.progress)}%`}
            </Text>
        </View>
    )
};

export default ProgressBar

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: 10,
        padding: 8,
    },
    progressBar: {
        flexDirection: 'row',
        height: 20,
        width: 'auto',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5
    }
});
