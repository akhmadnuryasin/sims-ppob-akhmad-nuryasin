import { useDispatch } from "react-redux";
import { useState } from "react";
import { AuthAction } from "../utils/reducer/auth";
import { Link } from "react-router-dom";

import Toast from "../components/Toats";
import Input from "../components/Input";

import Logo from "../assets/Logo.png";
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";

import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import isEmailValid from "../utils/validateEmail";

export default function Login() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);

  const handleLogin = () => {
    if (!isEmailValid(form.email))
      return Toast.fire({
        icon: "error",
        title: "Email tidak valid",
      });

    if (form.password.length < 8)
      return Toast.fire({
        icon: "error",
        title: "Password minimal 8 karakter",
      });

    dispatch(AuthAction.Login(form.email, form.password));
  };

  function buttonShowPass() {
    return (
      <button onClick={() => setShowPass(!showPass)} type="button">
        {showPass ? <RiEyeLine /> : <RiEyeOffLine />}
      </button>
    );
  }

  return (
    <main className="grid grid-cols-1 grid-rows-1 md:grid-cols-2">
      <div className="flex flex-col items-center justify-center min-h-screen gap-5">
        <div className="flex items-center justify-center gap-2 ">
          <img src={Logo} alt="logo" />
          <span className="text-2xl font-semibold">SIMS PPOB</span>
        </div>
        <h1 className="text-3xl md:max-w-[50%] max-w-[70%] text-center font-semibold mb-3">
          Masuk atau buat akun untuk memulai
        </h1>
        <form className="flex flex-col justify-center items-center w-[60%] gap-5 my-5">
          <Input
            type="email"
            placeholder="Masukkan email anda"
            icon={<MdAlternateEmail />}
            value={form.email}
            handler={(val) => setForm({ ...form, email: val })}
          />
          <Input
            type={showPass ? "text" : "password"}
            placeholder="Masukkan password anda"
            icon={<MdLockOutline />}
            value={form.password}
            action={buttonShowPass()}
            handler={(val) => setForm({ ...form, password: val })}
          />
        </form>
        <button
          className="bg-red-500 text-white w-[60%] p-3 rounded-md mt-3 text-sm border-2 border-red-500 hover:bg-transparent hover:text-red-500 duration-300"
          onClick={handleLogin}
        >
          Masuk
        </button>
        <span className="text-xs text-gray-500">
          Belum punya akun? registrasi{" "}
          <strong className="text-red-500">
            <Link to="/register">di sini</Link>
          </strong>
        </span>
      </div>
      <div className="banner-login"></div>
    </main>
  );
}
