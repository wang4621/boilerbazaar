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
    //console.log(contactList)
    contactList.innerHTML = "";
    for (var i = 0; i < contactNames.length; i++) {
        var contact = document.createElement("SPAN");
        contact.id = `contact${i}`
        contact.className = "contact"
        contact.innerHTML += `<img src=${blank}></img><Typography label="placeholder">${contactNames[i]}</Typography>`
        contact.addEventListener("click", function(e) {
            changeContacts(this.id[7])
        });
        contactList.appendChild(contact);
    }
    changeContacts(0)
}

function sendMessage() {
    var input = document.getElementById("messageInput").value;
    if (input.length == 0) {
        return;
    }
    var data = rawData['body'][index];
    var message = [];
    message.push(Date.now());
    message.push(data['user1'] == user);
    message.push(input);
    var jsonDict = {"id": data['id'], "message": message}
    var jsonData = "\""+JSON.stringify(jsonDict).replaceAll('"', '\\"')+"\""
    console.log(jsonData)
    $.ajax({
        url: 'https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/conversation',
        type: 'PUT',
        data: jsonData,
        datatype: 'json',
        contentType: 'application/json',
        success: function (result) {
            console.log(JSON.stringify(result))
        },
        error: function (result) {
            console.log(JSON.stringify(result));
        }
    });
    //event.preventDefault();
}

function changeContacts(id) {
    index = parseInt(id)
    var contactList = document.getElementsByClassName("contactList")[0];
    var children = contactList.children;
    for (var i = 0; i < children.length; i++) {
        if (index == i) {
            children[i].setAttribute("background-color", "lightgray");
        } else {
            children[i].setAttribute("background-color", "white");
        }
    }
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
                    <TextField type="text" class="input" id="messageInput"></TextField>
                    <TextField class="send" id="send" onClick={sendMessage} type="submit" value="Send"/>
                </Box>
            </Box>
        </div>
    )
}

export default Message;