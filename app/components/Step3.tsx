import React from 'react'
import { useResumeContext } from '../context/appContext';
import { useActiveStep } from '../context/navigationcontext';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function Step3() {
  const { resume, updateResume } = useResumeContext();
  const { handleNext } = useActiveStep();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      experience: resume.experience,
    },
  });
  const onAddExperience = () => {
   
    const newExp = {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    const updatedExperience = [...getValues("experience"), newExp];
    setValue("experience", updatedExperience);
    updateResume("experience", updatedExperience);
  };

  const onRemoveexperience = (index: number) => {
    const updatedexperience = getValues("experience").filter((_, i) => i !== index);
    setValue("experience", updatedexperience);
    updateResume("experience", updatedexperience);
  };

  const onSubmit = async () => {
  
    const valid = await trigger();
    if (!valid) {
      toast.error("Please fill in all required fields correctly");
      return;
    }
    updateResume("experience", getValues("experience"));
    toast.success("experience saved successfully");
    handleNext();
  };



  return (
    <div className="w-full h-full overflow-y-hidden overflow-x-hidden flex flex-col justify-start space-y-5 items-center">
      <button
        onClick={onAddExperience}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add experience
      </button>
      <div className="w-full overflow-y-auto  overflow-x-hidden flex-wrap px-5 justify-center flex items-center">
        {getValues("experience").map((experience, index) => (
          <div
            key={index}
            className="relative flex flex-col bg-white p-3 m-3 justify-start  rounded-lg shadow-lg"
          >
            <button
              onClick={() => onRemoveexperience(index)}
              className="absolute -top-2 -right-2 bg-red-800 w-6 h-6 rounded-full text-white"
            >
              X
            </button>

            {/* Degree */}
            <Controller
              name={`experience.${index}.company`}
              control={control}
              rules={{ required: "company is required" }}
              render={({ field }) => (
                <div className="flex flex-col gap-3">
                  <label htmlFor={`company-${index}`} className="text-gray-700 font-semibold">
                    company
                  </label>
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter Company name "
                    className={`p-3 border ${
                      errors?.experience?.[index]?.company
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-black rounded-lg focus:outline-none focus:border-blue-500`}
                  />
                  {errors?.experience?.[index]?.company && (
                    <p className="text-red-500 text-sm">
                      {errors.experience[index].company.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Institution */}
            <Controller
              name={`experience.${index}.position`}
              control={control}
              rules={{ required: "position is required" }}
              render={({ field }) => (
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor={`position-${index}`}
                    className="text-gray-700 font-semibold"
                  >
                    position
                  </label>
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter position"
                    className={`p-3 border ${
                      errors?.experience?.[index]?.position
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-black rounded-lg focus:outline-none focus:border-blue-500`}
                  />
                  {errors?.experience?.[index]?.position && (
                    <p className="text-red-500 text-sm">
                      {errors.experience[index].position.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Dates */}
            <div className="flex gap-5">
              <Controller
                name={`experience.${index}.startDate`}
                control={control}
                rules={{ required: "Start date is required" }}
                render={({ field }) => (
                  <div className="flex flex-col gap-3 w-full">
                    <label
                      htmlFor={`startDate-${index}`}
                      className="text-gray-700 font-semibold"
                    >
                      Start Year
                    </label>
                    <input
                      {...field}
                      type="date"
                      className={`p-3 border ${
                        errors?.experience?.[index]?.startDate
                          ? "border-red-500"
                          : "border-gray-300"
                      } text-black rounded-lg focus:outline-none focus:border-blue-500`}
                    />
                    {errors?.experience?.[index]?.startDate && (
                      <p className="text-red-500 text-sm">
                        {errors.experience[index].startDate.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name={`experience.${index}.endDate`}
                control={control}
                rules={{ required: "End date is required" }}
                render={({ field }) => (
                  <div className="flex flex-col gap-3 w-full">
                    <label
                      htmlFor={`endDate-${index}`}
                      className="text-gray-700 font-semibold"
                    >
                      End Year
                    </label>
                    <input
                      {...field}
                      type="date"
                      className={`p-3 border ${
                        errors?.experience?.[index]?.endDate
                          ? "border-red-500"
                          : "border-gray-300"
                      } text-black rounded-lg focus:outline-none focus:border-blue-500`}
                    />
                    {errors?.experience?.[index]?.endDate && (
                      <p className="text-red-500 text-sm">
                        {errors.experience[index].endDate.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Grade */}
            <Controller
              name={`experience.${index}.description`}
              defaultValue={experience.description}
              control={control}
              rules={{ required: "description is required" }}
              render={({ field }) => (
                <div className="flex flex-col gap-3">
                  <label htmlFor={`description-${index}`} className="text-gray-700 font-semibold">
                  description
                  </label>
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter description"
                    className={`p-3 border ${
                      errors?.experience?.[index]?.description
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-black rounded-lg focus:outline-none focus:border-blue-500`}
                  />
                  {errors?.experience?.[index]?.description && (
                    <p className="text-red-500 text-sm">
                      {errors.experience[index].description.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit(onSubmit)}
        className="my-4 w-1/4 bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Save
      </button>
    </div>
  );
}

export default Step3
