import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import WarningIcon from '@mui/icons-material/Warning';

const Register = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(false);
  const [puid, setPUID] = useState("");
  const [puidError, setPUIDError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const changeInput = (event) => {
    if (event.target.id === "puid") {
      if (isNaN(event.target.value)) {
        event.target.value = event.target.value.slice(0, -1);
      }
      if (event.target.value !== "") {
        setPUIDError(false);
      }
    }
  };

  const createAccount = () => {
    console.log(password);
    console.log(confirmPassword);
    if (firstName === "") {
      setFirstNameError(true);
    }
    if (lastName === "") {
      setLastNameError(true);
    }
    if (puid === "") {
      setPUIDError(true);
    }
    if (email === "") {
      setEmailError(true);
    }
    if (
      password !== confirmPassword ||
      password === "" ||
      confirmPassword === ""
    ) {
      setPasswordError(true);
    } else {
      setOpen(false);
      navigate("/home");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Sign Up
        <IconButton sx={{ float: "right" }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{
            "& .MuiFormHelperText-root": {
              marginLeft:0,
            },
          }}
          >
        <TextField
          autoFocus
          margin="dense"
          label="First Name"
          fullWidth
          required
          inputProps={{ maxLength: 15 }}
          InputProps={{ endAdornment: <InputAdornment position="end">{passwordError ? <WarningIcon sx={{color:'red'}}/> : ''}</InputAdornment> }}
          error={firstNameError}
          helperText={firstNameError ? "Please enter a first name." : ""}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Last Name"
          fullWidth
          required
          inputProps={{ maxLength: 15 }}
          InputProps={{ endAdornment: <InputAdornment position="end">{passwordError ? <WarningIcon sx={{color:'red'}}/> : ''}</InputAdornment> }}
          error={lastNameError}
          helperText={lastNameError ? "Please enter a last name." : ""}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Purdue Email Address"
          type="email"
          fullWidth
          required
          error={emailError}
          helperText={emailError ? "Please enter your Purdue email." : ""}
          InputProps={{ endAdornment: <InputAdornment position="end">{passwordError ? <WarningIcon sx={{color:'red'}}/> : ''}</InputAdornment> }}
          id="email"
          // onChange={changeInput}
        />
        <TextField
          margin="dense"
          label="PUID"
          fullWidth
          required
          id="puid"
          error={puidError}
          helperText={puidError ? "Please enter your PUID." : ""}
          inputProps={{ maxLength: 10 }}
          InputProps={{ endAdornment: <InputAdornment position="end">{passwordError ? <WarningIcon sx={{color:'red'}}/> : ''}</InputAdornment> }}
          onChange={changeInput}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          inputProps={{ maxLength: 30 }}
          InputProps={{ endAdornment: <InputAdornment position="end">{passwordError ? <WarningIcon sx={{color:'red'}}/> : ''}</InputAdornment> }}
          fullWidth
          required
          error={passwordError}
          helperText={passwordError ? "Passwords do not match." : ""}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Confirm Password"
          type="password"
          fullWidth
          inputProps={{maxLength: 30}}
          InputProps={{ endAdornment: <InputAdornment position="end">{passwordError ? <WarningIcon sx={{color:'red'}}/> : ''}</InputAdornment> }}
          required
          error={passwordError}
          helperText={passwordError ? "Passwords do not match." : ""}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={createAccount}
          color="success"
          // sx={{ backgroundColor: "green", color: "white" }}
        >
          Create New Account
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Register;
