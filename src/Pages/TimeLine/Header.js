/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
  useFriendRequestMutation,
  usePostTimelineImgMutation,
  useSearchFriendListQuery,
} from 'api/apiSlice';
import { useRef, useState } from 'react';

import { Badge, Dropdown, Form } from 'react-bootstrap';
import { BsPlusSquare, BsXLg } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { friendRequestTrigger } from 'Store/mutationTriggers/frndReqTrigger';
import { postImageInTimeline } from 'Store/mutationTriggers/timelineTrigger';
import { setTimelineState } from 'Store/reducer/timelineReducer';
import styled from 'styled-components';
import AutoSuggestion from '../../Common/AutoSuggestion/AutoSuggestion';
import { Loader } from '../../Common/DataTransitionHandlers';
import FormHeader from '../../Common/FormHeader';
import { currentUser, unixTimeToReadableFormat } from '../../Common/helperFns';
import ModalComp from '../../Common/ModalComp';
import ProfileIcon from '../../Common/ProfileIcon';
import TimelinePostCard from '../../Common/TimelinePostCard';
import { frndUserRelation } from './HelperFns';

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
  .bg-primary {
    background-color: rgb(204, 204, 255) !important;
    border: 1px solid rgb(93, 63, 211) !important;
  }
`;

function TimeLineHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = currentUser();

  const postedImgRef = useRef(null);

  const { timelineState } = useSelector((state) => state.timelineReducer);

  const [selectedFrnd, setSelectedFrnd] = useState('');
  const [frndReqState, setFrndReqState] = useState([]);
  const [openAddPostModal, setOpenAddPostModal] = useState(false);
  const [postedImg, setPostedImg] = useState(null);
  const [postedImgCaption, setPostedImgCaption] = useState('');
  const [postImgState, setPostImgState] = useState('');
  const [openProfileDrpDwn, setOpenProfileDrpDwn] = useState(false);
  const [debouncedSearchKey, setDebouncedSearchKey] = useState('');

  const [postImage, { isLoading }] = usePostTimelineImgMutation();
  const {
    data: frndSuggestions,
    isFetching: isFrndSuggestionLoading,
    isError: isFrndSuggestionErr,
    error: frndSuggestionErr,
  } = useSearchFriendListQuery(debouncedSearchKey);
  const [friendReqtTrigger] = useFriendRequestMutation();

  const frndUserRelationChange = (frnd, label, event) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    const { reqType } = frndUserRelation(frnd);
    let reqBody;
    if (reqType) {
      reqBody = {
        requestType: reqType,
        friend: frnd,
      };
    } else {
      reqBody = {
        requestType: label.includes('Accept') ? 'ACCEPT_REQ' : 'REJECT_REQ',
        friend: userName,
        user: frnd,
      };
    }
    friendRequestTrigger(friendReqtTrigger, { ...reqBody, event }, (state) => {
      const { requestType } = reqBody;
      const existingStates = [...frndReqState];
      const currentFrndReqState = existingStates.find(
        ({ frnd: friend }) => friend === frnd
      );
      const currentFrndReqStateIndex = existingStates.findIndex(
        ({ frnd: friend }) => friend === frnd
      );
      if (currentFrndReqState) {
        const newState = {
          ...currentFrndReqState,
          state: `${requestType}_${state}`,
        };
        existingStates.splice(currentFrndReqStateIndex, 1, newState);
      } else existingStates.push({ frnd, state: `${requestType}_${state}` });
      setFrndReqState(existingStates);
    });
  };

  const getFrndRelationBadgeLabel = (frnd) => {
    const { state = '' } =
      frndReqState.find(({ frnd: friend }) => friend === frnd) || {};
    const { label, loaderLabel } = frndUserRelation(frnd);
    if (state.includes('LOADING') && loaderLabel) {
      return (
        <Badge className="cursor-not-allowed" text="dark">
          <Loader inlineText message={loaderLabel} />
        </Badge>
      );
    }
    if (state.includes('LOADING') && !loaderLabel) {
      const splLoaderLabel = state.includes('ACCEPT_REQ')
        ? 'Accepting Request'
        : 'Rejecting Request';
      return (
        <Badge className="cursor-not-allowed" text="dark">
          <Loader inlineText message={splLoaderLabel} />
        </Badge>
      );
    }
    if (!label) {
      return (
        <div>
          {['Reject Request', 'Accept Request'].map((lab) => (
            <Badge
              key={lab}
              onMouseDown={(e) => frndUserRelationChange(frnd, lab, e)}
              className="cursor-pointer mx-2"
              text="dark"
            >
              {lab}
            </Badge>
          ))}
        </div>
      );
    }
    return (
      <Badge
        onMouseDown={(e) => frndUserRelationChange(frnd, '', e)}
        className="cursor-pointer"
        text="dark"
      >
        {label}
      </Badge>
    );
  };

  const onCaptureUploadedImg = (e) => {
    if (e.target.files && e.target.files.length) {
      setPostedImg(e.target.files[0]);
    }
  };

  const closeModal = () => {
    setPostedImg(null);
    setPostedImgCaption('');
    postedImgRef.current = null;
    setPostImgState('');
    setOpenAddPostModal(false);
  };

  const postTimelineImage = () => {
    const { name } = postedImg;
    const supportedImgFormats = ['jpg', 'jpeg', 'png'];
    if (supportedImgFormats.includes(name.split('.').pop().toLowerCase())) {
      postImageInTimeline(
        postImage,
        {
          file: postedImg,
          caption: postedImgCaption,
          username: userName,
        },
        (state) => {
          if (state === 'SUCCESS') closeModal();
          else setPostImgState(state);
        }
      );
    }
  };

  const switchViews = (view) => {
    dispatch(setTimelineState(view));
    setOpenProfileDrpDwn(false);
  };

  return (
    <StyledTimeLineHeader>
      <ModalComp
        openModalState={openAddPostModal}
        onCloseModal={() => closeModal()}
        modalSize="lg"
        header="Add your post"
        bodyClass="d-flex flex-column"
        proceedValidation={postedImg && postedImgCaption && !postImgState}
        proceedHandler={postTimelineImage}
        validationMsg={
          !postedImg
            ? 'Please upload an image to post'
            : !postedImgCaption
            ? 'Please type in image caption'
            : ''
        }
        modalBody={() =>
          postImgState === 'ERROR' ? (
            <div style={{ height: 400 }}>
              Something went wrong. Please try again after Some time.
            </div>
          ) : isLoading ? (
            <div style={{ height: 400 }}>
              <Loader message="Posting your image" />
            </div>
          ) : (
            <>
              <Form.Group style={{ flex: 1 }} className="mb-3">
                <Form.Label>Allowed Image Format: jpg, jpeg, png</Form.Label>
                <div className="d-flex mb-3 align-items-center">
                  <Form.Control
                    ref={postedImgRef}
                    type="file"
                    className="me-2"
                    onChange={onCaptureUploadedImg}
                  />
                  <BsXLg
                    onClick={() => {
                      setPostedImg(null);
                      postedImgRef.current.value = null;
                    }}
                    className="cursor-pointer"
                  />
                </div>
                <Form.Control
                  value={postedImgCaption}
                  onChange={(e) => setPostedImgCaption(e.target.value)}
                  placeholder="Type your caption here"
                />
              </Form.Group>
              <TimelinePostCard
                cardClassName="mb-4"
                cardStyle={{ flex: 1 }}
                imagePostedBy={userName}
                imagePostedOn={unixTimeToReadableFormat(
                  Math.round(new Date().getTime() / 1000)
                )}
                imgcaption={postedImgCaption}
                imgSrc={postedImg ? URL.createObjectURL(postedImg) : ''}
                commentType="none"
                didCurrentUserLiked={false}
                updateLikeCount={() => {}}
                imgLikes={0}
                commentSection={[]}
                noImgAvailableText="Add your image to see the preview"
              />
            </>
          )
        }
        proceedLabel="Post"
      />
      <div className="mx-3 my-2" style={{ flex: '3' }}>
        <FormHeader hr={false} inline />
      </div>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ flex: '9' }}
      >
        <AutoSuggestion
          defaultValue={selectedFrnd}
          inputTypeProps={{
            inputTextFontSize: 16,
            placeholder: 'Search your Friends',
            dropDownStyle: {
              fontSize: 16,
              fontWeight: 'normal',
              position: 'absolute',
              marginTop: '38px',
            },
            label: '',
            caption: '',
          }}
          totalList={
            isFrndSuggestionLoading
              ? 'LOADING'
              : isFrndSuggestionErr
              ? frndSuggestionErr
              : frndSuggestions
          }
          onSuggestionClick={setSelectedFrnd}
          minLengthToShowSuggestion={1}
          onSearchKeyChange={setDebouncedSearchKey}
          customListComponent={(valObj, onHoverList, className) => {
            const { value, valueId } = valObj;
            return (
              <li
                className={`${className} d-flex justify-content-between p-2`}
                key={valueId}
                onMouseDown={() => onHoverList(valObj)}
              >
                {value}
                {getFrndRelationBadgeLabel(value)}
              </li>
            );
          }}
        />
      </div>
      <div
        className="d-flex justify-content-end align-items-center"
        style={{ flex: '3' }}
      >
        <BsPlusSquare
          className="me-3 cursor-pointer"
          color="#1c1950"
          size={25}
          title="Add Post"
          onClick={() => setOpenAddPostModal(true)}
        />
        <ProfileIcon
          iconText={userName.charAt(0).toUpperCase()}
          className="me-5"
          onClick={() => {
            setOpenProfileDrpDwn(!openProfileDrpDwn);
          }}
        />
        <Dropdown.Menu
          show={openProfileDrpDwn}
          align="end"
          style={{ top: 60, right: 50 }}
        >
          {timelineState !== 'TIMELINE_VIEW' ? (
            <Dropdown.Item onClick={() => switchViews('TIMELINE_VIEW')}>
              My Timeline
            </Dropdown.Item>
          ) : null}
          {timelineState !== 'FRIEND_LIST_VIEW' ? (
            <Dropdown.Item onClick={() => switchViews('FRIEND_LIST_VIEW')}>
              My Friends
            </Dropdown.Item>
          ) : null}
          {timelineState !== 'MESSAGE_VIEW' ? (
            <Dropdown.Item onClick={() => switchViews('MESSAGE_VIEW')}>
              Messages
            </Dropdown.Item>
          ) : null}
          <Dropdown.Item
            onClick={() => {
              localStorage.clear();
              navigate('/', { replace: true });
            }}
          >
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </div>
    </StyledTimeLineHeader>
  );
}

export default TimeLineHeader;
