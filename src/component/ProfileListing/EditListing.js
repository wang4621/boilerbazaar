import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Dialog,
  FormHelperText,
  Grid
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar, CardContent, Divider, Box, Button } from "@mui/material";
import { TextField, MenuItem } from "@mui/material";
import $ from "jquery";
import { v4 as uuidv4 } from "uuid";
import "./EditListing.css";
import TextbookImages from "../TextbookImages/TextbookImages";
import PreviewImage from "../PreviewImage/PreviewImage";
import PreviewImageSwiper from "../PreviewImage/PreviewImageSwiper";

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

const EditListing = ({
  listing,
  open,
  setOpen,
  stateChange,
  setStateChange,
  userData,
}) => {
  const [title, setTitle] = React.useState(listing["title"]);
  const [price, setPrice] = React.useState(listing["price"]);
  const [author, setAuthor] = React.useState(listing["author"]);
  const [isbn, setISBN] = React.useState(listing["isbn"]);
  const [edition, setEdition] = React.useState(listing["edition"]);
  const [course, setCourse] = React.useState(listing["course"]);
  const [condition, setCondition] = React.useState(listing["condition"]);
  const [description, setDescription] = React.useState(listing["description"]);
  const limit = 250;
  const [getStringLength, setStringLength] = React.useState(0);
  const [titleError, setTitleError] = React.useState(false);
  const [priceError, setPriceError] = React.useState(false);
  const [authorError, setAuthorError] = React.useState(false);
  const [isbnError, setISBNError] = React.useState(false);
  const [editionError, setEditionError] = React.useState(false);
  const [courseError, setCourseError] = React.useState(false);
  const [conditionError, setConditionError] = React.useState(false);
  const [submittedListing, setSubmittedListing] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const [imageCount, setImageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([])

  const closeEdit = () => {
    setOpen(false);
  };

  const conditionChange = (event) => {
    setCondition(event.target.value);
    if (event.target.value !== "") {
      setConditionError(false);
    }
  };

  const saveTextbook = (event) => {
    setSubmittedListing(true);
    var listingID = listing["listingID"];
    var sellerID = userData["puid"];
    var images = document.getElementById("images").files;
    var count = images.length;
    var missing = false;
    if (count === 0) {
      missing = true;
      setImageError(true);
    }
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
    if (course === "") {
      setCourseError(true);
      missing = true;
    }
    if (condition === "") {
      setConditionError(true);
      missing = true;
    }
    if (!missing) {
      var imagesJson = { listingID: listingID, count: imageCount };
      for (var i = 0; i < imageCount; i++) {
        // getBase64(images[i], i, imagesJson, i === imageCount - 1);
        imagesJson["image"+i] = previewImages[i];
      }
      sendImages(imagesJson);
      var jsonData = {
        listingID: listingID,
        sellerID: sellerID,
        title: title,
        price: price,
        author: author,
        isbn: isbn,
        course: course,
        edition: edition,
        condition: condition,
        description: description,
      };
      jsonData = JSON.stringify(jsonData);
      // TODO: Change ajax call and send the correct values
      $.ajax({
        url: "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing",
        type: "POST",
        data: jsonData,
        datatype: "json",
        contentType: "application/json",
        success: function (result) {
          console.log(JSON.stringify(result));
          setStateChange(!stateChange);
        },
        error: function (result) {
          console.log(JSON.stringify(result));
        },
      });
    }
    event.preventDefault();
  };

  const changeText = (event) => {
    if (event.target.id === "title") {
      if (event.target.value === "" && submittedListing) {
        setTitleError(true);
      }
      if (event.target.value !== "") {
        setTitleError(false);
      }
      setTitle(event.target.value);
    } else if (event.target.id === "price") {
      if (!isNaN(event.target.value)) {
        setPriceError(false);
      } else {
        event.target.value = event.target.value.slice(0, -1);
      }
      if (submittedListing && event.target.value === "") {
        setPriceError(true);
      }
      setPrice(event.target.value);
    } else if (event.target.id === "author") {
      if (event.target.value !== "") {
        setAuthorError(false);
      }
      if (submittedListing && event.target.value === "") {
        setAuthorError(true);
      }
      setAuthor(event.target.value);
    } else if (event.target.id === "isbn") {
      if (event.target.value !== "") {
        setISBNError(false);
      }
      if (submittedListing && event.target.value === "") {
        setISBNError(true);
      }
      setISBN(event.target.value);
    } else if (event.target.id === "edition") {
      if (!isNaN(event.target.value)) {
        setEditionError(false);
      } else {
        event.target.value = event.target.value.slice(0, -1);
      }
      if (submittedListing && event.target.value === "") {
        setEditionError(true);
      }
      setEdition(event.target.value);
    } else if (event.target.id === "course") {
      if (event.target.value === "" && submittedListing) {
        setCourseError(true);
      }
      if (event.target.value.includes(" ")) {
        event.target.value = event.target.value.slice(0, -1);
      } else {
        setCourseError(false);
      }
      setCourse(event.target.value);
    } else if (event.target.id === "description") {
      setStringLength(event.target.value.length);
      setDescription(event.target.value);
    }
  };

  function encodeImageFileAsURL(file) {
    var reader = new FileReader();
    reader.onloadend = function () {
      // console.log('RESULT', reader.result)
      setPreviewImages((previewImages) => [...previewImages, reader.result]);
    };
    reader.readAsDataURL(file);
  }

  const imageUpload = (event) => {
    console.log(event);
    let imageLength = event.target.files.length;
    if (imageLength + imageCount <= 5) {
      let isImage = true;
      for (let i = 0; i < imageLength; i++) {
        // console.log(event.target.files[i].type.split('/')[1])
        let extension = event.target.files[i].type.split("/")[1];
        if (extension === "jpeg" || extension === "png") {
          isImage = true;
          setImageError(false);
        } else {
          isImage = false;
          setImageError(true);
          break;
        }
      }
      if (isImage) {
        for (let j = 0; j < imageLength; j++) {
          // console.log(event.target.files[j])
          encodeImageFileAsURL(event.target.files[j]);
        }
        // setImageCount(imageCount + imageLength);
      }
    }
  };

  useEffect(() => {
    // gets the images for the textbook
    setLoading(true);
    $.ajax({
      url:
        "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing/images?listingID=" +
        listing["listingID"],
      type: "GET",
      success: function (result) {
        console.log(result);
        let resultImages = [];
        for (let key in result["body"]) {
          if (!isNaN(key)) {
            resultImages.push(result["body"][key]);
          }
        }
        setPreviewImages(resultImages);
        setImageCount(resultImages.length)
        setLoading(false);
      },
      error: function (result) {
        console.log(JSON.stringify(result));
      },
    });
  }, [listing]);

  useEffect(() => { 
    setImageCount(previewImages.length)
    // console.log(imageCount)
  }, [previewImages]);

  return (
    <Dialog fullScreen open={open} onClose={closeEdit}>
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
            onClick={closeEdit}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography
            sx={{ ml: 2, flex: 1, textAlign: "center" }}
            variant="h6"
            component="div"
          >
            Edit Listing
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{ height: "92%", backgroundColor: "var(--background-color)" }}
        className="editDisplay"
      >
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
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              padding: "10px",
              color: "var(--text-color)",
            }}
          >
            Textbook For Sale
          </Typography>
          <Divider
            variant="middle"
            sx={{ borderBottomColor: "var(--text-color)" }}
          />
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
            onSubmit={saveTextbook}
          >
            <Box
              sx={{
                width: "85%",
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <FormHelperText sx={{ fontSize: "14px", marginLeft: 0 }}>
                {imageCount}/5 Images
              </FormHelperText>
              <Button
                variant="contained"
                component="label"
                sx={{ width: "100%" }}
              >
                Upload Images Here
                <input
                  id="images"
                  type="file"
                  hidden
                  multiple
                  onChange={imageUpload}
                />
              </Button>
              {/* <FormHelperText>Please upload at least one image</FormHelperText> */}
              {imageError ? (
                <FormHelperText error={imageError}>
                  Please upload at least one image
                </FormHelperText>
              ) : (
                ""
              )}
              <Grid
                container
                spacing={1}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  // alignItems: "flex-start",
                }}
              >
                {previewImages.map((image) => {
                  return (
                    <PreviewImage
                      image={image}
                      setPreviewImages={setPreviewImages}
                    />
                  );
                })}
              </Grid>
            </Box>
            <TextField
              id="title"
              label="Title"
              value={title}
              required
              onChange={changeText}
              error={titleError}
              helperText={titleError ? "Please add a title." : ""}
              sx={{
                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": { borderColor: "var(--text-color)" },
                },
              }}
            />
            <TextField
              id="price"
              label="Price"
              value={price}
              required
              onChange={changeText}
              error={priceError}
              helperText={priceError ? "Please add a price." : ""}
              inputProps={{ maxLength: 3 }}
              sx={{
                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": { borderColor: "var(--text-color)" },
                },
              }}
            />
            <TextField
              id="author"
              label="Author"
              value={author}
              required
              onChange={changeText}
              error={authorError}
              helperText={authorError ? "Please add an author." : ""}
              sx={{
                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": { borderColor: "var(--text-color)" },
                },
              }}
            />
            <TextField
              id="isbn"
              label="ISBN"
              value={isbn}
              required
              onChange={changeText}
              error={isbnError}
              helperText={isbnError ? "Please add an ISBN." : ""}
              inputProps={{ maxLength: 13 }}
              sx={{
                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": { borderColor: "var(--text-color)" },
                },
              }}
            />
            <TextField
              id="edition"
              label="Edition"
              value={edition}
              required
              onChange={changeText}
              error={editionError}
              helperText={editionError ? "Please add an edition." : ""}
              inputProps={{ maxLength: 2 }}
              sx={{
                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": { borderColor: "var(--text-color)" },
                },
              }}
            />
            <TextField
              id="course"
              label="Course"
              value={course}
              required
              onChange={changeText}
              error={courseError}
              helperText={courseError ? "Please add a course." : ""}
              inputProps={{ maxLength: 10 }}
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
              sx={{
                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": { borderColor: "var(--text-color)" },
                },
              }}
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
              sx={{
                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": { borderColor: "var(--text-color)" },
                },
              }}
            />
            <TextField
              id="list"
              type="submit"
              value="Save"
              sx={{
                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": { borderColor: "var(--text-color)" },
                },
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: "72%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "var(--background-color)",
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
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                padding: "10px",
                marginLeft: "1.5%",
                color: "var(--text-color)",
              }}
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
                  <TextbookImages listing={listing} />
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
                      {title === "" ? "Title" : title}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="var(--text-color)"
                      sx={{ fontWeight: "bold" }}
                      // id="previewPrice"
                    >
                      {price === "" ? "Price" : "$" + price}
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
                      Course
                      <Typography variant="body1" color="var(--text-color)">
                        {course}
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
                      {userData["preferredName"] === ""
                        ? userData["firstName"] + " " + userData["lastName"]
                        : userData["preferredName"] +
                          " " +
                          userData["lastName"]}
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
      </Box>
    </Dialog>
  );
};

export default EditListing;