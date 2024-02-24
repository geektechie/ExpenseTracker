import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Auth } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Colors from '../../constants/Colors';
import { storeToken } from '../../common/Methods';
import { setSingIn } from '../../redux/slices/authSlice';
import { CustomButton, Spinner } from '../../common'

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [displaySpinner, setDisplaySpinner] = useState(false)

  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setError('Email and password are required.');
        return;
      }

      setDisplaySpinner(true);
      await Auth.signIn({ username: email, password: password })
        .then((response) => {
          storeToken(response.signInUserSession.idToken.jwtToken)
          dispatch(setSingIn({
            isLoggedIn: true,
            user: response.attributes
          }))
          setDisplaySpinner(false);
        })
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Invalid email or password.');
      setDisplaySpinner(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

      <CustomButton
        title={'Login'}
        onClick={handleLogin}
      />

      <TouchableOpacity style={styles.txtSignUp} onPress={() => navigation.navigate('RegistrationScreen')}>
        <Text style={{ textAlign: 'center' }}>Don't have an account? SignUp</Text>
      </TouchableOpacity>

      <Spinner visible={displaySpinner} />

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
    alignSelf: 'flex-end',
  },
  btnLogin: {
    backgroundColor: Colors.BLUE,
    color: Colors.WHITE,
    width: '100%',
    alignItems: 'center',
    margin: 10,
    padding: 10,
  },
});

export default LoginScreen;
