/* eslint-disable import/prefer-default-export */
import {
  currentUser,
  currentUserInfo,
  frndUserRelations,
} from '../../Common/helperFns';

export const didCurrentUserLiked = (
  likedByArr: { user: string; likedOn: string | number }[]
) => {
  if (likedByArr.some(({ user }) => user === currentUser())) return true;
  return false;
};

/* export const frndUserRelation = (
  frnd: string
): BadgeLabels | { label: ''; reqType: ''; loaderLabel: '' } => {
  const { friendRequests, friends } = currentUserInfo() as UserInfo;
  const { requestedTo, requestedBy } = friendRequests;

  if (requestedBy.includes(frnd))
    return { label: '', reqType: '', loaderLabel: '' };
  if (requestedTo.includes(frnd)) return frndUserRelations.REVOKE_REQ;
  if (friends.includes(frnd)) return frndUserRelations.REMOVE_FRIEND;
  return frndUserRelations.ADD_FRIEND;
}; */
