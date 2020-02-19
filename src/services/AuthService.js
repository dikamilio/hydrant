import auth from '@react-native-firebase/auth';

async function login(login, password) {
    console.warn(login + ' ' + password);
    if( login === '' || password == '')
        return false;
    try {
        let credentials = await auth().signInWithEmailAndPassword(login, password);
        if (credentials) {
            console.warn(credentials);
            return true;
        }
        return false;

    } catch (error) {
        console.warn('error' + error)
        return false
    }
}



const authService = {
    login,
};

export default authService
