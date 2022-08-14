import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import NewAccount from "./Pages/NewAccount";
import Timeline from "./Pages/TimeLine";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/newaccount" element={<NewAccount />} />
      <Route path="/timeline" element={<Timeline />} />
    </Routes>
  );
}

export default App;
