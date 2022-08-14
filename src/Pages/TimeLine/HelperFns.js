import { currentUser, currentUserInfo, frndUserRelations } from "../../Common/helperFns";

export const didCurrentUserLiked = (likedByArr = []) => {
  if (likedByArr.some(({ user }) => user === currentUser())) return true;
  else return false;
};

export const frndUserRelation = (frnd) => {
  const { friendRequests = {}, friends } = currentUserInfo();
  const { requestedTo, requestedBy } = friendRequests;

  if (requestedBy.includes(frnd)) return {label: '', reqType: '', loaderLabel: ''}
  else if (requestedTo.includes(frnd)) return frndUserRelations['REVOKE_REQ']
  else if (friends.includes(frnd)) return frndUserRelations['REMOVE_FRIEND']
  else return frndUserRelations['ADD_FRIEND'];
}
