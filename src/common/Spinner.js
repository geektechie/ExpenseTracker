
import React from 'react';
import { ActivityIndicator, StyleSheet, View, Modal } from 'react-native';
import Colors from '../constants/Colors';

const Spinner = ({
    visible,
}) => {
    return (
        <Modal visible={visible} transparent={true}>
            <View style={styles.container}>
                <ActivityIndicator
                    color={Colors.BLUE}
                    size="large"
                    style={{ height: 100, width: 100 }}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0000006A',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default Spinner;
