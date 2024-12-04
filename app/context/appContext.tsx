"use client";
import React, { createContext, useState, ReactNode, useContext } from 'react';
import ResumeModel, { Education, Experience, Project, Skill } from '../model/ResumeModel';


// Define the context value interface
interface ResumeContextValue {
  resume: ResumeModel;
  updateResume: (key: keyof ResumeModel, value: any) => void;
  addEducation: (education: Education) => void;
  addExperience: (experience: Experience) => void;
  addSkill: (skill: Skill) => void;
  addProject: (project: Project) => void;
}

// Create the context
const ResumeContext = createContext<ResumeContextValue | undefined>(undefined);

// Create the provider component
export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize the state with an empty resume model
  const [resume, setResume] = useState<ResumeModel>({
    name: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    education: [
      {
        degree: '',
        institution: '',
        startDate: '',
        endDate: '',
        grade: '',

      },

    ],
    experience: [],
    skills: [],
    projects: [],
  });

  // Update any field in the resume
  const updateResume = (key: keyof ResumeModel, value: any) => {
    setResume((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Add new entries to respective arrays
  const addEducation = (education: Education) => {
    setResume((prev) => ({
      ...prev,
      education: [...prev.education, education],
    }));
  };

  const addExperience = (experience: Experience) => {
    setResume((prev) => ({
      ...prev,
      experience: [...prev.experience, experience],
    }));
  };

  const addSkill = (skill: Skill) => {
    setResume((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));
  };

  const addProject = (project: Project) => {
    setResume((prev) => ({
      ...prev,
      projects: [...prev.projects, project],
    }));
  };

  return (
    <ResumeContext.Provider
      value={{
        resume,
        updateResume,
        addEducation,
        addExperience,
        addSkill,
        addProject,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

// Custom hook for using the context
export const useResumeContext = (): ResumeContextValue => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
};
