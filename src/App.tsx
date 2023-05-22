/* eslint-disable import/order */
import { Route, Routes } from 'react-router-dom';

import Login from './Pages/Login';
import NewAccount from './Pages/NewAccount';
import Timeline from './Pages/TimeLine';

import './App.css';

import AccountSettings from 'Pages/AccountSettings';
import ForgotPassword from 'Pages/ForgotPassword';
import ResetPassword from 'Pages/ResetPassword';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/newaccount" element={<NewAccount />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/timeline" element={<Timeline />} />
      <Route path="/account-settings" element={<AccountSettings />} />
    </Routes>
  );
}

export default App;
