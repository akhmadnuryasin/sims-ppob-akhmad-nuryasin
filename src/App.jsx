import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Topup from "./pages/Topup";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Profile from "./pages/Profile";
import Transaction from "./pages/Transaction";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topup" element={<Topup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
