import React, { useEffect, useState } from "react";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box, FormHelperText, Button } from "@mui/material";
import $ from "jquery";

const SelectBuyer = ({ setOpen, setSoldLoading, setActiveStep, setBuyer, puid }) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = useState(false);
  const [contacts, setContacts] = useState([]);

  const handleChange = (event) => {
    setError(false);
    setValue(event.target.value);
  };

  const handleNext = () => {
    if (value === "") {
      setError(true);
    } else if (value === "elsewhere") {
      setActiveStep(2);
    } else {
      setBuyer(value);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleExit = () => {
    setOpen(false);
    setSoldLoading(false);
  };

  useEffect(() => {
    // get users who messaged seller
    $.ajax({
      url: "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/conversation?puid=" + puid,
      type: "GET",
      success: function (result) {
        let contactNames = [];
        for (const x of result["body"]) {
          if (x["user0"] !== puid) {
            contactNames.push(x["user0"]);
          } else {
            contactNames.push(x["user1"]);
          }
        }
        setContacts(contactNames);
      },
      error: function (result) {
        //console.log(JSON.stringify(result));
      },
    });
  }, [puid]);

  return (
    <Box>
      <Box sx={{ display: "flex", pt: 2, width: 400, height: 280 }}>
        <FormControl sx={{ width: "100%" }}>
          <FormLabel sx={{ color: "black" }}>Buyer</FormLabel>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: 250,
              width: "100%",
              overflowY: "auto",
            }}
            className="scrollBar"
          >
            <RadioGroup value={value} onChange={handleChange}>
              {contacts.map((contact) => {
                return <FormControlLabel key={contact} value={contact} control={<Radio />} label={contact} />;
              })}
              <FormControlLabel value="elsewhere" control={<Radio />} label="Sold Somewhere Else" />
            </RadioGroup>
          </Box>
          <FormHelperText sx={{ fontSize: "14px", marginLeft: 0 }} error={error}>
            {error ? "Please select a buyer." : ""}
          </FormHelperText>
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button color="inherit" sx={{ mr: 1 }} onClick={handleExit}>
          Cancel
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button onClick={handleNext} variant="contained">
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default SelectBuyer;
