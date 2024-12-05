import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ProfileAction } from "../utils/reducer/profile";
import { ServiceAction } from "../utils/reducer/service";
import { BannerAction } from "../utils/reducer/banner";

import Container from "./Container";

import Logo from "../assets/Logo.png";
import { MdMenu } from "react-icons/md";

export default function Navbar() {
  const [isShown, setShown] = useState(false);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(ProfileAction.getProfile());
    dispatch(ProfileAction.updateBalance());
    dispatch(ServiceAction.getService());
    dispatch(BannerAction.getBanner());
  }, [dispatch]);

  return (
    <nav className="border-b">
      <Container>
        <div className="flex items-center justify-between py-5">
          <Link to="/">
            <div className="flex items-center gap-2">
              <img src={Logo} alt="logo" />
              <span className="font-semibold">SIMS PPOB</span>
            </div>
          </Link>
          <ul className="items-center justify-center hidden gap-16 font-medium md:flex">
            <li className={`${pathname.includes("/topup") && "text-red-500"}`}>
              <Link to="/topup">Top Up</Link>
            </li>
            <li
              className={`${
                pathname.includes("/transaction") && "text-red-500"
              }`}
            >
              <Link to="/transaction">Transaksi</Link>
            </li>
            <li
              className={`${pathname.includes("/profile") && "text-red-500"}`}
            >
              <Link to="/profile">Akun</Link>
            </li>
          </ul>
          <div
            className="cursor-pointer md:hidden"
            onClick={() => setShown(!isShown)}
          >
            <MdMenu size={24} />
          </div>
        </div>
        <div className={`${isShown ? "flex" : "hidden"} md:hidden`}>
          <ul className="flex items-start justify-center gap-3 flex-col min-w-[100%] mb-3 text-sm">
            <li className={`${pathname.includes("/topup") && "text-red-500"}`}>
              <Link to="/topup">Top Up</Link>
            </li>
            <li
              className={`${
                pathname.includes("/transaction") && "text-red-500"
              }`}
            >
              <Link to="/transaction">Transaksi</Link>
            </li>
            <li
              className={`${pathname.includes("/profile") && "text-red-500"}`}
            >
              <Link to="/profile">Akun</Link>
            </li>
          </ul>
        </div>
      </Container>
    </nav>
  );
}
