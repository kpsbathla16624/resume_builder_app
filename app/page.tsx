"use client"
import React from 'react'
import { useActiveStep } from './context/navigationcontext';
import HorizontalStepper from './components/stepper';
import Preview from './components/Preview';


function page() {
  const { activeStep, handleNext } = useActiveStep();
  
  return (
    <div className={`w-full ${activeStep !==6 ? "h-screen grid" : "h-full min-h-screen "}   grid-cols-10  pt-10 pb-10 `}>
      <div className={` w-full h-full  ${activeStep === 6 ? "col-span-10" : " col-span-6"} `}>

      <HorizontalStepper/>
      </div>
      <div className={`w-full col-span-4 px-2 h-full rounded-xl ${activeStep === 6 && "hidden"}`}>
        <Preview />
      </div>
    </div>
  )
}

export default page
