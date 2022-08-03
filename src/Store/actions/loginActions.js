import { getLoginApi } from "../../api/getApi";

export const loginState = (val)=>{
    return{
        type: 'STORE_LOGGED_USER_DETAILS',
        payload: val
    }
}

export const loginAction = (username, password, property='', callback)=>{
    return dispatch => {
        if(callback) callback({ status: "LOADING", credentialsVerified: "LOADING" });
        getLoginApi(property, {username, password})
        .then(res=>{
            const { status, credentialsVerified, details={} } = res.data;
            if(status === 200 && credentialsVerified === "OK"){
                dispatch(loginState({...details, credentialsVerified}));
                const userInfo = JSON.stringify({...details, credentialsVerified})
                localStorage.setItem('userInfo', userInfo);
                if(callback) callback({...details, credentialsVerified, status});
            }
            else{
                if(callback) callback({...details, credentialsVerified, status});
            }
        })
        .catch(err=>{
            dispatch(loginState({ status: 400, credentialsVerified: "FAILED" }));
            if(callback) callback({ status: 400, credentialsVerified: "FAILED" });
        })
    }
}