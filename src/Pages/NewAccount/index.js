import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../../Common/DataTransitionHandlers';
import FormHeader from '../../Common/FormHeader';
import { createAccountAction } from '../../Store/actions/newAccountActions';
import '../Login/index.css';
import AccountCreated from './AccountCreated';
import CreateAccount from './CreateAccount';
import ErrorView from './ErrorView';

function NewAccount() {

    const dispatch = useDispatch();

    const [ userName, setUserName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmpassword, setConfirmPassword ] = useState('');
    const [ phnNumber, setPhnNumber ] = useState(null);
    const [ accountType, setAccountType ] = useState(null);
    const [ pwdError, setPwdError ] = useState(false);
    const [ view, setView ] = useState("CREATE_ACCOUNT");
    const [ errorType, setErrorType ] = useState("");

    const onCreateAccount = ()=>{
        if(password !== confirmpassword) {
            setPwdError(true);
            return;
        }
        else{
            const req = {
                "username": userName,
                "password": password,
                "email": email,
                "phonenumber": phnNumber
            }
            dispatch(createAccountAction( req, '', (loaderStatus,{status, updated, message=''})=>{
                if(status === "LOADING" && updated === "LOADING") setView(status);

                if(status === 400 && updated === "FAILED" && loaderStatus==="ERROR"){
                    setErrorType(message.toUpperCase());
                    setView("ERROR_VIEW");
                }
                if(status === 200 && updated === "OK" && loaderStatus==="LOADED"){
                    setView("ACCOUNT_CREATED");
                }
            }))
        }
    }

    switch (view) {

        case "CREATE_ACCOUNT":{
            return (
                <CreateAccount
                    userName={userName}
                    setUserName={setUserName}
                    password={password}
                    setPassword={setPassword}
                    email={email}
                    setEmail={setEmail}
                    confirmpassword={confirmpassword}
                    setConfirmPassword={setConfirmPassword}
                    phnNumber={phnNumber}
                    setPhnNumber={setPhnNumber}
                    accountType={accountType} 
                    setAccountType={setAccountType}
                    pwdError={pwdError}
                    onCreateAccount={onCreateAccount}
                />
            )
        }

        case "ERROR_VIEW": {
            return(
                <ErrorView 
                    errorType={errorType}
                    setView={setView}
                />
            )
        }

        case "ACCOUNT_CREATED": {
            return(
                <AccountCreated />
            )
        }

        case "LOADING": {
            return (
                <div className='wrapper'>
                    <div className='cardWrapper'>
                        <FormHeader />
                        <Loader />
                    </div>
                </div>
            )
        }

        default:
            break;
    }
}

export default NewAccount
