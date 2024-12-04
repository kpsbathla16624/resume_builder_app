"use client";
import React, { createContext, useContext, ReactNode, useState } from 'react';

// Define the shape of the context state
interface ActiveStepContextType {
  activeStep: number;
  setActiveStep: (step: number) => void;
  handleNext: () => void;
  handleBack: () => void;
  handleReset: () => void;
}

// Create a context with a default value
const ActiveStepContext = createContext<ActiveStepContextType | undefined>(undefined);

// Provider Component
interface ActiveStepProviderProps {
  children: ReactNode;
}

export const ActiveStepProvider: React.FC<ActiveStepProviderProps> = ({ children }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <ActiveStepContext.Provider value={{ activeStep, setActiveStep, handleNext, handleBack, handleReset }}>
      {children}
    </ActiveStepContext.Provider>
  );
};

// Custom hook to access the context
export const useActiveStep = (): ActiveStepContextType => {
  const context = useContext(ActiveStepContext);
  if (!context) {
    throw new Error('useActiveStep must be used within an ActiveStepProvider');
  }
  return context;
};
