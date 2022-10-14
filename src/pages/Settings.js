import './Settings.css'
import { CardHeader, Divider, Box, Button } from '@mui/material';
import * as React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Profile from './Profile'
import Listings from './Listings'

function Settings() {
    return (
        <div className="settingsDisplay">
            <Box sx={{width: '85%', height: '90%', backgroundColor: 'var(--primary-color)', borderRadius: 5, display: 'flex', flexDirection:'column', boxShadow: 8}}>
                <CardHeader title="Settings" sx={{textAlign: 'center', height: "7%"}}/>
                <Divider variant='fullWidth' sx={{borderBottomColor: 'black'}}/>
                <div className="profileBoxDisplay">
                    <Box sx={{width: '15%', height: '100%', backgroundColor: 'var(--secondary-color)'}} className="diffSettings">
                        <Button activeClassName="active" component={NavLink} to="profile">Profile</Button>
                        <Button activeClassName="active" component={NavLink} to="listings">Listings</Button>
                    </Box>
                    {/* when adding route to profile, make sure that when creating the new page that the width of the box is 85% */}
                    <Routes>
                        <Route path='profile' element={< Profile />}/>
                        <Route path='listings' element={< Listings />}/>
                    </Routes>
                </div>
            </Box>
        </div>
    )
}
export default Settings;