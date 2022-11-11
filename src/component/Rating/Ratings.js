import React, { useEffect, useState } from "react";
import {
  Divider,
  Box,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import $ from "jquery";

const Ratings = ({ userData }) => {
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    // get user rating
    setLoading(true);
    $.ajax({
      url:
        "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/rating?puid=" +
        userData["puid"],
      type: "GET",
      success: function (result) {
        setLoading(false);
        setRatings(result);
      },
      error: function (result) {
        console.log(JSON.stringify(result));
      },
    });
  }, [userData]);

  return (
    <Box
      sx={{
        width: "80%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ height: "8%" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", textAlign: "center", padding: "10px" }}
        >
          Your Ratings
        </Typography>
        <Divider
          variant="middle"
          sx={{ borderBottomColor: "var(--text-color)" }}
        />
      </Box>
      <Box
        sx={{
          height: "92%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "auto",
          justifyContent: "flex-start",
        }}
        className="scrollBar"
      >
        {loading ? (
          <CircularProgress />
        ) : ratings.length > 0 ? (
          <Grid
            container
            // spacing={0}
            sx={{
              display: "flex",
              justifyContent: "center",
              // alignItems: "flex-start",
            }}
          >
            {ratings.map((rating) => {
              return <div>Hi</div>;
            })}
          </Grid>
        ) : (
          <Typography variant="h6" sx={{ padding: "10px" }}>
            No Ratings
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Ratings;
