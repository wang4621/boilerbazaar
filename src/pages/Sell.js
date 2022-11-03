import "./Sell.css";
import {
  Avatar,
  CardContent,
  Divider,
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import $ from "jquery";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import WarningIcon from "@mui/icons-material/Warning";

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

const Sell = ({ userData }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setISBN] = useState("");
  const [edition, setEdition] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const limit = 250;
  const [getStringLength, setStringLength] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [authorError, setAuthorError] = useState(false);
  const [isbnError, setISBNError] = useState(false);
  const [editionError, setEditionError] = useState(false);
  const [courseError, setCourseError] = useState(false);
  const [conditionError, setConditionError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [submittedListing, setSubmittedListing] = useState(false);
  const [imageCount, setImageCount] = useState(0)

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
    var sellerID = userData["puid"];
    var images = document.getElementById("images").files;
    console.log(images)
    var missing = false;
    if (imageCount === 0) {
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
        getBase64(images[i], i, imagesJson, i === imageCount - 1);
      }
      var jsonData = {
        listingID: listingID,
        sellerID: sellerID,
        title: title,
        price: price,
        author: author,
        isbn: isbn,
        edition: edition,
        course: course,
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
      // document.getElementById("previewAuthor").innerText = event.target.value;
      setAuthor(event.target.value);
    } else if (event.target.id === "isbn") {
      if (event.target.value !== "") {
        setISBNError(false);
      }
      if (submittedListing && event.target.value === "") {
        setISBNError(true);
      }
      // document.getElementById("previewISBN").innerText = event.target.value;
      setISBN(event.target.value);
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
      // document.getElementById("previewDescription").innerText = event.target.value;
      setDescription(event.target.value);
    }
  };

  const imageUpload = (event) => {
    console.log(event)
    let imageLength = event.target.files.length
    let isImage = true;
    for (let imageFile in event.target.files) {
      let extension = imageFile.name.slice((imageFile.name.lastIndexOf(".") - 1 >>> 0) + 2)
      if (extension !== "jpg" && extension !== "png") {
        isImage = false;
      }
    }
    if (isImage) {
      setImageCount(imageCount + imageLength)
    }
  }

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
        <Divider
          variant="middle"
          sx={{ borderBottomColor: "var(--text-color)" }}
        />
        <Box
          sx={{
            "& > :not(style)": { m: 1 },
            height: "93%",
            overflowY: "auto",
            "& .MuiOutlinedInput-root:hover": {
              "& > fieldset": { borderColor: "var(--text-color)" },
            },
          }}
          component="form"
          noValidate
          autoComplete="off"
          className="formDisplay scrollBar"
          onSubmit={listTextbook}
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
              disabled={imageCount === 5 ? true : false}
              sx={{ width: "100%" }}
            >
              Upload Images Here
              <input id="images" type="file" hidden multiple onChange={imageUpload} accept="image/*"/>
            </Button>
            {/* <FormHelperText>Please upload at least one image</FormHelperText> */}
            {imageError ? (
              <FormHelperText error={imageError}>
                Please upload at least one image
              </FormHelperText>
            ) : (
              ""
            )}
          </Box>
          <TextField
            id="title"
            label="Title"
            required
            onChange={changeText}
            error={titleError}
            helperText={titleError ? "Please add a title." : ""}
            inputProps={{
              maxLength: 60,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {titleError ? <WarningIcon sx={{ color: "red" }} /> : ""}
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="price"
            label="Price"
            required
            onChange={changeText}
            error={priceError}
            helperText={priceError ? "Please add a price." : ""}
            inputProps={{
              maxLength: 3,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {priceError ? <WarningIcon sx={{ color: "red" }} /> : ""}
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="author"
            label="Author"
            required
            onChange={changeText}
            error={authorError}
            helperText={authorError ? "Please add an author." : ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {authorError ? <WarningIcon sx={{ color: "red" }} /> : ""}
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="isbn"
            label="ISBN"
            required
            onChange={changeText}
            error={isbnError}
            helperText={isbnError ? "Please add an ISBN." : ""}
            inputProps={{ maxLength: 13 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {isbnError ? <WarningIcon sx={{ color: "red" }} /> : ""}
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="edition"
            label="Edition"
            required
            onChange={changeText}
            error={editionError}
            helperText={editionError ? "Please add an edition." : ""}
            inputProps={{ maxLength: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {editionError ? <WarningIcon sx={{ color: "red" }} /> : ""}
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="course"
            label="Course"
            required
            onChange={changeText}
            error={courseError}
            helperText={courseError ? "Please add a course." : ""}
            inputProps={{ maxLength: 10 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {courseError ? <WarningIcon sx={{ color: "red" }} /> : ""}
                </InputAdornment>
              ),
            }}
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {conditionError ? (
                    <WarningIcon sx={{ color: "red", marginRight: 2 }} />
                  ) : (
                    ""
                  )}
                </InputAdornment>
              ),
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
            // sx={{
            //   "& .MuiOutlinedInput-root:hover": {
            //     "& > fieldset": { borderColor: "var(--text-color)" },
            //   },
            // }}
          />
          <TextField
            id="list"
            type="submit"
            value="List"
            // sx={{
            //   "& .MuiOutlinedInput-root:hover": {
            //     "& > fieldset": { borderColor: "var(--text-color)" },
            //   },
            // }}
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
            component={"span"}
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
                <Typography variant="h4">Listing Preview</Typography>
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
                    // color="var(--text-color)"
                    sx={{ fontWeight: "bold" }}
                    // id="previewTitle"
                  >
                    {title === "" ? "Title" : title}
                  </Typography>
                  <Typography
                    variant="h6"
                    // color="var(--text-color)"
                    sx={{ fontWeight: "bold" }}
                    // id="previewPrice"
                  >
                    {price === "" ? "Price" : "$" + price}
                  </Typography>
                  <br />
                  <Typography
                    variant="h6"
                    // color="var(--text-color)"
                    sx={{ fontWeight: "bold" }}
                  >
                    Details
                  </Typography>
                  <br />
                  <Typography
                    variant="h6"
                    // color="var(--text-color)"
                    sx={{ fontWeight: "bold" }}
                  >
                    Author
                    <Typography
                      variant="body1"
                      // color="var(--text-color)"
                      // id="previewAuthor"
                    >
                      {author}
                    </Typography>
                  </Typography>
                  <Typography
                    variant="h6"
                    // color="var(--text-color)"
                    sx={{ fontWeight: "bold" }}
                  >
                    ISBN
                    <Typography
                      variant="body1"
                      // color="var(--text-color)"
                      // id="previewISBN"
                    >
                      {isbn}
                    </Typography>
                  </Typography>
                  <Typography
                    variant="h6"
                    // color="var(--text-color)"
                    sx={{ fontWeight: "bold" }}
                  >
                    Edition
                    <Typography
                      variant="body1"
                      // color="var(--text-color)"
                      // id="previewEdition"
                    >
                      {edition}
                    </Typography>
                  </Typography>
                  <Typography
                    variant="h6"
                    // color="var(--text-color)"
                    sx={{ fontWeight: "bold" }}
                  >
                    Course
                    <Typography
                      variant="body1"
                      // color="var(--text-color)"
                    >
                      {course}
                    </Typography>
                  </Typography>
                  <Typography
                    variant="h6"
                    // color="var(--text-color)"
                    sx={{ fontWeight: "bold" }}
                  >
                    Condition
                    <Typography
                      variant="body1"
                      // color="var(--text-color)"
                      // id="previewCondition"
                    >
                      {condition}
                    </Typography>
                  </Typography>
                  <br />
                  <Typography
                    variant="h6"
                    // color="var(--text-color)"
                    sx={{ fontWeight: "bold" }}
                  >
                    Description
                    <Typography
                      variant="body1"
                      // color="var(--text-color)"
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
                    // color="var(--text-color)"
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
                    // color="var(--text-color)"
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
                    {userData["preferredName"] === ""
                      ? userData["firstName"] + " " + userData["lastName"]
                      : userData["preferredName"] + " " + userData["lastName"]}
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
};

export default Sell;
