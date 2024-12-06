import { useDispatch } from "react-redux";
import { useState } from "react";
import { AuthAction } from "../redux/reducer/auth";
import { Link } from "react-router-dom";

import Input from "../components/Input";
import Toast from "../components/Toast";

import Logo from "../assets/Logo.png";
import { MdAlternateEmail, MdLockOutline, MdPerson } from "react-icons/md";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { isEmailValid } from "../utils/helpers";
import { assets } from "../assets/assets";

export default function Register() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    pass_confirm: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function handleRegister(e) {
    e.preventDefault();
    if (!isEmailValid(form.email))
      return Toast.fire({
        icon: "error",
        title: "Email tidak valid",
      });

    if (form.first_name.length < 1 || form.last_name.length < 1)
      return Toast.fire({
        icon: "error",
        title: "Nama tidak boleh kosong",
      });

    if (form.password.length < 8)
      return Toast.fire({
        icon: "error",
        title: "Password minimal 8 karakter",
      });

    if (form.password !== form.pass_confirm)
      return Toast.fire({
        icon: "error",
        title: "Password tidak sama",
      });

    dispatch(
      AuthAction.Register(
        form.email,
        form.first_name,
        form.last_name,
        form.password
      )
    );
  }

  function buttonShowPass() {
    return (
      <button onClick={() => setShowPass(!showPass)} type="button">
        {showPass ? <RiEyeLine /> : <RiEyeOffLine />}
      </button>
    );
  }

  function buttonShowConfirm() {
    return (
      <button onClick={() => setShowConfirm(!showConfirm)} type="button">
        {showConfirm ? <RiEyeLine /> : <RiEyeOffLine />}
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
        <h1 className="text-3xl md:max-w-[50%] max-w-[70%] text-center font-semibold mb-2">
          Lengkapi data untuk membuat akun
        </h1>
        <form className="flex flex-col justify-center items-center w-[60%] gap-3 my-5">
          <Input
            type="email"
            placeholder="Masukkan email anda"
            icon={<MdAlternateEmail />}
            value={form.email}
            handler={(val) => setForm({ ...form, email: val })}
          />
          <Input
            type="text"
            placeholder="Masukkan nama depan"
            icon={<MdPerson />}
            value={form.first_name}
            handler={(val) => setForm({ ...form, first_name: val })}
          />
          <Input
            type="text"
            placeholder="Masukkan nama belakang"
            icon={<MdPerson />}
            value={form.last_name}
            handler={(val) => setForm({ ...form, last_name: val })}
          />
          <Input
            type={showPass ? "text" : "password"}
            placeholder="Buat password"
            icon={<MdLockOutline />}
            value={form.password}
            action={buttonShowPass()}
            handler={(val) => setForm({ ...form, password: val })}
          />
          <Input
            type={showConfirm ? "text" : "password"}
            placeholder="Konfirmasi password"
            icon={<MdLockOutline />}
            value={form.pass_confirm}
            action={buttonShowConfirm()}
            handler={(val) => setForm({ ...form, pass_confirm: val })}
          />
          <button
            type="submit"
            className="bg-red-500 text-white w-[100%] p-3 rounded-md mt-8 text-sm border-2 border-red-500 hover:bg-transparent hover:text-red-500 duration-300"
            onClick={(e) => handleRegister(e)}
          >
            Registrasi
          </button>
        </form>

        <span className="text-xs text-gray-500">
          Sudah punya akun? login{" "}
          <strong className="text-red-500">
            <Link to="/login">di sini</Link>
          </strong>
        </span>
      </div>
      <div className="banner-login">
        <img
          src={assets.illustration_login}
          alt="banner"
          className="w-full h-screen"
        />
      </div>
    </main>
  );
}
