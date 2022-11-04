import {
  Avatar,
  Rating,
  Divider,
  Box,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import "./Profile.css";
import $ from "jquery";

const Profile = ({ userData, setUserData }) => {
  console.log(userData);
  const [isDisabled, setDisabled] = useState(true);
  const [value, setValue] = useState("Edit");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [puid, setPuid] = useState("");
  const [preferredMeeting, setPreferredMeeting] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [major, setMajor] = useState("");
  const [sales, setSales] = useState("");

  useEffect(() => {
    setFirstName(userData.firstName);
    setLastName(userData.lastName);
    setPuid(userData.puid);
    setPreferredMeeting(userData.preferredMeeting);
    setPreferredName(userData.preferredName);
    setMajor(userData.major);
    setSales(userData.sell);
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
        sell: sales
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
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="Public">Public</MenuItem>
            <MenuItem value="In front of house/apt">
              In front of house/apt
            </MenuItem>
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
        <Avatar sx={{ width: 128, height: 128 }} />
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
        <Rating name="read-only" readOnly size="large" />
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
            0
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
