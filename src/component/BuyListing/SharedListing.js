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
  ListItemText,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import $ from "jquery";
import TextbookImages from "../TextbookImages/TextbookImages";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useNavigate, useParams } from "react-router-dom";
import RelatedTextbook from "./RelatedTextbook.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const SharedListing = ({ open, setOpen }) => {
  const [relatedTextbooks, setRelatedTextbooks] = useState([]);
  const [openShare, setOpenShare] = React.useState(false);
  const handleOpenShare = () => setOpenShare(true);
  const handleCloseShare = () => setOpenShare(false);
  const address = window.location.href;
  const navigate = useNavigate();
  const [sellerData, setSellerData] = useState("");
  const [listing, setListing] = useState("");
  const [addedToWatchlist, setAddedToWatchlist] = useState(false);
  const [alreadyInWatchlist, setAlreadyInWatchlist] = useState(false);
  const params = useParams();

  const closeShare = () => {
    setOpen(false);
    navigate("/buy");
  };

  const addToWatchlist = () => {};

  const newConversation = () => {};

  useEffect(() => {
    $.ajax({
      url:
        "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing/shared?listingID=" +
        params.id,
      // data: jsonData,
      // datatype: "json",
      // contentType: "application/json",
      type: "GET",
      success: function (result) {
        console.log(result);
        if (result === "Error") {
          navigate("/404")
        }
        setListing(result);
        // setSellerData(result);
      },
      error: function (result) {
        console.log(JSON.stringify(result));
        navigate("/404")
      },
    });
  }, []);

  useEffect(() => {
    //seller information
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

  useEffect(() => {
    $.ajax({
      url:
        "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/textbook?listingID=" +
        params.id,
      type: "GET",
      success: function (result) {
        setRelatedTextbooks(result);
      },
      error: function (result) {
        console.log(JSON.stringify(result));
      },
    });
  }, [listing]);

  //   if (listing["sold"] === "true") {
  //     return <div>This item is unavailable</div>;
  //   }

  //   var views = parseInt(listing["currentViews"]) + 1;

  //update views
  //   var jsonData = {
  //     listingID: listing["listingID"],
  //     currentViews: views,
  //   };
  //   jsonData = '"' + JSON.stringify(jsonData).replaceAll('"', '\\"') + '"';
  //   $.ajax({
  //     url: "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/views",
  //     type: "PUT",
  //     data: jsonData,
  //     datatype: "json",
  //     contentType: "application/json",
  //     success: function (result) {
  //       console.log(JSON.stringify(result));
  //     },
  //     error: function (result) {
  //       console.log(JSON.stringify(result));
  //     },
  //   });

  function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    alert("Copied to Clipboard");
  }

  return (
    <Dialog fullScreen open={open} onClose={closeShare}>
      <AppBar
        sx={{
          position: "relative",
          height: "8%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={closeShare}
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
            width: "55%",
            height: "100%",
            backgroundColor: "var(--tertiary-color)",
          }}
          className="innerLeftBox"
        >
          {listing !== "" ? <TextbookImages listing={listing}/> : <CircularProgress/>}
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
              Course
              <Typography
                variant="body1"
                color="var(--text-color)"
              >
                {listing["course"]}
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
            <Modal open={openShare} onClose={handleCloseShare}>
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Share Options
                </Typography>
                <List>
                  <ListItem>
                    <IconButton
                      color="inherit"
                      target="_blank"
                      onClick={copyLink}
                      rel="noopener noreferrer"
                    >
                      <InsertLinkIcon />
                    </IconButton>
                    <ListItemText primary="Copy Link" />
                  </ListItem>
                  <ListItem>
                    <IconButton
                      color="inherit"
                      target="_blank"
                      href={
                        "mailto:?subject=Check out this textbook listing&body=Link to textbook: " +
                        address
                      }
                      rel="noopener noreferrer"
                    >
                      <EmailIcon />
                    </IconButton>
                    <ListItemText primary="Email" />
                  </ListItem>
                  <ListItem>
                    <div id="fb-root"></div>
                    <script
                      async
                      defer
                      crossorigin="anonymous"
                      src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v15.0"
                      nonce="eGYQgFrV"
                    ></script>
                    <div data-href={address}></div>
                    <IconButton
                      color="inherit"
                      target="_blank"
                      href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A3000%2Fbuy%2Flisting%2F707647ad-bb0a-41ee-b899-0fbef8c6269c&amp;src=sdkpreparse"
                    >
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
              <a
                href={
                  "http://localhost:3000/find/" +
                  sellerData["puid"]
                }
                target="_blank"
              >
                Seller Information
              </a>
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
          {addedToWatchlist ? (
            alreadyInWatchlist ? (
              <></>
            ) : (
              <Typography sx={{ textAlign: "center" }}>
                Successfully Added to Watchlist
              </Typography>
            )
          ) : (
            <Button onClick={addToWatchlist}>Add to Watchlist</Button>
          )}
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
              <TextField
                id="message"
                label="Message"
                sx={{ width: "90%" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        sx={{ color: "var(--text-color)" }}
                        onClick={newConversation}
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "15%",
            height: "100%",
            backgroundColor: "var(--secondary-color)",
          }}
          className="rightmostBox"
        >
          <CardContent
            sx={{
              wordBreak: "break-word",
              overflowY: "auto",
              height: "62.5%",
              display: "flex",
              flexDirection: "column",
            }}
            className="scrollBar"
          >
            <Typography
                variant="h6"
                color="var(--text-color)"
                textAlign= "center"
                sx={{ fontWeight: "bold" }}
              >
                Related Textbooks
              </Typography>
              {relatedTextbooks.length > 0? (
                <>
                  {relatedTextbooks.map((listing) => {
                    return <RelatedTextbook listing={listing} />;
                  })}
                </>
              ) : (
                <></>
              )}
            </CardContent>
            <Divider
              variant="middle"
              sx={{ borderBottomColor: "var(--text-color)" }}
            />
        </Box>
      </Box>
    </Dialog>
  );
};

export default SharedListing;
