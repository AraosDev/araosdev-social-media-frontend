/* eslint-disable import/order */
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import FormHeader from '../../Common/FormHeader';

import '../Login/index.css';

import { CreateAccountConstants } from 'Common/AppLabels/LoginPageLabels';

function ErrorView(props: ErrorViewProps): React.ReactElement {
  const {
    ACCOUNT_LIMIT_EXCEEDED,
    ALREADY_EXISTING_ACCOUNT,
    UNKNOWN_ERROR,
    BACK_TO_CREATE_ACC,
    BACK_TO_SIGN_IN,
  } = CreateAccountConstants;
  const { errorType, setView } = props;
  return (
    <div className="wrapper">
      <div className="cardWrapper">
        <FormHeader />
        {errorType === 'ACCOUNT_LIMIT_EXCEEDED' ? (
          <p className="caveatBold">{ACCOUNT_LIMIT_EXCEEDED}</p>
        ) : errorType === 'ALREADY_EXISTING_ACCOUNT' ? (
          <p className="caveatBold">{ALREADY_EXISTING_ACCOUNT}</p>
        ) : (
          <p className="caveatBold">{UNKNOWN_ERROR}</p>
        )}
        <div>
          <Button
            onClick={() => setView('CREATE_ACCOUNT')}
            className="caveatBold loginBtn"
            style={{ color: 'black' }}
          >
            {BACK_TO_CREATE_ACC}
          </Button>
          <Link to="/">
            <Button className="caveatBold loginBtn" style={{ color: 'black' }}>
              {BACK_TO_SIGN_IN}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorView;
