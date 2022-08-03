import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { Loader } from '../../Common/DataTransitionHandlers';
import Card from 'react-bootstrap/Card';
import { getTimeLineImagesAction } from '../../Store/actions/timelineActions';
import ProfileIcon from '../../Common/ProfileIcon';
import { BsHeart, BsChat } from "react-icons/bs";

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
    const { timelineState, timelineImages } = useSelector(state => state.timelineReducer);

    useEffect(() => {
        dispatch(getTimeLineImagesAction());
    }, []);

    const getTimelineContent = () => {
        switch(timelineState) {
            case 'TIMELINE_LOADING': return (
                <Loader className='loader-element caveatBold' message='Loading your feeds . . .' />
            );

            case 'TIMELINE_LOADED': return(
                <div className='py-3'>
                    {
                        timelineImages.map((image, index) => (
                            <Card className={`${index === (timelineImages.length - 1) ? '' : 'mb-4'}`}>
                                <Card.Header className='d-flex'>
                                    <ProfileIcon iconText={image.userName.charAt(0).toUpperCase()} />
                                    <div className='d-flex flex-column ms-2' style={{ fontSize: 13, fontWeight: 700 }}>
                                        <span>{image.userName}</span>
                                        <span>{image.postedDate}</span>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Subtitle className= 'mb-3'>{image.caption}</Card.Subtitle>
                                    <Card.Img style={{ width: '100%', height: 600, objectFit: 'cover' }} src={image.imageLink} />
                                </Card.Body>
                                <Card.Footer>
                                    <BsHeart size={25} className='me-2' />{image.likes} likes
                                    <BsChat size={24} className='mx-2' />{image.commentSection.length} comments
                                </Card.Footer>
                            </Card>
                        ))
                    }
                </div>
            );
        }
    }
    
    return (
        <StyledTimelineBody>
            <Container className='timeline-body-container'>
                {getTimelineContent()}
            </Container>
        </StyledTimelineBody>
    )
}

export default TimelineBody