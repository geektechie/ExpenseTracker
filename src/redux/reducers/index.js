import { combineReducers } from "redux";
import dataReducer from "./dataReducer";
import authSlice from "../slices/authSlice";

const appReducer = combineReducers({
    dataReducer,
    authSlice,
})

const rootReducer = (state, action) => {
    return appReducer(state, action);
}

export default rootReducer