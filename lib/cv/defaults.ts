import type {
  CvDocument,
  Education,
  Language,
  Reference,
  SocialLink,
  WorkExperience,
} from "./types";

export function createId(prefix = "cv"): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function createEmptyWorkExperience(): WorkExperience {
  return {
    id: createId("work"),
    company: "",
    role: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  };
}

export function createEmptyEducation(): Education {
  return {
    id: createId("education"),
    school: "",
    degree: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  };
}

export function createEmptyLanguage(): Language {
  return {
    id: createId("language"),
    name: "",
    proficiency: "",
  };
}

export function createEmptyReference(): Reference {
  return {
    id: createId("reference"),
    name: "",
    role: "",
    company: "",
    email: "",
    phone: "",
  };
}

export function createEmptySocialLink(): SocialLink {
  return {
    id: createId("link"),
    label: "",
    url: "",
  };
}

export function createEmptyCv(): CvDocument {
  const now = new Date().toISOString();

  return {
    id: createId(),
    name: "Untitled CV",
    createdAt: now,
    updatedAt: now,
    personalInfo: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      location: "",
    },
    about: "",
    skills: [""],
    workExperience: [createEmptyWorkExperience()],
    education: [createEmptyEducation()],
    languages: [createEmptyLanguage()],
    references: [],
    socialLinks: [createEmptySocialLink()],
  };
}

export function touchCv(cv: CvDocument): CvDocument {
  return {
    ...cv,
    updatedAt: new Date().toISOString(),
  };
}
