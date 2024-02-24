import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    expenseItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
    },
    category: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    amount: {
        fontSize: 16,
        color: 'green',
    },
    date: {
        fontSize: 14,
        color: '#888',
    },
    dateBtn: {
        borderWidth: 1, padding: 10, justifyContent: 'center', alignItems: 'center', marginVertical: 10
    },
    filterBtn: {
        borderWidth: 1, padding: 10, justifyContent: 'center', alignItems: 'center', marginVertical: 10
    },
});

export default styles
