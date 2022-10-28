import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Divider,
  InputAdornment,
} from "@mui/material";
import Img from "../logo.png";
import { useNavigate } from "react-router-dom";
import Register from "../component/Register";
import WarningIcon from "@mui/icons-material/Warning";
import $ from "jquery";
import LoadingButton from '@mui/lab/LoadingButton';

const Login = ({setAuth}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const logIn = (event) => {
    console.log(username);
    console.log(password);
    setLoading(true)
    if (username === "" || password === "") {
      setError(true);
      setLoading(false)
    } else {
      // $.ajax({
      //   url: "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/login?username=" + username + '&password=' + password,
      //   type: "GET",
      //   success: function (result) {
      //     console.log(result)
      //     if (result === "Error") {
      //       setError(true)
      //       setAuth(false);
      //     } else {
      //       setAuth(true);
      //       // navigate("/home");
      //     }
      //     setLoading(false)
      //   },
      //   error: function (result) {
      //     console.log(result)
      //   },
      // });
      
      setAuth(true)
      navigate("/home")
    }
    event.preventDefault();
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
        noValidate
        autoComplete="off"
        onSubmit={logIn}
      >
        <img src={Img} height={70} alt="logo"></img>
        <TextField
          label="Purdue Email"
          type="email"
          sx={{ width: "60%" }}
          error={error}
          helperText={
            error
              ? "Email Address or Password incorrect. Please try again."
              : ""
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {error ? <WarningIcon sx={{ color: "red" }} /> : ""}
              </InputAdornment>
            ),
          }}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          sx={{ width: "60%" }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoadingButton
          variant="contained"
          loading={loading}
          disabled={loading}
          sx={{ width: "60%", textTransform: "none", fontSize: 16 }}
          type="submit"
        >
          Log In
        </LoadingButton>
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
      <Register open={open} setOpen={setOpen} setAuth={setAuth}/>
    </Box>
  );
};

export default Login;
