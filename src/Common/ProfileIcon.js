import React from 'react'
import styled from 'styled-components'

const StyledProfileIcon = styled.div`
    width: ${props => props.iconSize};
    height: ${props => props.iconSize};
    border-radius: 50%;
    background-color: ${props => props.iconBg};
    color: ${props => props.iconTextColor};
`

function ProfileIcon({ className = '', iconBg = '#1c1950', iconSize = '40px', iconTextColor = 'white', iconText = '', ...otherProps }) {
    return (
        <StyledProfileIcon
            iconBg={iconBg}
            iconSize={iconSize} 
            iconTextColor={iconTextColor}
            className={`cursor-pointer d-flex justify-content-center align-items-center ${className}`}
            {...otherProps}
        >
            <span>{iconText}</span>
        </StyledProfileIcon>
    )
}

export default ProfileIcon