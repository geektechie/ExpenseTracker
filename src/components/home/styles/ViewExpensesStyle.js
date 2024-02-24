import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

const ViewExpensesStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    plusContainer: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        margin: 10,
        backgroundColor: Colors.BLUE,
        width: 50,
        height: 50,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.warmGrey600,
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 2,
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        margin: 10,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
        borderTopEndRadius: 5,
        borderBottomEndRadius: 5,
    },
    backTextWhite: {
        color: Colors.WHITE
    },
    rowFront: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        flexDirection: 'row',
        backgroundColor: Colors.GREY,
        borderRadius: 5,
        margin: 10,
        padding: 20,
    },
});

export default ViewExpensesStyle