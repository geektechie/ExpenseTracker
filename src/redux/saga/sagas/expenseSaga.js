import { call, put } from 'redux-saga/effects';
import Colors from '../../../constants/Colors';
import { addExpense, editExpense, getMyExpenseList, removeExpense } from '../api/expenseApi';
import { receiveAddExpense, receiveEditExpense, receiveExpenseList, receiveRemoveExpense } from '../../actions/actionCreators/expenseActionCreators';

// My Expense List Worker Saga
export function* getMyExpenseListData(action) {
    try {
        const data = yield call(getMyExpenseList, action.obj);
        yield put(receiveExpenseList(data.data));
    } catch (e) {
        yield put(receiveExpenseList(e));
        console.log(Colors.CONSOLE_RED + "getMyExpenseListData Catch Error : " + Colors.CONSOLE_WHITE + e);
    }
}

// Add Expense Request Worker Saga
export function* addExpenseRequestData(action) {
    try {
        const data = yield call(addExpense, action.obj);
        yield put(receiveAddExpense(data));
    } catch (e) {
        yield put(receiveAddExpense(e));
        console.log(Colors.CONSOLE_RED + "addExpenseRequestData Catch Error : " + Colors.CONSOLE_WHITE + e);
    }
}

// Edit Expense Request Worker Saga
export function* editExpenseData(action) {
    try {
        const data = yield call(editExpense, action.obj);
        yield put(receiveEditExpense(data));
    } catch (error) {
        console.log(Colors.CONSOLE_RED + "editExpenseData Catch Error : " + Colors.CONSOLE_WHITE + error)
        yield put(receiveEditExpense(error));
    }
}

// Remove Expense Request Worker Saga
export function* removeExpenseData(action) {
    try {
        const data = yield call(removeExpense, action.obj);
        yield put(receiveRemoveExpense(data));
    } catch (error) {
        console.log(Colors.CONSOLE_RED + "removeExpenseData Catch Error : " + Colors.CONSOLE_WHITE + error)
        yield put(receiveRemoveExpense(error))
    }
}
