import {
    REQUEST_LOGOUT_API_DATA, RECEIVE_LOGOUT_API_DATA,
} from '../actionTypes/userActionType';

// Logout
export const requestLogoutApiData = (obj) => ({ type: REQUEST_LOGOUT_API_DATA, obj });
export const receiveLogoutApiData = data => ({ type: RECEIVE_LOGOUT_API_DATA, data });

