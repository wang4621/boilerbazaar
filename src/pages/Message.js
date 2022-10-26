import blank from './blank.jpg'
import {Box, TextField, Typography} from '@mui/material';
import './Message.css';
import $ from 'jquery';
import * as React from 'react';

var contactNames = []
var index = 0
var user = "doan23@purdue.edu"
var rawData = {}

function getContacts() {
    var url = "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/conversation?email=" + user
    $.ajax({
        url: url,
        type: 'GET',
        success: function (result) {
            rawData = result
            contactNames = []
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
            console.log(JSON.stringify(result));
        }
    });
}

function populateContacts() {
    var contactList = document.getElementsByClassName("contactList")[0];
    console.log(contactList)
    contactList.innerHTML = "";
    for (var i = 0; i < contactNames.length; i++) {
        var contact = document.createElement("SPAN");
        contact.id = `contact${i}`
        contact.className = "contact"
        contact.innerHTML += `<img src={${blank}}></img><Typography label="placeholder">${contactNames[i]}</Typography>`
        contact.addEventListener("click", function(e) {
            changeContacts(this.id[7])
        });
        contactList.appendChild(contact);
    }
}

function changeContacts(id) {
    index = parseInt(id)
}

function Message() {
    getContacts();
    return (
        <div class="message">
            <Box class="contactList">
                
            </Box>
            <Box class="chat">
                <Box sx={{overflowY: 'scroll'}} class="chatDisplay">
                    <Typography label="placeholder">placeholder</Typography>
                </Box>
                <Box class="chatInput">
                    <TextField type="text" id="messageInput" label="Message"></TextField>
                    <TextField id="send" type="submit" value="Send"/>
                </Box>
            </Box>
        </div>
    )
}

export default Message;