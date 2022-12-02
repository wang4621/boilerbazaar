import React from 'react'
import { Box, Divider, TextField, Typography, Button, Avatar, InputAdornment, IconButton, CardContent } from "@mui/material";

const Chat = () => {
    useEffect(() => {
      $.ajax({
        url: "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing/formessages?" + "listingID=" + listingID,
        type: "GET",
        async: true,
        success: function (result) {
          console.log(result);
          setListingData(result.Items[0]);
          
        },
        error: function (result) {
          console.log(JSON.stringify(result));
        },
      });
    }, []);
    
  return (
    <div>Chat</div>
  )
}

export default Chat