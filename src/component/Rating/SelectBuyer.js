import React, { useEffect, useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
  FormHelperText,
  Button,
} from "@mui/material";

const SelectBuyer = ({ setOpen, setSoldLoading, setActiveStep, setBuyer }) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = useState(false);

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
    // get users who were interested
  }, []);
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
              <FormControlLabel
                value="wang4621"
                control={<Radio />}
                label="wang4621"
              />
              <FormControlLabel
                value="xpham"
                control={<Radio />}
                label="xpham"
              />
              {/* <FormControlLabel
                value="fang282"
                control={<Radio />}
                label="fang282"
              />
              <FormControlLabel
                value="doan23"
                control={<Radio />}
                label="doan23"
              /> */}
              <FormControlLabel
                value="elsewhere"
                control={<Radio />}
                label="Sold Somewhere Else"
              />
            </RadioGroup>
          </Box>
          <FormHelperText
            sx={{ fontSize: "14px", marginLeft: 0 }}
            error={error}
          >
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
