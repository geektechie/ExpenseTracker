import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

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
    calendarContainer: {
        color: Colors.BLACK,
        fontSize: 16,
        width: '100%',
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btnEdit: {
        backgroundColor: Colors.BLUE,
        color: Colors.WHITE,
        width: '100%',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        borderRadius: 4,
        height: 50,
        justifyContent: 'center'
    },
});

export default styles;
