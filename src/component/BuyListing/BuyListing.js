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
  InputAdornment
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
// import CheckIcon from "@mui/icons-material/Check";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import TextbookImages from "../TextbookImages/TextbookImages";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
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





function copyLink() {
  navigator.clipboard.writeText(window.location.href);
  alert("Copied to Clipboard");
}



const BuyListing = ({ listing, open, setOpen, userData }) => {
  const [openShare, setOpenShare] = React.useState(false);
  const handleOpenShare = () => setOpenShare(true);
  const handleCloseShare = () => setOpenShare(false);
  const address = window.location.href;

  const [relatedTextbooks, setRelatedTextbooks] = useState([]);
  const [sellerData, setSellerData] = useState("");
  const [addedToWatchlist, setAddedToWatchlist] = useState(false);
  const [alreadyInWatchlist, setAlreadyInWatchlist] = useState(false);
  const [ebayPrice, setEbayPrice] = useState("Finding...")
  const [ebayUrl, setEbayUrl] = useState("*")
  const [googlePrice, setGooglePrice] = useState("Finding...")
  const [googleUrl, setGoogleUrl] = useState("*")
  const navigate = useNavigate();
  const urlEbay = `http://localhost:8080/ebay?isbn=${listing.isbn}`
  const urlGoogle = `http://localhost:8080/google?isbn=${listing.isbn}`
  const user0 = userData["puid"]
  const user1 = listing.sellerID
  const currentListingID = listing.listingID
  const [profileImage, setprofileImage] = useState([]);


  function newConversation() {
    var message = document.getElementById("message").value
    var jsonDict = { "user0": user0, "user1": user1, "message": message, "listingID": currentListingID }
    var jsonData = "\"" + JSON.stringify(jsonDict).replaceAll('"', '\\"') + "\""
    console.log(jsonData)
    $.ajax({
      url: 'https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/conversation/new',
      type: 'PUT',
      data: jsonData,
      datatype: 'json',
      contentType: 'application/json',
      success: function (result) {
        console.log(JSON.stringify(result))
      },
      error: function (result) {
        console.log(JSON.stringify(result));
      }
    });
  }
  function block() {
    if (!window.confirm(`Do you want to block ${user1}?`)) {
      return;
    }
    var jsonData = { "user": user0, "blockUser": user1 }
    var jsonData = "\"" + JSON.stringify(jsonData).replaceAll('"', '\\"') + "\""
    //console.log(jsonData)
    $.ajax({
      url: 'https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/block',
      type: 'PUT',
      data: jsonData,
      datatype: 'json',
      contentType: 'application/json',
      success: function (result) {
        console.log(JSON.stringify(result));
      },
      error: function (result) {
        //console.log(JSON.stringify(result));
      }
    });
  }


  //get profile pic
  $.ajax({
    url:
      "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing/images?listingID=" +
      user1,
    type: "GET",
    success: function (result) {
      let resultImage = result["body"]["0"];
      
      setprofileImage(resultImage);
    },
    error: function (result) {
      console.log(JSON.stringify(result));
    },
  });

  fetch(urlEbay).then((response) => {
    return response.json()
  }).then((data) => {
    if (data.price != null) {
      setEbayPrice(data.price + " USD")
      setEbayUrl(data.url)
    } else {
      setEbayPrice("Not Found In Ebay")
    }
  }).catch((err) => {
    setEbayPrice("Not Found In Ebay")
  })
  fetch(urlGoogle).then((response) => {
    return response.json()
  }).then((data) => {
    if (data.price != null) {
      setGooglePrice(data.price + " USD")
      setGoogleUrl(data.url)
    } else {
      setGooglePrice("Not Found In Google Play")
    }
  }).catch((err) => {
    setGooglePrice("Not Found In Google Play")
  })
  

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

  useEffect(() => {
    $.ajax({
      url:
        "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/textbook?listingID=" +
        listing["listingID"],
      type: "GET",
      success: function (result) {
        setRelatedTextbooks(result);
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
    return <div>This item is unavailable</div>;
  }

  return (
    <Dialog fullScreen open={open} onClose={closeBuy}>
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
            width: "55%",
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
                <Typography id="modal-modal-title" variant="h6" component="h2">
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
                  "https://cs307-host.herokuapp.com/profile.html?sellid=" +
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
                src={profileImage}
                id="avatarPic"
              />
              {sellerData["preferredName"] === ""
                ? sellerData["firstName"] + " " + sellerData["lastName"]
                : sellerData["preferredName"] + " " + sellerData["lastName"]}
              <TextField class="block" id="block" onClick={block} type="submit" value="Block" />
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
                id='message'
                label="Message"
                sx={{ width: "90%" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton sx={{ color: "var(--text-color)" }} onClick={newConversation}>
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
              textAlign="center"
              sx={{ fontWeight: "bold" }}
            >
              Related Textbooks
            </Typography>
            {relatedTextbooks.length > 0 ? (
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
          <CardContent
            sx={{
              wordBreak: "break-word",
              overflowY: "auto",
              height: "35%",
              display: "flex",
              flexDirection: "column",
            }}
            className="scrollBar"
          >
            <Typography
              variant="h6"
              color="var(--text-color)"
              textAlign="center"
              sx={{ fontWeight: "bold" }}
            >
              Other Websites
            </Typography>
            <Typography
              variant="body1"
              color="var(--text-color)"
              m={2}
              sx={{ fontWeight: "bold" }}
            >
              <a href={ebayUrl} target="blank">{`Price in ebay:`}</a>
              <br />
              <a href={ebayUrl} target="blank">{`${ebayPrice}`}</a>
              <br />
              <br />
              <a href={googleUrl} target="blank">{`Price in google play:`}</a>
              <br />
              <a href={googleUrl} target="blank">{`${googlePrice}`}</a>
              <div>
                minimum price: {isNaN(parseFloat(googlePrice)) ? ebayPrice : Math.min(parseFloat(googlePrice), parseFloat(ebayPrice))}
              </div>
            </Typography>
          </CardContent>
        </Box>
      </Box>
    </Dialog>
  );
};

export default BuyListing;