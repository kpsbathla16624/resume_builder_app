import React from "react";
import { useResumeContext } from "../context/appContext";
import { useActiveStep } from "../context/navigationcontext";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Level } from "../model/ResumeModel";

function Step5() {
  const { resume, updateResume } = useResumeContext();
  const { handleNext } = useActiveStep();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      skills: resume.skills || [],
    },
  });

  const onAddSkill = () => {
    const newSkill = { name: "", level: Level.Beginner };
    const updatedSkills = [...getValues("skills"), newSkill];
    setValue("skills", updatedSkills);
    updateResume("skills", updatedSkills);
  };

  const onRemoveSkill = (index: number) => {
    const updatedSkills = getValues("skills").filter((_, i) => i !== index);
    setValue("skills", updatedSkills);
    updateResume("skills", updatedSkills);
  };

  const onSubmit = async () => {
    const valid = await trigger();
    if (!valid) {
      toast.error("Please fill in all required fields correctly");
      return;
    }
    updateResume("skills", getValues("skills"));
    toast.success("Skills saved successfully");
    handleNext();
  };

  return (
    <div className="w-full h-full text-black overflow-y-hidden flex flex-col justify-start space-y-5 items-center">
      <button
        onClick={onAddSkill}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Skill
      </button>
      <div className="w-full overflow-y-auto flex-wrap px-5 justify-center flex items-center">
        {getValues("skills").map((skill, index) => (
          <div
            key={index}
            className="relative flex flex-col bg-white p-3 m-3 rounded-lg shadow-lg"
          >
            <button
              onClick={() => onRemoveSkill(index)}
              className="absolute -top-2 -right-2 bg-red-800 w-6 h-6 rounded-full text-white"
            >
              X
            </button>

            {/* Skill Name */}
            <Controller
              name={`skills.${index}.name`}
              control={control}
              rules={{ required: "Skill name is required" }}
              render={({ field }) => (
                <div className="flex flex-col gap-3">
                  <label className="text-gray-700 font-semibold">Skill Name</label>
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter skill name"
                    className={`p-3 border ${
                      errors?.skills?.[index]?.name
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:outline-none focus:border-blue-500`}
                  />
                  {errors?.skills?.[index]?.name && (
                    <p className="text-red-500 text-sm">
                      {errors.skills[index].name.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Skill Level */}
            <Controller
              name={`skills.${index}.level`}
              control={control}
              rules={{ required: "Skill level is required" }}
              render={({ field }) => (
                <div className="flex flex-col gap-3">
                  <label className="text-gray-700 font-semibold">Skill Level</label>
                  <select
                    {...field}
                    className={`p-3 border ${
                      errors?.skills?.[index]?.level
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:outline-none focus:border-blue-500`}
                  >
                    <option value={Level.Beginner}>Beginner</option>
                    <option value={Level.Intermediate}>Intermediate</option>
                    <option value={Level.Advanced}>Advanced</option>
                    <option value={Level.Expert}>Expert</option>
                  </select>
                  {errors?.skills?.[index]?.level && (
                    <p className="text-red-500 text-sm">
                      {errors.skills[index].level.message}
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

export default Step5;
