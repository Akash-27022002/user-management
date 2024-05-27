import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import OtpScreen from "./Pages/Auth/OtpScreen";
import Register from "./Pages/Auth/Register";
import UserDetail from "./Pages/UserDetail";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/userDetail/:userId" element={<UserDetail />} />
      <Route path="/otp" element={<OtpScreen />} />
    </Routes>
  );
}

export default App;
