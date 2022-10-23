import blank from './blank.jpg'
import {Box, TextField, Typography} from '@mui/material';
import './Message.css';
import * as React from 'react';

var contacts = []
var contactsImages = []
var index = 0
var user = "doan23@purdue.edu"

function getContacts() {
    var url = "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/conversation?email=" + user
    
}

function changeContact() {

}

function Message() {
    return (
        <div class="message">
            <Box class="contactList">
                <span class="contact">
                    <img src={blank}></img>
                    <Typography label="placeholder">placeholder</Typography>
                </span>
                <span class="contact">
                    <img src={blank}></img>
                    <Typography label="placeholder">placeholder</Typography>
                </span>
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