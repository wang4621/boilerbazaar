import blank from '../component/Images/blank.jpg'
import {Box, TextField, Typography} from '@mui/material';
import './Message.css';
import $ from 'jquery';
import React, { useState, useEffect } from "react";
import { ConstructionOutlined } from '@mui/icons-material';
import { display } from '@mui/system';

var contactNames = []
var index = 0
var rawData = {}
var user








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

function block() {
    var block = document.getElementById("block");
    if (rawData['body'][index]['blocked']) {
        if (!window.confirm(`Do you want to unblock ${contactNames[index]}?`)) {
            return;
        }
    } else {
        if (!window.confirm(`Do you want to block ${contactNames[index]}?`)) {
            return;
        }
    }
    rawData['body'][index]['blocked'] = !rawData['body'][index]['blocked']
    var jsonData = {"user": user, "blockUser": contactNames[index]}
    var jsonData = "\""+JSON.stringify(jsonData).replaceAll('"', '\\"')+"\""
    //console.log(jsonData)
    $.ajax({
        url: 'https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/block',
        type: 'PUT',
        data: jsonData,
        datatype: 'json',
        contentType: 'application/json',
        success: function (result) {
            console.log(JSON.stringify(result))
        },
        error: function (result) {
            //console.log(JSON.stringify(result));
        }
    });
}

const Message = ({ userData }) => {
    const [image, setImage] = useState("");
    const [listing, setListing] = useState("");
    const [profileImage, setprofileImage] = useState([]);

    function displayMessages() {
        var messageDisplay = document.getElementsByClassName("chatDisplay")[0];
        console.log('debug')
        messageDisplay.innerHTML = "";
        var listingID = rawData['body'][index]['listingID']
    // gets the images for the textbook
        // console.log(listing["listingID"])
        $.ajax({
        url:
            "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing/images?listingID=" +
            listingID,
        type: "GET",
        async: true,
    
        success: function (result) {
            // console.log(result);
            setImage(result["body"][0])
        },
        error: function (result) {
            console.log(JSON.stringify(result));
        },
        });
        
        
          $.ajax({
            url: "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing?"+"user="+user+"&"+"listingID="+listingID,
            type: "GET",
            async: true,
            success: function (result) {
              setListing(result.Items[0])
            },
            error: function (result) {
              console.log(JSON.stringify(result));
            },
          });
        
    
    
    
        for (const x of rawData['body'][index]['conversation']) {
            var date = new Date(x[0]);
            var sender
            if (x[1]) {
                sender = rawData['body'][index]['user1']
            } else {
                sender = rawData['body'][index]['user0']
            }
            var s = `${sender} (${date.toDateString()} ${date.toTimeString().substring(0, 5)}): ${x[2]}\n`
            var message = document.createElement("DIV");
            message.className = "message"
            message.innerHTML = `<Typography>${s}</Typography>`
            messageDisplay.appendChild(message);
        }
        var block = document.getElementById("block");
        if (rawData['body'][index]['blocked']) {
            var message = document.createElement("DIV");
            message.className = "blockedMessage"
            message.innerHTML = `<Typography>Displaying past messages. You have blocked (or was blocked by) this user.</Typography>`
            messageDisplay.appendChild(message);
            block.value = "Unblock";
        } else {
            block.value = "Block";
        }
        //console.log(messageDisplay)
    }

    function changeContacts(id) {
        index = parseInt(id)
        var contactList = document.getElementsByClassName("contactList")[0];
        var children = contactList.children;
        displayMessages()
        for (var i = 0; i < children.length; i++) {
            if (index == i) {
                children[i].setAttribute("background-color", "lightgray");
            } else {
                children[i].setAttribute("background-color", "white");
            }
        }
    }

    function populateContacts() {
        var contactList = document.getElementsByClassName("contactList")[0];
        //console.log(contactList)
        contactList.innerHTML = "";
        for (var i = 0; i < contactNames.length; i++) {
            //get profile pic
            $.ajax({
                url:
                "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing/images?listingID=" +
                contactNames[i],
                type: "GET",
                async: true,
                success: function (result) {
                let resultImage = result["body"]["0"];
                console.log(resultImage)
                setprofileImage(profileImage => [...profileImage, resultImage]);
                },
                error: function (result) {
                console.log(JSON.stringify(result));
                },
            });
            console.log(profileImage)


            var contact = document.createElement("DIV");
            contact.id = `contact${i}`
            contact.className = "contact"
            contact.innerHTML += `<img src=${profileImage}></img><Typography label="placeholder">${contactNames[i]}</Typography>`
            contact.addEventListener("click", function(e) {
                changeContacts(this.id[7])
            });
            contactList.appendChild(contact);
        }
        changeContacts(index)
    }
    function getContacts() {
        var url = "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/conversation?puid=" + user
        $.ajax({
            url: url,
            type: 'GET',
            success: function (result) {
                rawData = result
                contactNames = []
                console.log(rawData)
                for (const x of rawData['body']) {
                    if (x['user0'] != user) {
                        contactNames.push(x['user0'])
                    } else {
                        contactNames.push(x['user1'])
                    }
                }
                populateContacts()
            },
            error: function (result) {
                //console.log(JSON.stringify(result));
            }
        });
    }

    function sendMessage() {
        if (rawData['body'][index]['blocked']) {
            alert("Cannot send message. You have blocked (or was blocked by) this user.")
            return
        }
        var message = document.getElementById("messageInput").value;
        if (message.length == 0) {
            return;
        }
        var data = rawData['body'][index];
        //console.log(data['user1'])
        var sender = data['user1'] == user
        var jsonDict = {"id": data['id'], "sender": sender, "message": message}
        var jsonData = "\""+JSON.stringify(jsonDict).replaceAll('"', '\\"')+"\""
        //console.log(jsonData)
        $.ajax({
            url: 'https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/conversation',
            type: 'PUT',
            data: jsonData,
            datatype: 'json',
            contentType: 'application/json',
            success: function (result) {
                console.log(JSON.stringify(result))
                getContacts();
            },
            error: function (result) {
                //console.log(JSON.stringify(result));
            }
        });
        //event.preventDefault();
    }

    React.useEffect(() => {
        user = userData["puid"];
        console.log(userData);
        getContacts();
    }, [userData]);
    return (
        <div class="page">
            <Box class="contactList"></Box>
            <Box class="chat">
            
                
                <Box class="options">
                    <TextField class="refresh" id="refresh" onClick={getContacts} type="submit" value="Refresh"/>
                    <TextField class="block" id="block" onClick={block} type="button" value="Blocked"/>
                    
                </Box>
                <Box class="chatDisplay"></Box>
                <Box class="chatInput">
                    <TextField type="text" class="input" id="messageInput"></TextField>
                    <TextField class="send" id="send" onClick={sendMessage} type="submit" value="Send"/>
                </Box>
            </Box>
            <Box class="listing">
                <Box class="listingImage">
                        Interested Listing:
                        <img src={image} width={"100%"} height={"100%"} alt="textbook" />
                        
                </Box>
                <Box class="listingData">
                        {listing.title}
                        <br></br>
                        {listing.timeListed}
                        <br></br>
                        ${listing.price}
                </Box>
            </Box>
            
        </div>
    )
}

export default Message;