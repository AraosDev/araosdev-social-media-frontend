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

type GeneralSettingUpdateState = 'LOADING' | 'LOADED' | 'ERROR';

interface RenderFriendListProps {
  viewType: 'FRIENDS' | 'FRIENDREQUESTS' | 'FRIENDREQUESTSENT';
}
