import { getFrndSearchApi, postFrndReqApi } from "../../api/getApi";
import { currentUser } from "../../Common/helperFns";


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
    .then((res) => console.log(res.data))
    .catch((err) => console.log({...err}));
}