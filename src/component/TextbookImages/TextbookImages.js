import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import $ from "jquery";
import { CircularProgress } from "@mui/material";
import 'swiper/css'
import 'swiper/css/navigation'
import "swiper/css/pagination";
import { Navigation,Pagination } from "swiper";

const TextbookImages = ({ listing }) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // gets the images for the textbook
    setLoading(true);
    $.ajax({
      url:
        "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing/images?listingID=" +
        listing["listingID"],
      type: "GET",
      success: function (result) {
        console.log(result);
        let resultImages = [];
        for (let key in result["body"]) {
          if (!isNaN(key)) {
            resultImages.push(result["body"][key]);
          }
        }
        setImages(resultImages);
        setLoading(false);
      },
      error: function (result) {
        console.log(JSON.stringify(result));
      },
    });
  }, [listing]);
  
  return (
    <Swiper
      navigation={true}
      modules={[Pagination,Navigation]}
      centeredSlides={true}
      pagination={{
        type: "fraction",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        images.map((image) => {
          return (
            <SwiperSlide>
              <img src={image} height={"100%"} width={"70%"} alt="textbook" />
            </SwiperSlide>
          );
        })
      )}
    </Swiper>
  );
};

export default TextbookImages;
