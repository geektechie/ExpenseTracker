import {
    REQUEST_EXPENSE_LIST, RECEIVE_EXPENSE_LIST,
    REQUEST_ADD_EXPENSE, RECEIVE_ADD_EXPENSE,
    REQUEST_EDIT_EXPENSE, RECEIVE_EDIT_EXPENSE,
    REQUEST_REMOVE_EXPENSE, RECEIVE_REMOVE_EXPENSE
} from '../actionTypes/expenseActionType';

// Expense List Request
export const requestExpenseList = (obj) => ({ type: REQUEST_EXPENSE_LIST, obj });
export const receiveExpenseList = (data) => ({ type: RECEIVE_EXPENSE_LIST, data });

// Add Expense Request
export const requestAddExpense = (obj) => ({ type: REQUEST_ADD_EXPENSE, obj });
export const receiveAddExpense = (data) => ({ type: RECEIVE_ADD_EXPENSE, data });

// Commit to Expense
export const requestEditExpense = (obj) => ({ type: REQUEST_EDIT_EXPENSE, obj });
export const receiveEditExpense = (data) => ({ type: RECEIVE_EDIT_EXPENSE, data });

// Remove Expense
export const requestRemoveExpense = (obj) => ({ type: REQUEST_REMOVE_EXPENSE, obj });
export const receiveRemoveExpense = (data) => ({ type: RECEIVE_REMOVE_EXPENSE, data });