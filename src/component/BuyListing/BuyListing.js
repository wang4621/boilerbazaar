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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import TextbookImages from "../TextbookImages/TextbookImages";

const BuyListing = ({ listing, open, setOpen }) => {
  const [sellerData, setSellerData] = useState("");
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
        console.log(result);
        setSellerData(result);
      },
      error: function (result) {
        console.log(JSON.stringify(result));
      },
    });

  }, [listing]);

  return (
    <Dialog fullScreen open={open} onClose={closeBuy}>
      <AppBar sx={{ position: "relative", height: "7%" }}>
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
          height: "93%",
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
          <TextbookImages listing={listing}/>
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
              <a href={"boilerbazaar/profile.html?sellid=" + sellerData["puid"]}>Seller Information</a>
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
