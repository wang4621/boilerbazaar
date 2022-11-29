import React, { useState, useEffect } from "react";
import { Box, Typography, Button, CircularProgres } from "@mui/material";
import $ from "jquery";

const WatchlistBox = ({ user, stateChange, setStateChange, userData }) => {
  let profileLink = "http://localhost:3000/find/" + user["puid"];

  const [loading, setLoading] = useState(false);

  return (
    <Box
      key={user["puid"]}
      m={2}
      sx={{
        width: "50%",
        height: "15%",
        minHeight: "100px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "var(--secondary-color)",
        borderRadius: 5,
        boxShadow: 8,
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap"
        }}
      >
            <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center"
              }}>
            <Typography
              variant="h6"
              sx={{ display: "inline-block", fontWeight: "bold"}}
            >
                <a href={profileLink} target="_blank" rel="noreferrer">{user["firstName"] + " " + user["lastName"]}</a>
            </Typography>
            </Box>
            <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center"
              }}>
            <Box
            sx={{
                width: "33%",
                display: "flex",
                justifyContent: "center"
              }}>
            <Typography 
                variant="body1"
                sx={{ display: "inline-block", fontWeight: "bold"}}
            >
              Purchases: {user["purchases"]}
            </Typography>
            </Box>
            <Box
            sx={{
                width: "33%",
                display: "flex",
                justifyContent: "center"
              }}>
            <Typography 
                variant="body1"
                sx={{ display: "inline-block", fontWeight: "bold"}}
            >
              Sales: {user["sell"]}
            </Typography>
            </Box>
            <Box
            sx={{
                width: "33%",
                display: "flex",
                justifyContent: "center"
              }}>
            {user["averageRating"] == -1 ? 
                ( 
                    <Typography 
                        variant="body1"
                        sx={{ display: "inline-block", fontWeight: "bold"}}
                    >
                        Rating: None
                    </Typography>
                ) :
                ( 
                    <Typography 
                        variant="body2"
                        sx={{ display: "inline-block", fontWeight: "bold"}}
                    >
                        Rating: {user["averageRating"]}
                    </Typography>
                )}
                </Box>
            </Box>
          </Box>
    </Box>
  );
};

export default WatchlistBox;
