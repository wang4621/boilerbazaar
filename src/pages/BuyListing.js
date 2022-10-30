import './BuyListing.css'
import * as React from 'react';
import { Avatar, Divider, Box, Typography, CardContent, Button } from '@mui/material';

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

function BuyListing() {
    return (
        <Box sx={{height: '100%', width: '100%', display: 'flex', flexDirection: 'row'}}>
            <Box sx={{ width: '70%', height: '100%', backgroundColor: 'var(--tertiary-color)'}} className="innerLeftBox">
                <Typography variant="h4" color='var(--text-color)'>
                    Listing Preview
                </Typography>
            </Box>
            <Box sx={{ width: '30%', height: '100%', backgroundColor: 'var(--secondary-color)'}} className="innerRightBox">
                <CardContent sx={{wordBreak: 'break-word', overflowY: 'scroll', height:'65%', display:'flex', flexDirection:'column'}} className="scrollBar">
                    <Typography variant="h5" color='var(--text-color)' sx={{fontWeight:'bold'}} id="previewTitle">
                        Title
                    </Typography>
                    <Typography variant="h6" color='var(--text-color)' sx={{fontWeight:'bold'}} id="previewPrice">
                        Price
                    </Typography>
                    <br/>
                    <Typography variant="h6" color='var(--text-color)' sx={{fontWeight:'bold'}}>
                        Details
                    </Typography>
                    <br/>
                    <Typography variant="h6" color='var(--text-color)' sx={{fontWeight:'bold'}}>
                        Author
                        <Typography variant="body1" color='var(--text-color)' id="previewAuthor"/>
                    </Typography>
                    <Typography variant="h6" color='var(--text-color)' sx={{fontWeight:'bold'}}>
                        ISBN
                        <Typography variant="body1" color='var(--text-color)' id="previewISBN"/>
                    </Typography>
                    <Typography variant="h6" color='var(--text-color)' sx={{fontWeight:'bold'}}>
                        Edition
                        <Typography variant="body1" color='var(--text-color)' id="previewEdition"/>
                    </Typography>               
                    <Typography variant="h6" color='var(--text-color)' sx={{fontWeight:'bold'}}>
                        Condition
                        <Typography variant="body1" color='var(--text-color)' id="previewCondition"/>
                    </Typography>
                    <br/>
                    <Typography variant="h6" color='var(--text-color)' sx={{fontWeight:'bold'}}>
                        Description
                        <Typography variant="body1" color='var(--text-color)' id="previewDescription"/>
                    </Typography>
                    <br/><br/>
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
