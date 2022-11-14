import { TbMap2 } from "react-icons/tb";
import "./MainPage.css";
import logo from "./component/Images/logo.png";
import { Routes, Route, NavLink, useNavigate, Navigate } from "react-router-dom";
import Settings from "./pages/Settings";
import Home from "./pages/Home";
import Sell from "./pages/Sell";
import Buy from "./pages/Buy";
import About from "./pages/About";
import Map from "./pages/Map";
import Message from "./pages/Message"
import Listings from "./component/ProfileListing/Listings";
import Watchlist from "./component/Watchlist/Watchlist";
import Profile from "./pages/Profile";
import ViewingHistory from "./component/ViewingHistory/ViewingHistory";
import SharedListing from "./component/BuyListing/SharedListing";
import blockedUsers from "./component/BlockedUsers/blockedUsers"
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import React, { useEffect, useState } from "react";
import $ from "jquery";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SettingsIcon from "@mui/icons-material/Settings";
import MissingRoute from "./component/MissingRoute";

const MainPage = ({ username, setAuth }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userData, setUserData] = React.useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const toSettings = () => {
    navigate("/settings/profile");
  };
  let root = document.documentElement;
  //Code for dark mode
  const [theme, setTheme] = useState("bodyLight");
  const toggleTheme = () => {
    if (theme === "bodyLight") {
      updateDarkModePreference("dark");
      setTheme("bodyDark");
      root.style.setProperty("--primary-color", "#1e252e");
      root.style.setProperty("--secondary-color", "#323d4d");
      root.style.setProperty("--tertiary-color", "#161B22");
      root.style.setProperty("--text-color", "#FFFFFF");
      root.style.setProperty("--background-color", "#000000");
    } else {
      updateDarkModePreference("light");
      setTheme("bodyLight");
      root.style.setProperty("--primary-color", "#FFFFFF");
      root.style.setProperty("--secondary-color", "#f5f5f5");
      root.style.setProperty("--tertiary-color", "#DFDFDF");
      root.style.setProperty("--text-color", "#000000");
      root.style.setProperty("--background-color", "rgb(233, 233, 233)");
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
      url:
        "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/profile?puid=" +
        username,
      type: "GET",
      success: function (result) {
        // localStorage.setItem('userData', JSON.stringify(result))
        console.log(result);
        setUserData(result);
        if (result.darkModePreference === "dark") {
          setTheme("bodyDark");
          root.style.setProperty("--primary-color", "#1e252e");
          root.style.setProperty("--secondary-color", "#323d4d");
          root.style.setProperty("--tertiary-color", "#161B22");
          root.style.setProperty("--text-color", "#FFFFFF");
          root.style.setProperty("--background-color", "#000000");
        } else {
          setTheme("bodyLight");
          root.style.setProperty("--primary-color", "#FFFFFF");
          root.style.setProperty("--secondary-color", "#f5f5f5");
          root.style.setProperty("--tertiary-color", "#DFDFDF");
          root.style.setProperty("--text-color", "#000000");
          root.style.setProperty("--background-color", "rgb(233, 233, 233)");
        }
        // console.log(JSON.stringify(result));
      },
      error: function (result) {
        console.log(JSON.stringify(result));
      },
    });
  }, []);

  //Update dark mode preference on the database
  const updateDarkModePreference = (mode) => {
    /**
      @todo: add actual puid instead of hardcode
    **/
    var jsonData = { puid: username, darkModePreference: mode };
    jsonData = '"' + JSON.stringify(jsonData).replaceAll('"', '\\"') + '"';
    $.ajax({
      url: "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/profile",
      type: "PUT",
      data: jsonData,
      datatype: "json",
      contentType: "application/json",
      success: function (result) {
        console.log(JSON.stringify(result));
      },
      error: function (result) {
        console.log(JSON.stringify(result));
      },
    });
  };

  const logout = () => {
    setAuth(false);
    localStorage.clear()
    navigate("/boilerbazaar");
  };

  return (
    <div className={`${theme}`}>
      <div className="navbar">
        <img src={logo} height={70} alt="logo" style={{ float: "left" }}></img>
        <ul className="centerNav" style={{ marginRight: "0%" }}>
          <NavLink activeclassname="active" to="/home">
            Home
          </NavLink>
          <NavLink activeclassname="active" to="/buy">
            Buy
          </NavLink>
          <NavLink activeclassname="active" to="/sell">
            Sell
          </NavLink>
          <NavLink activeclassname="active" to="/message">
            Message
          </NavLink>
          <NavLink activeclassname="active" to="/about">
            About
          </NavLink>
          <NavLink
            activeclassname="active"
            to="/map"
            style={{ marginTop: "5px" }}
            id="map"
          >
            <TbMap2 size={28}></TbMap2>
          </NavLink>
        </ul>
        <div>
          <IconButton
            sx={{ ml: 1, transform: "scale(1.3)" }}
            onClick={toggleTheme}
            color="inherit"
          >
            {theme === "bodyDark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton
            onClick={handleClick}
            size="large"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 35, height: 35 }} src="" />
          </IconButton>
        </div>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              backgroundColor: "var(--primary-color)",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 0,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "var(--primary-color)",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            onClick={() => {
              toSettings();
            }}
            sx={{
              color: "var(--text-color)",
              backgroundColor: "var(--primary-color)",
            }}
          >
            <ListItemIcon>
              <SettingsIcon
                fontSize="small"
                sx={{ color: "var(--text-color)" }}
              />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem
            sx={{
              color: "var(--text-color)",
              backgroundColor: "var(--primary-color)",
            }}
            onClick={logout}
          >
            <ListItemIcon>
              <Logout fontSize="small" sx={{ color: "var(--text-color)" }} />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route exact path="/buy" element={<Buy userData={userData}/>}>
          <Route path=":id" element={<SharedListing/>}/>
        </Route>
        <Route path="/sell" element={<Sell userData={userData} />} />
        <Route path="/message" element={<Message userData={userData}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/map" element={<Map />} />
        <Route path="/settings" element={<Settings />}>
          <Route
            path="profile"
            element={<Profile userData={userData} setUserData={setUserData} />}
          />
          <Route path="listings" element={<Listings userData={userData} />} />
          <Route path="watchlist" element={<Watchlist userData={userData} />} />
          <Route path="viewingHistory" element={<ViewingHistory userData={userData} />} />
          <Route path="blockedUsers" element={<blockedUsers userData={userData} />} />
        </Route>
        <Route path="*" element={<Navigate to="/404" replace />}/>
        <Route path="/404" element={<MissingRoute/>}/>
      </Routes>
    </div>
  );
};

export default MainPage;
