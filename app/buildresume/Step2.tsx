import React, { useEffect } from "react";
import { useActiveStep } from "../context/navigationcontext";
import { useResumeContext } from "../context/appContext";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";

function Step2() {
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
      education: resume.education,
    },
  });

  // Reset form whenever resume.education changes
  useEffect(() => {
    reset({ education: resume.education });
  }, [resume.education, reset]);

  const onAddEducation = () => {
    if (getValues("education").length >= 3) {
      toast.error("You can only add up to 3 educations");
      return;
    }
    const newEducation = {
      degree: "",
      institution: "",
      startDate: "",
      endDate: "",
      grade: "",
    };
    const updatedEducation = [...getValues("education"), newEducation];
    setValue("education", updatedEducation);
    updateResume("education", updatedEducation);
  };

  const onRemoveEducation = (index: number) => {
    const updatedEducation = getValues("education").filter((_, i) => i !== index);
    setValue("education", updatedEducation);
    updateResume("education", updatedEducation);
  };

  const onSubmit = async () => {
    if (getValues("education").length === 0) {
      toast.error("Please add at least one education.");
      return;
    }
    const valid = await trigger();
    if (!valid) {
      toast.error("Please fill in all required fields correctly");
      return;
    }
    updateResume("education", getValues("education"));
    toast.success("Education saved successfully");
    handleNext();
  };

  return (
    <div className="w-full h-full overflow-y-hidden overflow-x-hidden flex flex-col justify-start space-y-5 items-center">
      <button
        onClick={onAddEducation}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Education
      </button>
      <div className="w-full overflow-y-auto overflow-x-hidden flex-wrap px-5 justify-center flex items-center">
        {getValues("education").map((education, index) => (
          <div
            key={index}
            className="relative flex flex-col bg-white p-3 m-3 justify-start  rounded-lg shadow-lg"
          >
            <button
              onClick={() => onRemoveEducation(index)}
              className="absolute -top-2 -right-2 bg-red-800 w-6 h-6 rounded-full text-white"
            >
              X
            </button>

            {/* Degree */}
            <Controller
              name={`education.${index}.degree`}
              control={control}
              rules={{ required: "Degree is required" }}
              render={({ field }) => (
                <div className="flex flex-col gap-3">
                  <label htmlFor={`degree-${index}`} className="text-gray-700 font-semibold">
                    Degree
                  </label>
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter Degree"
                    className={`p-3 border ${
                      errors?.education?.[index]?.degree
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-black rounded-lg focus:outline-none focus:border-blue-500`}
                  />
                  {errors?.education?.[index]?.degree && (
                    <p className="text-red-500 text-sm">
                      {errors.education[index].degree.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Institution */}
            <Controller
              name={`education.${index}.institution`}
              control={control}
              rules={{ required: "Institution is required" }}
              render={({ field }) => (
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor={`institution-${index}`}
                    className="text-gray-700 font-semibold"
                  >
                    Institution
                  </label>
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter Institution"
                    className={`p-3 border ${
                      errors?.education?.[index]?.institution
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-black rounded-lg focus:outline-none focus:border-blue-500`}
                  />
                  {errors?.education?.[index]?.institution && (
                    <p className="text-red-500 text-sm">
                      {errors.education[index].institution.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Dates */}
            <div className="flex gap-5">
              <Controller
                name={`education.${index}.startDate`}
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
                        errors?.education?.[index]?.startDate
                          ? "border-red-500"
                          : "border-gray-300"
                      } text-black rounded-lg focus:outline-none focus:border-blue-500`}
                    />
                    {errors?.education?.[index]?.startDate && (
                      <p className="text-red-500 text-sm">
                        {errors.education[index].startDate.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name={`education.${index}.endDate`}
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
                        errors?.education?.[index]?.endDate
                          ? "border-red-500"
                          : "border-gray-300"
                      } text-black rounded-lg focus:outline-none focus:border-blue-500`}
                    />
                    {errors?.education?.[index]?.endDate && (
                      <p className="text-red-500 text-sm">
                        {errors.education[index].endDate.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Grade */}
            <Controller
              name={`education.${index}.grade`}
              defaultValue={education.grade}
              control={control}
              rules={{ required: "Grade is required" }}
              render={({ field }) => (
                <div className="flex flex-col gap-3">
                  <label htmlFor={`grade-${index}`} className="text-gray-700 font-semibold">
                    Grade
                  </label>
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter Grade"
                    className={`p-3 border ${
                      errors?.education?.[index]?.grade
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-black rounded-lg focus:outline-none focus:border-blue-500`}
                  />
                  {errors?.education?.[index]?.grade && (
                    <p className="text-red-500 text-sm">
                      {errors.education[index].grade.message}
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

export default Step2;
