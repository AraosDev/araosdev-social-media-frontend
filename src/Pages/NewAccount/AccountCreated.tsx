import { CreateAccountConstants } from 'Common/AppLabels/LoginPageLabels';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import FormHeader from '../../Common/FormHeader';

import '../Login/index.css';

function AccountCreated(): React.ReactElement {
  const { CREATE_ACCOUNT_SUCCESS, BACK_TO_SIGN_IN } = CreateAccountConstants;
  return (
    <div className="wrapper">
      <div className="cardWrapper">
        <FormHeader />
        <p className="caveatBold">{CREATE_ACCOUNT_SUCCESS}</p>
        <div>
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

export default AccountCreated;
