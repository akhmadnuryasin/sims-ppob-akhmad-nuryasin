import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Transaction from "../pages/Transaction";
import Topup from "../pages/Topup";
import Services from "../pages/Service";
import NotFound from "../pages/404";

export const privateRoutes = [
  { path: "/", element: <Home /> },
  { path: "/profile", element: <Profile /> },
  { path: "/transaction", element: <Transaction /> },
  { path: "/topup", element: <Topup /> },
  { path: "/service/:id", element: <Services /> },
];

export const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <NotFound /> },
];
