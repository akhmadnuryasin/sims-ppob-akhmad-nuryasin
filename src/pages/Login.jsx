import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 grid-rows-1 left-side">
      <div className="min-h-screen flex flex-col items-center justify-center gap-5">
        <div className="flex justify-center items-center gap-2 ">
          <img src={assets.logo} alt="logo" />
          <span className="font-semibold text-2xl">SIMS PPOB</span>
        </div>
        <h1 className="text-2xl md:max-w-[50%] max-w-[70%] text-center font-semibold mb-3">
          Masuk atau buat akun untuk memulai
        </h1>
        <form className="flex flex-col justify-center items-center w-[60%] gap-5 my-5">
          <div className="flex justify-center items-center bg-white py-3 px-4 gap-4 text-sm min-w-[100%] border border-gray-500 rounded-md focus-within:border-red-500 focus-within:text-red-500 font-medium">
            <input
              type="email"
              placeholder="Masukan email anda"
              className="grow focus:outline-none focus:text-red-500"
            />
          </div>
          <div className="flex justify-center items-center bg-white py-3 px-4 gap-4 text-sm min-w-[100%] border border-gray-500 rounded-md focus-within:border-red-500 focus-within:text-red-500 font-medium">
            <input
              type="password"
              placeholder="Masukan password anda"
              className="grow focus:outline-none focus:text-red-500"
            />
          </div>
        </form>
        <button className="bg-red-500 text-white w-[60%] p-3 rounded-md mt-3 text-sm border-2 border-red-500 hover:bg-transparent hover:text-red-500 duration-300">
          Masuk
        </button>
        <span className="text-xs text-gray-500">
          Belum punya akun? registrasi{" "}
          <strong className="text-red-500">
            <Link to="/register">di sini</Link>
          </strong>
        </span>
      </div>
      <div className="right-side">
        {" "}
        <img
          src={assets.illustration_login}
          className="h-screen w-full object-cover"
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
