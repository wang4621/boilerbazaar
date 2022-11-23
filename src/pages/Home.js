import React from "react";
import {
  TextField,
  Box,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import RatingstoGive from "../component/Rating/RatingstoGive";
import SearchIcon from "@mui/icons-material/Search";
import "./Home.css";

const Home = ({ userData }) => {
  return (
    <div className="homeDisplay">
      <Box
        sx={{
          display: "flex",
          height: "30%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          placeholder="Search for users"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2, width: "60%" }}
        />
      </Box>
      <Box sx={{ display: "flex", height: "70%", flexDirection: "row", bgcolor:'var(--tertiary-color)' }}>
        <Box
          sx={{
            display: "flex",
            width: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RatingstoGive userData={userData} />
        </Box>
        <Box sx={{ display: "flex", width: "50%" }}>
          <Typography>Previously Viewed Listings</Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
