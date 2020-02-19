import PushNotification from 'react-native-push-notification';

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

    schedule() {
        PushNotification.localNotificationSchedule({
            message: "Wypij szklankę wody",
            date: new Date(Date.now() + 10 * 1000), // in 10 secs
            number: '2',
            repeatType: 'minute'
        });
    }

    cancel() {
        PushNotification.cancelAllLocalNotifications();
    }



}
