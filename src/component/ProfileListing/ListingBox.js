import React, { useState, useEffect } from "react";
import { Box, Typography, Button, CircularProgress, Grid } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteListing from "./DeleteListing";
import EditListing from "./EditListing";
import $ from "jquery";
import BuyerRatingPrompt from "../Rating/BuyerRatingPrompt";
import LoadingButton from "@mui/lab/LoadingButton";

const ListingBox = ({ listing, stateChange, setStateChange, userData }) => {
  let listingSold = listing["sold"];
  let listingId = listing["listingID"];

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [sold, setSold] = useState(listingSold);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [soldLoading, setSoldLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  // const openDelete = () => {
  //   setDeleteOpen(true);
  // };

  // const openEdit = () => {
  //   setEditOpen(true);
  // };

  // on button click for "Mark as Sold" and "Mark as Available"
  const changeTextAndIcon = (event) => {
    setSoldLoading(true);
    if (event.target.innerText === "Mark as Sold") {
      // send ajax to update, on success - setSold
      setRatingOpen(true);
    } else {
      // send ajax to update, on sucess - setSold
      $.ajax({
        url:
          "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/userlisting?listingID=" +
          listingId +
          "&sold=false&puid=" +
          userData["puid"],
        type: "PUT",
        success: function (result) {
          console.log(JSON.stringify(result));
          setSold("false");
          setSoldLoading(false);
          // setStateChange(!stateChange)
        },
        error: function (result) {
          console.log(JSON.stringify(result));
        },
      });
    }
  };

  useEffect(() => {
    // gets the images for the textbook
    // console.log(listing["listingID"])
    setLoading(true);
    setPrice(listing['price']);
    setTitle(listing['title'])
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

  // console.log("listingID:", listingId + " sold: ",listingSold)
  return (
    <Grid
      item
      key={listingId}
      m={2}
      xs={12}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          width: "80%",
          height: 150,
          // minHeight: "130px",
          display: "flex",
          // flexDirection: "row",
          // justifyContent: "center",
          backgroundColor: "var(--secondary-color)",
          borderRadius: 5,
          boxShadow: 8,
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "25%",
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
            width: "75%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: "80%",
              width: "95%",
              display: "flex",
              flexDirection: "column",
            }}
            m={1.5}
          >
            <Box
              sx={{
                height: "80%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                // justifyContent: "space-evenly",
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {title}
              </Typography>
              <Typography variant="body1">${price}</Typography>
              <Typography variant="body2">
                {listing["currentViews"]} clicks on listing
              </Typography>
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
                justifyContent: "space-between",
              }}
            >
              <LoadingButton
                variant="contained"
                loading={soldLoading}
                disabled={soldLoading}
                startIcon={sold === "true" ? <CheckIcon /> : <CloseIcon />}
                sx={{
                  height: "100% !important",
                  width: "35%",
                  borderRadius: "5px !important",
                }}
                onClick={changeTextAndIcon}
              >
                {sold === "true" ? "Mark as Available" : "Mark as Sold"}
              </LoadingButton>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                sx={{
                  height: "100% !important",
                  width: "30%",
                  borderRadius: "5px !important",
                }}
                disabled={sold === "true" ? true : false}
                // onClick={openEdit}
                onClick={()=>setEditOpen(true)}
              >
                Edit Listing
              </Button>
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                sx={{
                  height: "100% !important",
                  width: "30%",
                  borderRadius: "5px !important",
                }}
                // onClick={openDelete}
                onClick={()=>setDeleteOpen(true)}
              >
                Delete Listing
              </Button>
            </Box>
          </Box>
        </Box>
        <DeleteListing
          listingId={listingId}
          open={deleteOpen}
          setOpen={setDeleteOpen}
          stateChange={stateChange}
          setStateChange={setStateChange}
        />
        <EditListing
          listing={listing}
          open={editOpen}
          setOpen={setEditOpen}
          userData={userData}
          setListingTitle={setTitle}
          setListingPrice={setPrice}
        />
        <BuyerRatingPrompt
          listing={listing}
          puid={userData["puid"]}
          open={ratingOpen}
          setOpen={setRatingOpen}
          setSold={setSold}
          setSoldLoading={setSoldLoading}
        />
      </Box>
    </Grid>
  );
};

export default ListingBox;
