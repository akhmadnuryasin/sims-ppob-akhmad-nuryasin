import { Link } from "react-router-dom";

export default function ServiceCard({ data }) {
  return (
    <Link to={`/service/${data.service_code}`}>
      <div key={data.service_code} className="flex flex-col items-center gap-2">
        <img src={data.service_icon} alt={data.service_code} />
        <span className="text-xs font-light capitalize text-center text-wrap max-w-[70px] truncate">
          {data.service_name}
        </span>
      </div>
    </Link>
  );
}
