import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState, useCallback} from 'react';
import authService from '../services/AuthService';


const LoginScreen = (props) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    const checkCredentials = useCallback((login, password) => {
            setIsFetching(true);
            authService.login(login, password).then(granted => {
                if (granted) {
                    props.navigation.navigate('Hydrant');
                } else {
                    Alert.alert('Błąd', 'Niepoprawny login lub hasło');
                }
                setIsFetching(false);
            });
        }, [isFetching],
    );

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Zaloguj się</Text>
            <View style={styles.loginFormContainer}>
                <View style={styles.textInputView}>
                    <Text>Login</Text>
                    <TextInput value={login} onChangeText={text => setLogin(text)} style={styles.textInput}/>
                </View>

                <View style={styles.textInputView}>
                    <Text>Hasło</Text>
                    <TextInput value={password} onChangeText={text => setPassword(text)} style={styles.textInput}
                               secureTextEntry={true}/>
                </View>

                <View style={styles.buttonView}>
                    <Button title="Zaloguj" onPress={() => checkCredentials(login, password)}
                            disabled={isFetching}></Button>
                </View>

            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    margin: {
        padding: 5,
        flexDirection: 'row',
    },
    textInput: {
        height: 40,
        width: 'auto',
        borderColor: 'gray',
        borderWidth: 1,
    },
    loginFormContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5,
        margin: 10,
        padding: 10,
    },
    buttonView: {
        margin: 15,
    },
});
