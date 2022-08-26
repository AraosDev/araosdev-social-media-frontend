import React from 'react'
import { ListGroup } from 'react-bootstrap';
import styled from 'styled-components';
import { currentUserInfo } from '../../../Common/helperFns'
import ProfileIcon from '../../../Common/ProfileIcon';

const StyledMsgView = styled.div`
    border-radius: 4px;
`

function MessageView() {
    const { friends } = currentUserInfo();
    return (
        <StyledMsgView className='py-3'>
            {
                friends.map(friend=>(
                    <ListGroup.Item className='d-flex'>
                        <ProfileIcon iconText={friend.charAt(0).toUpperCase()} />
                        <div className='d-flex flex-column mx-2'>
                            <span>{friend}</span>
                            <span>Most Recent Message</span>
                        </div>
                    </ListGroup.Item>
                ))
            }
        </StyledMsgView>
    )
}

export default MessageView