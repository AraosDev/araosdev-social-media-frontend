import { getFrndSearchApi, postFrndReqApi } from "../../api/getApi";
import { currentUser, currentUserInfo } from "../../Common/helperFns";


export const getFrndSuggestionAction = (searchKey, callback) => () => {
    if (callback) callback('LOADING');
    getFrndSearchApi(`${currentUser()}/${searchKey}`)
    .then((res) => {
        const { status, filteredUsers } = res.data;
        if (status === 'OK') {
            const transformedUsers = filteredUsers.map((user, index) => ({value: user, valueId: index}));
            if (callback) callback(transformedUsers);
        }
        else if (status === 'NO_USERS_FOUND_FOR_THIS_KEYWORD') {
            if (callback) callback("EMPTY");
        }
        else {
            if (callback) callback("ERROR");
        }
    })
    .catch((err) => {
        console.log({ ...err });
        if (callback) callback("EMPTY");
    });
};

export const friendRequestAction = (reqBody, callback) => () => {
    if (callback) callback("LOADING");
    let property = reqBody.user ? reqBody.user : currentUser();
    let { friend, requestType } = reqBody;
    postFrndReqApi(property,{ friend, requestType })
    .then((res) => {
        const { status } = res.data;
        if (status === `${requestType}_SUCESS`) {
            let existingUserInfo = currentUserInfo();
            let newUserInfo;
            switch (requestType) {
                case 'SEND_REQ': {
                    newUserInfo = {
                        ...existingUserInfo,
                        friendRequests: {
                            ...existingUserInfo.friendRequests,
                            requestedTo: [...existingUserInfo.friendRequests.requestedTo, friend]
                        },
                    };
                    break;
                };
                case 'REVOKE_REQ': {
                    newUserInfo = {
                        ...existingUserInfo,
                        friendRequests: {
                            ...existingUserInfo.friendRequests,
                            requestedTo: existingUserInfo.friendRequests.requestedTo.filter(frnd=>frnd !== friend)
                        },
                    };
                    break;
                }
                case 'ACCEPT_REQ': case 'REJECT_REQ': {
                    newUserInfo = {
                        ...existingUserInfo,
                        friendRequests: {
                            ...existingUserInfo.friendRequests,
                            requestedBy: existingUserInfo.friendRequests.requestedBy.filter(frnd=>frnd !== reqBody.user)
                        },
                    };
                    break;
                }
                case 'REMOVE_FRIEND': {
                    newUserInfo = {
                        ...existingUserInfo,
                        friends: existingUserInfo.friends.filter(frnd=>frnd !== friend)
                    };
                    break;
                }
                default: break;
            };
            localStorage.setItem('userInfo', JSON.stringify({...newUserInfo}));
            if (callback) callback('')
        }
    })
    .catch((err) => console.log({...err}));
}