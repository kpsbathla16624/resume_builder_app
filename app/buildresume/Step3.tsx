import React from 'react'
import { useResumeContext } from '../context/appContext';

function Step3() {
  const { resume, updateResume } = useResumeContext();
  console.log(resume);

  return (
    <div>
      step 3 content
    </div>
  )
}

export default Step3
