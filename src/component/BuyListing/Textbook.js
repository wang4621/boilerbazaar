import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import BuyListing from "./BuyListing";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

const Textbook = ({ textbook, userData }) => {
  // console.log(textbook);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const openListing = () => {
    setOpen(true);
    navigate("/buy/" + textbook["listingID"]);
  };

  useEffect(() => {
    // gets the images for the textbook
    setLoading(true);
    $.ajax({
      url:
        "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing/images?listingID=" +
        textbook["listingID"],
      type: "GET",
      success: function (result) {
        console.log(result);
        setImage(result["body"][0]);
        setLoading(false);
      },
      error: function (result) {
        console.log(JSON.stringify(result));
      },
    });
  }, [textbook]);

  return (
    <Grid
      item
      xs={4}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          height: 380,
          width: "100%",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={openListing}
      >
        <Box
          sx={{
            height: "90%",
            width: "90%",
            borderRadius: 5,
            backgroundColor: "var(--secondary-color)",
            boxShadow: 8
          }}
        >
          <Box
            sx={{
              height: "70%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                height: "90%",
                width: "90%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
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
              height: "30%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              // flexDirection: "column",
            }}
          >
            <Box
              sx={{
                width: "90%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                ${textbook["price"]}
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                {textbook["title"]}
              </Typography>
              <Typography variant="body1">{textbook["course"]}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <BuyListing listing={textbook} open={open} setOpen={setOpen} userData={userData}/>
    </Grid>
  );
};

export default Textbook;
