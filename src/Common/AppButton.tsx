import { Button } from 'react-bootstrap';

import styled from 'styled-components';

const StyledAppButton = styled(Button)`
  background: #1c1950 !important;
  color: white !important;
  cursor: pointer !important;
  border: none !important;
  box-shadow: none !important;
`;

const StyledAppButtonOutline = styled(Button)`
  background: #fff !important;
  color: #1c1950 !important;
  cursor: pointer !important;
  border: 1px solid #1c1950 !important;
  box-shadow: none !important;

  :hover {
    background: #1c1950 !important;
    color: white !important;
    cursor: pointer !important;
    border: none !important;
    box-shadow: none !important;
  }
`;

function AppButton(props: AppButtonProps) {
  const { children, className, onClick } = props;
  return (
    <div className={`my-3 ${className} caveatBold`}>
      <StyledAppButton onClick={onClick}>{children}</StyledAppButton>
    </div>
  );
}

export function AppButtonOutline(props: AppButtonProps) {
  const { children, className, onClick } = props;
  return (
    <div className={`my-3 ${className} caveatBold`}>
      <StyledAppButtonOutline onClick={onClick}>
        {children}
      </StyledAppButtonOutline>
    </div>
  );
}

export default AppButton;
