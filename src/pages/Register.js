import React from "react";
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

  const createAccount = () => {
    setOpen(false);
    navigate("/home");
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
          variant="standard"
        />
        <TextField
          margin="dense"
          label="Last Name"
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          label="Purdue Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          label="PUID"
          fullWidth
          variant="standard"
          inputProps={{ maxLength: 10 }}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          label="Confirm Password"
          type="password"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          onClick={createAccount}
          sx={{ backgroundColor: "green", color: "white" }}
        >
          Create New Account
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Register;
