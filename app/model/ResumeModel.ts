export default interface ResumeModel {
   
    name: string;
    email: string;
    phone: string;
    address: string;
    summary: string;
    education: Education[];
    experience: Experience[];
    skills: Skill[];
    projects: Project[];
    // languages: Language[];
    // certifications: Certification[];
    }

export interface Education {
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    grade: string;
}

export interface Experience {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Skill {
    name: string;
    level: string;
}

export interface Project {
    name: string;
    description: string;
    startDate: string | null;
    endDate: string| null;
    link: string | null;
    technologies: string[];

}

export interface Language {
    name: string;
    level: string;
}

export interface Certification {
    name: string;
    date: string;
    description: string;
}
