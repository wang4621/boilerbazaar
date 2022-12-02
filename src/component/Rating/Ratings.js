import React, { useEffect, useState } from "react";
import {
  Divider,
  Box,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import $ from "jquery";
import RatingBox from "./RatingBox";

// this page is for user ratings
const Ratings = ({ userData }) => {
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    // get user rating
    setLoading(true);
    $.ajax({
      url:
        "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/rating?puid=" +
        userData["puid"],
      type: "GET",
      success: function (result) {
        console.log(result);
        let userRating = [];
        for (let i = 0; i < result.length; i++) {
          let ratingData = {};
          if (userData.puid === result[i].buyerID) {
            ratingData['id'] = result[i].id;
            ratingData['reviewer'] = result[i].sellerID
            ratingData['rating'] = result[i].sellerRatingofBuyer;
            ratingData['review'] = result[i].sellerReviewofBuyer;
            userRating.push(ratingData)
          } else if (userData.puid === result[i].sellerID) {
            if (result[i].buyerReviewofSeller !== "") {
              ratingData["id"] = result[i].id;
              ratingData["reviewer"] = result[i].buyerID;
              ratingData["rating"] = result[i].buyerRatingofSeller;
              ratingData["review"] = result[i].buyerReviewofSeller;
              userRating.push(ratingData);
            }
          }
        }
        setLoading(false);
        setRatings(userRating);
      },
      error: function (result) {
        console.log(JSON.stringify(result));
      },
    });
  }, [userData]);

  return (
    <Box
      sx={{
        width: "80%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ height: "8%" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", textAlign: "center", padding: "10px" }}
        >
          Your Ratings
        </Typography>
        <Divider
          variant="middle"
          sx={{ borderBottomColor: "var(--text-color)" }}
        />
      </Box>
      <Box
        sx={{
          height: "92%",
          display: "flex",
          alignItems: "flex-start",
          overflowY: "auto",
          justifyContent: "center",
        }}
        className="scrollBar"
      >
        {loading ? (
          <CircularProgress mt={2}/>
        ) : ratings.length > 0 ? (
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              // justifyContent: "flex-start",
              // alignItems:"flex-start"
            }}
          >
            {ratings.map((rating) => {
              return <RatingBox rating={rating}/>;
            })}
          </Grid>
        ) : (
          <Typography variant="h6" sx={{ padding: "10px" }}>
            No Ratings
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Ratings;
