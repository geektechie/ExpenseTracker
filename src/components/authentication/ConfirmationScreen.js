import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Auth, Hub } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import { storeToken } from '../../common/Methods';
import { setSingIn } from '../../redux/slices/authSlice'

const ConfirmationScreen = (props) => {
    const navigation = useNavigation();
    const [confirmCode, setConfirmCode] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleConfirm = async () => {
        try {
            if (!confirmCode) {
                setError('Enter valid code');
                return;
            }

            await Auth.confirmSignUp(props.route.params.userName, confirmCode)
                .then((success) => {
                    console.log('success: ', success)

                    Hub.listen('auth', ({ payload }) => {
                        const event = payload?.event
                        if (event != undefined && event != '' && event === 'autoSignIn') {
                            storeToken(payload?.data?.signInUserSession?.idToken?.jwtToken)
                            dispatch(setSingIn({
                                isLoggedIn: true,
                                user: payload?.data?.attributes
                            }))
                        } else if (event === 'autoSignIn_failure') {
                            setIsLoading(false)
                            navigation.reset({
                                index: 0,
                                routes: [
                                    { name: "LoginScreen" }
                                ]
                            });
                        }
                    })
                })
                .catch((error) => {
                    console.log("confirmSignUp Error========", error);
                });
        } catch (error) {
            console.error('Error Confirmation:', error);
            setError('Enter valid code');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Confirmation</Text>
            <TextInput
                placeholder="Enter confirmation code"
                value={confirmCode}
                onChangeText={setConfirmCode}
                style={styles.input}
            />

            {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
            <TouchableOpacity onPress={handleConfirm} style={styles.btnLogin}>
                <Text style={{ textAlign: 'center', color: Colors.WHITE }}>Confirm</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10%',
    },
    title: {
        fontSize: 20,
        margin: 20,
    },
    input: {
        color: Colors.BLACK,
        backgroundColor: Colors.WHITE,
        fontSize: 16,
        width: '100%',
        margin: 10,
        padding: 10,
    },
    txtSignUp: {
        color: Colors.BLACK,
        fontSize: 14,
        alignSelf: 'flex-end'
    },
    btnLogin: {
        backgroundColor: Colors.BLUE,
        color: Colors.WHITE,
        width: '100%',
        textAlign: 'center',
        margin: 10,
        padding: 10,
    },
});

export default ConfirmationScreen;