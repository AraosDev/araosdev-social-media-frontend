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

type BadgeLabels =
  | {
      label: 'Add Friend';
      reqType: 'SEND_REQ';
      loaderLabel: 'Sending Request';
    }
  | {
      label: 'Accept Request';
      reqType: 'ACCEPT_REQ';
      loaderLabel: 'Accepting Request';
    }
  | {
      label: 'Reject Request';
      reqType: 'REJECT_REQ';
      loaderLabel: 'Rejecting Request';
    }
  | {
      label: 'Revoke Request';
      reqType: 'REVOKE_REQ';
      loaderLabel: 'Revoking Request';
    }
  | {
      label: 'Remove Friend';
      reqType: 'REMOVE_FRIEND';
      loaderLabel: 'Removing Friend';
    };
