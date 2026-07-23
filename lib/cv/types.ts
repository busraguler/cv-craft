export type PersonalInfo = {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
};

export type WorkExperience = {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Language = {
  id: string;
  name: string;
  proficiency: string;
};

export type Certificate = {
  id: string;
  title: string;
  description: string;
};

export type Reference = {
  id: string;
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
};

export type SocialLink = {
  id: string;
  label: string;
  url: string;
};

export type CvLanguage = "tr" | "en";

export type CvDocument = {
  id: string;
  name: string;
  language: CvLanguage;
  createdAt: string;
  updatedAt: string;
  personalInfo: PersonalInfo;
  about: string;
  skills: string[];
  workExperience: WorkExperience[];
  education: Education[];
  languages: Language[];
  certificates: Certificate[];
  references: Reference[];
  socialLinks: SocialLink[];
};

export type CvValidation = {
  isValid: boolean;
  messages: string[];
  fields: Partial<Record<"name" | keyof PersonalInfo | "content", string>>;
};
