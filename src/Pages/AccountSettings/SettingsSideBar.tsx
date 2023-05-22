import { ListGroup } from 'react-bootstrap';

import { StyledSettingsSidebar } from './index.styles';

const SettingItems = [
  { name: 'General Settings', key: 'general-settings' },
  { name: 'Change Password', key: 'change-password' },
  { name: 'Friends', key: 'friends' },
  { name: 'Preferences', key: 'preferences' },
];

function SettingsSideBar(props: SettingsSidebarProps) {
  const { currentSetting, setCurrentSetting } = props;
  return (
    <StyledSettingsSidebar>
      <ListGroup>
        {SettingItems.map(({ name, key }) => (
          <ListGroup.Item
            className={`${
              currentSetting === key ? 'active-list-item' : ''
            } caveatBold`}
            onClick={() =>
              setCurrentSetting(key as SettingsSidebarProps['currentSetting'])
            }
            key={key}
          >
            {name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </StyledSettingsSidebar>
  );
}

export default SettingsSideBar;
