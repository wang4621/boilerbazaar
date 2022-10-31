import React, {useState} from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteIcon from '@mui/icons-material/Delete';
import $ from "jquery";

const DeleteListing = ({
  listingId,
  open,
  setOpen,
  stateChange,
  setStateChange,
}) => {
  const [loading, setLoading] = useState(false);
  const deleteClose = () => {
    setOpen(false);
  };

  const deleteListing = () => {
    // create loading when it is deleting
    setLoading(true)
    $.ajax({
      url:
        "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing?listingID=" +
        listingId,
      type: "DELETE",
      success: function (result) {
        console.log(JSON.stringify(result));
        setLoading(false);
        setOpen(false);
        setStateChange(!stateChange);
      },
      error: function (result) {
        console.log(JSON.stringify(result));
      },
    });
  };

  return (
    <Dialog
      open={open}
      onClose={deleteClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete Listing?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you would like to delete your listing?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={deleteClose}>Cancel</Button>
        <LoadingButton
          variant="contained"
          loading={loading}
          loadingPosition="start"
          startIcon={<DeleteIcon />}
          disabled={loading}
          onClick={deleteListing}
          autoFocus
        >
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteListing;
