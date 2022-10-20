import { Divider, Box, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import $ from 'jquery';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Listings() {
    const [listedTextbooks, setListedTextbooks] = useState(<CircularProgress/>);
    const [soldOrAvailable, setSoldOrAvailable] = useState("Mark as Sold");
    const [soldOrAvailableIcon, setSoldOrAvailableIcon] = useState(<CloseIcon/>);
    
    function changeIcon() {
        console.log(soldOrAvailable)
        if (soldOrAvailable === "Mark as Available") {
            setSoldOrAvailable("Mark as Sold")
            setSoldOrAvailableIcon(<CloseIcon/>)
        } else {
            setSoldOrAvailable("Mark as Available")
            setSoldOrAvailableIcon(<CheckIcon/>)
        }
    }

    function generateListingUI(listing) {
        console.log(listing)
        return (
            <Box m={2} sx={{width: '60%', height: '20%', display: 'flex', flexDirection:'row', justifyContent: 'center', backgroundColor:'var(--secondary-color)', borderRadius:5, boxShadow: 8}}>
                <Box sx={{height:'100%', width:'30%', display: 'flex', alignItems:'center', justifyContent:'center'}}>
                    <Box sx={{height:'80%', width:'80%', backgroundColor:'lightgrey', borderRadius:5, display:'flex', justifyContent:'center', alignItems:'center'}}>
                        Image Preview
                    </Box>
                </Box>
                <Box sx={{height:'100%', width:'70%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                    <Box sx={{height: '80%', width: '95%'}}>
                        <Box sx={{height: '80%', width: '100%'}}>
                            <Typography variant='body1' sx={{fontWeight:'bold'}}>
                                {listing['title']}
                            </Typography>
                            <Typography variant='body1'>
                                ${listing['price']}
                            </Typography>
                            <Typography variant='body2'>
                                Listed on 
                            </Typography>
                        </Box>
                        <Box sx={{height: '20%', width: '100%', display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
                            <Button variant='contained' startIcon={soldOrAvailableIcon} sx={{height:'100% !important', width: '35%', borderRadius: '5px !important'}} onClick={changeIcon}>
                                {soldOrAvailable}
                            </Button>
                            <Button variant='contained' startIcon={<EditIcon/>} sx={{height:'100% !important', width: '30%', borderRadius: '5px !important'}}>
                                Edit Listing
                            </Button>
                            <Button variant='contained' startIcon={<DeleteIcon/>} sx={{height:'100% !important', width: '30%', borderRadius: '5px !important'}}>
                                Delete Listing
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    } 

    function generateNoListing() {
        return (
            <Typography variant='h6' sx={{padding:'10px'}}>
                No Listings
            </Typography>
        );
    }

    useEffect(() => {
        // get user textbook listings
        let list = []
        $.ajax({
            url: 'https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/userlisting?puid=' + JSON.parse(localStorage.getItem('userData'))['puid'],
            type: 'GET',
            success: function (result) {
                console.log(JSON.stringify(result));
                if (result.length === 0) {
                    list.push(generateNoListing());
                } else {
                    for (var i = 0; i < result.length; i++) {
                        list.push(generateListingUI(result[i]));
                    }
                }
                setListedTextbooks(list);
            },
            error: function (result) {
                console.log(JSON.stringify(result));
            }
        });
    }, [])

    return (
        <Box sx={{width: '80%', height: '100%', display: 'flex', flexDirection:'column'}}>
            <Box sx={{height: '8%'}}>
                <Typography variant='h6' sx={{fontWeight:'bold', textAlign:'center', padding:'10px'}}>
                    Your Listings
                </Typography>
                <Divider variant='middle' sx={{borderBottomColor: 'var(--text-color)'}}/>
            </Box>
            <Box sx={{height: '94%', display: 'flex', flexDirection:'column', alignItems:'center', overFlowY:'scroll'}}>
                {listedTextbooks}
            </Box>
        </Box>
    )
}

export default Listings;