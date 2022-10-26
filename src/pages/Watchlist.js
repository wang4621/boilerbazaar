import {
    Divider, 
    Box,
    Typography,
    CircularProgress  
} from "@mui/material";
import React, { useEffect, useState } from "react";
import $ from "jquery";
import './Watchlist.css'

function Watchlist() {
    const [watchlistListings, setWatchlistListings] = useState([]);
    const [stateChange, setStateChange] = useState(false);
    const [loading, setLoading] = useState(true);
    /**
      @todo: add actual ajax request and update loading
    **/
    useEffect(() => {
        setLoading(true);
        $.ajax({
          url:
            "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/profile?puid=" +
            JSON.parse(localStorage.getItem("userData"))["puid"],
          type: "GET",
          success: function (result) {
            setLoading(false);
            setWatchlistListings(result.watchlist);
          },
          error: function (result) {
            console.log(JSON.stringify(result));
          },
        });
      }, [stateChange]);

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
                    Your Watchlist
                </Typography>
                <Divider
                    variant="middle"
                    sx={{ borderBottomColor: "var(--text-color)" }}
                />
                {loading ? <CircularProgress/> : 
                <Typography variant="h6" sx={{ padding: "10px" }}>
                    No Listings in Watchlist
                </Typography>
                }
            </Box>
        </Box>
      );
}

export default Watchlist;