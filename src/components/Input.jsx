import { HiOutlineInformationCircle } from "react-icons/hi";

export default function Input({
  type = "text",
  placeholder = "",
  icon = null,
  action = null,
  handler,
  value,
}) {
  return (
    <div className="flex justify-center items-center bg-white py-3 px-4 gap-4 text-sm min-w-[100%] border border-gray-500 rounded-md focus-within:border-red-500 focus-within:text-red-500 font-medium">
      {icon ? icon : <HiOutlineInformationCircle />}
      <input
        value={value}
        type={type}
        placeholder={placeholder}
        className="grow focus:outline-none focus:text-red-500"
        onChange={(e) => handler(e.target.value)}
      />
      {action && action}
    </div>
  );
}
