import React, { useState, useEffect } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import DeleteWatchlist from "./DeleteWatchlist";
import $ from "jquery";

const WatchlistBox = ({ listing, stateChange, setStateChange }) => {
  let listingSold = listing["sold"];
  let listingId = listing["listingID"];

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const openDelete = () => {
    setDeleteOpen(true);
  };

  function calculatePercentage(currentPrice, previousPrice) {
    const currentPriceInt = parseInt(currentPrice);
    const previousPriceInt = parseInt(previousPrice);

    if (currentPriceInt === 0 && previousPriceInt === 0) {
      return 0;
    } else if (currentPriceInt === 0 || previousPriceInt === 0) {
      return 100;
    } else if (currentPriceInt > previousPriceInt) {
      return Math.floor(((currentPrice - previousPrice) / previousPrice) * 100);
    } else if (currentPriceInt < previousPriceInt) {
      return Math.floor(
        ((previousPrice - currentPriceInt) / previousPrice) * 100
      );
    } else {
      return 0;
    }
  }

  useEffect(() => {
    // gets the images for the textbook
    // console.log(listing["listingID"])
    setLoading(true);
    $.ajax({
      url:
        "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing/images?listingID=" +
        listing["listingID"],
      type: "GET",
      success: function (result) {
        // console.log(result);
        setLoading(false);
        setImage(result["body"][0]);
      },
      error: function (result) {
        console.log(JSON.stringify(result));
      },
    });
  }, [listing]);

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
            backgroundColor: "rgb(32,32,32)",
            // backgroundColor: "lightgrey",
            // borderColor:'black',
            borderRadius: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <img src={image} height={"100%"} width={"70%"} alt="textbook" />
          )}
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
            <Typography
              variant="body1"
              sx={{ display: "inline-block", fontWeight: "bold" }}
            >
              {listing["title"]}
            </Typography>
            <Typography sx={{ display: "inline-block", color: "red" }}>
              {listingSold === "true" && <>&nbsp;(Sold)</>}
            </Typography>
            <div
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
              id="priceDiv"
            >
              <Typography
                variant="body1"
                sx={{ display: "inline-block", pr: "10px" }}
              >
                Current Price: ${listing["price"]}
              </Typography>
              {Number(listing["price"]) > Number(listing["previousPrice"]) && (
                <>
                  <ArrowUpwardRoundedIcon
                    sx={{ color: "red" }}
                  ></ArrowUpwardRoundedIcon>
                  {calculatePercentage(
                    listing["price"],
                    listing["previousPrice"]
                  )}
                  %
                </>
              )}
              {Number(listing["price"]) < Number(listing["previousPrice"]) && (
                <>
                  <ArrowDownwardRoundedIcon
                    sx={{ color: "green" }}
                  ></ArrowDownwardRoundedIcon>
                  {calculatePercentage(
                    listing["price"],
                    listing["previousPrice"]
                  )}
                  %
                </>
              )}
            </div>
            <Typography variant="body2">
              Previous Price: ${listing["previousPrice"]}
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
                // width: "auto",
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
