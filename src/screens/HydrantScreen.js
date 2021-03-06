import {Button, Text, TextInput, View, Animated, StyleSheet, Alert, Switch, AsyncStorage} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import ProgressBar from './components/ProgressBar';
import NotificationService from '../services/NotificationService';

const LoginScreen = (props) => {

    const [progress, setProgress] = useState(0);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [goalReached, setGoalReached] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('progress').then(progress => {
                if (progress != null) {
                    setProgress(parseFloat(progress));
                } else {
                    setProgress(0);
                }
            }
        );
        AsyncStorage.getItem('notification').then(notification => {
                if (notification != null)
                    setNotificationsEnabled(JSON.parse(notification));
                else
                    setNotificationsEnabled(true);
            }
        );
    }, [props.route.key]);

    useEffect(() => {
        if (notificationsEnabled)
            notif.schedule();
        else
            notif.cancel();
        AsyncStorage.setItem('notification', JSON.stringify(notificationsEnabled));
    }, [notificationsEnabled]);

    useEffect(() => {
        if (progress > 99)
            setGoalReached(true);
        if (progress === 0) {
            setGoalReached(false);
        }
        AsyncStorage.setItem('progress', JSON.stringify(progress));
    }, [progress]);

    const onRegister = (token) => {
        console.log('Registered')
    }

    const onNotif = (notif) => {
        Alert.alert(notif.title, notif.message);
    }

    const handlePerm = (perms) => {
        Alert.alert("Permissions", JSON.stringify(perms));
    }

    const switchNotifications = (enabled) => {
        setNotificationsEnabled(enabled)
    }

    const notif = new NotificationService(onRegister, onNotif);


    return (
        <View style={styles.container}>
            <Text>Pamiętaj o nawodnieniu!</Text>
            <ProgressBar progress={progress}/>
            <Button title="Wypij szklankę wody" onPress={() => setProgress(progress + 100 / 12)}
                    disabled={goalReached}></Button>
            <Button title="Wyzeruj licznik" onPress={() => setProgress(0)}></Button>
            <View style={styles.switchView}>
                <Text>Czy włączyć powiadomienia?</Text>
                <Switch value={notificationsEnabled} onValueChange={(value) => switchNotifications(value)}/>
            </View>

        </View>
    );
};

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 20,
    },
    switchView: {
        paddingTop: 20,
        flexDirection: 'row'
    }

});
