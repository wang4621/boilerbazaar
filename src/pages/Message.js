import {
  Box,
  Divider,
  TextField,
  Typography,
  Button,
  Avatar,
  InputAdornment,
  IconButton,
} from "@mui/material";
import "./Message.css";
import $ from "jquery";
import React, { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InterestedListing from "../component/BuyListing/InterestedListing";
import Chat from "../component/Chat/Chat";

const Message = ({ userData }) => {
  const [image, setImage] = useState("");
  const [listingData, setListingData] = useState("");
  const [contacts, setContacts] = useState([]);
  const [contactData, setContactData] = useState("");
  const [blocked, setBlocked] = useState(false);
  // const [conversation, setConversation] = useState("");
  const [stateChange, setStateChange] = useState(false);
  // const [profileImage, setprofileImage] = useState([]);
  const [imageIndex, setImageIndex] = useState("");

  const block = () => {
    if (blocked) {
      // if (!window.confirm(`Do you want to unblock ${contactNames[index]}?`)) {
      if (!window.confirm(`Do you want to unblock ${contactData.name}?`)) {
        return;
      }
    } else {
      // if (!window.confirm(`Do you want to block ${contactNames[index]}?`)) {
      if (!window.confirm(`Do you want to block ${contactData.name}?`)) {
        return;
      }
    }
    setBlocked(!blocked);
    var jsonData = { user: userData["puid"], blockUser: contactData.name };
    var jsonData = '"' + JSON.stringify(jsonData).replaceAll('"', '\\"') + '"';
    //console.log(jsonData)
    $.ajax({
      url: "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/block",
      type: "PUT",
      data: jsonData,
      datatype: "json",
      contentType: "application/json",
      success: function (result) {
        console.log(JSON.stringify(result));
      },
      error: function (result) {
        //console.log(JSON.stringify(result));
      },
    });
  };

  const displayMessages = (contact, index) => {
    console.log(contact);
    let listingID = contact.listingID;
    $.ajax({
      url:
        "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing/images?listingID=" +
        listingID,
      type: "GET",
      async: true,
      success: function (result) {
        // console.log(result);
        setImage(result["body"][0]);
        setBlocked(contact.blocked);
        $.ajax({
          url:
            "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing/formessages?" +
            "listingID=" +
            listingID,
          type: "GET",
          async: true,
          success: function (result) {
            console.log(result);
            setListingData(result[0]);
            setContactData(contact);
            setImageIndex(index);
          },
          error: function (result) {
            console.log(JSON.stringify(result));
          },
        });
      },
      error: function (result) {
        console.log(JSON.stringify(result));
      },
    });
  };

  const sendMessage = () => {
    if (blocked) {
      alert(
        "Cannot send message. You have blocked (or was blocked by) this user."
      );
      return;
    }
    var message = document.getElementById("message").value;
    if (message.length == 0) {
      return;
    }
    var sender = contactData.user1 == userData.puid;
    var jsonDict = { id: contactData.id, sender: sender, message: message };
    var jsonData = '"' + JSON.stringify(jsonDict).replaceAll('"', '\\"') + '"';
    //console.log(jsonData)
    $.ajax({
      url: "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/conversation",
      type: "PUT",
      data: jsonData,
      datatype: "json",
      contentType: "application/json",
      success: function (result) {
        console.log(JSON.stringify(result));
        setStateChange(!stateChange);
        // getContacts();
      },
      error: function (result) {
        //console.log(JSON.stringify(result));
      },
    });
    //event.preventDefault();
  };

  useEffect(() => {
    console.log(userData);
    var url =
      "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/conversation?puid=" +
      userData["puid"];
    $.ajax({
      url: url,
      type: "GET",
      success: function (result) {
        console.log(result);
        if (result.body != undefined) {
          setContacts(result.body);
        }
      },
      error: function (result) {
        //console.log(JSON.stringify(result));
      },
    });
  }, [userData]);

  return (
    <div className="messageDisplay">
      <Box
        sx={{
          width: "28%",
          backgroundColor: "var(--primary-color)",
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid rgb(202, 199, 199)",
          overflowY: "auto",
        }}
        className="scrollBar"
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center", padding: "10px" }}
        >
          Contacts
        </Typography>
        <Divider
          variant="middle"
          sx={{ borderBottomColor: "var(--text-color)" }}
        />
        {contacts.length > 0
          ? contacts.map((contact, index) => {
              return (
                <Button
                  key={index}
                  startIcon={<Avatar alt="" src={contact.profileImage[0]} />}
                  sx={{
                    height: "10%",
                  }}
                  onClick={() => displayMessages(contact, index)}
                >
                  {contact.name}
                </Button>
              );
            })
          : ""}
      </Box>
      <Box sx={{ width: "72%", backgroundColor: "var(--primary-color)" }}>
        <Box
          sx={{
            height: "8%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            borderBottom: "1px solid rgb(202, 199, 199)",
          }}
        >
          <Box>
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              id="avatarName"
            >
              <Avatar
                sx={{ width: 40, height: 40, mr: 2, ml: 2 }}
                alt="Profile Image"
                src={imageIndex === "" ? "" : contactData.profileImage[0]}
              />
              {contactData.name}
            </Typography>
          </Box>
          <IconButton
            sx={{ mr: 2, color: "inherit" }}
            disabled={contactData === "" ? true : false}
            onClick={block}
          >
            {blocked ? (
              <CheckCircleIcon sx={{ height: 32, width: 32 }} />
            ) : (
              <BlockIcon sx={{ height: 32, width: 32 }} />
            )}
          </IconButton>
        </Box>
        <Box
          sx={{
            height: "82%",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
          className="scrollBar"
        >
          {listingData !== "" ? (
            <InterestedListing listingData={listingData} image={image} />
          ) : (
            ""
          )}
          {/* {conversation !== ""
            ? conversation.map((text) => {
                console.log(text);
                return (
                  <CardContent>
                    <Typography>{text}</Typography>
                  </CardContent>
                );
              })
            : ""} */}
          {contactData !== "" ? (
            <Chat
              contactData={contactData}
              blocked={blocked}
              stateChange={stateChange}
            />
          ) : (
            ""
          )}
          {/* {blocked ? (
            <Typography sx={{ textAlign: "center", color: "red" }}>
              Displaying past messages. You have blocked (or was blocked by)
              this user.
            </Typography>
          ) : (
            ""
          )} */}
        </Box>
        <Box
          sx={{
            height: "10%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderTop: "1px solid rgb(202, 199, 199)",
          }}
        >
          <TextField
            id="message"
            placeholder="Message"
            sx={{ width: "90%" }}
            disabled={contactData === "" ? true : false}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    sx={{ color: "var(--text-color)" }}
                    onClick={sendMessage}
                    disabled={contactData === "" ? true : false}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        {/* <Box class="listing">
          Interested Listing:
          <img src={image} width={"10%"} height={"10%"} alt="textbook" />
          {listing.title}
          <br></br>
          {listing.timeListed}
          <br></br>${listing.price}
        </Box> */}
        {/* <Box class="options">
          <TextField class="refresh" id="refresh" onClick={getContacts} type="submit" value="Refresh" />
          <TextField class="block" id="block" onClick={block} type="button" value="Block/Unblock" />
        </Box> */}
        {/* <Box class="chatDisplay"></Box>
        <Box class="chatInput">
          <TextField type="text" class="input" id="messageInput"></TextField>
          <TextField class="send" id="send" onClick={sendMessage} type="submit" value="Send" />
        </Box> */}
      </Box>
    </div>
  );
};

export default Message;
