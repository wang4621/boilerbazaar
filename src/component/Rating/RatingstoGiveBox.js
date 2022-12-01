import React, { useState, useEffect } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import SellerRatingPrompt from "./SellerRatingPrompt";
import $ from "jquery";

const RatingstoGiveBox = ({ rating, stateChange, setStateChange }) => {
  const [ratingOpen, setRatingOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  console.log(rating)

  useEffect(() => {
    setLoading(true);
    // get images of listing
    $.ajax({
      url:
        "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing/images?listingID=" +
        rating["id"],
      type: "GET",
      success: function (result) {
        console.log(result);
        setLoading(false);
        setImage(result["body"][0]);
      },
      error: function (result) {
        console.log(JSON.stringify(result));
      },
    });
  }, [rating]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        // minHeight: "130px",
        display: "flex",
        flexDirection: "row",
        // justifyContent: "center",
        // backgroundColor: "var(--primary-color)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "55%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "80%",
            width: "90%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 2,
            backgroundColor: "rgb(32,32,32)",
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <img src={image} width={"75%"} height={"100%"} alt="textbook" />
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "45%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "80%",
            flexDirection: "column",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: "bold", mb: 2 }}>
              {rating.listingTitle}
            </Typography>
            <Typography>Seller: {rating.sellerID}</Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<LaunchIcon />}
            sx={{
              //   display: "flex",
              // height: "100% !important",
              width: "80%",
              borderRadius: "5px !important",
            }}
            onClick={() => setRatingOpen(true)}
          >
            Open
          </Button>
        </Box>
      </Box>
      <SellerRatingPrompt
        open={ratingOpen}
        setOpen={setRatingOpen}
        stepData={rating}
        stateChange={stateChange}
        setStateChange={setStateChange}
      />
    </Box>
  );
};

export default RatingstoGiveBox;
