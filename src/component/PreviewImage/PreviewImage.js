import React from "react";
import { Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PreviewImage = ({ image, setPreviewImages }) => {
  const deleteImage = (event) => {
    console.log(event);
    // setPreviewImages();
  };

  return (
    <Grid item m={1} xs={5} sx={{ position: "relative" }}>
      <IconButton
        sx={{
          position: "absolute",
          zIndex: 1,
          top: 0,
          color: "var(--text-color)",
          backgroundColor: "var(--background-color)",
          "&.MuiButtonBase-root:hover": {
            bgcolor: "var(--background-color)",
          },
        }}
        onClick={deleteImage}
      >
        <CloseIcon />
      </IconButton>
      <img src={image} height={"100%"} width={"100%"} alt="preview" />
    </Grid>
  );
};

export default PreviewImage;
