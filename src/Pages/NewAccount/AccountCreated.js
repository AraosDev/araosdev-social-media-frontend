import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormHeader from '../../Common/FormHeader';
import '../Login/index.css';

function AccountCreated(props) {
    return (
        <div className='wrapper'>
            <div className='cardWrapper'>
                <FormHeader />
                <p className='caveatBold'>Your account is successfully created</p>
                <div>
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

export default AccountCreated
