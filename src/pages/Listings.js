import { Divider, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import $ from 'jquery';

function Listings() {
    useEffect(() => {
        // get user textbook listings
        $.ajax({
            url: 'https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/userlisting?puid=0031888129',
            type: 'GET',
            success: function (result) {
                console.log(result.length)
                console.log(JSON.stringify(result));
            },
            error: function (result) {
                console.log(JSON.stringify(result));
            }
          });
    }, [])

    return (
        <Box sx={{width: '80%', height: '100%', display: 'flex', flexDirection:'column'}}>
            <Typography variant="h6" sx={{fontWeight:'bold', textAlign:'center', padding:'10px'}}>
                Your Listing
            </Typography>
            <Divider variant='middle' sx={{borderBottomColor: 'var(--text-color)'}}/>
        </Box>
    )
}

export default Listings;