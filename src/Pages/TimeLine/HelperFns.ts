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

export const frndUserRelation = (
  frnd: string
): BadgeLabels | { label: ''; reqType: ''; loaderLabel: '' } => {
  const { friendRequests, friends } = currentUserInfo() as UserInfo;
  const { requestedTo, requestedBy } = friendRequests;

  if (requestedBy.some(({ userName }) => userName === frnd))
    return { label: '', reqType: '', loaderLabel: '' };
  if (requestedTo.some(({ userName }) => userName === frnd))
    return frndUserRelations.REVOKE_REQ;
  if (friends.some(({ userName }) => userName === frnd))
    return frndUserRelations.REMOVE_FRIEND;
  return frndUserRelations.ADD_FRIEND;
};
