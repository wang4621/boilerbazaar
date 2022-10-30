import './BuyListing.css'
import * as React from 'react';
import { Avatar, Divider, Box, Typography, CardContent, Button, Modal, List, ListItem, ListItemText } from '@mui/material';
import $ from 'jquery';
import { useParams } from "react-router-dom";
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';

// import './SingleListing.css'
// import * as React from 'react';
// import $ from 'jquery';

// import { Avatar, CardHeader, Rating, Divider, Box, Typography, TextField, MenuItem } from '@mui/material';
// import { link, NavLink, useParams } from "react-router-dom";
// function SingleListing() {
//     let params = useParams();
//     let id = params.id;
//     const searchUrl = "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing?listingID=" + id;
//     $.ajax({
//         url: searchUrl,
//         type: 'GET',    
//         success: function (result) {
//             //console.log(result.Items[0].toString.trim())
//             let returnedItems = result.Items;
//             let listingList = [];
//             for (let i = 0; i < returnedItems.length; i++) {
//                 listingList.push({"listingID": returnedItems[i].listingID, "title": returnedItems[i].title, "author": returnedItems[i].author, "isbn": returnedItems[i].isbn, "edition": returnedItems[i].edition, "condition": returnedItems[i].condition, "price": returnedItems[i].price, "description": returnedItems[i].description, "toString": "Title: " + returnedItems[i].title + " Author: " + returnedItems[i].author + " ISBN: " + returnedItems[i].isbn + " Edition: " + returnedItems[i].edition + " Condition: " + returnedItems[i].condition + " Price: " + returnedItems[i].price + " Description: " + returnedItems[i].description});
//             }
//             document.getElementById("listingText").innerHTML = listingList[0].toString;
//         },
//         error: function (result) {
//             alert(JSON.stringify(result));
//         }
//     });
//     return (
//         <div className="listingDisplay">
//             <Typography id="listingText" variant="h6" color="black">
                
//             </Typography>
//         </div>
//     )
// }
// export default SingleListing;



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

function BuyListing() {
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
                console.log("success")
                let listing = result.Items[0];
                
                document.getElementById("title").innerHTML = listing.title;
                document.getElementById("price").innerHTML = "$"+ listing.price;
                document.getElementById("author").innerHTML = "Author: " + listing.author;
                //document.getElementById("details").innerHTML = 
                document.getElementById("isbn").innerHTML = "ISBN: " + listing.isbn;
                document.getElementById("edition").innerHTML = "Edition: " + listing.edition;
                document.getElementById("condition").innerHTML = "Condition: " + listing.condition;
                if (listing.decription != null) {
                    document.getElementById("decription").innerHTML = "Description: " + listing.decription;
                }
                if (listing.views != null) {
                    document.getElementById("views").innerHTML = listing.views + " views";
                } else {
                    document.getElementById("views").innerHTML = 0 + " views";
                }
                
                if (listing.views == null) {
                    listing.views = 1;
                } else {
                    listing.views = listing.views + 1;
                }
                
                // var jsonData = {
                //     listingID: listing.listingID,
                //     sellerID: listing.sellerID,
                //     title: listing.title,
                //     price: listing.price,
                //     author: listing.author,
                //     isbn: listing.isbn,
                //     edition: listing.edition,
                //     course: listing.course,
                //     condition: listing.condition,
                //     description: listing.description,
                //     views: listing.views,
                //   };
                //   jsonData = '"' + JSON.stringify(jsonData).replaceAll('"', '\\"') + '"';
                //   $.ajax({
                //     url: "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing",
                //     type: "PUT",
                //     data: jsonData,
                //     datatype: "json",
                //     contentType: "application/json",
                //     success: function (result) {
                //       console.log(JSON.stringify(result));
                //     },
                //     error: function (result) {
                //       console.log(JSON.stringify(result));
                //     },
                //   });
                
            },
            error: function (result) {
                alert(JSON.stringify(result));
            }
        });

    return (
        <Box sx={{height: '100%', width: '100%', display: 'flex', flexDirection: 'row'}}>
            <Box sx={{ width: '70%', height: '100%', backgroundColor: 'var(--tertiary-color)'}} className="innerLeftBox">
                <Typography variant="h4" color='var(--text-color)'>
                    Listing Preview
                </Typography>
            </Box>
            <Box sx={{ width: '30%', height: '100%', backgroundColor: 'var(--secondary-color)'}} className="innerRightBox">
                <CardContent sx={{wordBreak: 'break-word', overflowY: 'scroll', height:'65%', display:'flex', flexDirection:'column'}} className="scrollBar">
                    <Typography variant="h5" color='var(--text-color)' sx={{fontWeight:'bold'}} id="title">
                        Title
                    </Typography>
                    <Typography variant="h6" color='var(--text-color)' sx={{fontWeight:'bold'}} id="price">
                        Price
                    </Typography>
                    <br/>
                    {/* <Typography variant="h6" color='var(--text-color)' sx={{fontWeight:'bold'}} id="details">
                        Details
                    </Typography> */}
                    <br/>
                    <Typography variant="h6" color='var(--text-color)' sx={{fontWeight:'bold'}} id="author">
                        Author
                        <Typography variant="body1" color='var(--text-color)' id="previewAuthor"/>
                    </Typography>
                    <Typography variant="h6" color='var(--text-color)' sx={{fontWeight:'bold'}} id="isbn">
                        ISBN
                        <Typography variant="body1" color='var(--text-color)' id="previewISBN"/>
                    </Typography>
                    <Typography variant="h6" color='var(--text-color)' sx={{fontWeight:'bold'}} id="edition">
                        Edition
                        <Typography variant="body1" color='var(--text-color)' id="previewEdition"/>
                    </Typography>               
                    <Typography variant="h6" color='var(--text-color)' sx={{fontWeight:'bold'}} id="condition">
                        Condition
                        <Typography variant="body1" color='var(--text-color)' id="previewCondition"/>
                    </Typography>
                    <br/>
                    <Typography variant="h6" color='var(--text-color)' sx={{fontWeight:'bold'}} id="description">
                        Description
                        <Typography variant="body1" color='var(--text-color)' id="previewDescription"/>
                    </Typography>
                    <br/><br/>
                    <Typography variant="h6" color='var(--text-color)' sx={{fontWeight:'light'}} id="views">
                        views
                        <Typography variant="body1" color='var(--text-color)' id="previewCondition"/>
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
                </CardContent>
                <Divider variant='middle' sx={{borderBottomColor: 'var(--text-color)'}}/>
                <CardContent sx={{height: '25%', display: 'flex', flexDirection:'column'}}>
                    <Typography variant="body1" color='var(--text-color)' sx={{fontWeight:'bold', fontSize:18}}>
                        Seller Information
                        <Button variant="outlined" size="small" disabled sx={{float: 'right'}}>Seller Details</Button>
                    </Typography>
                    <br/>
                    <Typography variant="body1" color='var(--text-color)' sx={{display: 'flex', justifyContent:'space-between', alignItems:'center'}} id="avatarName">
                        <Avatar sx={{ width: 40, height: 40 }} alt="" src="" id="avatarPic"/>
                        Jeff Wang
                    </Typography>
                </CardContent>
                <Box sx={{height: '10%', backgroundColor: 'var(--secondary-color)'}} className="innerBottomBox">
                    <Button variant="outlined" disabled sx={{width: '95%', backgroundColor: 'var(--tertiary-color) !important'}}>Message</Button>
                </Box>
            </Box>
        </Box>
    )
}
export default BuyListing;
