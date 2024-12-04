import React from 'react';
import { useResumeContext } from '../context/appContext';
import ResumeModel from '../model/ResumeModel';
import { useForm } from 'react-hook-form';
import { useActiveStep } from '../context/navigationcontext';
import { toast } from 'react-toastify';

function Step1() {
  const { resume, updateResume } = useResumeContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ResumeModel>({
    defaultValues: resume,
  });
  const { activeStep, handleNext } = useActiveStep();

  // Handle form submission
  const onSubmit = (data: ResumeModel) => {
    // Update resume context with validated data
    Object.keys(data).forEach((key) => updateResume(key as keyof ResumeModel, data[key as keyof ResumeModel]));
    
    // Show a toast message 
    toast.success('Personal info saved successfully');

    // Proceed to the next step
    handleNext();
  };

  return (
     <form onSubmit={handleSubmit(onSubmit)} className= " w-full flex flex-col justify-center items-center space-y-10 ">
      <div className=' w-full  md:px-10 lg:px-32  gap-5 grid grid-cols-2 grid-rows-2 justify-center items-center'>
      <div className="flex flex-col">
        <label htmlFor="name" className="text-gray-700 font-semibold mb-2">Name</label>
        <input
          {...register('name', { required: 'Name is required' })}
          type="text"
          id="name"
          placeholder="Enter your name"
          className={`text-black p-3 border-2 w-full rounded-lg focus:outline-none focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="text-gray-700 font-semibold mb-2">Email</label>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
              message: 'Invalid email address',
            },
          })}
          type="email"
          id="email"
          placeholder="Enter your email"
          className={`text-black p-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="phone" className="text-gray-700 font-semibold mb-2">Phone</label>
        <input
          {...register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^[0-9]{11}$/,
              message: 'Phone number must be 10 digits',
            },
          })}
          type="text"
          id="phone"
          placeholder="Enter your phone number"
          className={`text-black p-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="address" className="text-gray-700 font-semibold mb-2">Address</label>
        <input
          {...register('address', { required: 'Address is required' })}
          type="text"
          id="address"
          placeholder="Enter your address"
          className={`text-black p-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
      </div>
      </div>
      <button type="submit" className=" w-1/3 mt-14   p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Save
      </button>
    </form>
    
   


  );
}

export default Step1;
