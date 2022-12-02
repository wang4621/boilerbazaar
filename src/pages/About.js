import blank from "../component/Images/blank.jpg";
import "./About.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";
import { Avatar, Box, CardHeader, CircularProgress, Grid, Typography } from "@mui/material";
import $ from 'jquery';
import React, { useEffect, useState, useRef } from "react";





const About = () => {
  const [profileImage1, setprofileImage1] = useState([]);
  const [profileImage2, setprofileImage2] = useState([]);
  const [profileImage3, setprofileImage3] = useState([]);
  const [profileImage4, setprofileImage4] = useState([]);
  const [profileImage5, setprofileImage5] = useState([]);
  
  

  //get profile pic
  $.ajax({
    url:
      "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing/images?listingID=" +
      "wang4621",
    type: "GET",
    success: function (result) {
      let resultImage = result["body"]["0"];
      
      setprofileImage1(resultImage);
    },
    error: function (result) {
      console.log(JSON.stringify(result));
    },
  });
  $.ajax({
    url:
      "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing/images?listingID=" +
      "msekiguc",
    type: "GET",
    success: function (result) {
      let resultImage = result["body"]["0"];
      
      setprofileImage2(resultImage);
    },
    error: function (result) {
      console.log(JSON.stringify(result));
    },
  });
  $.ajax({
    url:
      "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing/images?listingID=" +
      "doan23",
    type: "GET",
    success: function (result) {
      let resultImage = result["body"]["0"];
      
      setprofileImage3(resultImage);
    },
    error: function (result) {
      console.log(JSON.stringify(result));
    },
  });
  $.ajax({
    url:
      "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing/images?listingID=" +
      "xpham",
    type: "GET",
    success: function (result) {
      let resultImage = result["body"]["0"];
      
      setprofileImage4(resultImage);
    },
    error: function (result) {
      console.log(JSON.stringify(result));
    },
  });
  $.ajax({
    url:
      "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing/images?listingID=" +
      "fang282",
    type: "GET",
    success: function (result) {
      let resultImage = result["body"]["0"];
      
      setprofileImage5(resultImage);
    },
    error: function (result) {
      console.log(JSON.stringify(result));
    },
  });

  return (
    <div className="aboutDisplay">
      <Grid
        container
        // spacing={1}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          //   mt: 2,
        }}
      >
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: 250,
              width: "80%",
              borderRadius: 5,
              backgroundColor: "var(--secondary-color)",
              boxShadow: 8,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CardHeader title="Project Repository"/>
            <IconButton
              color="inherit"
              target="_blank"
              href="https://github.com/wang4621/boilerbazaar"
              rel="noopener noreferrer"
            >
              <GitHubIcon sx={{ width:128, height:128 }}/>
            </IconButton>
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: 250,
              width: "80%",
              borderRadius: 5,
              backgroundColor: "var(--secondary-color)",
              boxShadow: 8,
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar src={profileImage1} sx={{ width: 64, height: 64 }} />
            <Box sx={{textAlign:'center'}}>
              <Typography>Jeffrey Wang</Typography>
              <Typography>Contact Info: wang4621@purdue.edu</Typography>
            </Box>
            <IconButton
              color="inherit"
              target="_blank"
              href="https://github.com/wang4621"
              rel="noopener noreferrer"
            >
              <GitHubIcon sx={{ width: 32, height: 32 }} />
            </IconButton>
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: 250,
              width: "80%",
              borderRadius: 5,
              backgroundColor: "var(--secondary-color)",
              boxShadow: 8,
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar src={profileImage2} sx={{width:64, height:64}}/>
            <Box sx={{textAlign:'center'}}>
            <Typography>Michio L Sekiguchi</Typography>
            <Typography>Contact Info: msekiguc@purdue.edu</Typography>
            </Box>
            
            <IconButton
              color="inherit"
              target="_blank"
              href="https://github.com/msekiguc"
              rel="noopener noreferrer"
            >
              <GitHubIcon sx={{width:32, height:32}}/>
            </IconButton>
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: 250,
              backgroundColor: "white",
              width: "80%",
              borderRadius: 5,
              backgroundColor: "var(--secondary-color)",
              boxShadow: 8,
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar src={profileImage3} sx={{ width: 64, height: 64 }} />
            <Box sx={{textAlign:'center'}}>
            <Typography>Ryan Doan</Typography>
            <Typography>Contact Info: doan23@purdue.edu</Typography>
            </Box>
            <IconButton
              color="inherit"
              target="_blank"
              href="https://github.com/ryan-doan"
              rel="noopener noreferrer"
            >
              <GitHubIcon sx={{ width: 32, height: 32 }} />
            </IconButton>
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: 250,
              backgroundColor: "white",
              width: "80%",
              borderRadius: 5,
              backgroundColor: "var(--secondary-color)",
              boxShadow: 8,
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar src={profileImage4} sx={{ width: 64, height: 64 }} />
            <Box sx={{textAlign:'center'}}>
            <Typography>Xavier Huu Pham</Typography>
            <Typography>Contact Info: xpham@purdue.edu</Typography>
            </Box>
            
            <IconButton
              color="inherit"
              target="_blank"
              href="https://github.com/x-pham"
              rel="noopener noreferrer"
            >
              <GitHubIcon sx={{ width: 32, height: 32 }}/>
            </IconButton>
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: 250,
              backgroundColor: "white",
              width: "80%",
              borderRadius: 5,
              backgroundColor: "var(--secondary-color)",
              boxShadow: 8,
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar src={profileImage5} sx={{ width: 64, height: 64 }} />
            <Box sx={{textAlign:'center'}}>
            <Typography>Shicheng Fang</Typography>
            <Typography>Contact Info: fang282@purdue.edu</Typography>
            </Box>
            
            <IconButton
              color="inherit"
              target="_blank"
              href="https://github.com/fsc1118"
              rel="noopener noreferrer"
            >
              <GitHubIcon sx={{ width: 32, height: 32 }}/>
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default About;
