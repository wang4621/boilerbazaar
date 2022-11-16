import React, { useEffect, useState } from "react";
import BrowsingHistory from "../component/BrowsingHistory/BrowsingHistory";
import SellerRatingPrompt from "../component/Rating/SellerRatingPrompt";
import $ from "jquery";

const Home = ({ userData }) => {
  

  return (
    <div className="homeDisplay">
      {/* <SellerRatingPrompt
        open={openRating}
        setOpen={setRatingOpen}
        stepData={stepData}
      /> */}
      <BrowsingHistory />
    </div>
  );
};

export default Home;
