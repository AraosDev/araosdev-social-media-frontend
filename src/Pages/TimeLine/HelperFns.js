import {
  currentUser,
  currentUserInfo,
  frndUserRelations,
} from '../../Common/helperFns';

export const didCurrentUserLiked = (likedByArr = []) => {
  if (likedByArr.some(({ user }) => user === currentUser())) return true;
  return false;
};

export const frndUserRelation = (frnd) => {
  const { friendRequests = {}, friends } = currentUserInfo();
  const { requestedTo, requestedBy } = friendRequests;

  if (requestedBy.includes(frnd))
    return { label: '', reqType: '', loaderLabel: '' };
  if (requestedTo.includes(frnd)) return frndUserRelations.REVOKE_REQ;
  if (friends.includes(frnd)) return frndUserRelations.REMOVE_FRIEND;
  return frndUserRelations.ADD_FRIEND;
};
