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
import { Avatar, Menu, MenuItem, IconButton, ListItemIcon } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import React, { useEffect, useState } from "react";
import $ from 'jquery';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SettingsIcon from '@mui/icons-material/Settings';

function App() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [data, setData] = React.useState('');
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();
    const toSettings=()=>{
        navigate('/settings/profile',{state: data});
    }
  let root = document.documentElement;
  //Code for dark mode
  const [theme, setTheme] = useState('bodyLight');
  const toggleTheme = () => {
    if (theme === 'bodyLight') {
      updateDarkModePreference("dark");
      setTheme('bodyDark');
      root.style.setProperty('--primary-color', "#1e252e");
      root.style.setProperty('--secondary-color', "#323d4d");
      root.style.setProperty('--tertiary-color', "#161B22");
      root.style.setProperty('--text-color', "#FFFFFF");
    } else {
      updateDarkModePreference("light");
      setTheme('bodyLight');
      root.style.setProperty('--primary-color', "#FFFFFF");
      root.style.setProperty('--secondary-color', "#f5f5f5");
      root.style.setProperty('--tertiary-color', "#DFDFDF");
      root.style.setProperty('--text-color', "#000000");
    }
  };
  //Update dark mode
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  //Get dark mode preference from the database
  useEffect(() => {
    /**
      @todo: add actual puid instead of hardcode
      @todo: remove console output
    **/
    $.ajax({
      url: 'https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/profile?puid=0031888129',
      type: 'GET',
      success: function (result) {
        let returnedItem = result.Item;
        setData(returnedItem);
        if (returnedItem.darkModePreference === 'dark') {
          setTheme('bodyDark');
          root.style.setProperty('--primary-color', "#1e252e");
          root.style.setProperty('--secondary-color', "#323d4d");
          root.style.setProperty('--tertiary-color', "#161B22");
          root.style.setProperty('--text-color', "#FFFFFF");
        }
        else {
          setTheme('bodyLight');
          root.style.setProperty('--primary-color', "#FFFFFF");
          root.style.setProperty('--secondary-color', "#f5f5f5");
          root.style.setProperty('--tertiary-color', "#DFDFDF");
          root.style.setProperty('--text-color', "#000000");
        }
          console.log(JSON.stringify(result));
      },
      error: function (result) {
          console.log(JSON.stringify(result));
      }
    });
  }, []); 

  //Update dark mode preference on the database
  const updateDarkModePreference = (mode) => {
    /**
      @todo: add actual puid instead of hardcode
    **/
    var jsonData = {"puid": "0031888129", "darkModePreference": mode};
    jsonData = "\""+JSON.stringify(jsonData).replaceAll('"', '\\"')+"\""
    $.ajax({
      url: 'https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/profile',
      type: 'PUT',
      data: jsonData,
      datatype: 'json',
      contentType: 'application/json',
      success: function (result) {
          console.log(JSON.stringify(result))
      },
      error: function (result) {
          console.log(JSON.stringify(result));
      }
    });
  };

  return (
      <div className={`${theme}`}>
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
              <div>
                <IconButton sx={{ ml: 1, transform: 'scale(1.3)' }} onClick={toggleTheme} color="inherit">
                  {theme === 'bodyDark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                <IconButton onClick={handleClick} size="large" aria-controls={open ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
                    <Avatar sx={{ width: 35, height: 35 }} src=""/>
                </IconButton>
              </div>
              <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose}
                  PaperProps={{
                  elevation: 0,
                  sx: {
                      overflow: 'visible',
                      backgroundColor: 'var(--primary-color)',
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
                      bgcolor: 'var(--primary-color)',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                      },
                  },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                  <MenuItem onClick={()=>{toSettings()}} sx={{ color: 'var(--text-color)', backgroundColor: 'var(--primary-color)' }}>
                    <ListItemIcon>
                      <SettingsIcon fontSize="small" sx={{ color: 'var(--text-color)'}}/>
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem sx={{ color: 'var(--text-color)', backgroundColor: 'var(--primary-color)' }}>
                    <ListItemIcon>
                        <Logout fontSize="small" sx={{ color: 'var(--text-color)'}}/>
                    </ListItemIcon>
                    Logout
                  </MenuItem>
              </Menu>
          </div>
          <Routes>
              <Route path='/boilerbazaar' element={< Home />}/>
              <Route path='/buy/*' element={< Buy />}/>
              <Route path='/sell' element={< Sell />}/>
              <Route path='/about' element={< About />}/>
              <Route path='/map' element={< Map />}/>
              <Route path='/settings/*' element={< Settings />}/>
          </Routes>
        </div>
      </div>
  );
}

export default App;
