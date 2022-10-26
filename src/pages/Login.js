import React, { useState } from "react";
import { Box, Button, Typography, TextField, Divider, InputAdornment } from "@mui/material";
import Img from "../logo.png";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import WarningIcon from '@mui/icons-material/Warning';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const logIn = () => {
    if (username === '' || password === '') {
        setError(true);
    } else {
        navigate("/home");
    }
  };

  const register = () => {
    setOpen(true);
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: 8,
          height: "70%",
          width: "50%",
          borderRadius: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          "& > :not(style)": { m: 1 },
        }}
        component="form"
        autoComplete="off"
      >
        <img src={Img} height={70} alt="logo"></img>
        <TextField
          label="Purdue Email"
          type="email"
          sx={{ width: "60%" }}
          error={error}
          helperText={error ? "Email Address or Password incorrect. Please try again." : ''}
          InputProps={{endAdornment: <InputAdornment position="end">{error ? <WarningIcon sx={{color:'red'}}/> : ''}</InputAdornment>}}
          onChange={e=>setUsername(e.target.value)}
        />
        <TextField label="Password" type="password" sx={{ width: "60%" }} />
        <Button
          variant="contained"
          onClick={logIn}
          sx={{ width: "60%", textTransform: "none", fontSize: 16 }}
          onChange={e=>setPassword(e.target.value)}
        >
          Log In
        </Button>
        <Divider sx={{ width: "80%" }} />
        <Typography variant="body1">Don't have an account?</Typography>
        <Button
          variant="contained"
          onClick={register}
          sx={{
            // backgroundColor: "green",
            // color: "white",
            width: "40%",
            textTransform: "none",
            fontSize: 16,
          }}
          color="success"
        >
          Sign Up
        </Button>
      </Box>
      <Register open={open} setOpen={setOpen} />
    </Box>
  );
};

export default Login;
