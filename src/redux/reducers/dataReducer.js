import { RECEIVE_EXPENSE_LIST, RECEIVE_ADD_EXPENSE, RECEIVE_EDIT_EXPENSE, RECEIVE_REMOVE_EXPENSE } from "../actions/actionTypes/expenseActionType";
import { RECEIVE_LOGOUT_API_DATA } from "../actions/actionTypes/userActionType";

export default (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_EXPENSE_LIST:
            return {
                ...state,
                myExpenseList: data
            }
        case RECEIVE_ADD_EXPENSE:
            return {
                ...state,
                addExpenseData: data
            }
        case RECEIVE_EDIT_EXPENSE:
            return {
                ...state,
                editExpenseData: data
            }
        case RECEIVE_REMOVE_EXPENSE:
            return {
                ...state,
                removeExpenseData: data
            }
        case RECEIVE_LOGOUT_API_DATA:
            return {
                state: undefined,
            }
        default:
            return state
    }
}
