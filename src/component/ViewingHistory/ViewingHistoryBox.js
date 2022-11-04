import React, { useState, useEffect } from "react";
import { Box, Typography, Button, CircularProgress, Grid } from "@mui/material";
import $ from "jquery";

const ViewingHistoryBox = ({ listing, stateChange, setStateChange, userData }) => {
  let listingId = listing["listingID"];

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    // gets the images for the textbook
    // console.log(listing["listingID"])
    setLoading(true);
    $.ajax({
      url:
        "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing/images?listingID=" +
        listing["listingID"],
      type: "GET",
      success: function (result) {
        // console.log(result);
        setLoading(false);
        setImage(result["body"][0]);
      },
      error: function (result) {
        console.log(JSON.stringify(result));
      },
    });
  }, [listing]);

  return (
    <Grid
      item
      m={2}
      xs={12}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          width: "80%",
          height: 150,
          // minHeight: "130px",
          display: "flex",
          // flexDirection: "row",
          // justifyContent: "center",
          backgroundColor: "var(--secondary-color)",
          borderRadius: 5,
          boxShadow: 8,
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "25%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              height: "80%",
              width: "80%",
              backgroundColor: "rgb(32,32,32)",
              // backgroundColor: "lightgrey",
              // borderColor:'black',
              borderRadius: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loading ? (
              <CircularProgress />
            ) : (
              <img src={image} height={"100%"} width={"70%"} alt="textbook" />
            )}
          </Box>
        </Box>
        <Box
          sx={{
            height: "100%",
            width: "75%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: "80%",
              width: "95%",
              display: "flex",
              flexDirection: "column",
            }}
            m={1.5}
          >
            <Box
              sx={{
                height: "80%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                // justifyContent: "space-evenly",
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {listing["title"]}
              </Typography>
              <Typography variant="body1">${listing["price"]}</Typography>
              <Typography variant="body2">
                Listed by {listing["sellerID"]}
              </Typography>
              <Typography variant="body1">{listing["course"]}</Typography>
              <Typography variant="body1" id="sold">{}</Typography>


            </Box>
            <Box
              sx={{
                height: "20%",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >  
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default ViewingHistoryBox;
