import React from 'react';
import { ListGroup } from 'react-bootstrap';
import styled from 'styled-components';
import { currentUserInfo } from '../../../Common/helperFns';
import ProfileIcon from '../../../Common/ProfileIcon';

const StyledMsgView = styled.div`
  border-radius: 4px;
  .message-profile-icon {
    flex: 1;
  }
  .message-frnd {
    flex: 16;
  }
  .message-recent-msg-time {
    flex: 1;
  }
  .message-user-name {
    font-weight: 650;
    font-size: 14px;
  }
  .message-recent {
    color: #888888;
    font-size: 13px;
  }
`;

function MessageView() {
  const { friends } = currentUserInfo();
  return (
    <StyledMsgView className="py-3">
      {friends.map((friend) => (
        <ListGroup.Item className="d-flex cursor-pointer">
          <ProfileIcon
            className="message-profile-icon"
            iconText={friend.charAt(0).toUpperCase()}
          />
          <div className="d-flex flex-column mx-2 message-frnd">
            <span className="message-user-name">{friend}</span>
            <span className="message-recent">
              Most Recent Message comes here. . .
            </span>
          </div>
          <div className="message-recent-msg-time">
            <span className="message-recent">12:00pm</span>
          </div>
        </ListGroup.Item>
      ))}
    </StyledMsgView>
  );
}

export default MessageView;
