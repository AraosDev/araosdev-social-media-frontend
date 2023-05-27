import { Container } from 'react-bootstrap';

import styled from 'styled-components';

const StyledAccountSetting = styled(Container)`
  img {
    border-radius: 50% !important;
    max-width: 300px;
    max-height: 300px;
  }
`;

export const StyledManageFriends = styled(Container)`
  width: 100%;
  .nav-tabs {
    background: rgb(204, 204, 255) !important;
  }
  .nav-item {
    flex: 1 !important;
  }
  .nav-link {
    width: 100% !important;
    color: #000 !important;
  }
  .nav-link:hover {
    color: #000 !important;
  }
  .nav-tabs .nav-item.show .nav-link,
  .nav-tabs .nav-link.active {
    background: #1c1950 !important;
    color: white !important;
    cursor: pointer !important;
  }
  .tab-pane > div {
    max-height: 532px !important;
  }
  .list-group {
    min-width: 650px;
  }

  .bg-primary {
    background-color: rgb(204, 204, 255) !important;
    border: 1px solid rgb(93, 63, 211) !important;
  }
`;

export const StyledUpdatePwd = styled(Container)`
  width: 100%;
`;

export const StyledSettingsSidebar = styled.div`
  height: 83vh;
  .list-group {
    border-radius: 0px !important;
    background: rgb(204, 204, 255);
    height: 100%;
  }
  .list-group-item {
    background: rgb(204, 204, 255);
  }
  .active-list-item,
  .list-group-item:hover {
    background: #1c1950 !important;
    color: white !important;
    cursor: pointer !important;
  }
`;

export default StyledAccountSetting;
