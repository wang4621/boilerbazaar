import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  TextField,
  Typography,
  Button,
  Avatar,
  InputAdornment,
  IconButton,
  CardContent,
} from "@mui/material";
import $ from "jquery";

const Chat = ({ contactData, blocked, stateChange }) => {
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    var url =
      "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/messages?id=" +
      contactData.id;
    $.ajax({
      url: url,
      type: "GET",
      success: function (result) {
        console.log(result);
        let chatText = [];
        for (const x of result.conversation) {
          var date = new Date(x[0]);
          let sender = "";
          if (x[1]) {
            sender = result["user1"];
          } else {
            sender = result["user0"];
          }
          var s = `${sender} (${date.toDateString()} ${date
            .toTimeString()
            .substring(0, 5)}): ${x[2]}\n`;
          chatText.push(s);
        }
        setConversation(chatText);
      },
      error: function (result) {
        //console.log(JSON.stringify(result));
      },
    });
  }, [contactData, stateChange]);

  return (
    <Box>
      {conversation.map((text) => {
        console.log(text);
        return (
          <CardContent>
            <Typography>{text}</Typography>
          </CardContent>
        );
      })}
    </Box>
  );
};

export default Chat;
