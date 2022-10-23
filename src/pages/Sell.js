import "./Sell.css";
import {
  Avatar,
  CardContent,
  Divider,
  Box,
  Typography,
  Button,
  TextField,
  MenuItem
} from "@mui/material";
import $ from "jquery";
import * as React from "react";
import { v4 as uuidv4 } from "uuid";

function getBase64(file, i, imagesJson, final) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    imagesJson["image" + i] = reader.result;
    if (final) {
      imagesJson =
        '"' + JSON.stringify(imagesJson).replaceAll('"', '\\"') + '"';
      console.log(imagesJson);
      sendImages(imagesJson);
    }
  };
}

function sendImages(imagesJson) {
  $.ajax({
    url: "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing/images",
    type: "PUT",
    data: imagesJson,
    datatype: "json",
    contentType: "application/json",
    success: function (result) {
      console.log(JSON.stringify(result));
    },
    error: function (result) {
      console.log(JSON.stringify(result));
    },
  });
}

function Sell() {
  const [title, setTitle] = React.useState("");
  const [price, setPrice] = React.useState("")
  const [author, setAuthor] = React.useState("");
  const [isbn, setISBN] = React.useState("");
  const [edition, setEdition] = React.useState("");
  const [condition, setCondition] = React.useState("");
  const [description, setDescription] = React.useState("");
  const limit = 250;
  const [getStringLength, setStringLength] = React.useState(0);
  const [titleError, setTitleError] = React.useState(false);
  const [priceError, setPriceError] = React.useState(false);
  const [authorError, setAuthorError] = React.useState(false);
  const [isbnError, setISBNError] = React.useState(false);
  const [editionError, setEditionError] = React.useState(false);
  const [conditionError, setConditionError] = React.useState(false);
  const [submittedListing, setSubmittedListing] = React.useState(false);

  const conditionChange = (event) => {
    setCondition(event.target.value);
    if (event.target.value !== "") {
      setConditionError(false);
    }
    // document.getElementById("previewCondition").innerText = event.target.value;
  };

  const listTextbook = (event) => {
    setSubmittedListing(true);
    var listingID = uuidv4().toString();
    var sellerID = "";
    // var title = document.getElementById("title").value;
    // var price = document.getElementById("price").value.substring(1);
    // var author = document.getElementById("author").value;
    // var isbn = document.getElementById("isbn").value;
    // var edition = document.getElementById("edition").value;
    // var description = document.getElementById("description").value;
    var images = document.getElementById("images").files;
    var count = images.length;
    var missing = false;
    if (title === "") {
      setTitleError(true);
      missing = true;
    }
    if (price === "") {
      setPriceError(true);
      missing = true;
    }
    if (author === "") {
      setAuthorError(true);
      missing = true;
    }
    if (isbn === "") {
      setISBNError(true);
      missing = true;
    }
    if (edition === "") {
      setEditionError(true);
      missing = true;
    }
    if (condition === "") {
      setConditionError(true);
      missing = true;
    }
    if (!missing) {
      var imagesJson = { listingID: listingID, count: count };
      for (var i = 0; i < count; i++) {
        getBase64(images[i], i, imagesJson, i === count - 1);
      }
      var jsonData = {
        listingID: listingID,
        sellerID: sellerID,
        title: title,
        price: price,
        author: author,
        isbn: isbn,
        edition: edition,
        condition: condition,
        description: description,
      };
      jsonData = '"' + JSON.stringify(jsonData).replaceAll('"', '\\"') + '"';
      $.ajax({
        url: "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing",
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
    }
    event.preventDefault();
  };

  // adds dollar sign in front of price
  // const handleDollar = (event) => {
  //   var value = event.target.value;
  //   if (value.includes("$")) {
  //     value = value.split("$")[1];
  //   }
  //   if (value === "") {
  //     if (submittedListing) {
  //       setPriceError(true);
  //     }
  //     event.target.value = "";
  //     document.getElementById("previewPrice").innerText = "Price";
  //   } else if (isNaN(value)) {
  //     event.target.value = event.target.value.slice(0, -1);
  //   } else {
  //     value = "$" + value;
  //     event.target.value = value;
  //     setPriceError(false);
  //     document.getElementById("previewPrice").innerText = value;
  //   }
  // };

  const changeText = (event) => {
    if (event.target.id === "title") {
      if (event.target.value === "" && submittedListing) {
        // if (submittedListing) {
          setTitleError(true);
        // }
        // document.getElementById("previewTitle").innerText = "Title";
      }
      if (event.target.value !== "") {
        setTitleError(false);
        // document.getElementById("previewTitle").innerText = event.target.value;
      }
      setTitle(event.target.value)
    } else if (event.target.id === "price") {
      // console.log(event.target.value)
      if (event.target.value === "") {
        if (submittedListing) {
          setPriceError(true);
        }
        // event.target.value = "";
        // document.getElementById("previewPrice").innerText = "Price";
      } else if (isNaN(event.target.value)) {
        event.target.value = event.target.value.slice(0, -1);
      } else {
        // value = "$" + value;
        // event.target.value = value;
        setPriceError(false);
        
        // document.getElementById("previewPrice").innerText = value;
      }
      setPrice(event.target.value)
    } else if (event.target.id === "author") {
      if (event.target.value !== "") {
        setAuthorError(false);
      }
      if (submittedListing && event.target.value === "") {
        setAuthorError(true);
      }
      // document.getElementById("previewAuthor").innerText = event.target.value;
      setAuthor(event.target.value)
    } else if (event.target.id === "isbn") {
      if (event.target.value !== "") {
        setISBNError(false);
      }
      if (submittedListing && event.target.value === "") {
        setISBNError(true);
      }
      // document.getElementById("previewISBN").innerText = event.target.value;
      setISBN(event.target.value)
    } else if (event.target.id === "edition") {
      if (!isNaN(event.target.value)) {
        setEditionError(false);
        // document.getElementById("previewEdition").innerText = event.target.value;
        
      } else {
        event.target.value = event.target.value.slice(0, -1);
      }
      if (submittedListing && event.target.value === "") {
        setEditionError(true);
      }
      setEdition(event.target.value)
    } else if (event.target.id === "description") {
      setStringLength(event.target.value.length);
      // document.getElementById("previewDescription").innerText = event.target.value;
      setDescription(event.target.value)
    }
  };

  return (
    <div className="sellDisplay">
      <Box
        sx={{
          width: "28%",
          height: "100%",
          backgroundColor: "var(--primary-color)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* <CardHeader title="Textbooks for sale" sx={{textAlign: 'center', height: '7%'}}/> */}
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center", padding: "10px" }}
        >
          Textbook For Sale
        </Typography>
        <Box
          sx={{
            "& > :not(style)": { m: 1 },
            height: "93%",
            overflowY: "scroll",
          }}
          component="form"
          noValidate
          autoComplete="off"
          className="formDisplay scrollBar"
          onSubmit={listTextbook}
        >
          <Button variant="contained" component="label">
            Upload Images Here
            <input id="images" type="file" hidden multiple />
          </Button>
          <TextField
            id="title"
            label="Title"
            required
            onChange={changeText}
            error={titleError}
            helperText={titleError ? "Please add a title." : ""}
          />
          <TextField
            id="price"
            label="Price"
            required
            onChange={changeText}
            error={priceError}
            helperText={priceError ? "Please add a price." : ""}
            inputProps={{ maxLength: 3 }}
          />
          <TextField
            id="author"
            label="Author"
            required
            onChange={changeText}
            error={authorError}
            helperText={authorError ? "Please add an author." : ""}
          />
          <TextField
            id="isbn"
            label="ISBN"
            required
            onChange={changeText}
            error={isbnError}
            helperText={isbnError ? "Please add an ISBN." : ""}
            inputProps={{ maxLength: 13 }}
          />
          <TextField
            id="edition"
            label="Edition"
            required
            onChange={changeText}
            error={editionError}
            helperText={editionError ? "Please add an edition." : ""}
            inputProps={{ maxLength: 2 }}
          />
          <TextField
            id="condition"
            name="condition"
            label="Condition"
            select
            required
            value={condition}
            onChange={conditionChange}
            error={conditionError}
            helperText={conditionError ? "Please select a condition" : ""}
            sx={{ backgroundColor: "var(--secondary-color)" }}
          >
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Used - Like New">Used - Like New</MenuItem>
            <MenuItem value="Used - Good">Used - Good</MenuItem>
            <MenuItem value="Used - Fair">Used - Fair</MenuItem>
          </TextField>
          <TextField
            id="description"
            label="Description"
            multiline
            rows={5}
            onChange={changeText}
            inputProps={{ maxLength: limit }}
            helperText={`${getStringLength}/${limit}`}
          />
          <TextField id="list" type="submit" value="List" />
        </Box>
      </Box>
      <Box
        sx={{
          width: "72%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "90%",
            borderRadius: 5,
            height: "90%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "var(--primary-color)",
            boxShadow: 8,
          }}
        >
          {/* <CardHeader title="Preview" sx={{height: '7%', marginLeft:'1%'}}/> */}
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", padding: "10px", marginLeft: "1.5%" }}
          >
            Preview
          </Typography>
          <Box
            sx={{
              height: "93%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              overflowY: "auto",
            }}
          >
            <Box
              sx={{
                height: "96%",
                width: "95%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Box
                sx={{
                  width: "60%",
                  height: "100%",
                  backgroundColor: "var(--tertiary-color)",
                }}
                className="innerLeftBox"
              >
                <Typography variant="h4" color="var(--text-color)">
                  Listing Preview
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "40%",
                  height: "100%",
                  backgroundColor: "var(--secondary-color)",
                }}
                className="innerRightBox"
              >
                <CardContent
                  sx={{
                    wordBreak: "break-word",
                    overflowY: "scroll",
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
                    // id="previewTitle"
                  >
                    {title === '' ? 'Title' : title}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="var(--text-color)"
                    sx={{ fontWeight: "bold" }}
                    // id="previewPrice"
                  >
                    {price ==='' ? 'Price' : '$' + price}
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
                      // id="previewAuthor"
                    >
                      {author}
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
                      // id="previewISBN"
                    >
                      {isbn}
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
                      // id="previewEdition"
                    >
                      {edition}
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
                      // id="previewCondition"
                    >
                      {condition}
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
                      // id="previewDescription"
                    >
                      {description}
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
                  sx={{
                    height: "25%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="body1"
                    color="var(--text-color)"
                    sx={{ fontWeight: "bold", fontSize: 18 }}
                  >
                    Seller Information
                    <Button
                      variant="outlined"
                      size="small"
                      disabled
                      sx={{ float: "right" }}
                    >
                      Seller Details
                    </Button>
                  </Typography>
                  <br />
                  <Typography
                    variant="body1"
                    color="var(--text-color)"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    id="avatarName"
                  >
                    <Avatar
                      sx={{ width: 40, height: 40 }}
                      alt=""
                      src=""
                      id="avatarPic"
                    />
                    Jeff Wang
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    height: "10%",
                    backgroundColor: "var(--secondary-color)",
                  }}
                  className="innerBottomBox"
                >
                  <Button
                    variant="outlined"
                    disabled
                    sx={{
                      width: "95%",
                      backgroundColor: "var(--tertiary-color) !important",
                    }}
                  >
                    Message
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Sell;
