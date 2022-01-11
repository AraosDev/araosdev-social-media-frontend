import React, { useState } from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { loginAction } from '../../Store/actions/loginActions';
import './index.css'

function Login() {

    const dispatch = useDispatch();

    const [ userName, setUserName ] = useState('');
    const [ password, setPassword ] = useState('');

    const onLogin = ()=>{
        dispatch(loginAction(userName, password, '', ({credentialsVerified, status})=>{
            if(status === 200 && credentialsVerified === "OK") alert('Login Success !!');
            if(status === 400) alert('Login Failed !!');
        }))
    }

    return (
        <div className='wrapper'>
            <div className='cardWrapper'>
                <h2 className='caveatBold'>AraosDev</h2>
                <h2 className='caveatBold'>Social Media Web App</h2>
                <Card className='m-5'>
                    <Card.Header as="h5" className='cardHeader caveatBold'>Login to your account</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className='d-flex justify-content-start caveatBold'>User Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter your user name" 
                                    value={userName}
                                    onChange={(e)=>setUserName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className='d-flex justify-content-start caveatBold'>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Password" 
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Button onClick={onLogin} className='caveatBold loginBtn' style={{color: 'black'}}>
                                Login
                            </Button>
                        </Form>
                        <div className='mt-3'>
                            <Card.Link style={{textDecoration: 'none'}} className='caveatBold' href="#">Forgot Password?</Card.Link>
                            <Card.Link style={{textDecoration: 'none'}} className='caveatBold' href="#">New Account?</Card.Link>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default Login
