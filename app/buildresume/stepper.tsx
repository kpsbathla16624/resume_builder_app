"use client";
import React from 'react';
import { Stepper, Step, StepLabel, Button } from '@mui/material';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Preview from './Preview';
import Step5 from './Step5';
import Step6 from './Step6';
import { useActiveStep } from '../context/navigationcontext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


// Step labels
const steps: string[] = ['Personal Info', 'Education', 'Experience', 'Projects', 'Skills', 'Summary'];

// StepContent component to render different content based on the active step
interface StepContentProps {
  step: number;
}

function StepContent({ step }: StepContentProps) {
  switch (step) {
    case 0:
      return <Step1 />;
    case 1:
      return <Step2 />;
    case 2:
      return <Step3 />;
    case 3:
      return <Step4 />;
    case 4:
      return <Step5 />;
    case 5:
      return <Step6 />;
    default:
      return <Preview />;
  }
}

const HorizontalStepper: React.FC = () => {
  const { activeStep, handleNext, handleBack, handleReset } = useActiveStep();

  return (
    <div className='text-white overflow-x-hidden w-full h-full flex flex-col'>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>
              <h1 className='text-white'>{label}</h1>
              {index === 2 && <h1 className='text-white'>(optional)</h1>}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className='w-full h-full flex justify-center items-center'>
        <StepContent step={activeStep} />
      </div>
      <div className="mt-4  top-[85vh]  px-10  flex w-full  absolute z-50    justify-between">
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button  onClick={handleNext}>
          Skip
        </Button>
       
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop />
        
    </div>
  );
};

export default HorizontalStepper;
