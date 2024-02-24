import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../components/authentication/LoginScreen';
import RegistrationScreen from '../components/authentication/RegistrationScreen';
import ConfirmationScreen from '../components/authentication/ConfirmationScreen';

const AuthStack = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
            <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} />
        </Stack.Navigator>
    );
}

export default AuthStack;
