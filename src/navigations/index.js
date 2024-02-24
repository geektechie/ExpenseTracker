import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../components/home/HomeScreen';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/slices/authSlice';
import AuthStack from './AuthStack';

const MainNavigation = () => {
    const Stack = createStackNavigator();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <NavigationContainer independent={true}>
            {
                !isLoggedIn
                    ?
                    <AuthStack />
                    :
                    <Stack.Navigator>
                        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                    </Stack.Navigator>
            }
        </NavigationContainer>
    );
}

export default MainNavigation;
