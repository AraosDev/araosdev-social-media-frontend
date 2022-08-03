import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import styled from 'styled-components'
import { Loader } from '../../Common/DataTransitionHandlers';
import { getTimeLineImagesAction } from '../../Store/actions/timelineActions';

const StyledTimelineBody = styled.div`
    max-height: calc(100vh - 85px);
    overflow: auto;
    .timeline-body-container {
        background-color: rgb(204, 204, 255);
        border-left: 1px solid rgb(93, 63, 211) !important;
        border-right: 1px solid rgb(93, 63, 211) !important;
        width: 750px;
        .loader-element {
            height: calc(100vh - 85px);
        }
    }
`;

function TimelineBody() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTimeLineImagesAction());
    }, [])
    
    return (
        <StyledTimelineBody>
            <Container className='timeline-body-container'>
                <Loader className='loader-element caveatBold' message='Loading your feeds . . .' />
            </Container>
        </StyledTimelineBody>
    )
}

export default TimelineBody