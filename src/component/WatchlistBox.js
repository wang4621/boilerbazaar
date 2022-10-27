import React from "react";
import { Box, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteWatchlist from "./DeleteWatchlist";

const WatchlistBox = ({ listing, stateChange, setStateChange }) => {
  let listingSold = listing["sold"];
  let listingId = listing["listingID"];

  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const openDelete = () => {
    setDeleteOpen(true);
  };

  return (
    <Box
      key={listingId}
      m={2}
      sx={{
        width: "80%",
        height: "20%",
        minHeight: "130px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "var(--secondary-color)",
        borderRadius: 5,
        boxShadow: 8,
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "30%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            height: "80%",
            width: "80%",
            backgroundColor: "lightgrey",
            borderRadius: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Image Preview
        </Box>
      </Box>
      <Box
        sx={{
          height: "100%",
          width: "70%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Box sx={{ height: "80%", width: "95%" }}>
          <Box sx={{ height: "80%", width: "100%" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {listing["title"]}
            </Typography>
            <Typography variant="body1">${listing["price"]}</Typography>
            <Typography variant="body2">Original Price: ${listing["originalPrice"]}</Typography>
            <Typography variant="body2">0 clicks on listing</Typography>
            <Typography variant="body2">
              Listed on {listing["timeListed"]}
            </Typography>
          </Box>
          <Box
            sx={{
              height: "20%",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "right",
            }}
          >
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              sx={{
                height: "100% !important",
                width: "30%",
                borderRadius: "5px !important",
              }}
              onClick={openDelete}
            >
              Remove From Watchlist
            </Button>
          </Box>
        </Box>
      </Box>
      <DeleteWatchlist
        listingId={listingId}
        open={deleteOpen}
        setOpen={setDeleteOpen}
        stateChange={stateChange}
        setStateChange={setStateChange}
      />
    </Box>
  );
};

export default WatchlistBox;
