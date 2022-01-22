import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import NewAccount from './Pages/NewAccount';

function App() {
  return (
    <Routes>
      <Route path='/' exact element={<Login />} />
      <Route path='/newaccount' element={<NewAccount />} />
    </Routes>
  );
}

export default App;
