import React, { useState } from "react";
import { Button, Rating, TextField, Box, FormHelperText } from "@mui/material";
import $ from "jquery";
import LoadingButton from "@mui/lab/LoadingButton";

const RatingAndReviewBuyer = ({
  listing,
  puid,
  // setSold,
  setActiveStep,
  buyer,
}) => {
  const [stringLength, setStringLength] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(false);

  const changeDescription = (event) => {
    setStringLength(event.target.value.length);
    setReview(event.target.value);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    setLoading(true);
    if (rating === 0 || review === "") {
      setError(true);
      setLoading(false);
    } else {
      $.ajax({
        // update number of sales and mark as sold
        url:
          "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/userlisting?listingID=" +
          listing.listingID +
          "&sold=true&puid=" +
          puid,
        type: "PUT",
        success: function (result) {
          console.log(JSON.stringify(result));
          var jsonData = {
            buyerID: buyer,
            sellerID: puid,
            sellerRating: rating,
            sellerReview: review,
            listingID: listing.listingID,
            listingTitle: listing.title
          };
          jsonData = JSON.stringify(jsonData);
          $.ajax({
            // send rating to database
            url: "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/rating",
            type: "PUT",
            data: jsonData,
            datatype: "json",
            contentType: "application/json",
            success: function (result) {
              console.log(JSON.stringify(result));
              setLoading(false);
              setActiveStep((prevActiveStep) => prevActiveStep + 1);
            },
            error: function (result) {
              console.log(JSON.stringify(result));
            },
          });
        },
        error: function (result) {
          console.log(JSON.stringify(result));
        },
      });
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", pt: 2, width: 400, height: 280 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
            overflowY: "auto",
          }}
          className="scrollBar"
        >
          <FormHelperText error={error} sx={{ fontSize: "14px" }}>
            {error ? "Please add a rating and a review." : ""}
          </FormHelperText>
          <Rating
            sx={{ transform: "scale(1.8)", mb: 2, mt: 1 }}
            onChange={(e) => {
              setRating(e.target.value);
            }}
          />
          <TextField
            id="review"
            label="Review"
            multiline
            rows={7}
            required
            sx={{
              width: "90%",
              "& .MuiFormHelperText-root": {
                marginLeft: 0,
                color: "var(--text-color)",
              },
            }}
            onChange={changeDescription}
            inputProps={{ maxLength: 150 }}
            helperText={`${stringLength}/${150}`}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <LoadingButton
          variant="contained"
          onClick={handleSubmit}
          loading={loading}
          disabled={loading}
        >
          Submit
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default RatingAndReviewBuyer;
