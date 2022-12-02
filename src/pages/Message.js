import blank from "../component/Images/blank.jpg";
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
import "./Message.css";
import $ from "jquery";
import React, { useState, useEffect } from "react";
import { ConstructionOutlined } from "@mui/icons-material";
import { display } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InterestedListing from "../component/BuyListing/InterestedListing";
import Chat from "../component/Chat/Chat";

var contactNames = [];
var index = 0;
var rawData = {};

// function displayMessages() {
//     var messageDisplay = document.getElementsByClassName("chatDisplay")[0];
//     console.log('debug')
//     messageDisplay.innerHTML = "";
//     var listingID = rawData['body'][index]['listingID']
// // gets the images for the textbook
//     // console.log(listing["listingID"])
//     $.ajax({
//     url:
//         "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing/images?listingID=" +
//         listingID,
//     type: "GET",
//     async: true,

//     success: function (result) {
//         // console.log(result);
//         image = result["body"][0];
//     },
//     error: function (result) {
//         console.log(JSON.stringify(result));
//     },
//     });

//       $.ajax({
//         url: "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing?"+"user="+user+"&"+"listingID="+listingID,
//         type: "GET",
//         async: true,
//         success: function (result) {
//           listing = result[0].Items[0]
//         },
//         error: function (result) {
//           console.log(JSON.stringify(result));
//         },
//       });

//     for (const x of rawData['body'][index]['conversation']) {
//         var date = new Date(x[0]);
//         var sender
//         if (x[1]) {
//             sender = rawData['body'][index]['user1']
//         } else {
//             sender = rawData['body'][index]['user0']
//         }
//         var s = `${sender} (${date.toDateString()} ${date.toTimeString().substring(0, 5)}): ${x[2]}\n`
//         var message = document.createElement("DIV");
//         message.className = "message"
//         message.innerHTML = `<Typography>${s}</Typography>`
//         messageDisplay.appendChild(message);
//     }
//     var block = document.getElementById("block");
//     if (rawData['body'][index]['blocked']) {
//         var message = document.createElement("DIV");
//         message.className = "blockedMessage"
//         message.innerHTML = `<Typography>Displaying past messages. You have blocked (or was blocked by) this user.</Typography>`
//         messageDisplay.appendChild(message);
//         block.value = "Unblock";
//     } else {
//         block.value = "Block";
//     }
//     //console.log(messageDisplay)
// }

const Message = ({ userData }) => {
  const [image, setImage] = useState("");
  const [listingData, setListingData] = useState("");
  const [contacts, setContacts] = useState([]);
  const [contactData, setContactData] = useState("");
  const [blocked, setBlocked] = useState(false);
  // const [conversation, setConversation] = useState("");
  const [stateChange, setStateChange] = useState(false);

  const block = () => {
    // var block = document.getElementById("block");
    // if (rawData["body"][index]["blocked"]) {
    //   if (!window.confirm(`Do you want to unblock ${contactNames[index]}?`)) {
    //     return;
    //   }
    // } else {
    //   if (!window.confirm(`Do you want to block ${contactNames[index]}?`)) {
    //     return;
    //   }
    // }
    if (blocked) {
      if (!window.confirm(`Do you want to unblock ${contactNames[index]}?`)) {
        return;
      }
    } else {
      if (!window.confirm(`Do you want to block ${contactNames[index]}?`)) {
        return;
      }
    }
    setBlocked(!blocked);
    // rawData["body"][index]["blocked"] = !rawData["body"][index]["blocked"];
    // var jsonData = { user: userData["puid"], blockUser: contactNames[index] };
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

  const displayMessages = (contact) => {
    console.log(contact);
    // var messageDisplay = document.getElementsByClassName("chatDisplay")[0];
    // console.log("debug");
    // messageDisplay.innerHTML = "";
    // let listingID = rawData["body"][index]["listingID"];
    let listingID = contact.listingID;
    // // gets the images for the textbook
    // // console.log(listing["listingID"])
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

    // for (const x of rawData["body"][index]["conversation"]) {
    //   var date = new Date(x[0]);
    //   var sender;
    //   if (x[1]) {
    //     sender = rawData["body"][index]["user1"];
    //   } else {
    //     sender = rawData["body"][index]["user0"];
    //   }
    //   var s = `${sender} (${date.toDateString()} ${date.toTimeString().substring(0, 5)}): ${x[2]}\n`;
    //   var message = document.createElement("DIV");
    //   message.className = "message";
    //   message.innerHTML = `<Typography>${s}</Typography>`;
    //   messageDisplay.appendChild(message);
    // }
    // let chatText = [];
    // for (const x of contact.conversation) {
    //   var date = new Date(x[0]);
    //   let sender = "";
    //   if (x[1]) {
    //     sender = contact["user1"];
    //   } else {
    //     sender = contact["user0"];
    //   }
    //   var s = `${sender} (${date.toDateString()} ${date
    //     .toTimeString()
    //     .substring(0, 5)}): ${x[2]}\n`;
    //   chatText.push(s);
    // }

    // setConversation(chatText);

    // var block = document.getElementById("block");
    // if (rawData["body"][index]["blocked"]) {
    //   var message = document.createElement("DIV");
    //   message.className = "blockedMessage";
    //   message.innerHTML = `<Typography>Displaying past messages. You have blocked (or was blocked by) this user.</Typography>`;
    //   messageDisplay.appendChild(message);
    //   block.value = "Unblock";
    // } else {
    //   block.value = "Block";
    // }
    //console.log(messageDisplay)
  };

  //   function changeContacts(id) {
  //     index = parseInt(id);
  //     var contactList = document.getElementsByClassName("contactList")[0];
  //     var children = contactList.children;
  //     displayMessages();
  //     for (var i = 0; i < children.length; i++) {
  //       if (index == i) {
  //         children[i].setAttribute("background-color", "lightgray");
  //       } else {
  //         children[i].setAttribute("background-color", "white");
  //       }
  //     }
  //   }

  //   function populateContacts() {
  //     var contactList = document.getElementsByClassName("contactList")[0];
  //     //console.log(contactList)
  //     contactList.innerHTML = "";
  //     for (var i = 0; i < contactNames.length; i++) {
  //       var contact = document.createElement("DIV");
  //       contact.id = `contact${i}`;
  //       contact.className = "contact";
  //       contact.innerHTML += `<img src=${blank}></img><Typography label="placeholder">${contactNames[i]}</Typography>`;
  //       contact.addEventListener("click", function (e) {
  //         changeContacts(this.id[7]);
  //       });
  //       contactList.appendChild(contact);
  //     }
  //     changeContacts(index);
  //   }

  const sendMessage = () => {
    // if (rawData["body"][index]["blocked"]) {
    //   alert("Cannot send message. You have blocked (or was blocked by) this user.");
    //   return;
    // }
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
    // var data = rawData["body"][index];
    //console.log(data['user1'])
    // var sender = data["user1"] == userData["puid"];
    var sender = contactData.user1 == userData.puid
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
        setStateChange(!stateChange)
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
        rawData = result;
        contactNames = [];
        console.log(result);
        for (const x of result["body"]) {
          if (x["user0"] != userData["puid"]) {
            contactNames.push({
              name: x["user0"],
              listingID: x["listingID"],
              blocked: x["blocked"],
              id: x["id"],
              user1: x['user1'],
              user0: x['user0']
            });
          } else {
            contactNames.push({
              name: x["user1"],
              listingID: x["listingID"],
              blocked: x["blocked"],
              id: x["id"],
              user1: x['user1'],
              user0: x['user0']
            });
          }
        }
        setContacts(contactNames);
        // populateContacts();
      },
      error: function (result) {
        //console.log(JSON.stringify(result));
      },
    });
  }, [userData]);

  return (
    <div class="messageDisplay">
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
          sx={{ borderBottomColor: "var(--text-color)"}}
        />
        {contacts.map((contact) => {
          return (
            <Button
              startIcon={<Avatar />}
              sx={{
                height: "10%",
              }}
              onClick={() => displayMessages(contact)}
            >
              {contact.name}
            </Button>
          );
        })}
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
                alt=""
                src=""
                id="avatarPic"
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
            <Chat contactData={contactData} blocked={blocked} stateChange={stateChange}/>
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
