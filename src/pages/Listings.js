import { Divider, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import $ from 'jquery';

function Listings() {
    const [listedTextbooks, setListedTextbooks] = useState(<CircularProgress/>);
    function generateListingUI(listing) {
        console.log(listing)
        return (
            <Box m={2} pt={1} sx={{width: '50%', height: '20%', display: 'flex', flexDirection:'column', backgroundColor:'var(--secondary-color)', borderRadius:5, boxShadow: 8}}>
                <Typography variant='h5'>
                    {listing['title']}
                </Typography>
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
            <Box sx={{height: '6%'}}>
                <Typography variant='h6' sx={{fontWeight:'bold', textAlign:'center', padding:'10px'}}>
                    Your Listings
                </Typography>
                <Divider variant='middle' sx={{borderBottomColor: 'var(--text-color)'}}/>
            </Box>
            <Box sx={{height: '94%', display: 'flex', flexDirection:'column', alignItems:'center'}}>
                {listedTextbooks}
            </Box>
        </Box>
    )
}

export default Listings;