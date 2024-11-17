import React from "react";
import Home from "./pages/Home";
import Alltasks from "./pages/Alltasks";
import Comptasks from "./pages/Comptasks";
import Imptasks from "./pages/Imptasks";
import Incomptasks from "./pages/Incomptasks";
import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/auth";
const App = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login())
    }
    else if (!isLoggedIn) {
      navigate("/signup");
    }
  });
  return (
    <div className="bg-gray-900 text-white h-screen p-2 relative">
      <Routes>
        <Route exact path="/" element={<Home />}>
          <Route index element={<Alltasks />} />
          <Route path="/imptasks" element={<Imptasks />} />
          <Route path="/comptasks" element={<Comptasks />} />
          <Route path="/incomptasks" element={<Incomptasks />} />
        </Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
};

export default App;
