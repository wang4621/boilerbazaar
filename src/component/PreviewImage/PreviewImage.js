import React from 'react'
import { Box, Grid } from "@mui/material";

const PreviewImage = ({image}) => {
    console.log(image)
  return (
    <Grid
      item
    //   m={2}
      xs={5}
    //   sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
        <img src={image} height={"100%"} width={"100%"} alt="preview"/>
    </Grid>
  )
}

export default PreviewImage