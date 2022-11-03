import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";

const PreviewImageSwiper = ({ images, index }) => {
  return (
    <Swiper
    key={index}
      navigation={true}
      modules={[Pagination, Navigation]}
      centeredSlides={true}
      pagination={{
        type: "fraction",
      }}
    >
      {images.map((image, index) => {
        return (
          <SwiperSlide key={index}>
            <img src={image} height={"100%"} width={"90%"} alt="textbook" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default PreviewImageSwiper;