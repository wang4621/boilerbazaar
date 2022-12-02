import blank from '../component/Images/blank.jpg'
import {Box, TextField, Typography, Button} from '@mui/material';
import './Message.css';
import $ from 'jquery';
import React, { useState, useEffect, Linking, Text } from "react";












const ClassLinks = ({ userData }) => {
  const [classes, setClasses] = useState([]);

  

  useEffect(() => {
    $.ajax({
      url:
        "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/class?className=" +
        "CS350",
      type: "GET",
      success: function (result) {
        console.log(JSON.stringify(result));
        setClasses(result);
      },
      error: function (result) {
        console.log(JSON.stringify(result));
      },
    });
  }, []);

  const addLink = (event) => {
    let link = document.getElementById('link').value
    let className =  document.getElementById('className').value
    //add to class links
    var classJsonData = { "className": className, "links":link };
    classJsonData = '"' + JSON.stringify(classJsonData).replaceAll('"', '\\"') + '"';
    console.log(classJsonData)
    $.ajax({
      url: "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/class",
      type: "PUT",
      data: classJsonData,
      datatype: "json",
      contentType: "application/json",
      success: function (result) {
        console.log(result)
      },
      error: function (result) {
        console.log(JSON.stringify(result));
      },
    });
  };

    return (
      <div>
        <Box>
          <TextField 
            id="className" 
            label="Course Name" 
            disabled = {false} 
          />
          <TextField
            id="link"
            label="link"
            disabled = {false}
          />
        </Box>
        <Box class="add">
          <Button onClick={addLink}>Submit</Button>
        </Box>
        <Box>
          {classes.map((course) => (
            <Typography variant="h6">
              {course["className"]}
              {course["links"].map((link) => (
                <Typography >
                  <a href={link}>{link}</a>
                </Typography>
              ))}
            </Typography>
          ))}
        </Box>
        

      </div>
        
    )
}

export default ClassLinks;