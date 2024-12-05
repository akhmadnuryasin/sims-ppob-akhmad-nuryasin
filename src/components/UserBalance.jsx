import { useState } from "react";
import { useSelector } from "react-redux";

import { formatNumber } from "../utils/moneyFormatter";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

export default function UserBalance() {
  const { profile } = useSelector((state) => state);
  const [isShown, setShown] = useState(false);

  return (
    <div className="flex flex-col justify-between gap-3 p-5 text-white bg-custom-bg user-balance rounded-xl">
      <span className="text-md">Saldo Anda</span>
      <h1 className="text-3xl font-semibold">
        Rp.{" "}
        {isShown
          ? formatNumber(profile.balance)
          : "●".repeat(profile?.balance?.toString()?.split("").length | 0)}
      </h1>
      <button
        className="flex items-center gap-2 text-sm"
        onClick={() => setShown(!isShown)}
      >
        Lihat Saldo {isShown ? <RiEyeLine /> : <RiEyeOffLine />}
      </button>
    </div>
  );
}
