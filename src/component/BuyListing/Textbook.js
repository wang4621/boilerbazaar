import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
} from "@mui/material";
import BuyListing from "./BuyListing";

const Textbook = ({ textbook }) => {
  console.log(textbook);
  const [open, setOpen] = useState(false);

  const openListing = () => {
    setOpen(true);
  };

  return (
    <Grid
      item
      xs={4}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{ height: 350, width: "100%", cursor: "pointer", display:'flex', justifyContent:'center', alignItems:'center' }}
        onClick={openListing}
      >
        <Box sx={{ height: "90%", width: "90%", borderRadius:5, backgroundColor:'white' }}>
          <Box
            sx={{
              height: "75%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{height:'90%', width:'90%', display:'flex', justifyContent:'center', alignItems:'center', borderRadius:5, backgroundColor:'lightgrey'}}>
              Image Preview
            </Box>

          </Box>
          <Box
            sx={{
              height: "25%",
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              ${textbook["price"]}
            </Typography>
            <Typography variant="body1">{textbook["title"]}</Typography>
            <Typography variant="body1">{textbook["course"]}</Typography>
          </Box>
        </Box>
      </Box>
      <BuyListing listing={textbook} open={open} setOpen={setOpen} />
    </Grid>
  );
};

export default Textbook;
