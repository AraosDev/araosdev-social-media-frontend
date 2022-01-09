import React from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import './index.css'

function Login() {
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
                                <Form.Label className='d-flex justify-content-start caveatBold'>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className='d-flex justify-content-start caveatBold'>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button className='caveatBold loginBtn' style={{color: 'black'}}>
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
