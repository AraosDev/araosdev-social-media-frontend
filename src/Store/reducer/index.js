import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import timelineReducer from "./timelineReducer";


export default combineReducers({
    loginReducer,
    timelineReducer,
});