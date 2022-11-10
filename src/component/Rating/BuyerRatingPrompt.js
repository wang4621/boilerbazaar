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
import $ from "jquery";
import LoadingButton from "@mui/lab/LoadingButton";
import SelectBuyer from "./SelectBuyer";
import RatingAndReview from "./RatingAndReview";

const BuyerRatingPrompt = ({
  listingID,
  puid,
  open,
  setOpen,
  setSold,
  setSoldLoading,
}) => {
  const steps = ["Select Buyer", "Rating and Review"];
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = useState(false);

  const handleExit = () => {
    setOpen(false);
    setSoldLoading(false);
  };

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
              />
            ) : (
              <RatingAndReview
                listingID={listingID}
                puid={puid}
                setSold={setSold}
                setActiveStep={setActiveStep}
              />
            )}
          </React.Fragment>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BuyerRatingPrompt;
