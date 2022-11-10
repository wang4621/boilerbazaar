import React, { useState } from "react";
import {
  Button,
  Rating,
  TextField,
  Box
} from "@mui/material";
import $ from "jquery";
import LoadingButton from "@mui/lab/LoadingButton";

const RatingAndReview = ({listingID, puid, setSold, setActiveStep}) => {
  const [stringLength, setStringLength] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const changeDescription = (event) => {
    setStringLength(event.target.value.length);
    setReview(event.target.value);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    setLoading(true);
    $.ajax({
      url:
        "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/userlisting?listingID=" +
        listingID +
        "&sold=true&puid=" +
        puid,
      type: "PUT",
      success: function (result) {
        console.log(JSON.stringify(result));
        setSold("true");
        setLoading(false);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      },
      error: function (result) {
        console.log(JSON.stringify(result));
      },
    });
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
            justifyContent: "center",
            alignItems: "center",
            overflowY: "auto",
          }}
          className="scrollBar"
        >
          <Rating sx={{ transform: "scale(1.8)", mb: 2, mt: 1 }} />
          <TextField
            id="review"
            label="Review"
            multiline
            rows={7}
            sx={{ width: "90%" }}
            onChange={changeDescription}
            inputProps={{ maxLength: 250 }}
            helperText={`${stringLength}/${250}`}
          />
          {/* <FormHelperText sx={{ fontSize: "14px", marginLeft: 0 }}>hi</FormHelperText> */}
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

export default RatingAndReview;
