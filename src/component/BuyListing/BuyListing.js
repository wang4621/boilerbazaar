import "./BuyListing.css";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Divider,
  Box,
  Typography,
  CardContent,
  Button,
  Toolbar,
  IconButton,
  AppBar,
  Dialog,
  TextField,
  Modal, 
  List, 
  ListItem, 
  ListItemText
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import CheckIcon from '@mui/icons-material/Check';
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import TextbookImages from "../TextbookImages/TextbookImages";
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};



function copyLink() {
  navigator.clipboard.writeText(window.location.href);
  alert("Copied to Clipboard");

}

const BuyListing = ({ listing, open, setOpen, userData }) => {

  const [openShare, setOpenShare] = React.useState(false);
  const handleOpenShare = () => setOpenShare(true);
  const handleCloseShare = () => setOpenShare(false);
  const address = window.location.href;

  const [sellerData, setSellerData] = useState("");
  const [addedToWatchlist, setAddedToWatchlist] = useState(false);
  const [alreadyInWatchlist, setAlreadyInWatchlist] = useState(false);

  const navigate = useNavigate();

  const closeBuy = () => {
    setOpen(false);
    navigate("/buy");
  };


  useEffect(() => {
    // console.log(listing)
    // setLoading(true)
    $.ajax({
      url:
        "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/profile?puid=" +
        listing["sellerID"],
      type: "GET",
      success: function (result) {
        setSellerData(result);
      },
      error: function (result) {
        console.log(JSON.stringify(result));
      },
    });

  }, [listing]);

  const addToWatchlist = () => {
    var jsonData = { puid: userData["puid"], listingID: listing["listingID"] };
    jsonData = '"' + JSON.stringify(jsonData).replaceAll('"', '\\"') + '"';
    $.ajax({
      url: "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/watchlist",
      type: "PUT",
      data: jsonData,
      datatype: "json",
      contentType: "application/json",
      success: function (result) {
        if (result === "Already in Watchlist") {
          alert("Listing is already in your watchlist!");
          setAlreadyInWatchlist(true);
        }
        setAddedToWatchlist(true);
      },
      error: function (result) {
        console.log(JSON.stringify(result));
      },
    });
  };

  if (listing["sold"] === "true") {
    return <div>This item is unavailable</div>
  }


  var views = parseInt(listing["currentViews"]) + 1

  //update views
  var jsonData = {
    listingID: listing["listingID"],
    currentViews: views
  };
  jsonData = '"' + JSON.stringify(jsonData).replaceAll('"', '\\"') + '"';
  $.ajax({
    url: "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/views",
    type: "PUT",
    data: jsonData,
    datatype: "json",
    contentType: "application/json",
    success: function (result) {
      console.log(JSON.stringify(result));
    },
    error: function (result) {
      console.log(JSON.stringify(result));
    },
  });

 
  
  //add to viewingHistory
  var jsonData = { puid: userData["puid"], listingID: listing["listingID"] };
    jsonData = '"' + JSON.stringify(jsonData).replaceAll('"', '\\"') + '"';
    $.ajax({
      url: "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/viewinghistory",
      type: "PUT",
      data: jsonData,
      datatype: "json",
      contentType: "application/json",
      success: function (result) {
      },
      error: function (result) {
        console.log(JSON.stringify(result));
      },
    });

  return (
    <Dialog fullScreen open={open} onClose={closeBuy}>
      <AppBar sx={{ position: "relative", height: "8%", display: 'flex', justifyContent: 'center' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={closeBuy}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography
            sx={{ ml: 2, flex: 1, textAlign: "center" }}
            variant="h6"
            component="div"
          >
            Buy Listing
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          height: "92%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            width: "70%",
            height: "100%",
            backgroundColor: "var(--tertiary-color)",
          }}
          className="innerLeftBox"
        >
          <TextbookImages listing={listing} />
        </Box>
        <Box
          sx={{
            width: "30%",
            height: "100%",
            backgroundColor: "var(--secondary-color)",
          }}
          className="innerRightBox"
        >
          <CardContent
            sx={{
              wordBreak: "break-word",
              overflowY: "auto",
              height: "65%",
              display: "flex",
              flexDirection: "column",
            }}
            className="scrollBar"
          >
            <Typography
              variant="h5"
              color="var(--text-color)"
              sx={{ fontWeight: "bold" }}
              id="previewTitle"
            >
              {listing["title"]}
            </Typography>
            <Typography
              variant="h6"
              color="var(--text-color)"
              sx={{ fontWeight: "bold" }}
              id="previewPrice"
            >
              ${listing["price"]}
            </Typography>
            <br />
            <Typography
              variant="h6"
              color="var(--text-color)"
              sx={{ fontWeight: "bold" }}
            >
              Details
            </Typography>
            <br />
            <Typography
              variant="h6"
              color="var(--text-color)"
              sx={{ fontWeight: "bold" }}
            >
              Author
              <Typography
                variant="body1"
                color="var(--text-color)"
                id="previewAuthor"
              >
                {listing["author"]}
              </Typography>
            </Typography>
            <Typography
              variant="h6"
              color="var(--text-color)"
              sx={{ fontWeight: "bold" }}
            >
              ISBN
              <Typography
                variant="body1"
                color="var(--text-color)"
                id="previewISBN"
              >
                {listing["isbn"]}
              </Typography>
            </Typography>
            <Typography
              variant="h6"
              color="var(--text-color)"
              sx={{ fontWeight: "bold" }}
            >
              Edition
              <Typography
                variant="body1"
                color="var(--text-color)"
                id="previewEdition"
              >
                {listing["edition"]}
              </Typography>
            </Typography>
            <Typography
              variant="h6"
              color="var(--text-color)"
              sx={{ fontWeight: "bold" }}
            >
              Condition
              <Typography
                variant="body1"
                color="var(--text-color)"
                id="previewCondition"
              >
                {listing["condition"]}
              </Typography>
            </Typography>
            <br />
            <Typography
              variant="h6"
              color="var(--text-color)"
              sx={{ fontWeight: "bold" }}
            >
              Description
              <Typography
                variant="body1"
                color="var(--text-color)"
                id="previewDescription"
              >
                {listing["description"]}
              </Typography>
            </Typography>
            <br />
            <Typography
              variant="h6"
              color="var(--text-color)"
              sx={{ fontWeight: "light" }}
            >
              <Typography
                variant="body1"
                color="var(--text-color)"
                id="views"
              >
                {listing["currentViews"]} views
              </Typography>
            </Typography>
            <br />
            <Button onClick={handleOpenShare}>Share</Button>
            <Modal
              open={openShare}
              onClose={handleCloseShare}

            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Share Options
                </Typography>
                <List>
                  <ListItem>
                    <IconButton color="inherit" target="_blank" onClick={copyLink} rel="noopener noreferrer">
                      <InsertLinkIcon />
                    </IconButton>
                    <ListItemText primary="Copy Link" />
                  </ListItem>
                  <ListItem>
                    <IconButton color="inherit" target="_blank" href={"mailto:?subject=Check out this textbook listing&body=Link to textbook: " + address} rel="noopener noreferrer">
                      <EmailIcon />
                    </IconButton>
                    <ListItemText primary="Email" />
                  </ListItem>
                  <ListItem>
                    <div id="fb-root"></div>
                    <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v15.0" nonce="eGYQgFrV"></script>
                    <div data-href={address}></div>
                    <IconButton color="inherit" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A3000%2Fbuy%2Flisting%2F707647ad-bb0a-41ee-b899-0fbef8c6269c&amp;src=sdkpreparse" >
                      <FacebookIcon />
                    </IconButton>
                    <ListItemText primary="Facebook" />
                  </ListItem>
                </List>
              </Box>
            </Modal>
            <br />
          </CardContent>
          <Divider
            variant="middle"
            sx={{ borderBottomColor: "var(--text-color)" }}
          />
          <CardContent
            sx={{ height: "20%", display: "flex", flexDirection: "column" }}
          >
            <Typography
              variant="body1"
              color="var(--text-color)"
              sx={{ fontWeight: "bold", fontSize: 18 }}
            >
              {/* href to profile.html?sellid=result.sellid*/}
              <a href={"https://cs307-host.herokuapp.com/profile.html?sellid=" + sellerData["puid"]}>Seller Information</a>
            </Typography>
            <br />
            <Typography
              variant="body1"
              color="var(--text-color)"
              sx={{
                display: "flex",
                // justifyContent: "space-between",
                alignItems: "center",
              }}
              id="avatarName"
            >
              <Avatar
                sx={{ width: 40, height: 40, marginRight: 2 }}
                alt=""
                src=""
                id="avatarPic"
              />
              {sellerData["preferredName"] === ""
                ? sellerData["firstName"] + " " + sellerData["lastName"]
                : sellerData["preferredName"] + " " + sellerData["lastName"]}
            </Typography>
          </CardContent>
          {addedToWatchlist
            ? alreadyInWatchlist ? <></> : <Typography sx={{ textAlign: "center" }}>Successfully Added to Watchlist</Typography>
            : <Button onClick={addToWatchlist}>Add to Watchlist</Button>
          }
          <Box
            sx={{ height: "15%", backgroundColor: "var(--secondary-color)" }}
            className="innerBottomBox"
          >
            <Typography variant="body1">Send Message to the Seller</Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <TextField label="Message" sx={{ width: "80%" }} />
              <IconButton aria-label="delete" size="large" color="inherit">
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default BuyListing;
