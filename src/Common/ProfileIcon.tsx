/* eslint-disable import/order */
/* eslint-disable react/jsx-props-no-spreading */
import styled from 'styled-components';

import { currentUserInfo } from './helperFns';

import DefaultDp from 'Assets/default.jpg';

const StyledProfileIcon = styled.div`
  width: ${(props) => props.iconSize};
  height: ${(props) => props.iconSize};
  border-radius: 50%;
  background-color: ${(props) => props.iconBg};
  color: ${(props: ProfileIconProps) => props.iconTextColor};
  img {
    width: ${(props) => props.iconSize};
    height: ${(props) => props.iconSize};
    border-radius: 50%;
  }
`;

function ProfileIcon({
  className = '',
  iconBg = '#1c1950',
  iconSize = '40px',
  iconTextColor = 'white',
  iconText = '',
  profileDp = '',
  ...otherProps
}: ProfileIconProps) {
  const imageSrc = profileDp || currentUserInfo().photo || DefaultDp;
  return (
    <StyledProfileIcon
      iconBg={iconBg}
      iconSize={iconSize}
      iconTextColor={iconTextColor}
      className={`cursor-pointer d-flex justify-content-center align-items-center ${className}`}
      {...otherProps}
    >
      <img src={imageSrc} className="dp-image" alt="user-dp" />
    </StyledProfileIcon>
  );
}

export default ProfileIcon;
