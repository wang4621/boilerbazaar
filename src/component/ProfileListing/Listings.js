import {
  Divider,
  Box,
  Typography,
  CircularProgress 
} from "@mui/material";
import React, { useEffect, useState } from "react";
import $ from "jquery";
import ListingBox from "./ListingBox.js";

const Listings = ({userData}) => {
//   const [listedTextbooks, setListedTextbooks] = useState(<CircularProgress />);
    const [listedTextbooks, setListedTextbooks] = useState([]);
    const [stateChange, setStateChange] = useState(false);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get user textbook listings
    setLoading(true);
    $.ajax({
      url:
        "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/userlisting?puid=" +
        userData["puid"],
      type: "GET",
      success: function (result) {
        setLoading(false);
        setListedTextbooks(result);
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
      <Box sx={{ height: "6%" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", textAlign: "center", padding: "10px" }}
        >
          Your Listings
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
          overflowY: "auto",
        }}
        className='scrollBar'
      >
        {loading ? <CircularProgress/> : 
        listedTextbooks.length > 0 ? (
          listedTextbooks.map((textbook) => {
            return <ListingBox listing={textbook} stateChange={stateChange} setStateChange={setStateChange} userData={userData}/>;
          })
        ) : (
          <Typography variant="h6" sx={{ padding: "10px" }}>
            No Listings
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default Listings;
