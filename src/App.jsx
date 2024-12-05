import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Transaction from "./pages/Transaction";
import Topup from "./pages/Topup";
import Service from "./pages/Service";

import Navbar from "./components/Navbar";
import Container from "./components/Container";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { AuthAction } from "./utils/reducer/auth";

export default function AppRouter() {
  const { auth } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.user) {
      dispatch(AuthAction.CheckLogin());
    }
  }, [auth, dispatch]);

  return (
    <>
      {auth.isLogin ? (
        <>
          <Navbar />
          <Container>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/transaction" element={<Transaction />} />
              <Route path="/topup" element={<Topup />} />
              <Route path="/service/:id" element={<Service />} />
              <Route
                path="/login"
                element={<Navigate to="/" replace={true} />}
              />
              <Route
                path="/register"
                element={<Navigate to="/" replace={true} />}
              />
            </Routes>
          </Container>
        </>
      ) : (
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace={true} />} />
        </Routes>
      )}
    </>
  );
}
