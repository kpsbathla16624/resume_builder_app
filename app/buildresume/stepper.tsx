"use client";
import React, { ReactNode } from 'react';
import { Stepper, Step, StepLabel, Button } from '@mui/material';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Preview from './Preview';
import Step5 from './Step5';
import Step6 from './Step6';

// Step labels
const steps: string[] = ['Personal Info', 'Education ', 'Education', "Projects" ,'Skills' , 'Summary'];

// StepContent component to render different content based on the active step
interface StepContentProps {
  step: number;
}

function StepContent({ step }: StepContentProps): ReactNode {
  switch (step) {
    case 0:
      return <Step1/>
    case 1:
      return <Step2/>
    case 2:
      return <Step3/>
    case 3:
      return <Step4/>
    case 4:
      return <Step5/>
    case 5:
      return <Step6/>

    default:
      return <Preview/>
  }
}

const HorizontalStepper: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState<number>(0);

  const handleNext = (): void => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = (): void => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleReset = (): void => {
    setActiveStep(0);
  };

  return (
    <div className='text-white w-full h-full flex flex-col'>
      <Stepper activeStep={activeStep} alternativeLabel >
        {steps.map((label, index) => (
          <Step key={index}>
            {/* Use sx prop to apply custom styles to the StepLabel */}
            <StepLabel  >
              <h1 className='text-white'>{label}</h1>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className='w-full h-full flex justify-center items-center'> <StepContent step={activeStep} /> </div>
      <div className="mt-4 w-full flex justify-between">
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              {activeStep === steps.length ? <div></div> : <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>}
            </div>
      {/* <div className="mt-4 h-full w-full justify-center items-center flex">
        {activeStep === steps.length ? (
          <div className=' w-full h-full flex flex-col items-center justify-center'>
            <Preview/>
            <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div className='flex flex-col items-end h-full  justify-between'>
           
            <div className="mt-4 w-full flex justify-between">
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default HorizontalStepper;
