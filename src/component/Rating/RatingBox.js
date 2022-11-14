import React from "react";
import { Box, Grid, Rating, Typography } from "@mui/material";

const RatingBox = ({ rating }) => {
  console.log(rating)
  return (
    <Grid
      item
      key={rating.id}
      // m={2}
      xs={4}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          width: "80%",
          height: 150,
          display: "flex",
          backgroundColor: "var(--secondary-color)",
          borderRadius: 5,
          boxShadow: 8,
        }}
      >
        <Typography variant="h6">
          {rating.reviewer}
        </Typography>
        <Rating value={parseInt(rating.rating)}/>
        <Typography variant="h6">
          {rating.review}
        </Typography>
      </Box>
    </Grid>
  );
};

export default RatingBox;
