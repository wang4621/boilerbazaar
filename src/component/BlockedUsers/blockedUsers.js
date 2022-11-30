import { useState } from "react";
import * as React from 'react';
import blank from '../Images/blank.jpg'
import { Box, dividerClasses, TextField, Typography } from '@mui/material';
import './BlockedUsers.css';
import $ from 'jquery';

var user;
var blockedUsers;

function getBlockedUsers() {
    var url = "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/block?puid=" + user
    $.ajax({
        url: url,
        type: 'GET',
        success: function (result) {
            blockedUsers = new Map(Object.entries(result["body"]))
            displayResult()
        },
        error: function (result) {
            //console.log(JSON.stringify(result));
        }
    });
}

function displayResult() {
    var blockedList = document.getElementsByClassName("blockedList")[0];
    blockedList.innerHTML = "";
    for (let [blockedUser, state] of blockedUsers) {
        console.log(blockedUser)
        console.log(state)
        if (!state) {
            continue;
        }
        //console.log(user)
        var blockedUserDiv = document.createElement("DIV");
        blockedUserDiv.className = "blockedUser"
        blockedUserDiv.innerHTML += `<span><img src=${blank}></img>${blockedUser}</span>`
        var button = document.createElement("button")
        button.className = "blockButton"
        button.innerHTML = "Unblock"
        button.id = blockedUser
        button.addEventListener("click", function (e) {
            unblock(this.id)
        });
        blockedUserDiv.appendChild(button);
        blockedList.appendChild(blockedUserDiv);
    }
}

function unblock(userToUnblock) {
    if (!window.confirm(`Do you want to unblock ${userToUnblock}?`)) {
        return;
    }
    var jsonData = { "user": user, "blockUser": userToUnblock }
    var jsonData = "\"" + JSON.stringify(jsonData).replaceAll('"', '\\"') + "\""
    //console.log(jsonData)
    $.ajax({
        url: 'https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/block',
        type: 'PUT',
        data: jsonData,
        datatype: 'json',
        contentType: 'application/json',
        success: function (result) {
            console.log(JSON.stringify(result))
            blockedUsers.set(result['body'], false);
            displayResult()
        },
        error: function (result) {
            //console.log(JSON.stringify(result));
        }
    });
}
/*

});*/

const BlockedUsers = ({ userData }) => {
    React.useEffect(() => {
        user = userData["puid"];
        getBlockedUsers()
    }, [userData]);
    return (
        <div class="blockedList"></div>
    )
}

export default BlockedUsers;