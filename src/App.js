import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { useSelector } from "react-redux";
import Members from "./Components/homecomponents/Members";
import Loader from "./Components/Loader";
import Profile from "./Pages/Profile";

function App() {
  const loader = useSelector((state) => state.loader.isLoader);

  return (
    <>
      <BrowserRouter>
        {loader && <Loader />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/members/:id" element={<Members />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
