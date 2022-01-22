import { getCreateAccountApi } from "../../api/getApi";

export const createAccountState = (val)=>{
    return{
        type: "STORE_NEW_ACCOUNT_STATE",
        payload: val
    }
}


export const createAccountAction = (req, property, callback) => {
    return dispatch => {
        if(callback) callback("LOADING", {status: "LOADING", updated: "LOADING"})
        getCreateAccountApi(property, req)
        .then(res=>{
            const { status, updated, message = '' } = res.data;
            dispatch(createAccountState(res.data));
            if(updated === "OK" && status === 200) callback("LOADED", {status: 200, updated: "OK"});
            if(updated === "FAILED" && status === 400) callback("ERROR", {status: 400, updated: "FAILED", message});
        })
        .catch(err=>{
            console.log({...err});
            callback("ERROR", {status: 400, updated: "FAILED", message: "UNKNOWN_ERROR"});
        })
    }
}