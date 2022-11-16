import $ from "jquery";
import React, { useEffect, useState } from "react";
import {
    Divider,
    Box,
    Typography,
    CircularProgress,
    Grid,
  } from "@mui/material";
import RatingstoGiveBox from "./RatingstoGiveBox";

const RatingstoGive = ({ userData }) => {
//   const [openRating, setRatingOpen] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // get reviews that user needs to submit
    $.ajax({
      url:
        "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/rating/buyer?puid=" +
        userData["puid"],
      type: "GET",
      success: function (result) {
        console.log(result);
        // let steps = [];
        // for (let i = 0; i < result.length; i++) {
        //   steps.push({
        //     name: "Rating and Review for " + result[i].sellerID,
        //     id: result[i].id,
        //   });
        // }
        // setStepData(steps);
        // if (result.length > 0) {
        //   setRatingOpen(true);
        // }
        setRatings(result);
        setLoading(false);
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
      <Box sx={{ height: "8.5%" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", textAlign: "center", padding: "10px" }}
        >
          Ratings to Give
        </Typography>
        <Divider
          variant="middle"
          sx={{ borderBottomColor: "var(--text-color)" }}
        />
      </Box>
      <Box
        sx={{
          height: "91.5%",
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
              return (
                <RatingstoGiveBox rating={rating}/>
              );
            })}
          </Grid>
        ) : (
          <Typography variant="h6" sx={{ padding: "10px" }}>
            No Ratings to Give
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default RatingstoGive;
