import { Box, Step, StepLabel, Stepper } from '@mui/material';
import { FC } from 'react';

interface Props {
  currentStep: number;
  steps: string[];
}

const StepBar: FC<Props> = ({ steps, currentStep }) => {
  return (
    <Box sx={{ width: '100%', paddingY: '46px' }}>
      <Stepper activeStep={currentStep} alternativeLabel className="max-w-[600px] mx-auto">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StepBar;
