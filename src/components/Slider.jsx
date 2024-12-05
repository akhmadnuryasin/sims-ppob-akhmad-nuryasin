import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

export default function BannerSlider({ data }) {
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={10}
      breakpoints={{
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }}
    >
      {data.map((banner, index) => (
        <SwiperSlide key={index}>
          <img src={banner.banner_image} alt={banner.banner_name} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
