import {
    Divider, 
    Box,
    Typography,
    CircularProgress,
    Button  
} from "@mui/material";
import React, { useEffect, useState } from "react";
import $ from "jquery";
import WatchlistBox from "./WatchlistBox.js";

const Watchlist = ({userData}) => {
    const [watchlistListings, setWatchlistListings] = useState([]);
    const [newWatchlistListings, setNewWatchlistListings] = useState([]);
    const [stateChange, setStateChange] = useState(false);
    const [loading, setLoading] = useState(true);
    /**
      @todo: add actual ajax request and update loading
    **/
    useEffect(() => {
        setLoading(true);
        $.ajax({
          url:
            "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/watchlist?puid=" +
            userData["puid"] + "&viewed=true",
          type: "GET",
          success: function (result) {
            setLoading(false);
            let newListings = [];
            let oldListings = [];
            for (let i = 0; i < result.length; i++) {
              if (result[i]['viewed'] === true) {
                oldListings.push(result[i]);
              }
              else {
                newListings.push(result[i]);
              }
            }
            setWatchlistListings(oldListings);
            setNewWatchlistListings(newListings);
          },
          error: function (result) {
            console.log(JSON.stringify(result));
          },
        });
      }, [stateChange, userData]);

    const askForNotifications = () => {
      Notification.requestPermission();
    };

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
            </Box>
            <Box
              sx={{
                height: "94%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                overflow: "scroll",
              }}
            >
                {loading ? <CircularProgress/> :
                ((watchlistListings.length > 0) || (newWatchlistListings.length > 0)) && (watchlistListings !== "Error") ? (
                  <>
                    {(Notification.permission !== "granted") ?
                    (<Button onClick={askForNotifications}>Click Me To Enable Desktop Notifications</Button>) : (<></>)
                    }
                    {(newWatchlistListings.length > 0) ?
                    (<>
                    <Typography
                      variant="h7"
                      sx={{ fontWeight: "bold", textAlign: "center", padding: "10px" }}
                      >
                        New
                      </Typography>
                      {newWatchlistListings.map((listing) => {
                        return <WatchlistBox listing={listing} stateChange={stateChange} setStateChange={setStateChange} userData={userData} />;
                      })}
                      <Divider variant="middle" sx={{ width:"85%", borderBottomColor: "var(--text-color)", margin: "20px" }} />
                      </>) : (<></>)
                    }
                    {watchlistListings.map((listing) => {
                      return <WatchlistBox listing={listing} stateChange={stateChange} setStateChange={setStateChange} userData={userData} />;
                    })}
                  </>
                ) : ( 
                <Typography variant="h6" sx={{ padding: "10px" }}>
                    No Listings in Watchlist
                </Typography>
                )}
            </Box>
        </Box>
      );
}

export default Watchlist;