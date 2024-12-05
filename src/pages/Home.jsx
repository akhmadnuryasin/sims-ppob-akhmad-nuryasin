import { useSelector } from "react-redux";

import MiniProfile from "../components/MiniProfile";
import UserBalance from "../components/UserBalance";
import ServiceCard from "../components/ServiceCard";
import Slider from "../components/Slider";

export default function Home() {
  const { services, banner } = useSelector((state) => state);

  return (
    <main className="py-8">
      <section className="grid grid-cols-1 grid-rows-2 gap-3 mb-8 sm:grid-cols-2 sm:grid-rows-1">
        <MiniProfile />
        <UserBalance />
      </section>
      <section className="flex flex-wrap items-start gap-3 md:justify-between justify-evenly">
        {services.map((service) => (
          <ServiceCard key={service.service_code} data={service} />
        ))}
      </section>
      <h1 className="my-8 font-medium">Temukan Promo Menarik</h1>
      <section>
        <Slider data={banner} />
      </section>
    </main>
  );
}
