import React, { useState } from "react";
import { Button, Rating, TextField, Box, FormHelperText } from "@mui/material";
import $ from "jquery";
import LoadingButton from "@mui/lab/LoadingButton";

const RatingandReviewSeller = ({ stepData, setActiveStep, setOpen }) => {
  const [stringLength, setStringLength] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(false);

  const changeDescription = (event) => {
    setError(false);
    setStringLength(event.target.value.length);
    setReview(event.target.value);
  };

  const handleSubmit = () => {
    // console.log(stepData[activeStep])
    setLoading(true);
    if (rating === 0 || review === "") {
      setError(true);
      setLoading(false);
    } else {
      var jsonData = {
        id: stepData.id,
        buyerRating: rating,
        buyerReview: review,
        sellerID: stepData.sellerID,
      };
      jsonData = JSON.stringify(jsonData);
      $.ajax({
        // send rating to database
        url: "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/rating/buyer",
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
            value={parseInt(rating)}
            onChange={(e) => {
              setRating(e.target.value);
              setError(false);
            }}
          />
          <TextField
            id="review"
            label="Review"
            multiline
            rows={7}
            required
            value={review}
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
        <Button color="inherit" onClick={() => setOpen(false)} sx={{ mr: 1 }}>
          Cancel
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

export default RatingandReviewSeller;
