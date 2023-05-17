import { Route, Routes } from 'react-router-dom';

import Login from './Pages/Login';
import NewAccount from './Pages/NewAccount';
import Timeline from './Pages/TimeLine';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/newaccount" element={<NewAccount />} />
      <Route path="/timeline" element={<Timeline />} />
    </Routes>
  );
}

export default App;
