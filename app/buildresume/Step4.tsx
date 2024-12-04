import React from "react";
import { useResumeContext } from "../context/appContext";
import { useActiveStep } from "../context/navigationcontext";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

function Step4() {
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
      projects: resume.projects || [],
    },
  });

  const onAddProject = () => {
    const newProject = {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      link: "",
      technologies: "",
    };
    const updatedProjects = [...getValues("projects"), newProject];
    setValue("projects", updatedProjects);
    updateResume("projects", updatedProjects);
  };

  const onRemoveProject = (index: number) => {
    const updatedProjects = getValues("projects").filter((_, i) => i !== index);
    setValue("projects", updatedProjects);
    updateResume("projects", updatedProjects);
  };

  const onSubmit = async () => {
    const valid = await trigger();
    if (!valid) {
      toast.error("Please fill in all required fields correctly");
      return;
    }
    updateResume("projects", getValues("projects"));
    toast.success("Projects saved successfully");
    handleNext();
  };

  return (
    <div className="w-full h-full text-black overflow-y-hidden flex flex-col justify-start space-y-5 items-center">
      <button
        onClick={onAddProject}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Project
      </button>
      <div className="w-full overflow-y-auto flex-wrap px-5 justify-center flex items-center">
        {getValues("projects").map((project, index) => (
          <div
            key={index}
            className="relative flex flex-col bg-white p-3 m-3 rounded-lg shadow-lg"
          >
            <button
              onClick={() => onRemoveProject(index)}
              className="absolute -top-2 -right-2 bg-red-800 w-6 h-6 rounded-full text-white"
            >
              X
            </button>

            {/* Project Name */}
            <Controller
              name={`projects.${index}.name`}
              control={control}
              rules={{ required: "Project name is required" }}
              render={({ field }) => (
                <div className="flex flex-col gap-3">
                  <label className="text-gray-700 font-semibold">Project Name</label>
                  <input
                    {...field}
                    value={field.value || ""}
                    type="text"
                    placeholder="Enter project name"
                    className={`p-3 border ${
                      errors?.projects?.[index]?.name
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:outline-none focus:border-blue-500`}
                  />
                  {errors?.projects?.[index]?.name && (
                    <p className="text-red-500 text-sm">
                      {errors.projects[index].name.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Description */}
            <Controller
              name={`projects.${index}.description`}
              control={control}
              rules={{ required: "Project description is required" }}
              render={({ field }) => (
                <div className="flex flex-col gap-3">
                  <label className="text-gray-700 font-semibold">Description</label>
                  <textarea
                    {...field}
                    placeholder="Enter project description"
                    className={`p-3 border ${
                      errors?.projects?.[index]?.description
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:outline-none focus:border-blue-500`}
                  />
                  {errors?.projects?.[index]?.description && (
                    <p className="text-red-500 text-sm">
                      {errors.projects[index].description.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Dates */}
            <div className="flex gap-5">
              <Controller
                name={`projects.${index}.startDate`}
                control={control}
                rules={{ required: "Start date is required" }}
                render={({ field }) => (
                  <div className="flex flex-col gap-3 w-full">
                    <label className="text-gray-700 font-semibold">Start Date</label>
                    <input
                    
                      {...field}
                      value={field.value || ""}
                      type="date"
                      className={`p-3 border ${
                        errors?.projects?.[index]?.startDate
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:outline-none focus:border-blue-500`}
                    />
                    {errors?.projects?.[index]?.startDate && (
                      <p className="text-red-500 text-sm">
                        {errors.projects[index].startDate.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name={`projects.${index}.endDate`}
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-3 w-full">
                    <label className="text-gray-700 font-semibold">End Date</label>
                    <input
                      {...field}
                      value={field.value || ""}
                      type="date"
                      className={`p-3 border ${
                        errors?.projects?.[index]?.endDate
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:outline-none focus:border-blue-500`}
                    />
                    {errors?.projects?.[index]?.endDate && (
                      <p className="text-red-500 text-sm">
                        {errors.projects[index].endDate.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Link */}
            <Controller
              name={`projects.${index}.link`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-3">
                  <label className="text-gray-700 font-semibold">Project Link</label>
                  <input
                    {...field}
                    value={field.value || ""}
                    type="url"
                    placeholder="Enter project link (optional)"
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}
            />

            {/* Technologies */}
            <Controller
              name={`projects.${index}.technologies`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-3">
                  <label className="text-gray-700 font-semibold">Technologies</label>
                  <input
                    {...field}
                
                    type="text"
                    placeholder="Enter technologies "
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
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

export default Step4;
