import React, { useState } from "react";
import { useResumeContext } from "../context/appContext";
import { useActiveStep } from "../context/navigationcontext";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

function Step6() {
  const { resume, updateResume } = useResumeContext();
  const { handleNext } = useActiveStep();
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      summary: resume.summary || "",
    },
  });

  const onSubmit = async () => {
    const valid = await trigger();
    if (!valid) {
      toast.error("Please provide a summary or generate one with AI.");
      return;
    }
    updateResume("summary", getValues("summary"));
    toast.success("Summary saved successfully");
    handleNext();
  };

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    try {
      const response = await fetch(
        
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${key}`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Generate a professional summary for the following resume data:\n\n${JSON.stringify(
                      resume,
                      null,
                      2
                    )}`,
                  },
                ],
              },
            ],
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log(data);
      const generatedSummary =
  data?.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to generate summary.";

  
      setValue("summary", generatedSummary);
      updateResume("summary", generatedSummary);
      toast.success("AI-generated summary successfully added!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };
  

  return (
    <div className="w-full h-full overflow-y-hidden flex flex-col justify-start space-y-5 items-center">
      <h2 className="text-2xl font-bold text-gray-800">Summary</h2>
      <div className="w-3/4 flex flex-col space-y-3">
        <Controller
          name="summary"
          control={control}
          rules={{ required: "Summary is required" }}
          render={({ field }) => (
            <div className="flex flex-col">
              <label htmlFor="summary" className="text-gray-700 font-semibold">
                Write a brief summary about yourself:
              </label>
              <textarea
                {...field}
                id="summary"
                placeholder="Enter your professional summary here..."
                rows={6}
                className={`p-3 border ${
                  errors.summary ? "border-red-500" : "border-gray-300"
                } text-black rounded-lg focus:outline-none focus:border-blue-500`}
              />
              {errors.summary && (
                <p className="text-red-500 text-sm">{errors.summary.message}</p>
              )}
            </div>
          )}
        />
        <button
          onClick={handleGenerateAI}
          disabled={isGenerating}
          className={`mt-2 py-2 px-4 rounded-lg text-white ${
            isGenerating
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          } focus:outline-none focus:ring-2 focus:ring-green-500`}
        >
          {isGenerating ? "Generating..." : "Generate with AI"}
        </button>
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

export default Step6;

