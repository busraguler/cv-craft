import type { CvDocument, CvValidation } from "./types";

export function validateCv(cv: CvDocument): CvValidation {
  void cv;

  return {
    isValid: true,
    messages: [],
    fields: {},
  };
}
