import {
    Divider, 
    Box,
    Typography,
    CircularProgress
} from "@mui/material";
import React, { useEffect, useState } from "react";
import $ from "jquery";
import FollowedBox from "./FollowingBox.js";

const Following = ({userData}) => {
    const [loading, setLoading] = useState(true);
    const [stateChange, setStateChange] = useState(false);
    const [usersFollowed, setUsersFollowed] = useState([]);

    useEffect(() => {
        setLoading(true);
        $.ajax({
          url:
            "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/following?puid=" +
            userData["puid"],
          type: "GET",
          success: function (result) {
            setLoading(false);
            setUsersFollowed(result);
          },
          error: function (result) {
            console.log(JSON.stringify(result));
          },
        });
      }, [stateChange, userData]);

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
                    Following
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
                overflow: "scroll"
              }}
            >
                {loading ? <CircularProgress/> :
                (usersFollowed.length > 0) && (usersFollowed !== "Error") ? (
                  <>
                    {usersFollowed.map((user) => {
                      return <FollowedBox user={user} stateChange={stateChange} setStateChange={setStateChange} userData={userData} />;
                    })}
                  </>
                ) : ( 
                <Typography variant="h6" sx={{ padding: "10px" }}>
                    No Users Followed
                </Typography>
                )}
            </Box>
        </Box>
      );
}

export default Following;