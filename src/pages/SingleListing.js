import './SingleListing.css';
import * as React from 'react';
import $ from 'jquery';

import { Avatar, CardHeader, Rating, Divider, Box, Typography, TextField, MenuItem, Button, Modal, Dialog, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { link, NavLink, useParams } from "react-router-dom";
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };



function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    alert("Copied to Clipboard");

}

function SingleListing() {
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const address =  window.location.href;
    let params = useParams();
    let id = params.id;
    const searchUrl = "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing?listingID=" + id;
    $.ajax({
        url: searchUrl,
        type: 'GET',    
        success: function (result) {
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
            <Button onClick={handleOpen}>Share</Button>
            <Modal
                open={open}
                onClose={handleClose}
                
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Share Options
                </Typography>
                <List>
                    <ListItem>
                        <IconButton color="inherit" target="_blank" onClick={copyLink} rel="noopener noreferrer">
                            <InsertLinkIcon/>
                        </IconButton>
                        <ListItemText primary="Copy Link" />
                    </ListItem>
                    <ListItem>
                        <IconButton color="inherit" target="_blank" href={"mailto:?subject=Check out this textbook listing&body=Link to textbook: " + address} rel="noopener noreferrer">
                            <EmailIcon/>
                        </IconButton>
                        <ListItemText primary="Email" />
                    </ListItem>
                    <ListItem>
                        <div id="fb-root"></div>
                        <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v15.0" nonce="eGYQgFrV"></script>
                        <div data-href={address}></div>
                        <IconButton color="inherit" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A3000%2Fbuy%2Flisting%2F707647ad-bb0a-41ee-b899-0fbef8c6269c&amp;src=sdkpreparse" >
                            <FacebookIcon/>
                        </IconButton>
                        <ListItemText primary="Facebook" />
                    </ListItem>
                </List>
                </Box>
            </Modal>
        </div>
    )
}
export default SingleListing;
