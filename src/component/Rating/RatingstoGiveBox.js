import React, { useState, useEffect } from "react";
import { Box, Typography, Button, CircularProgress, Grid } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import SellerRatingPrompt from "./SellerRatingPrompt";

const RatingstoGiveBox = ({ rating }) => {
  const [ratingOpen, setRatingOpen] = useState(false);
//   console.log(rating);

  return (
    <Grid
      item
      key={rating.id}
      mt={2}
      xs={4}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          width: "80%",
          height: 300,
          // minHeight: "130px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "var(--secondary-color)",
          borderRadius: 5,
          boxShadow: 8,
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "60%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{ backgroundColor: "gray", height: "90%", width: "80%" }}
          ></Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            height: "30%",
            // width: "80%",
          }}
        >
          <Typography>Seller: {rating.sellerID}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            height: "10%",
            // width: "80%",
          }}
        >
          <Button
            variant="contained"
            startIcon={<LaunchIcon />}
            sx={{
              height: "100% !important",
              width: "100%",
              borderRadius: "5px !important",
            }}
            onClick={() => setRatingOpen(true)}
          >
            Open
          </Button>
        </Box>
        <SellerRatingPrompt
          open={ratingOpen}
          setOpen={setRatingOpen}
          stepData={rating}
        />
      </Box>
    </Grid>
  );
};

export default RatingstoGiveBox;
