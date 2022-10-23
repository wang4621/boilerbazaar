import './SingleListing.css'
import * as React from 'react';
import $ from 'jquery';

import { Avatar, CardHeader, Rating, Divider, Box, Typography, TextField, MenuItem } from '@mui/material';
import { link, NavLink, useParams } from "react-router-dom";
function SingleListing() {
    let params = useParams();
    let id = params.id;
    const searchUrl = "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing?listingID=" + id;
    $.ajax({
        url: searchUrl,
        type: 'GET',    
        success: function (result) {
            //console.log(result.Items[0].toString.trim())
            let returnedItems = result.Items;
            let listingList = [];
            for (let i = 0; i < returnedItems.length; i++) {
                listingList.push({"listingID": returnedItems[i].listingID, "title": returnedItems[i].title, "author": returnedItems[i].author, "isbn": returnedItems[i].isbn, "edition": returnedItems[i].edition, "condition": returnedItems[i].condition, "price": returnedItems[i].price, "description": returnedItems[i].description, "toString": "Title: " + returnedItems[i].title + " Author: " + returnedItems[i].author + " ISBN: " + returnedItems[i].isbn + " Edition: " + returnedItems[i].edition + " Condition: " + returnedItems[i].condition + " Price: " + returnedItems[i].price + " Description: " + returnedItems[i].description});
            }
            document.getElementById("listingText").innerHTML = listingList[0].toString;
        },
        error: function (result) {
            alert(JSON.stringify(result));
        }
    });
    return (
        <div className="listingDisplay">
            <Typography id="listingText" variant="h6" color="black">
                
            </Typography>
        </div>
    )
}
export default SingleListing;
