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

const SellerRatingPrompt = () => {
  const steps = ["Rating and Review"];
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleExit = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setLoading(true);
    setLoading(false);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>{"Rating and Review of Seller"}</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
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
            <Box sx={{ display: "flex", pt: 2, width: 400, height: 280 }}>
              <RatingAndReview />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />

              <LoadingButton
                variant="contained"
                onClick={handleSubmit}
                loading={loading}
                disabled={loading}
              >
                Submit
              </LoadingButton>
            </Box>
          </React.Fragment>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SellerRatingPrompt;
