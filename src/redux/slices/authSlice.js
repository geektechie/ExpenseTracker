import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    user: null,
    idToken: null,
    accessToken: null,
    showEvent: false,
    hideBottomTab: false,
    signEvent: true,
    withoutLogin: false,
}

const authSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        setSignIn: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.user = action.payload.user;
            state.idToken = action.payload.idToken;
            state.accessToken = action.payload.accessToken;
        },
        setSignOut: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            state.idToken = null;
            state.accessToken = null;
        },
    }
});

export const setSingIn = authSlice.actions.setSignIn;
export const setSignOut = authSlice.actions.setSignOut;

export const selectIsLoggedIn = (state) => state.authSlice.isLoggedIn;
export const selectUser = (state) => state.authSlice.user;
export const selectAccessToken = (state) => state.authSlice.accessToken;
export const selectIdToken = (state) => state.authSlice.idToken;

export default authSlice.reducer;
