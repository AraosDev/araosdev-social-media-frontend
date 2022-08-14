import React from 'react';
import styled from 'styled-components';

export const StyledDataTransition = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: ${props=>props.inlineText ? `row` : `column`};
    justify-content: center;

    .spinner {
        border: 2px solid #f3f3f3;
        border-radius: 50%;
        border-top: 2px solid #212529;
        width: 20px;
        height: 20px;
        -webkit-animation: spin 2s linear infinite; /* For Safari and Firefox */
        animation: spin 1s linear infinite;
      }
      
      /* For Safari and Firefox */
      @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      span{
          margin-left: ${props=>props.inlineText ? `5px` : ``};
      }
`

export const Loader = ({message='Loading', inlineText = false, className, noMsg=false})=>{
    return (
        <StyledDataTransition inlineText={inlineText} className={className}>
            <div className='spinner'></div>
            {!noMsg && <span>{message}</span>}
        </StyledDataTransition>
    )
}