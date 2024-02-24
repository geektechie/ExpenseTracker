import Colors from '../../../constants/Colors';
import { makeRequest } from '../../api/apiCall';
import { BASE_URL } from '../../api/apiConstant';

const GET = "get";
const POST = "post";
const PUT = "put";
const DELETE = "delete";

// My Expense List
export const getMyExpenseList = async (obj) => {
    try {
        return makeRequest({ url: BASE_URL, method: GET })
            .then(response => {
                return response;
            })
            .catch(err => {
                console.log(Colors.CONSOLE_RED + "getMyExpenseList Error : " + Colors.CONSOLE_WHITE + err);
                return err;
            })
    } catch (e) {
        console.log(Colors.CONSOLE_RED + "getMyExpenseList Catch Error : " + Colors.CONSOLE_WHITE + e);
        return e;
    }
}

// Add Expense
export const addExpense = async (obj) => {
    try {
        return makeRequest({ url: BASE_URL, method: POST, data: obj.data })
            .then(response => {
                return response;
            })
            .catch(err => {
                console.log(Colors.CONSOLE_RED + "addExpense Error : " + Colors.CONSOLE_WHITE + err);
                return err;
            })
    } catch (e) {
        console.log(Colors.CONSOLE_RED + "addExpense Catch Error : " + Colors.CONSOLE_WHITE + e);
        return e;
    }
}

// Edit Expense
export const editExpense = async (obj) => {
    try {
        return makeRequest({ url: (BASE_URL + '/' + obj.id), method: PUT, data: obj.data })
            .then(response => {
                return response;
            })
            .catch(err => {
                console.log(Colors.CONSOLE_RED + "editExpense Error : " + Colors.CONSOLE_WHITE + err)
                return err;
            })
    } catch (err) {
        console.log(Colors.CONSOLE_RED + "editExpense Catch Error : " + Colors.CONSOLE_WHITE + err)
        return err;
    }
}

// Remove Expense
export const removeExpense = async (obj) => {
    try {
        return makeRequest({ url: (BASE_URL + '/' + obj.id), method: DELETE, accessToken: obj.accessToken })
            .then(response => {
                return response;
            })
            .catch(err => {
                console.log(Colors.CONSOLE_RED + "removeExpense Error : " + Colors.CONSOLE_WHITE + err)
                return err;
            })
    } catch (err) {
        console.log(Colors.CONSOLE_RED + "removeExpense Catch Error : " + Colors.CONSOLE_WHITE + err)
        return err
    }
}
