import React from 'react';
import { ScrollView, Text } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { requestLogoutApiData } from '../../redux/actions/actionCreators/userActionCreators'
import { selectUser, setSignOut } from '../../redux/slices/authSlice';
import { CustomButton } from '../../common';

const ProfileScreen = (props) => {

    const userData = useSelector(selectUser);
    const dispatch = useDispatch();

    async function handleLogout() {
        dispatch(props.requestLogoutApiData());
        dispatch(setSignOut())
        await AsyncStorage.clear();
    }

    return (
        <ScrollView style={{ padding: 10 }}>
            <Text style={{ fontSize: 18, textAlign: 'center' }}>{userData.email}</Text>
            <CustomButton
                title={'Logout'}
                onClick={() => { handleLogout() }}
            />
        </ScrollView>
    );
}

const mapStateToProps = (state) => {
    return { data: state }
}

const mapDispatchToProps = dispatch => bindActionCreators({ requestLogoutApiData }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
