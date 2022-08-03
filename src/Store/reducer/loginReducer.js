const initialState = {
    loggedInUserDetails: {},
    newAccountState: {}
}

const loginReducer = (state = initialState, action)=>{
    let newState = {...state};
    switch (action.type){

        case "STORE_LOGGED_USER_DETAILS":{
            newState.loggedInUserDetails = action.payload;
            break;
        }

        case "STORE_NEW_ACCOUNT_STATE":{
            newState.newAccountState = action.payload;
            break;
        }

        default:{
            newState = {...state}
            break;
        }
    }

    return newState;
}

export default loginReducer;