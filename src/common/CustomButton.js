import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import styles from './styles/CustomButtonStyles'

const CustomButton = ({
    title = '',
    onClick = () => { },
    customStyles = {}
}) => {
    return (
        <TouchableOpacity style={[styles.btnAdd, customStyles]} onPress={onClick}>
            <Text style={{ color: Colors.WHITE }}>{title}</Text>
        </TouchableOpacity>
    );
}

export default CustomButton;
