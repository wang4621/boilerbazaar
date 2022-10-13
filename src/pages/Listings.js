import { Avatar, CardHeader, Rating, Divider, Box, Typography, Button, TextField, MenuItem } from '@mui/material';
import * as React from 'react';

function Listings() {
    return (
        <Box sx={{width: '85%', height: '100%', display: 'flex', flexDirection:'row'}}>
            <Box sx={{width: '100%', height: '100%', display: 'flex', justifyContent:'center', alignItems:'center'}}>
                <Typography variant="h6" color="black">
                    You have no listings
                </Typography>
            </Box>
        </Box>
    )
}

export default Listings;