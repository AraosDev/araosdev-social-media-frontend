interface SettingsSidebarProps {
  currentSetting:
    | 'general-settings'
    | 'change-password'
    | 'friends'
    | 'preferences';
  setCurrentSetting: (setting: SettingsSidebarProps['currentSetting']) => void;
}

interface UpdateUserInfoApiRes {
  status: string;
  user: UserInfo;
}

interface UpdateUserPwdApiRes {
  status: string;
  message: string;
  token: string;
}

interface UpdateUserPwdApiReq {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

type GeneralSettingUpdateState = 'LOADING' | 'LOADED' | 'ERROR';

interface RenderFriendListProps {
  viewType: 'FRIENDS' | 'FRIENDREQUESTS' | 'FRIENDREQUESTSENT';
}
