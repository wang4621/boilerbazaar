import React from 'react'
import { Box, Typography} from "@mui/material";

const InterestedListing = ({listingData, image}) => {
  return (
    <Box
      sx={{
        minHeight: 380,
        width: "30%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: "90%",
          width: "90%",
          borderRadius: 2,
          backgroundColor: "var(--secondary-color)",
          boxShadow: 8,
        }}
      >
        <Typography variant="h6" component={"span"} sx={{ fontWeight: "bold", padding: "10px", ml: 1}}>
          Interested In:
        </Typography>
        <Box
          sx={{
            height: "60%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: "90%",
              width: "90%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 2,
              backgroundColor: "rgb(32,32,32)",
            }}
          >
            <img src={image} width={"75%"} height={"100%"} alt="textbook" />
          </Box>
        </Box>
        <Box
          sx={{
            height: "30%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            // flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "90%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              ${listingData["price"]}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              {listingData["title"]}
            </Typography>
            <Typography variant="body1">{listingData["course"]}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default InterestedListing