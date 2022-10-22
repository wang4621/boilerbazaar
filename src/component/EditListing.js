import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EditListing = ({
  listingId,
  open,
  setOpen,
  stateChange,
  setStateChange,
}) => {
  const closeEdit = () => {
    setOpen(false);
  };

  return (
    <Dialog fullScreen open={open} onClose={closeEdit}>
      <AppBar sx={{ position: "relative", height: "7%" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={closeEdit}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography
            sx={{ ml: 2, flex: 1, textAlign: "center" }}
            variant="h6"
            component="div"
          >
            Edit Listing
          </Typography>
        </Toolbar>
      </AppBar>
    </Dialog>
  );
};

export default EditListing;
