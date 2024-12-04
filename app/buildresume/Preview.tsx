import React, { useRef, useState } from "react";
import { useResumeContext } from "../context/appContext";
import { saveAs } from 'file-saver';

function Preview() {
  const { resume } = useResumeContext();
  const previewRef = useRef<HTMLDivElement>(null);  // Create a reference to the Preview component
  const [loading, setLoading] = useState(false);  // State for loading
  
  const generatePDF = async () => {
    if (!previewRef.current) return;

    setLoading(true);  // Set loading state to true when the process starts
    
    const htmlContent = previewRef.current.innerHTML;

    // Send the HTML content to the server to generate the PDF
    const response = await fetch("/api/generateResume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ htmlContent }),
    });

    // Get the URL of the uploaded PDF from the server
    const { downloadUrl } = await response.json();

    // If the server returns a URL pointing to the hosted file, download it with FileSaver.js
    if (downloadUrl) {
      // Create a temporary request to fetch the file as a Blob
      fetch(downloadUrl)
        .then((res) => res.blob())  // Convert the response into a Blob (binary large object)
        .then((blob) => {
          // Use FileSaver.js to save the file, specifying the file name and extension
          const fileName = 'resume.pdf';
          saveAs(blob, fileName);  // FileSaver.js triggers the download
          setLoading(false);  // Set loading state to false when done
        })
        .catch((error) => {
          console.error('Error downloading the PDF:', error);
          setLoading(false);  // Set loading state to false in case of an error
        });
    }
  };

  return (
    <div>
      <div
        ref={previewRef}
        className="p-6 text-black max-w-4xl mx-auto bg-white shadow-lg rounded-lg"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Resume Preview</h1>

        {/* Personal Information */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <p><strong>Name:</strong> {resume.name}</p>
          <p><strong>Email:</strong> {resume.email}</p>
          <p><strong>Phone:</strong> {resume.phone}</p>
          <p><strong>Address:</strong> {resume.address}</p>
        </section>

        {/* Summary */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <p>{resume.summary}</p>
        </section>

        {/* Education */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Education</h2>
          {resume.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <p><strong>Institution:</strong> {edu.institution}</p>
              <p><strong>Degree:</strong> {edu.degree}</p>
              <p><strong>Start Date:</strong> {edu.startDate}</p>
              <p><strong>End Date:</strong> {edu.endDate}</p>
              <p><strong>Grade:</strong> {edu.grade}</p>
            </div>
          ))}
        </section>

        {/* Experience */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Experience</h2>
          {resume.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <p><strong>Company:</strong> {exp.company}</p>
              <p><strong>Position:</strong> {exp.position}</p>
              <p><strong>Start Date:</strong> {exp.startDate}</p>
              <p><strong>End Date:</strong> {exp.endDate}</p>
              <p><strong>Description:</strong> {exp.description}</p>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap space-x-3">
            {resume.skills.map((skill, index) => (
              <div key={index} className="mb-2">
                <p>{skill.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Projects</h2>
          {resume.projects.map((proj, index) => (
            <div key={index} className="mb-4">
              <p><strong>Name:</strong> {proj.name}</p>
              <p><strong>Description:</strong> {proj.description}</p>
              <p><strong>Start Date:</strong> {proj.startDate}</p>
              <p><strong>End Date:</strong> {proj.endDate}</p>
              {proj.link && (
                <p><strong>Link:</strong> <a href={proj.link} target="_blank" className="text-blue-600 underline">{proj.link}</a></p>
              )}
              <p><strong>Technologies:</strong> {proj.technologies}</p>
            </div>
          ))}
        </section>
      </div>

      {/* Button to generate PDF */}
      <div className="mt-6 text-center">
        <button
          onClick={generatePDF}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md"
        >
          {loading ? (
            <span>Generating PDF...</span>  // Displaying loading text
          ) : (
            "Generate PDF"
          )}
        </button>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center mt-4">
          <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-12 h-12"></div>  {/* Loading spinner */}
        </div>
      )}
    </div>
  );
}

export default Preview;
