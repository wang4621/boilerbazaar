import React from "react";
import {
  Box,
  Grid,
} from "@mui/material";

const RatingBox = ({ rating }) => {
  return (
    <Grid
      item
      //   key={}
      m={2}
      xs={3}
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
      ></Box>
    </Grid>
  );
};

export default RatingBox;
