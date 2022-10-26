import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const Register = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [puid, setPUID] = useState("");


  const createAccount = () => {
    console.log(password);
    console.log(confirmPassword);
    if (password != confirmPassword) {
      setPasswordError(true)
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
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="First Name"
          type="email"
          fullWidth
          required
          // variant="standard"
        />
        <TextField
          margin="dense"
          label="Last Name"
          fullWidth
          required
          // variant="standard"
        />
        <TextField
          margin="dense"
          label="Purdue Email Address"
          type="email"
          fullWidth
          required
          // variant="standard"
        />
        <TextField
          margin="dense"
          label="PUID"
          fullWidth
          required
          // variant="standard"
          inputProps={{ maxLength: 10 }}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          required
          // variant="standard"
          error={passwordError}
          helperText={passwordError ? "Passwords do not match." : ""}
          onChange={e=>setPassword(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Confirm Password"
          type="password"
          fullWidth
          required
          error={passwordError}
          helperText={passwordError ? "Passwords do not match." : ""}
          onChange={e=>setConfirmPassword(e.target.value)}
          // variant="standard"
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
