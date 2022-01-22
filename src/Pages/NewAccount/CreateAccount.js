import React from 'react';
import '../Login/index.css';
import { Button, Card, Form } from 'react-bootstrap';
import FormHeader from '../../Common/FormHeader';

function CreateAccount(props) {

    const { userName, email, phnNumber, accountType, password, confirmpassword, pwdError } = props;
    const { setUserName, setEmail, setPhnNumber, setAccountType, setPassword, setConfirmPassword, onCreateAccount } = props;


    return (
        <div className='wrapper'>
            <div className='cardWrapper'>
                <FormHeader />
                <Card className='m-4'>
                <Card.Header as="h5" className='cardHeader caveatBold'>Create your account</Card.Header>
                    <Card.Body>
                        <Form className='form-grp-style'>
                            <Form.Group className="mb-3 d-flex justify-content-between" controlId="formBasicEmail">
                                <Form.Label style={{ flexDirection: 'column' }} className='mx-3 d-flex justify-content-start caveatBold'>
                                    User Name
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your user name"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                </Form.Label>
                                
                                <Form.Label style={{flexDirection: 'column'}} className=' mx-3 d-flex justify-content-start caveatBold'>
                                    Email
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Enter your email" 
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                    />
                                </Form.Label>
                            </Form.Group>

                            <Form.Group className="mb-3 d-flex justify-content-between" controlId="formBasicEmail">
                                <Form.Label style={{flexDirection: 'column'}} className=' mx-3 d-flex justify-content-start caveatBold'>
                                    Phone Number
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter your Phone Number" 
                                        value={phnNumber ? phnNumber : ""}
                                        onInput={(e)=>setPhnNumber(e.target.value.replace(/\D/,''))}
                                    />
                                </Form.Label>
                                <Form.Label style={{flexDirection: 'column'}} className=' mx-3 d-flex justify-content-start caveatBold'>
                                    Account Type
                                    <Form.Select 
                                        value={accountType ? accountType : ""}
                                        onInput={(e)=>setAccountType(e.target.value)}
                                    >
                                        <option disabled>Please select account type</option>
                                        <option>Private</option>
                                        <option>Public</option>
                                    </Form.Select>
                                </Form.Label>
                            </Form.Group>

                            <Form.Group className="mb-3 d-flex justify-content-between" controlId="formBasicPassword">
                                <Form.Label style={{flexDirection: 'column'}} className='mx-3 d-flex justify-content-start caveatBold'>
                                    Password
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Type your Password" 
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                    />
                                </Form.Label>
                                <Form.Label style={{flexDirection: 'column'}} className='mx-3 d-flex justify-content-start caveatBold'>
                                    Confirm Password
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Confirm your password" 
                                        value={confirmpassword}
                                        onChange={(e)=>setConfirmPassword(e.target.value)}
                                    />
                                </Form.Label>
                            </Form.Group>

                            <Button onClick={onCreateAccount} className='caveatBold loginBtn' style={{color: 'black'}}>
                                Create Account
                            </Button>
                            <div className='caveatBold' style={{color: 'red'}}>
                                {pwdError ? '* Passwords do not match' : ''}
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default CreateAccount
