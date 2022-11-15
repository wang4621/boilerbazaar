import React, { useEffect, useState } from "react";
import BrowsingHistory from "../component/BrowsingHistory/BrowsingHistory";
import SellerRatingPrompt from "../component/Rating/SellerRatingPrompt";
import $ from "jquery";

const Home = ({ userData }) => {
  const [openRating, setRatingOpen] = useState(false);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    // get reviews that user needs to submit
    $.ajax({
      url:
        "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/rating/buyer?puid=" +
        userData["puid"],
      type: "GET",
      success: function (result) {
        console.log(result);
      },
      error: function (result) {
        console.log(JSON.stringify(result));
      },
    });
  }, [userData]);

  return (
    <div className="homeDisplay">
      <SellerRatingPrompt
        open={openRating}
        setOpen={setRatingOpen}
        steps={steps}
      />
      <BrowsingHistory />
    </div>
  );
};

export default Home;
