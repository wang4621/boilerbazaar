import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";

const PreviewImageSwiper = ({ images }) => {
  return (
    <Swiper
      navigation={true}
      modules={[Pagination, Navigation]}
      centeredSlides={true}
      pagination={{
        type: "fraction",
      }}
    >
      {images.map((image) => {
        return (
          <SwiperSlide>
            <img src={image} height={"100%"} width={"80%"} alt="textbook" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default PreviewImageSwiper;