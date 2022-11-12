import React, { useState, useEffect } from "react";
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
import SelectBuyer from "./SelectBuyer";
import RatingAndReviewBuyer from "./RatingAndReviewBuyer";

const BuyerRatingPrompt = ({
  listingID,
  puid,
  open,
  setOpen,
  setSold,
  setSoldLoading,
}) => {
  const steps = ["Select Buyer", "Rating and Review"];
  const [activeStep, setActiveStep] = useState(0);
  const [buyer, setBuyer] = useState("");

  const handleExit = () => {
    setOpen(false);
    setSoldLoading(false);
    setSold("true");
  };

  useEffect(() => {
    if (open) {
      setActiveStep(0);
    }
  }, [open])
  
  return (
    <Dialog open={open}>
      <DialogTitle>{"Rating and Review of Buyer"}</DialogTitle>
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
            {activeStep === 0 ? (
              <SelectBuyer
                setOpen={setOpen}
                setSoldLoading={setSoldLoading}
                setActiveStep={setActiveStep}
                setBuyer={setBuyer}
              />
            ) : (
              <RatingAndReviewBuyer
                listingID={listingID}
                puid={puid}
                setSold={setSold}
                setActiveStep={setActiveStep}
                buyer={buyer}
              />
            )}
          </React.Fragment>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BuyerRatingPrompt;
