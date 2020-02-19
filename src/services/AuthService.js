import auth from '@react-native-firebase/auth';

async function login(login, password) {
    if( login === '' || password == '')
        return false;
    try {
        let credentials = await auth().signInWithEmailAndPassword(login, password);
        if (credentials) {
            return true;
        }
        return false;

    } catch (error) {
        return false
    }
}



const authService = {
    login,
};

export default authService
