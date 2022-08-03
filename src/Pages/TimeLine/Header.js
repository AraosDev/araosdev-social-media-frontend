import React from 'react';
import { Form } from 'react-bootstrap';
import { BsPlusSquare } from "react-icons/bs";
import styled from 'styled-components';
import FormHeader from '../../Common/FormHeader';
import ProfileIcon from '../../Common/ProfileIcon';


const StyledTimeLineHeader = styled.div`
    display: flex;
    max-height: 85px;
    min-height: 60px;
    background: rgb(204, 204, 255);
    top: 0;
    width: 100%;
    border-bottom: 1px solid rgb(93, 63, 211);
    .display-img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #1c1950;
        color: white;
    }
`

function TimeLineHeader() {
    const { userName } = JSON.parse(localStorage.getItem('userInfo'));
    return (
        <StyledTimeLineHeader>
            <div className='mx-3 my-2' style={{ flex: '3' }}>
                <FormHeader hr={false} inline={true} />
            </div>
            <div className='d-flex justify-content-center align-items-center' style={{ flex: '9' }}>
                <Form className='caveatBold' style={{ width: '60%' }}>
                    <Form.Group>
                        <Form.Control type='text' placeholder='Search your Friends' />
                    </Form.Group>
                </Form>
            </div>
            <div className='d-flex justify-content-end align-items-center' style={{ flex: '3' }}>
                <BsPlusSquare className='me-3 cursor-pointer' color='#1c1950' size={25} title='Add Post' />
                <ProfileIcon iconText={userName.charAt(0).toUpperCase()} className='me-5' />
            </div>
        </StyledTimeLineHeader>
    );
}

export default TimeLineHeader;
