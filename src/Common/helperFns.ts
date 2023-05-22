/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prefer-rest-params */
/* eslint-disable func-names */
import { useCallback } from 'react';

export const unixTimeToReadableFormat = (unixTime: number) => {
  const date = new Date(unixTime * 1000);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const formattedDate = `${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

  return formattedDate;
};

export const currentUser = () => {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? JSON.parse(userInfo).user.userName : '';
};

export const currentUserInfo = (): UserInfo => {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo
    ? (JSON.parse(userInfo).user as UserInfo)
    : {
        email: '',
        userName: '',
        phoneNumber: '',
        accountType: 'public',
        followers: [],
        following: [],
        id: '',
        friends: [],
        friendRequests: { requestedBy: [], requestedTo: [] },
      };
};

export const getCurrentToken = () => {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? JSON.parse(userInfo).token : '';
};

export const debounce = (func: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    const self: any = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(self, args);
    }, delay);
  };
};

export function useDebounce(callback: Function, delay: number) {
  const debouncedFn = useCallback(
    debounce((...args: any) => callback(...args), delay),
    [delay]
  );

  return debouncedFn;
}

export const frndUserRelations: Record<string, BadgeLabels> = {
  ADD_FRIEND: {
    label: 'Add Friend',
    reqType: 'SEND_REQ',
    loaderLabel: 'Sending Request',
  },
  ACCEPT_REQ: {
    label: 'Accept Request',
    reqType: 'ACCEPT_REQ',
    loaderLabel: 'Accepting Request',
  },
  REJECT_REQ: {
    label: 'Reject Request',
    reqType: 'REJECT_REQ',
    loaderLabel: 'Rejecting Request',
  },
  REVOKE_REQ: {
    label: 'Revoke Request',
    reqType: 'REVOKE_REQ',
    loaderLabel: 'Revoking Request',
  },
  REMOVE_FRIEND: {
    label: 'Remove Friend',
    reqType: 'REMOVE_FRIEND',
    loaderLabel: 'Removing Friend',
  },
};

export const randomString = (len: number) => {
  const chars =
    '0123456789abcdefghighijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = len; i > 0; i -= 1) {
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  }
  return result;
};
