import './BuyListing.css'
import * as React from 'react';
import { Avatar, Divider, Box, Typography, CardContent, Button } from '@mui/material';

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
