import {
    Divider, 
    Box,
    Typography,
    CircularProgress,
    Button,
    IconButton  
} from "@mui/material";
import HelpIcon from '@mui/icons-material/Help';
import React, { useEffect, useState } from "react";
import $ from "jquery";
import WatchlistBox from "./WatchlistBox.js";

const Watchlist = ({userData}) => {
    const [watchlistListings, setWatchlistListings] = useState([]);
    const [newWatchlistListings, setNewWatchlistListings] = useState([]);
    const [stateChange, setStateChange] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showEnableNotifications, setShowEnableNotifications] = useState(true);
    const [disableInstructions, setDisableInstructions] = useState(false);
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
      setShowEnableNotifications(false);
    };

    const changeDisableInstructions = () => {
      if (disableInstructions) {
        setDisableInstructions(false);
      }
      else {
        setDisableInstructions(true);
      }
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
                    {((Notification.permission !== "granted") && (showEnableNotifications)) ?
                    (
                    <>
                    <Typography variant="h7" sx={{ display: "inline-block" }}>Desktop Notifications: </Typography>
                    <Typography variant="h7" sx={{ display: "inline-block", color: "red" }}>Disabled</Typography>  
                    <Button onClick={askForNotifications} sx={{ borderWidth: "1px", borderStyle: "solid", margin: "10px" }}>Opt in to Desktop Notifications</Button>
                    </>) : (
                    <>
                      <Typography variant="h7" sx={{ display: "inline-block" }}>Desktop Notifications: </Typography>
                      <Typography variant="h7" sx={{ display: "inline-block", color: "green" }}>Enabled</Typography>
                      <IconButton onClick={changeDisableInstructions}><HelpIcon sx={{ color: "var(--text-color)"}}></HelpIcon></IconButton>
                      {disableInstructions ?
                      (<>
                      <div style={{
                                    display: "flex",
                                    flexDirection: "column"
                      }}>
                        <Typography variant="h6" sx={{ margin: "auto" }}>Want to disable desktop notifications?</Typography>
                        <Typography variant="h7" sx={{ margin: "auto" }}>Choose your web browser</Typography>
                        <a href="https://support.google.com/chrome/answer/3220216?hl=en&co=GENIE.Platform%3DDesktop" target="_blank" rel="noreferrer">Chrome</a>
                        <a href="https://support.mozilla.org/en-US/kb/push-notifications-firefox" target="_blank" rel="noreferrer">Firefox</a>
                        <a href="https://support.apple.com/guide/safari/customize-website-notifications-sfri40734/mac" target="_blank" rel="noreferrer">Safari</a>
                        <a href="https://support.microsoft.com/en-us/microsoft-edge/manage-website-notifications-in-microsoft-edge-0c555609-5bf2-479d-a59d-fb30a0b80b2b" target="_blank" rel="noreferrer">Microsoft Edge</a>
                      </div>
                      </>)
                      : <></>}
                    </>)
                    }
                    {(newWatchlistListings.length > 0) ?
                    (<>
                    <Typography
                      variant="h6"
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