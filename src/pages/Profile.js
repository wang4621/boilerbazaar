import {
  Avatar,
  Rating,
  Divider,
  Box,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import * as React from "react";
import "./Profile.css";
import $ from "jquery";

const Profile = ({ userData, setUserData }) => {
  console.log(userData);
  const [isDisabled, setDisabled] = React.useState(true);
  const [value, setValue] = React.useState("Edit");
  // let profileData = JSON.parse(localStorage.getItem('userData'));
  // const firstName = profileData['firstName'];
  const firstName = userData["firstName"];
  // const lastName = profileData['lastName'];
  const lastName = userData["lastName"];
  // const puid = profileData['puid'];
  const puid = userData["puid"];
  // const [preferredMeeting, setPreferredMeeting] = React.useState(profileData['preferredMeeting']);
  const [preferredMeeting, setPreferredMeeting] = React.useState(
    userData["preferredMeeting"]
  );
  // const [preferredName, setPreferredName] = React.useState(profileData['preferredName']);
  const [preferredName, setPreferredName] = React.useState(
    userData["preferredName"]
  );
  // const [major, setMajor] = React.useState(profileData['major']);
  const [major, setMajor] = React.useState(userData["major"]);

  const preferredMeetingChange = (event) => {
    setPreferredMeeting(event.target.value);
  };

  const majorChange = (event) => {
    setMajor(event.target.value);
  };

  const preferredNameChange = (event) => {
    setPreferredName(event.target.value);
  };

  let name;
  if (preferredName === "") {
    name = firstName + " " + lastName;
  } else {
    name = preferredName + " " + lastName;
  }

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
            onChange={preferredNameChange}
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
          <TextField id="puid" label="PUID" disabled value={puid} />
          <TextField
            id="major"
            label="Major"
            disabled={isDisabled}
            value={major}
            onChange={majorChange}
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
            onChange={preferredMeetingChange}
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
          {name}
        </Typography>
        <br />
        <Typography variant="h6" color="var(--text-color)">
          Rating
        </Typography>
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
            5
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
            1
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default Profile;
