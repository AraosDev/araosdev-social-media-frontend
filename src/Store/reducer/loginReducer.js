const initialState = {
    loggedInUserDetails: {},
    newAccountState: {}
}

const loginReducer = (state = initialState, action)=>{
    let newState = {...state};
    switch (action.type){

        case "STORE_LOGGED_USER_DETAILS":{
            newState.loggedInUserDetails = action.payload;
        }

        case "STORE_NEW_ACCOUNT_STATE":{
            newState.newAccountState = action.payload;
        }

        default:{
            newState = {...state}
        }
    }

    return newState;
}

export default loginReducer;