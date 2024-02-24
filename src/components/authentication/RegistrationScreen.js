import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';

import Colors from '../../constants/Colors';
import { CustomButton } from '../../common';

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      if (!password || !email) {
        setError('All fields are required.');
        return;
      }

      await Auth.signUp({
        username: email,
        email,
        password,
        /* attributes: {
          email,
        }, */
        autoSignIn: {
          enabled: true
        }
      }).then((success) => {
        console.log("signUp success========", success);
        navigation.navigate('ConfirmationScreen', { userName: email });
        // (!success.isSignUpComplete && success.nextStep.signUpStep == 'CONFIRM_SIGN_UP') && navigation.navigate('ConfirmationScreen', { userName: email });
      }).catch((error) => {
        console.log("signUp Error========", error);
        setError('Invalid registration details.');
      });
    } catch (error) {
      console.error('Error signing up:', error);
      setError('Invalid registration details.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration Screen</Text>
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
        title={'Registration'}
        onClick={handleRegister}
      />
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
  }
});

export default RegistrationScreen;
