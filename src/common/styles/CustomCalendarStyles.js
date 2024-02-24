import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    modalMainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0000006A'
    },
    btnView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'white'
    },
    btnStyles: {
        padding: 10,
        marginHorizontal: 10,
        width: 70,
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    }
});

export default styles;
