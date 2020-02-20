import PushNotification from 'react-native-push-notification';
import {AsyncStorage} from 'react-native';


export default class NotificationService {

    constructor(onRegister, onNotification) {
        this.configure(onRegister, onNotification);
    }

    configure(onRegister, onNotification, gcm = "") {
        PushNotification.configure({
            onRegister: onRegister, //this._onRegister.bind(this),
            onNotification: onNotification, //this._onNotification,
            senderID: gcm,
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },
            popInitialNotification: true,
            requestPermissions: true,
        });
    }

    async schedule() {
        let existingNotification = await AsyncStorage.getItem('existingNotification');
        if (existingNotification === 'false' || existingNotification === null) {
            PushNotification.localNotificationSchedule({
                message: "Wypij szklankę wody",
                date: new Date(Date.now() + 10 * 1000), //10 sekund
                number: '2',
                repeatType: 'hour'
            });
            AsyncStorage.setItem('existingNotification', JSON.stringify(true));
        }
    }

    cancel() {
        PushNotification.cancelAllLocalNotifications();
        AsyncStorage.setItem('existingNotification', JSON.stringify(false));
    }



}
