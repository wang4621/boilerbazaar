import React from "react";
import { Box, CardContent, Grid, Rating, Typography } from "@mui/material";

const RatingBox = ({ rating }) => {
  console.log(rating);
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
          height: 200,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "var(--secondary-color)",
          borderRadius: 5,
          boxShadow: 8,
        }}
      >
        <CardContent>
          <Typography variant="h6">{rating.reviewer}</Typography>
          <Rating readOnly value={parseInt(rating.rating)}/>
          <Typography variant="body1">{rating.review}</Typography>
        </CardContent>
      </Box>
    </Grid>
  );
};

export default RatingBox;
