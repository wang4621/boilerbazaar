import './Settings.css'
import { Box, Button, Typography } from '@mui/material';
import * as React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function Settings() {
    return (
        <div className="settingsDisplay">
            <Box sx={{width: '100%', height: '100%', backgroundColor: 'var(--primary-color)', display: 'flex', flexDirection:'column'}}>
                <div className="profileBoxDisplay">
                    <Box sx={{width: '20%', height: '100%', backgroundColor: 'var(--secondary-color)'}} className="diffSettings">
                        <Typography variant="h5" sx={{fontWeight:'bold', textAlign:'center', padding:'10px'}}>
                            Settings
                        </Typography>
                        {/* <Divider variant='middle' sx={{borderBottomColor: 'var(--text-color)'}}/> */}
                        <Button activeClassName="active" component={NavLink} to="profile">Profile</Button>
                        <Button activeClassName="active" component={NavLink} to="listings">Listings</Button>
                        <Button activeClassName="active" component={NavLink} to="watchlist">Watchlist</Button>
                        <Button activeClassName="active" component={NavLink} to="viewingHistory">Viewing History</Button>
                        <Button activeClassName="active" component={NavLink} to="blockedUsers">Blocked Users</Button>
                        <Button activeClassName="active" component={NavLink} to="ratings">Ratings</Button>
                        <Button activeClassName="active" component={NavLink} to="following">Following</Button>
                        {/* <Button activeClassName="active" component={NavLink} to="giveRatings">Ratings to Give</Button> */}
                    </Box>
                    {/* when adding route to profile, make sure that when creating the new page that the width of the box is 85% */}
                    <Outlet/>
                </div>
            </Box>
        </div>
    )
}
export default Settings;