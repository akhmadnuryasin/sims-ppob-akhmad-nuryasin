import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { ProfileAction } from "../utils/reducer/profile";
import Swal from "sweetalert2";

import Toast from "../components/Toats";
import MiniProfile from "../components/MiniProfile";
import UserBalance from "../components/UserBalance";
import Input from "../components/Input";

import { FaMoneyCheck } from "react-icons/fa6";
import { formatNumber } from "../utils/moneyFormatter";
import { assets } from "../assets/assets";

export default function Service() {
  const { services, profile } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState({});

  useEffect(() => {
    const service = services.find((service) => service.service_code === id);
    setSelected(service);
  }, [id, services]);

  function handlePay() {
    if (selected.service_tariff > profile.balance)
      return Toast.fire({
        icon: "error",
        title: "Saldo tidak cukup",
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
          <h1 class="text-base mb-2">Beli ${selected?.service_name} senilai</h1>
          <h1 class="text-2xl font-bold">Rp${formatNumber(
            selected.service_tariff
          )} ?</h1>
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
          dispatch(ProfileAction.transaction(selected));
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
        <h1 className="text-xl">Pembayaran</h1>
        <div className="flex items-center gap-3 mt-2">
          <img
            src={selected?.service_icon}
            alt={selected?.service_code}
            width={25}
            height={25}
          />
          <span className="text-2xl font-medium">{selected?.service_name}</span>
        </div>
      </section>
      <section className="flex flex-col gap-5">
        <Input
          icon={<FaMoneyCheck />}
          value={formatNumber(selected?.service_tariff)}
          handler={() => {}}
        />
        <button
          onClick={() => handlePay()}
          className="py-2 text-white bg-red-500 border-2 border-red-500 rounded-md"
        >
          Bayar
        </button>
      </section>
    </main>
  );
}
