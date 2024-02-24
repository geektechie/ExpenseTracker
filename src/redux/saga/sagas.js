import { takeLatest } from 'redux-saga/effects'
import { REQUEST_ADD_EXPENSE, REQUEST_EDIT_EXPENSE, REQUEST_EXPENSE_LIST, REQUEST_REMOVE_EXPENSE } from '../actions/actionTypes/expenseActionType';
import { addExpenseRequestData, editExpenseData, getMyExpenseListData, removeExpenseData } from './sagas/expenseSaga';

export default function* mySage() {
    yield takeLatest(REQUEST_EXPENSE_LIST, getMyExpenseListData);
    yield takeLatest(REQUEST_ADD_EXPENSE, addExpenseRequestData);
    yield takeLatest(REQUEST_EDIT_EXPENSE, editExpenseData);
    yield takeLatest(REQUEST_REMOVE_EXPENSE, removeExpenseData);
}
