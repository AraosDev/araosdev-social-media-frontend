interface FrndListSearchRes {
  status: string;
  filteredUsers: string[];
}

type TransFormedFrndSearchList =
  | Array<{ value: string; valueId: number }>
  | 'EMPTY'
  | 'ERROR';

interface frndRequestReq {
  user?: string;
  requestType:
    | 'SEND_REQ'
    | 'ACCEPT_REQ'
    | 'REJECT_REQ'
    | 'REVOKE_REQ'
    | 'REMOVE_FRIEND';
  friend: string;
}
