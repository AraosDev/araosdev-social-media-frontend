import { Toast } from 'react-bootstrap';

import styled from 'styled-components';

const StyledToast = styled(Toast)`
  top: 0px;
  right: 0px;

  .toast-header {
    background: #1c1950 !important;
    color: white !important;
  }
`;

function AppToast(props: AppToastProps) {
  const { show, setShow, toastHeader, toastBody } = props;
  return (
    <StyledToast
      className="position-fixed"
      // className={`position-fixed ${toastPosition}`}
      onClose={() => setShow(false)}
      show={show}
      delay={3000}
      autohide
    >
      <Toast.Header closeVariant="white">
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">{toastHeader}</strong>
      </Toast.Header>
      <Toast.Body>{toastBody}</Toast.Body>
    </StyledToast>
  );
}

export default AppToast;
