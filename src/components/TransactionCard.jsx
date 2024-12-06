import { formatNumber, formatTimestamp } from "../utils/helpers";
export default function TransactionCard({ data }) {
  return (
    <div className="flex justify-between px-5 py-3 border border-gray-500 rounded-md">
      <div className="flex flex-col gap-2">
        <span
          className={`${
            data.transaction_type === "TOPUP"
              ? "text-green-400"
              : "text-red-600"
          } font-bold text-lg`}
        >
          {data.transaction_type === "TOPUP" ? "+" : "-"} Rp
          {formatNumber(data.total_amount)}
        </span>
        <span className="text-xs opacity-50">
          {formatTimestamp(data.created_on)}
        </span>
      </div>
      <div className="text-sm">{data.description}</div>
    </div>
  );
}
