import blank from './blank.jpg'
import {Box, TextField, Typography} from '@mui/material';
import './Message.css';
import $ from 'jquery';
import * as React from 'react';

var contactNames = []
var index = 0
var user = "doan23"
var rawData = {}

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
            console.log(JSON.stringify(result));
        }
    });
}

function populateContacts() {
    var contactList = document.getElementsByClassName("contactList")[0];
    //console.log(contactList)
    contactList.innerHTML = "";
    for (var i = 0; i < contactNames.length; i++) {
        var contact = document.createElement("DIV");
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
            //console.log(JSON.stringify(result))
        },
        error: function (result) {
            //console.log(JSON.stringify(result));
        }
    });
    //event.preventDefault();
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

function displayMessages() {
    var messageDisplay = document.getElementsByClassName("chatDisplay")[0];
    console.log('debug')
    messageDisplay.innerHTML = "";
    
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
    console.log(messageDisplay)
}

function Message() {
    React.useEffect(() => {
        getContacts();
        console.log(document.getElementsByClassName("chatDisplay")[0]);
    }, []);
    return (
        <div class="page">
            <Box class="contactList"></Box>
            <Box class="chat">
                <Box class="chatDisplay"></Box>
                <Box class="chatInput">
                    <TextField type="text" class="input" id="messageInput"></TextField>
                    <TextField class="send" id="send" onClick={sendMessage} type="submit" value="Send"/>
                </Box>
            </Box>
        </div>
    )
}

export default Message;