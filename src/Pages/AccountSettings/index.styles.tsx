import { Container } from 'react-bootstrap';

import styled from 'styled-components';

const StyledAccountSetting = styled(Container)`
  img {
    border-radius: 50% !important;
    max-width: 300px;
    max-height: 300px;
  }
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
