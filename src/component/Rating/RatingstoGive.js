import $ from "jquery";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Button
} from "@mui/material";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import RatingstoGiveBox from "./RatingstoGiveBox";

const RatingstoGive = ({ userData }) => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [maxSteps, setMaxStep] = useState(0);
  const [stateChange, setStateChange] = useState(false);

  useEffect(() => {
    setLoading(true);
    // get reviews that user needs to submit
    $.ajax({
      url:
        "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/rating/buyer?puid=" +
        userData["puid"],
      type: "GET",
      success: function (result) {
        console.log(result);
        setMaxStep(result.length);
        setRatings(result);
        setLoading(false);
      },
      error: function (result) {
        console.log(JSON.stringify(result));
      },
    });
  }, [userData, stateChange]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box
      sx={{
        width: "80%",
        // maxWidth: 400, flexGrow: 1
      }}
    >
      <Paper
        square
        // elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 50,
          // pl: 2,
          borderRadius: "10px 10px 0px 0px",
          bgcolor: "var(--secondary-color)",
        }}
      >
        <Typography sx={{ color: "var(--text-color)" }}>
          Reviews to Give
        </Typography>
      </Paper>
      <Box
        sx={{
          height: 300,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // flexDirection:"row",
          backgroundColor: "var(--primary-color)",
        }}
      >
        {loading ? (
          <CircularProgress mt={2} />
        ) : ratings.length === 0 ? (
          <Typography sx={{ color: "var(--text-color)" }}>
            No Ratings to Give
          </Typography>
        ) : (
          <RatingstoGiveBox
            rating={ratings[activeStep]}
            stateChange={stateChange}
            setStateChange={setStateChange}
          />
        )}
      </Box>
      <MobileStepper
        sx={{
          borderRadius: "0px 0px 10px 10px",
          bgcolor: "var(--secondary-color)",
        }}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={
              maxSteps === 0 ? true : activeStep === maxSteps - 1 ? true : false
            }
            sx={{ color: "var(--text-color)" }}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
            sx={{ color: "var(--text-color)" }}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
};

export default RatingstoGive;
