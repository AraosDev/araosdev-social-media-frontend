import React from 'react';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import FormHeader from '../../Common/FormHeader';


const StyledTimeLineHeader = styled.div`
    display: flex;
    max-height: 85px;
    min-height: 60px;
    background: rgb(204, 204, 255);
    position: fixed;
    top: 0;
    width: 100%;
    border-bottom: 1px solid rgb(93, 63, 211);
    border-radius: 0px 0px 5px 5px;
`

function TimeLineHeader() {
  return (
    <StyledTimeLineHeader>
        <div className='mx-3 my-2' style={{flex: '1'}}>
            <FormHeader hr={false} inline={true} />
        </div>
        <div className='d-flex justify-content-center align-items-center' style={{flex: '9'}}>
            <Form className='caveatBold' style={{width: '60%'}}>
                <Form.Group>
                    <Form.Control type='text' placeholder='Search your Friends' />
                </Form.Group>
            </Form>
        </div>
    </StyledTimeLineHeader>
  );
}

export default TimeLineHeader;
