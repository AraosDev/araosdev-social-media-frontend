import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormHeader from '../../Common/FormHeader';
import '../Login/index.css';

function ErrorView(props) {
    const { errorType, setView } = props;
    return (
        <div className='wrapper'>
            <div className='cardWrapper'>
                <FormHeader />
                {
                    errorType === "ACCOUNT_LIMIT_EXCEEDED" ? 
                    <p className='caveatBold'>Number of Trial Accounts created exceded the limit. Use existing accounts to login</p>
                    : errorType === "ALREADY_EXISTING_ACCOUNT" ?
                    <p className='caveatBold'>This account is already existing in our database. Create a unique one</p>
                    : <p className='caveatBold'>Unknown Error Occurred. Try again sometime</p>
                }
                <div>
                    <Button onClick={()=>setView("CREATE_ACCOUNT")} className='caveatBold loginBtn' style={{ color: 'black' }}>
                        Go Back to Create account
                    </Button>
                    <Link to='/' >
                        <Button className='caveatBold loginBtn' style={{ color: 'black' }}>
                            Go back to Sign In
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ErrorView
