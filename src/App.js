import { TbMap2 } from 'react-icons/tb';
import './App.css';
import Img from './logo.png'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import Settings from './pages/Settings'
import Home from './pages/Home'
import Sell from './pages/Sell'
import Buy from './pages/Buy'
import About from './pages/About'
import Map from './pages/Map'
import Listings from './pages/Listings'
import Profile from './pages/Profile'
import { Avatar, Menu, MenuItem, IconButton, ListItemIcon } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import * as React from 'react';

function App() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };
    const navigate = useNavigate();
    const toSettings=()=>{
        navigate('/settings/profile',{state:{firstName: 'Jeffrey', lastName: 'Wang', puid: '0031888129', preferredName: 'Jeff', major:'CS', preferredMeetingLocation: 'Public'}});
    }
    return (
        <div className="App">
            <div className="navbar">
                <img src={Img} height={70} alt="logo" style={{"float":"left"}}></img>
                <ul className="centerNav" style={{"margin-right":"10%"}}>
                    <NavLink activeClassName="active" to="/boilerbazaar">Home</NavLink>
                    <NavLink activeClassName="active" to="/buy">Buy</NavLink>
                    <NavLink activeClassName="active" to="/sell">Sell</NavLink>
                    <NavLink activeClassName="active" to="/about">About</NavLink>
                    <NavLink activeClassName="active" to="/map" style={{"margin-top":"5px"}} id="map">
                        <TbMap2 size={28}></TbMap2>
                    </NavLink>
                </ul>
                <IconButton onClick={handleClick} size="large" aria-controls={open ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
                    <Avatar sx={{ width: 35, height: 35 }} src=""/>
                </IconButton>
                <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose}
                    PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 0,
                        '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                        },
                        '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                        },
                    },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                    <MenuItem onClick={()=>{toSettings()}}>
                        <Avatar src=""/> Settings
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </div>
            <Routes>
                <Route path='/boilerbazaar' element={< Home />}/>
                <Route path='/buy' element={< Buy />}/>
                <Route path='/sell' element={< Sell />}/>
                <Route path='/about' element={< About />}/>
                <Route path='/map' element={< Map />}/>
                <Route path='/settings' element={< Settings />}>
                  <Route path='profile' element={< Profile />}/>
                  <Route path='listings' element={< Listings />}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
