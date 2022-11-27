import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
} from "@mui/material";
// import LoadingButton from "@mui/lab/LoadingButton";
import RatingandReviewSeller from "./RatingandReviewSeller";

const SellerRatingPrompt = ({
  open,
  setOpen,
  stepData,
  stateChange,
  setStateChange,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleExit = () => {
    setOpen(false);
    setStateChange(!stateChange);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>{"Rating and Review of Seller"}</DialogTitle>
      <DialogContent>
        <Box sx={{ overflowX: "auto", width: 400 }} className="scollBar">
          <Stepper activeStep={activeStep} sx={{ mb: 1 }}>
            <Step key={stepData.id}>
              <StepLabel>
                {"Rating and Review for " + stepData.sellerID}
              </StepLabel>
            </Step>
          </Stepper>
        </Box>
        {activeStep === 1 ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleExit} variant="contained">
                Exit
              </Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <RatingandReviewSeller
              stepData={stepData}
              setActiveStep={setActiveStep}
              setOpen={setOpen}
            />
          </React.Fragment>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SellerRatingPrompt;
