import React from "react";
import { useState } from "react";
import { Badge, Form } from "react-bootstrap";
import { BsPlusSquare } from "react-icons/bs";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import AutoSuggestion from "../../Common/AutoSuggestion/AutoSuggestion";
import { Loader } from "../../Common/DataTransitionHandlers";
import FormHeader from "../../Common/FormHeader";
import { currentUser, frndUserRelations } from "../../Common/helperFns";
import ProfileIcon from "../../Common/ProfileIcon";
import { friendRequestAction, getFrndSuggestionAction } from "../../Store/actions/frndRequestsActions";

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
  const dispatch = useDispatch()
  const { userName = "", friends, friendRequests = {} } = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : {};
  const { requestedTo, requestedBy } = friendRequests;

  const [selectedFrnd, setSelectedFrnd] = useState('');
  const [frndSuggestions, setFrndSuggestions] = useState([]);
  const [frndReqState, setFrndReqState] = useState([]);

  const getFrndSuggestions = (value) => {
    dispatch(getFrndSuggestionAction(value, setFrndSuggestions));
  }

  const frndUserRelation = (frnd) => {
    if (requestedBy.includes(frnd)) return {label: '', reqType: '', loaderLabel: ''}
    else if (requestedTo.includes(frnd)) return frndUserRelations['REVOKE_REQ']
    else if (friends.includes(frnd)) return frndUserRelations['REMOVE_FRIEND']
    else return frndUserRelations['ADD_FRIEND'];
  }

  const frndUserRelationChange = (frnd, label, event) => {
    if (event) event.stopPropagation();
    const { reqType } = frndUserRelation(frnd);
    let reqBody;
    if (reqType) {
      reqBody = {
        requestType: reqType,
        friend: frnd
      };
    }
    else {
      reqBody = {
        requestType: label.includes('Accept') ? 'ACCEPT_REQ' : 'REJECT_REQ',
        friend: currentUser(),
        user: frnd,
      };
    } 
      dispatch(friendRequestAction(reqBody, (state) => {
        let existingStates = [...frndReqState];
        const currentFrndReqState = existingStates.find(({ frnd: friend }) => friend === frnd);
        const currentFrndReqStateIndex = existingStates.findIndex(({ frnd: friend }) => friend === frnd);
        if (currentFrndReqState) {
          let newState = {
            ...currentFrndReqState,
            state: `${reqType}_${state}`,
          };
          existingStates.splice(currentFrndReqStateIndex, 1, newState);
        }
        else existingStates.push({frnd, state: `${reqType}_${state}`});
        setFrndReqState(existingStates);
      }))
  };

  const getFrndRelationBadgeLabel = (frnd) => {
    const { label, loaderLabel } = frndUserRelation(frnd);
    const { state = '' } = frndReqState.find(({ frnd: friend }) => friend === frnd) || {};
    if (state.includes('LOADING') && loaderLabel) return (
      <Badge className="cursor-not-allowed" text="dark">
        <Loader inlineText={true} message={loaderLabel} />
      </Badge>
    );
    else if (state.includes('LOADING') && !loaderLabel) {
      const splLoaderLabel = state.includes('ACCEPT_REQ') ? 'Accepting Request' : 'Rejecting Request';
      return (
        <Badge className="cursor-not-allowed" text="dark">
          <Loader inlineText={true} message={splLoaderLabel} />
        </Badge>
      );
    }
    else if (!label) return (
      <div>
        {
          ['Reject Request', 'Accept Request'].map(label => (
            <Badge onClick={(e) => frndUserRelationChange(frnd, label, e)} className="cursor-pointer mx-2" text="dark">
              {label}
            </Badge>
          ))
        }
      </div>
    );
    else return (
      <Badge onClick={(e) => frndUserRelationChange(frnd, '', e)} className="cursor-pointer" text="dark">
        {label}
      </Badge>
    );

  };

  return (
    <StyledTimeLineHeader>
      <div className="mx-3 my-2" style={{ flex: "3" }}>
        <FormHeader hr={false} inline={true} />
      </div>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ flex: "9" }}
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
              marginTop: '38px'
            },
            label: '',
            caption: ''
          }}
          totalList={frndSuggestions}
          onSuggestionClick={setSelectedFrnd}
          minLengthToShowSuggestion={1}
          onSearchKeyChange={getFrndSuggestions}
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
              {/* <Badge className="cursor-pointer" text="dark">{frndUserRelation(value)['label']}</Badge> */}
              </li>
            )
          }}
        />
      </div>
      <div
        className="d-flex justify-content-end align-items-center"
        style={{ flex: "3" }}
      >
        <BsPlusSquare
          className="me-3 cursor-pointer"
          color="#1c1950"
          size={25}
          title="Add Post"
        />
        <ProfileIcon
          iconText={userName.charAt(0).toUpperCase()}
          className="me-5"
        />
      </div>
    </StyledTimeLineHeader>
  );
}

export default TimeLineHeader;
