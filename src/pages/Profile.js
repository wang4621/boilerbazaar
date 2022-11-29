import {
  Avatar,
  Rating,
  Divider,
  Box,
  Typography,
  TextField,
  MenuItem,
  FormHelperText,
  Button,
  Grid,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import "./Profile.css";
import $ from "jquery";
import PreviewImage from "../component/PreviewImage/PreviewImage";
import PreviewImageSwiper from "../component/PreviewImage/PreviewImageSwiper";

const Profile = ({ userData, setUserData }) => {
  const [isDisabled, setDisabled] = useState(true);
  const [value, setValue] = useState("Edit");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [puid, setPuid] = useState("");
  const [preferredMeeting, setPreferredMeeting] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [major, setMajor] = useState("");
  const [sales, setSales] = useState("0");
  const [rating, setRating] = useState(0);
  const [ratingLength, setRatingLength] = useState(0);
  const [purchases, setPurchases] = useState("0");
  const [imageError, setImageError] = useState(false);
  const [previewImage, setPreviewImage] = useState([]);



  useEffect(() => {
    console.log(userData);
    setFirstName(userData.firstName);
    setLastName(userData.lastName);
    setPuid(userData.puid);
    setPreferredMeeting(userData.preferredMeeting);
    setPreferredName(userData.preferredName);
    setMajor(userData.major);
    setSales(userData.sell);
    setPurchases(userData.purchases);
    // let sum = 0;
    // if (userData.rating !== undefined) {
    //   for (let i = 0; i < userData.rating.length; i++) {
    //     sum += parseInt(userData.rating[i]);
    //   }
    //   if (userData.rating.length !== 0) {
    //     setRating(sum / userData.rating.length);
    //     setRatingLength(userData.rating.length);
    //   }
    // }
    $.ajax({
      url:
        "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/rating?puid=" +
        userData["puid"],
      type: "GET",
      success: function (result) {
        console.log(result);
        let userRating = [];
        let sum = 0;
        for (let i = 0; i < result.length; i++) {
          if (userData.puid === result[i].buyerID) {
            sum += parseInt(result[i].sellerRatingofBuyer);
            userRating.push(result[i].sellerRatingofBuyer)
          } else if (userData.puid === result[i].sellerID) {
            if (result[i].buyerReviewOfSeller !== '') {
              sum += parseInt(result[i].buyerRatingofSeller);
              userRating.push(result[i].buyerRatingofSeller)
            }
          }
        }
        if (userRating.length !== 0) {
          setRating(sum / userRating.length);
          setRatingLength(userRating.length);
        }
      },
      error: function (result) {
        console.log(JSON.stringify(result));
      },
    });
  }, [userData]);

  const editOrSaveProfile = (event) => {
    setDisabled(!isDisabled);
    if (value === "Edit") {
      setValue("Save");
    } else if (value === "Save") {
      // save new values into local storage
      var jsonData = {
        puid: puid,
        preferredName: preferredName,
        major: major,
        preferredMeeting: preferredMeeting,
        firstName: firstName,
        lastName: lastName,
        sell: sales,
        purchases: purchases,
        rating: userData.rating,
      };
      // localStorage.setItem('userData', JSON.stringify(jsonData));
      setUserData(jsonData);
      jsonData = '"' + JSON.stringify(jsonData).replaceAll('"', '\\"') + '"';
      // console.log(profileData)
      $.ajax({
        url: "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/profile",
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
      setValue("Edit");
    }
    event.preventDefault();
  };


  function encodeImageFileAsURL(file) {
    var reader = new FileReader();
    reader.onloadend = function () {
      // console.log('RESULT', reader.result)
      setPreviewImage((previewImage) => [...previewImage, reader.result]);
    };
    reader.readAsDataURL(file);
  }

  // const imageUpload = (event) => {
  //   console.log(event);
  //   let imageLength = event.target.files.length;
  //   if (imageLength + imageCount <= 5) {
  //     let isImage = true;
  //     for (let i = 0; i < imageLength; i++) {
  //       // console.log(event.target.files[i].type.split('/')[1])
  //       let extension = event.target.files[i].type.split("/")[1];
  //       if (extension === "jpeg" || extension === "png") {
  //         isImage = true;
  //         setImageError(false);
  //       } else {
  //         isImage = false;
  //         setImageError(true);
  //         break;
  //       }
  //     }
  //     if (isImage) {
  //       for (let j = 0; j < imageLength; j++) {
  //         // console.log(event.target.files[j])
  //         encodeImageFileAsURL(event.target.files[j]);
  //       }
  //       // setImageCount(imageCount + imageLength);
  //     }
  //   }
  // };
  const imageUpload = (event) => {
    console.log(event);
    let isImage = true;
      console.log(event.target.files[0].type.split("/")[1])
      let extension = event.target.files[0].type.split("/")[1];

      if (extension === "jpeg" || extension === "png") {
        isImage = true;
        setImageError(false);
      } else {
        isImage = false;
        setImageError(true);
      }
      if (isImage) {
        console.log(event.target.files[0])

        encodeImageFileAsURL(event.target.files[0]);
        // setImageCount(imageCount + imageLength);
      }
  };

  function sendImage(imageJson) {
    $.ajax({
      url: "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/profile/image",
      type: "PUT",
      data: imageJson,
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

  return (
    <Box className="profileDisplay">
      <Box
        sx={{
          width: "35%",
          height: "100%",
          backgroundColor: "var(--secondary-color)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", textAlign: "center", padding: "10px" }}
        >
          General
        </Typography>
        <Divider
          variant="middle"
          sx={{ borderBottomColor: "var(--text-color)" }}
        />
        <br />
        <Box
          sx={{
            "& > :not(style)": { m: 1.5 },
            height: "95%",
            overflowY: "auto",
          }}
          component="form"
          autoComplete="off"
          className="profileFormDisplay"
          onSubmit={editOrSaveProfile}
          id="profileForm"
        >
          <Box
            sx={{
              width: "85%",
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            
            <Button
              variant="contained"
              component="label"
              disabled={isDisabled}
              sx={{ width: "100%" }}
            >
              Change Profile Picture
              <input
                id="images"
                type="file"
                hidden
                single
                onChange={imageUpload}
                accept="image/*"
                
              />
            </Button>
            {/* <FormHelperText>Please upload at least one image</FormHelperText> */}
            {imageError ? (
              <FormHelperText error={imageError}>
                Please upload an image
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
              {previewImage.map((image, index) => {
                return (
                  <PreviewImage
                    image={image}
                    index={index}
                    previewImages={previewImage}
                    setPreviewImages={setPreviewImage}
                  />
                );
              })}
            </Grid>
          </Box>
          <TextField id="puid" label="Login Username" disabled value={puid} />
          <TextField
            id="firstName"
            label="First Name"
            disabled
            value={firstName}
          />
          <TextField
            id="preferredName"
            label="Preferred Name"
            disabled={isDisabled}
            value={preferredName}
            onChange={(e) =>
              setPreferredName(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              )
            }
            sx={{
              "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": { borderColor: "var(--text-color)" },
              },
            }}
            inputProps={{ maxLength: 30 }}
          />
          <TextField
            id="lastName"
            label="Last Name"
            disabled
            value={lastName}
          />
          <TextField
            id="major"
            label="Major"
            disabled={isDisabled}
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": { borderColor: "var(--text-color)" },
              },
            }}
          />
          <TextField
            id="location"
            label="Preferred Meeting Location"
            select
            value={preferredMeeting}
            disabled={isDisabled}
            onChange={(e) => setPreferredMeeting(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": { borderColor: "var(--text-color)" },
              },
            }}
          >
            <MenuItem value="Anywhere">Anywhere</MenuItem>
            <MenuItem value="Public">Public</MenuItem>
            <MenuItem value="Home">Home</MenuItem>
          </TextField>
          <TextField type="submit" value={value} />
        </Box>
      </Box>
      <Box
        sx={{
          width: "65%",
          height: "100%",
          backgroundColor: "var(--secondary-color)",
        }}
        className="ratingBox"
      >
        <Avatar alt={preferredName === ""
            ? firstName + " " + lastName
            : preferredName + " " + lastName}
            src={previewImage}
            sx={{ width: 128, height: 128 }} />
        <Typography
          variant="h6"
          color="var(--text-color)"
          sx={{ textAlign: "center" }}
        >
          {preferredName === ""
            ? firstName + " " + lastName
            : preferredName + " " + lastName}
        </Typography>
        <br />
        {/* <Typography variant="h6" color="var(--text-color)">
          Rating
        </Typography> */}

        <Typography
          variant="h6"
          color="var(--text-color)"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Rating
            name="read-only"
            readOnly
            size="large"
            value={rating}
            precision={0.5}
            sx={{ mr: 1 }}
          />
          {ratingLength === 0 ? "" : "(" + ratingLength + ")"}
        </Typography>
        <br />
        <br />
        <Typography component={"span"} variant="h6" color="var(--text-color)">
          Completed Purchases:
          <Typography display="inline">&nbsp;</Typography>
          <Typography
            component={"span"}
            variant="h6"
            color="var(--text-color)"
            display="inline"
            id="purchases"
          >
            {purchases}
          </Typography>
        </Typography>
        <Typography component={"span"} variant="h6" color="var(--text-color)">
          Completed Sales:
          <Typography display="inline">&nbsp;</Typography>
          <Typography
            component={"span"}
            variant="h6"
            color="var(--text-color)"
            display="inline"
            id="sales"
          >
            {sales}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default Profile;
