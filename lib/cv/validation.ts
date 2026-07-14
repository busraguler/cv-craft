import type { CvDocument, CvValidation } from "./types";

function hasMeaningfulContent(cv: CvDocument): boolean {
  return Boolean(
    cv.about.trim() ||
      cv.skills.some((skill) => skill.trim()) ||
      cv.workExperience.some(
        (item) =>
          item.company.trim() || item.role.trim() || item.description.trim(),
      ) ||
      cv.education.some(
        (item) =>
          item.school.trim() || item.degree.trim() || item.description.trim(),
      ),
  );
}

export function validateCv(cv: CvDocument): CvValidation {
  const fields: CvValidation["fields"] = {};
  const messages: string[] = [];

  if (!cv.name.trim()) {
    fields.name = "CV name is required.";
    messages.push("Add a CV name.");
  }

  if (!cv.personalInfo.fullName.trim()) {
    fields.fullName = "Full name is required.";
    messages.push("Add your full name.");
  }

  if (!cv.personalInfo.email.trim()) {
    fields.email = "Email is required.";
    messages.push("Add an email address.");
  }

  if (!cv.personalInfo.phone.trim()) {
    fields.phone = "Phone is required.";
    messages.push("Add a phone number.");
  }

  if (!hasMeaningfulContent(cv)) {
    fields.content =
      "Add at least one section such as about, skills, work experience, or education.";
    messages.push("Add resume content before exporting.");
  }

  return {
    isValid: messages.length === 0,
    messages,
    fields,
  };
}
