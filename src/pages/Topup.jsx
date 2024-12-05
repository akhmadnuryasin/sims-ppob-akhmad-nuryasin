/** @format */

import { useState } from "react";
import { useDispatch } from "react-redux";
import { ProfileAction } from "../utils/reducer/profile";
import Swal from "sweetalert2";
import { assets } from "../assets/assets";

import Toast from "../components/Toats";
import Input from "../components/Input";
import MiniProfile from "../components/MiniProfile";
import UserBalance from "../components/UserBalance";

import { formatNumber } from "../utils/moneyFormatter";
import { FaMoneyCheck } from "react-icons/fa6";

export default function Topup() {
  const dispatch = useDispatch();
  const [nominal, setNominal] = useState(null);
  const [numericValue, setNumericValue] = useState(0);

  const listNominal = [10000, 20000, 50000, 100000, 250000, 500000];

  function handleChange(val) {
    const cleanedValue = val.replace(/\./g, "").replace(/\D/g, "");

    if (cleanedValue) {
      const numberValue = parseInt(cleanedValue, 10);
      setNominal(formatNumber(cleanedValue));
      setNumericValue(numberValue);
    } else {
      setNominal("");
      setNumericValue(0);
    }
  }

  function handleSubmit() {
    if (numericValue < 10000)
      return Toast.fire({
        icon: "error",
        title: "Nominal minimal Rp. 10.000",
      });

    if (numericValue > 1000000)
      return Toast.fire({
        icon: "error",
        title: "Nominal Maksimal Rp. 1.000.000",
      });

    const customSwal = Swal.mixin({
      customClass: {
        confirmButton: "popup-ok",
        cancelButton: "popup-cancel",
        actions: "popup-actions",
      },
      buttonsStyling: false,
    });

    customSwal
      .fire({
        html: `
          <div>
          <h1 class="text-base mb-2">Anda yakin untuk Top Up sebesar</h1>
          <h1 class="text-2xl font-bold">Rp${formatNumber(nominal)} ?</h1>
          </div>`,
        iconHtml: `<img src=${assets.logo} width="100" height="auto"/>`,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        iconColor: "transparent",
        cancelButtonColor: "white",
        cancelButtonText: "Batalkan",
        confirmButtonText: "Ya, Lanjutkan Top Up",
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(ProfileAction.topUp(numericValue));
        }
      });
  }

  return (
    <main className="py-8">
      <section className="grid grid-cols-1 grid-rows-2 gap-3 sm:grid-cols-2 sm:grid-rows-1">
        <MiniProfile />
        <UserBalance />
      </section>
      <section className="my-8">
        <span className="text-xl">Silahkan Masukkan</span>
        <h1 className="text-3xl font-semibold">Nominal Top Up</h1>
      </section>
      <section className="grid sm:grid-cols-[1.5fr_1fr] sm:grid-rows-1 grid-cols-1 grid-rows-2 grid- gap-5">
        <div className="flex flex-col gap-5">
          <Input
            type="text"
            placeholder="Masukkan nominal (Rp 10.000 - Rp. 1.000.000)"
            icon={<FaMoneyCheck />}
            value={nominal}
            handler={(val) => handleChange(val)}
          />
          <button
            onClick={() => handleSubmit()}
            className="py-2 text-white bg-red-500 border-2 border-red-500 rounded-md"
          >
            Top Up
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-5">
          {listNominal.map((nom) => (
            <button
              className="px-5 py-2 border border-gray-500 rounded grow"
              onClick={() => {
                setNominal(formatNumber(nom));
                setNumericValue(nom);
              }}
            >
              Rp.{formatNumber(nom)}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
